(function(root){
  function encode(text,urlSafe=false){
    const bytes=new TextEncoder().encode(text);let binary='';
    for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
    const result=btoa(binary);
    return urlSafe?result.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''):result;
  }
  function decode(text,urlSafe=false){
    let value=text.replace(/\s/g,'');
    const alphabet=urlSafe?/^[A-Za-z0-9_-]*={0,2}$/:/^[A-Za-z0-9+/]*={0,2}$/;
    if(!alphabet.test(value))throw Error('Invalid Base64 characters. Check the input and URL-safe setting.');
    const raw=value.replace(/=+$/,'');const pad=value.length-raw.length;
    if(raw.length%4===1||(pad>0&&(value.length%4!==0||pad!==((4-raw.length%4)%4))))throw Error('Invalid Base64 length or padding.');
    value=raw.replace(/-/g,'+').replace(/_/g,'/');value+='='.repeat((4-value.length%4)%4);
    const bytes=Uint8Array.from(atob(value),c=>c.charCodeAt(0));
    let textResult;try{textResult=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes);}catch{throw Error('Decoded data is not valid UTF-8 text. This tool decodes text, not binary files.');}
    if(encode(textResult,urlSafe).replace(/=+$/,'')!==raw)throw Error('Invalid or non-canonical Base64 input.');
    return textResult;
  }
  root.Base64Codec={encode,decode};
})(globalThis);

