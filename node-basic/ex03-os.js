// node-basic/ex03-os.js
// os 모듈 (내장 모듈)
const os = require('os'); // CommonJS 표준
// import os from 'os'
//  ===> ES 표준 (package.json에 type:'module'로 설정하던지 파일명이 ~.mjs일 때 가능)
console.log('os 시스템 타입: %s, 시스템의 hostname: %s', os.type(), os.hostname());
console.log('시스템 메모리: %d bytes / %d bytes', os.freemem(), os.totalmem());

// byte를 kb로 변환 => bytes/1024
// byte를 mb로 변환 => bytes/(1024*1024)
console.log('');
console.log(os.cpus());
console.log(os.cpus().length); // 논리적 cpu 코어 수를 반환

console.log('=====시스템의 네트워크 정보=====');
console.log(os.networkInterfaces());
