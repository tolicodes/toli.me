import {startPrivateMetrics} from './bootstrap.mjs';
import sites from './sites.json';
const site=location.hostname;
if(Object.hasOwn(sites,site))startPrivateMetrics({site,app:sites[site],release:'1.0.0'});
