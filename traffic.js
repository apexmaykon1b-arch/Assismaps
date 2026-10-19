// Optional live incident integration. Configure HERE_API_KEY in Vercel Environment Variables.
// Without a provider key, returns an explicit unavailable status (never fake traffic data).
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const n = v => Number(v), s=n(req.query.s), w=n(req.query.w), north=n(req.query.n), e=n(req.query.e);
  if (![s,w,north,e].every(Number.isFinite) || s < -90 || north > 90 || w < -180 || e > 180 || s >= north || w >= e || (north-s)*(e-w)>1) return res.status(400).json({error:'Bounding box inválida ou grande demais.'});
  const key = process.env.HERE_API_KEY;
  if (!key) return res.status(200).json({available:false,provider:null,liveTraffic:false,liveIncidents:false,features:[],message:'Configure HERE_API_KEY na Vercel para habilitar incidentes ao vivo.'});
  try {
    const url = new URL('https://data.traffic.hereapi.com/v7/incidents');
    url.searchParams.set('in', `bbox:${w},${s},${e},${north}`);
    url.searchParams.set('locationReferencing','shape');
    url.searchParams.set('apiKey',key);
    const upstream = await fetch(url, {headers:{Accept:'application/json'}});
    if (!upstream.ok) return res.status(502).json({available:false,provider:'HERE',error:'Provedor de incidentes respondeu '+upstream.status,features:[]});
    const body = await upstream.json();
    const features = (body.results || []).map((item, i) => {
      const d=item.incidentDetails||{}, loc=item.location||{}, shape=loc.shape||{};
      const p=(shape.links||[]).flatMap(x=>x.points||[])[0] || (shape.centre?shape.centre:null);
      if (!p || !Number.isFinite(Number(p.lat)) || !Number.isFinite(Number(p.lng))) return null;
      return {id:'here-'+(item.incidentId||i),type:'incident',lat:Number(p.lat),lon:Number(p.lng),name:d.description||d.roadName||'Incidente de trânsito',note:[d.type,d.criticality,d.roadClosed?'via fechada':null].filter(Boolean).join(' · '),source:'HERE Traffic API',official:false,updatedAt:new Date().toISOString(),expiresAt:d.endTime||null};
    }).filter(Boolean);
    return res.status(200).json({available:true,provider:'HERE Traffic API',liveTraffic:false,liveIncidents:true,updatedAt:new Date().toISOString(),features});
  } catch (e) { return res.status(502).json({available:false,provider:'HERE',error:'Falha consultando provedor de incidentes.',features:[]}); }
}
