// Discovery/status endpoint for official open-data sources. It does not pretend metadata is imported into the map.
export default async function handler(req,res){
  res.setHeader('Cache-Control','s-maxage=3600, stale-while-revalidate=86400');
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
  const sources=[
    {id:'prf-accidents',name:'PRF — acidentes históricos',url:'https://www.gov.br/prf/pt-br/acesso-a-informacao/dados-abertos/dados-abertos-da-prf',kind:'official-download',frequency:'mensal',status:'metadata-only',note:'CSV/ZIP publicados pela PRF; ainda não são incidentes em tempo real.'},
    {id:'prf-radars',name:'PRF — radares fixos',url:'https://www.gov.br/prf/pt-br/assuntos/fiscalizacao-de-velocidade/radares-fixos',kind:'official-page',status:'official-page',note:'A página pública não deve ser tratada como API JSON estável.'},
    {id:'dnit-speed',name:'DNIT — controle de velocidade',url:'https://servicos.dnit.gov.br/dadosabertos/dataset/controle-de-velocidade',kind:'ckan-dataset',status:'discovery',note:'Dataset aberto; a disponibilidade e os campos variam conforme o recurso publicado.'},
    {id:'dnit-pavement',name:'DNIT — condições do pavimento',url:'https://servicos.dnit.gov.br/dadosabertos/dataset/condicoes-do-pavimento',kind:'ckan-dataset',status:'discovery',note:'Dados de condição de pavimento; não são observação instantânea de cada trecho.'},
    {id:'dnit-works',name:'DNIT — andamento de obras',url:'https://servicos.dnit.gov.br/dadosabertos/dataset/andamento-de-obras',kind:'ckan-dataset',status:'discovery',note:'Dados de obras e contratos; coordenadas/estrutura precisam ser verificadas por recurso.'},
    {id:'osm',name:'OpenStreetMap / Overpass',url:'https://www.openstreetmap.org/copyright',kind:'community',status:'active',note:'Dados comunitários, não oficiais e possivelmente incompletos.'},
    {id:'here-traffic',name:'HERE — incidentes de trânsito',url:'https://docs.here.com/traffic-api/docs/overview',kind:'api-key',status:process.env.HERE_API_KEY?'configured':'needs-key',note:'Incidentes ao vivo dependem de HERE_API_KEY e das condições da conta.'}
  ];
  let dnit='unavailable';
  try{const r=await fetch('https://servicos.dnit.gov.br/dadosabertos/api/3/action/package_search?q=controle%20de%20velocidade&rows=3',{headers:{Accept:'application/json'}});if(r.ok){const j=await r.json();if(j.success){dnit='reachable';const ds=(j.result.results||[]).map(x=>({name:x.title||x.name,url:'https://servicos.dnit.gov.br/dadosabertos/dataset/'+x.name,resources:(x.resources||[]).map(y=>({name:y.name,format:y.format,url:y.url,updated:y.last_modified||y.created}))}));return res.status(200).json({updatedAt:new Date().toISOString(),dnitStatus:dnit,sources,dnitDiscovered:ds,liveTrafficConfigured:!!process.env.HERE_API_KEY});}}}catch(e){}
  return res.status(200).json({updatedAt:new Date().toISOString(),dnitStatus:dnit,sources,liveTrafficConfigured:!!process.env.HERE_API_KEY});
}
