// node-basic/ex13-filePromise.js
const fs = require('fs').promises; // promise 방식으로 파일 읽고 쓰기
// const { promises:fs } = require('fs') // 위 코드와 동일
console.log('ex13 시작');
fs.readFile('ex03-os.js', 'utf-8')
  .then((data) => {
    console.log(data.toString());
    return fs.readFile('ex04-module.js', 'utf-8');
  })
  .then((data2) => console.log(data2))
  .catch(console.log);

fs.copyFile('./ex05-module.js', 'ex05-module-copy.txt').then(() => {
  console.log('copy 완료');
});
