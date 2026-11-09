import {clarity} from './vendor/clarity.module.js';
import {privateMetricsConfig} from './transport.mjs';
export function startPrivateMetrics({site,app,release,projectId='zb5fa2mqgu',allowedHosts=[site]}) {
 try {
  if(!allowedHosts.includes(window.location.hostname) || window.location.search || window.location.hash || navigator.doNotTrack==='1' || navigator.globalPrivacyControl) return ()=>{};
  if(document.documentElement.hasAttribute('data-private-clarity-started')) return ()=>{};
  document.documentElement.setAttribute('data-private-clarity-started','true');
  clarity.start(privateMetricsConfig({site,app,release,projectId}));
  clarity.consentv2({ad_Storage:'denied',analytics_Storage:'denied'});
  const click=()=>clarity.event('AppClick');
  document.addEventListener('click',click,{capture:true,passive:true});
  return ()=>{document.removeEventListener('click',click,true);try{clarity.stop();}catch{}};
 }catch{return ()=>{};}
}
