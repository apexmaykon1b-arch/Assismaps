// Fetch map-community road features from OpenStreetMap via Overpass.
// Results are NOT official speed enforcement or live traffic/incident reports.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
  if (req.method !== 'GET') return res.status(405).json({error:'Method not allowed'});
  const n=v=>Number(v), s=n(req.query.s), w=n(req.query.w), north=n(req.query.n), e=n(req.query.e);
  if (![s,w,north,e].every(Number.isFinite) || s < -90 || north > 90 || w < -180 || e > 180 || s >= north || w >= e || (north-s)*(e-w)>4) return res.status(400).json({error:'Bounding box inválida ou grande demais; aproxime o mapa.'});
  const bbox=`${s},${w},${north},${e}`;
  const query=`[out:json][timeout:20];(node[highway=speed_camera](${bbox});node[enforcement=maxspeed](${bbox});node[barrier=toll_booth](${bbox});node[highway=toll_gantry](${bbox});node[highway=roadworks](${bbox});node[construction](${bbox});way[highway=roadworks](${bbox});way[construction](${bbox});node[hazard](${bbox});node[traffic_calming](${bbox}););out center tags;`;
  const endpoints=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter'];
  for (const endpoint of endpoints) {
    try {
      const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','User-Agent':'AssisMaps/9.0'},body:'data='+encodeURIComponent(query)});
      if(!r.ok) continue;
      const j=await r.json();
      const features=(j.elements||[]).map(el=>{
        const tags=el.tags||{}, lat=el.lat??el.center?.lat, lon=el.lon??el.center?.lon;
        if(!Number.isFinite(lat)||!Number.isFinite(lon)) return null;
        let type='hazard';
        if(tags.highway==='speed_camera'||tags.enforcement==='maxspeed') type='radar';
        else if(tags.barrier==='toll_booth'||tags.highway==='toll_gantry') type='toll';
        else if(tags.highway==='roadworks'||tags.construction) type='roadwork';
        return {id:'osm-'+el.type+'-'+el.id,type,lat,lon,name:tags.name||tags.ref||({radar:'Fiscalização de velocidade mapeada no OSM',toll:'Pedágio mapeado no OSM',roadwork:'Obras mapeadas no OSM',hazard:'Ponto viário mapeado no OSM'}[type]),note:Object.entries(tags).filter(([k])=>['maxspeed','operator','opening_hours','hazard','surface','smoothness','construction','access'].includes(k)).map(([k,v])=>k+': '+v).join(' · '),source:'OpenStreetMap community data',official:false,price:null,speed:tags.maxspeed?parseInt(tags.maxspeed,10)||null:null};
      }).filter(Boolean);
      return res.status(200).json({updatedAt:new Date().toISOString(),source:'OpenStreetMap / Overpass',official:false,liveTraffic:false,features});
    } catch(e) { /* try the next Overpass instance */ }
  }
  return res.status(502).json({error:'Serviço OSM Overpass temporariamente indisponível',features:[]});
}
