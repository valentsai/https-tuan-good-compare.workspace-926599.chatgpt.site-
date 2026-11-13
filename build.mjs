import {readFileSync,writeFileSync,mkdirSync,readdirSync} from 'node:fs';
const types={html:'text/html',js:'text/javascript',css:'text/css',svg:'image/svg+xml'};const assets={};
for(const file of readdirSync('public')){const type=types[file.split('.').at(-1)];if(!type)throw Error('Unsupported asset '+file);assets['/'+file]={type:type+'; charset=utf-8',body:readFileSync('public/'+file,'utf8')}}
mkdirSync('dist/server',{recursive:true});mkdirSync('dist/.openai',{recursive:true});
const manifest=JSON.parse(readFileSync('.openai/hosting.json','utf8'));if(manifest.static)throw Error('Worker manifest must not declare static');
writeFileSync('dist/server/index.js','const STATIC_FILES = '+JSON.stringify(assets)+';\n'+readFileSync('worker/index.mjs','utf8'));
writeFileSync('dist/.openai/hosting.json',JSON.stringify(manifest,null,2)+'\n');console.log('Built Worker with '+Object.keys(assets).length+' embedded assets');
