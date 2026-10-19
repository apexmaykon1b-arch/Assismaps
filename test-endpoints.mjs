import assert from 'node:assert/strict';
import traffic from '../api/traffic.js';
import route from '../api/route.js';
function mock(query={},method='GET') { const out={headers:{},statusCode:200,body:null,setHeader(k,v){this.headers[k]=v},status(n){this.statusCode=n;return this},json(v){this.body=v;return this}}; return [{method,query},out]; }
let [req,res]=mock({s:'-91',w:'0',n:'-90',e:'1'}); await traffic(req,res); assert.equal(res.statusCode,400,'traffic rejects invalid bbox');
[req,res]=mock({s:'-26.2',w:'-53.2',n:'-26.0',e:'-52.9'}); const oldKey=process.env.HERE_API_KEY; delete process.env.HERE_API_KEY; await traffic(req,res); assert.equal(res.statusCode,200); assert.equal(res.body.available,false); assert.equal(res.body.liveIncidents,false);
[req,res]=mock({aLat:'999',aLon:'0',bLat:'0',bLon:'0'}); await route(req,res); assert.equal(res.statusCode,400,'route rejects invalid coordinates');
if(oldKey!==undefined) process.env.HERE_API_KEY=oldKey;
console.log('OK: invalid bbox/coordinates rejected; missing provider key reported honestly.');
