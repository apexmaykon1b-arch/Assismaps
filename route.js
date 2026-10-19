// Public OSM routing proxy. No live traffic; travel profiles are limited by upstream services.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const n = v => Number(v);
  const aLat=n(req.query.aLat), aLon=n(req.query.aLon), bLat=n(req.query.bLat), bLon=n(req.query.bLon);
  if (![aLat,aLon,bLat,bLon].every(Number.isFinite) || Math.abs(aLat)>90 || Math.abs(bLat)>90 || Math.abs(aLon)>180 || Math.abs(bLon)>180) return res.status(400).json({ error:'Coordenadas inválidas' });
  const mode=String(req.query.mode||'car');
  const base = mode === 'foot' ? 'https://routing.openstreetmap.de/routed-foot/route/v1/driving/' : 'https://router.project-osrm.org/route/v1/driving/';
  try {
    const u=base+aLon+','+aLat+';'+bLon+','+bLat+'?overview=full&geometries=geojson&steps=true&alternatives=true';
    const r=await fetch(u,{headers:{'User-Agent':'AssisMaps/9.0'}});
    if(!r.ok) return res.status(502).json({error:'Roteador público indisponível',providerStatus:r.status});
    const j=await r.json();
    if(j.code!=='Ok') return res.status(404).json({error:'Nenhuma rota encontrada',providerCode:j.code});
    return res.status(200).json({...j, assisMeta:{provider:mode==='foot'?'OSM routed-foot demo':'OSRM public demo',liveTraffic:false,guaranteedTollAvoidance:false}});
  } catch(e) { return res.status(502).json({error:'Falha ao consultar roteador'}); }
}
