// node-basic/ex12-fileCopy.js
// readStream.pipe(writeStream)
const fs = require('fs');
const fileCopy = function (src, dest) {
  const readStream = fs.createReadStream(src);
  const writeStream = fs.createWriteStream(dest);
  readStream.pipe(writeStream);
  console.log('>>> 파일 Copy 중');
};

// fileCopy() 호출해서 copy.txt.로 copy
console.log('===파일 Copy 시작===');
fileCopy('ex05-require.js', 'ex05-require.txt');
// fileCopy('dog3.jpg', 'copy.jpg');

const zlib = require('zlib');
fs.createReadStream('dog3.jpg')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('dog3.jpg.gz'))
  .on('finish', () => console.log('파일 압축 완료')); // gzip으로 압축
/*
gzip : 단일 파일 압축
zip : 여러 파일 압축
*/
