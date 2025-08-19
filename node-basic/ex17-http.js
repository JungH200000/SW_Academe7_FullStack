// node-basic/ex17-http.js
const http = require('http'),
  path = require('path'),
  fs = require('fs');
// 1. 서버 생성 후 가동
http
  .createServer((req, res) => {
    /* public/page17_semantic.html을 fs로 읽어서(readFile())
       읽은 내용을 res로 write() */
    const fileName = path.join('public', 'page17_semantic.html');
    console.log(fileName);
    console.log(path.resolve(fileName)); // 절대 경로

    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      // res.statusCode = 200;
      // res.setHeader('Content-Type', 'text.html; charset=utf-8');
      res.writeHead(200, { 'Content-Type': 'text.html; charset=utf-8' });
      res.write(data); // 응답 본문에 데이터 쓰기
      res.end(); // 응답을 종료하고 모든 데이터를 브라우저에 전송한 후 응답 마무리
      // end() 호출된 후에는 write() 할 수 없다.
    });
  })
  .listen(3333, () => {
    console.log('http://localhost:3333');
  });
