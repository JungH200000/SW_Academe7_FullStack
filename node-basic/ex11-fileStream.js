// node-basic/ex11-fileStream.js

const fs = require('fs');
const writeStream = fs.createWriteStream('out.txt', { encoding: 'utf-8' });
// text 기반 파일을 쓸 경우: encoding 설정
// binary 데이터(동영상, 오디오 등)를 사용할 경우 encoding 없이 Buffer로 다뤄야 한다.
writeStream.write('첫 번째 줄\n'); // 데이터를 stream에 작성
writeStream.write('두 번째 줄\n');
writeStream.write('세 번째 줄\n');
writeStream.write('마지막 줄\n');
writeStream.end();

writeStream.on('finish', () => {
  // 쓰기 완료 이벤트
  console.log('out.txt에 작성 완료');
});
writeStream.on('error', (err) => console.log(err.message));
