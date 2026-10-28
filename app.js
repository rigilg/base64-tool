const $=id=>document.getElementById(id);
let mode='encode';
function status(message,error=false){$('status').textContent=message;$('status').classList.toggle('error',error);}
function counts(){for(const name of ['input','output'])$(name+'-count').textContent=`${Array.from($(name).value).length.toLocaleString()} characters`;for(const name of ['copy','download'])$(name).disabled=!$('output').value;}
function invalidate(){ $('output').value='';counts();status('Ready when you are.'); }
function setMode(next){mode=next;for(const name of ['encode','decode'])$(name).setAttribute('aria-pressed',String(name===mode));$('input-label').textContent=mode==='encode'?'Plain text':'Base64 input';$('output-label').textContent=mode==='encode'?'Base64 output':'Decoded text';$('convert').innerHTML=(mode==='encode'?'Encode text':'Decode Base64')+' <span>→</span>';invalidate();}
function convert(){try{if($('input').value.length>2000000)throw Error('Please use 2 million characters or fewer per conversion.');$('output').value=Base64Codec[mode]($('input').value,$('urlsafe').checked);counts();status(mode==='encode'?'Encoded locally. Your text stayed on this device.':'Decoded locally. Your text stayed on this device.');}catch(error){$('output').value='';counts();status(error.message,true);}}
for(const name of ['encode','decode'])$(name).onclick=()=>setMode(name);
$('input').addEventListener('input',invalidate);$('urlsafe').onchange=invalidate;$('convert').onclick=convert;
$('clear').onclick=()=>{$('input').value='';invalidate();$('input').focus();};
$('example').onclick=()=>{$('input').value=mode==='encode'?'Hello, 世界! 👋':Base64Codec.encode('Hello, 世界! 👋',$('urlsafe').checked);convert();};
$('swap').onclick=()=>{if(!$('output').value){status('Convert some text first.');return;}const result=$('output').value;setMode(mode==='encode'?'decode':'encode');$('input').value=result;counts();$('input').focus();};
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText($('output').value);status('Result copied to clipboard.');}catch{ $('output').focus();$('output').select();status('Select Copy in your browser, or press Ctrl / ⌘ + C.');}};
$('download').onclick=()=>{const url=URL.createObjectURL(new Blob([$ ('output').value],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=mode==='encode'?'encoded-base64.txt':'decoded-text.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Result downloaded.');};
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();convert();}});
