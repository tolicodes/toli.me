import {build} from 'esbuild';
await build({entryPoints:['analytics/private-metrics/entry.mjs'],bundle:true,minify:true,format:'iife',target:'es2020',legalComments:'eof',outfile:'public/analytics/clarity-metrics-1.0.0.js'});
