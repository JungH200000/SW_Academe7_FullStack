// node-basic/ex08-file.js
// 내장 모듈 fs(file system module)을 사용해서 파일 읽기
const fs = require('fs');

// 1. 동기 방식으로 파일 읽기
const data = fs.readFileSync('ex07-require.mjs', 'utf-8');
console.log(data); // 파일 데이터 출력
console.log('Bye Bye');

// 2. 비동기 방식으로 파일 읽기
fs.readFile('ex07-require.mjs', 'utf-8', (err, data) => {
  if (err) {
    console.errop(err);
    console.log('파일이 존재하지 않습니다.');
    throw err;
  }
  console.log(data);
});
console.log('');
console.log('잘가');
