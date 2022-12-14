fetch('../out/main.wasm').then(response =>
  response.arrayBuffer()
).then((buffer) => {
  startHere(buffer);
}).catch(console.error);

async function startHere(buffer){
 const module = await WebAssembly.compile(buffer);
 const instance = await WebAssembly.instantiate(module);

   // prendo la memoria del modulo
 const linearMemory = instance.exports.memory;

 // creo un buffer che inizia del riferimento della stringa
 const offset = instance.exports.get_hello();
 const stringBuffer = new Uint8Array(linearMemory.buffer, offset, instance.exports.get_hello_len());

 // creo la stringa dal buffer
 let str = '';
 for (let i=0; i<stringBuffer.length; i++) {
   str += String.fromCharCode(stringBuffer[i]);
 }

 document.getElementById("greetings").textContent = str;
 console.log(str);

 var sumResult = instance.exports.sum(1, 2);
 document.getElementById("sayHello").textContent = sumResult;

 var howOld = instance.exports.how_old(2022, 2000);
 document.getElementById("howOld").textContent = howOld;
}