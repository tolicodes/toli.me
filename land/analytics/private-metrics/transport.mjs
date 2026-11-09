// Wire schema pinned to Microsoft's clarity-js 0.8.77. Unknown data fails closed.
const numericEvents = new Set([2,3,25,26,28,35,47]);
const deviceDimensions = new Set([0,9,16,17,22,23,24,25,26,29,30,34,35,36,38]);
const numeric = value => value === null || typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value)) || (Array.isArray(value) && value.length < 500 && value.every(numeric));
const usageMetrics=new Set([0,1,2,3,4,5,6,7,8,9,10,14,15,16,25,26,27,28,29,30,31,32,33,34,35,37,38,39,40,41]);
const id = value => typeof value === 'string' && /^[a-z0-9-]{1,64}$/i.test(value);
export function sanitizeMetrics(raw, {projectId,site,app,release}) {
 try {
  if(typeof raw !== 'string' || raw.length > 2000000 || !/^[a-z0-9]+$/.test(projectId) || !/^[a-z0-9.-]+$/.test(site)) return null;
  const {e,a} = JSON.parse(raw);
  if(!Array.isArray(e) || e.length !== 12 || e[0] !== '0.8.77' || e[4] !== projectId || !id(e[5]) || !id(e[6]) || !Array.isArray(a)) return null;
  if(![1,2,3,7,8,9,10].every(i=>typeof e[i] === 'number' && Number.isFinite(e[i]))) return null;
  const url = 'https://' + site + '/';
  const envelope = [...e.slice(0,11),url];
  const events=[];
  for(const event of a) {
   if(!Array.isArray(event) || typeof event[0] !== 'number' || !Number.isFinite(event[0])) continue;
   const type=event[1];
   if(type===0) {
    const safe=[event[0],0];
    for(let i=2;i+1<event.length;i+=2)if(usageMetrics.has(event[i]) && typeof event[i+1]==='number' && Number.isFinite(event[i+1]))safe.push(event[i],event[i]===1?0:event[i+1]);
    if(safe.length>2)events.push(safe);
   }
   if(type===4 && event.length===27 && numeric(event)) {
    const safe=event.map((value,index)=>[0,1,2,5,6,11,12,13,16,19,22,25].includes(index)?value:0);
    safe[3]=safe[5];safe[4]=safe[6];safe[26]=[];events.push(safe);
   }
   if(type===24 && event.length===3 && event[2]==='AppClick')events.push(event);
   if(numericEvents.has(type) && numeric(event)) events.push(event);
   if(type===1) {
    const safe=[event[0],1];
    for(let i=2;i+1<event.length;i+=2) {
     const key=event[i], values=event[i+1];
     if(key===1) safe.push(1,[url]);
     else if(key===3) safe.push(3,[app]);
     else if(deviceDimensions.has(key) && Array.isArray(values) && values.length<30 && values.every(v=>typeof v==='string' && v.length<=512 && !/[\x00-\x1f]/.test(v) && !/(?:https?:|blob:|data:|@)/i.test(v))) safe.push(key,values);
    }
    if(safe.length>2) events.push(safe);
   }
  }
  // These labels are source literals, never values read from a page or account.
  const labels=[0,34,'site',[site],'app',[app],'capture_mode',['anonymous_metrics']];
  if(release && /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z0-9.-]+)?$/i.test(release)) labels.push('integration_release',[release]);
  events.push(labels);
  const output=JSON.stringify({e:envelope,a:events});
  return output.length < 60000 ? output : null;
 }catch{return null;}
}
export function privateMetricsConfig(options) {
 return {projectId:options.projectId,lean:true,lite:true,track:false,content:false,cookies:[],mask:['html'],fraud:false,diagnostics:false,
  upload:raw=>{const payload=sanitizeMetrics(raw,options);if(payload)void fetch('https://t.clarity.ms/collect',{method:'POST',body:payload,credentials:'omit',referrerPolicy:'no-referrer',keepalive:true}).catch(()=>{});}};
}
