// node-basic/ex09-file.js
const { log } = require('console');
const fs = require('fs');
const data = "반갑습니다. I'm jungH";
// 파일 쓰기: greeting.txt
// 1. 동기 방식
fs.writeFileSync('greeting.txt', data);
console.log('greeting.txt 파일에 쓰기 완료');

// 2. 비동기 방식
fs.writeFile('greeting2.txt', data, 'utf-8', (err) => {
  if (err) {
    console.log('파일 쓰기 중 에러 발생: ', err.message);
    throw err;
  }
  console.log('greeting2.txt 파일에 쓰기 완료');
});
