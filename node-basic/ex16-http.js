// node-basic/ex16-http.js
// 웹 서버를 구축 가능하게 하는 모듈
const http = require('http');
const server = http.createServer((req, res) => {
  // 요청: req 객체
  // 응답: res 객체
  console.log(req.method);
  console.log(req.url);

  res.statusCode = 200; // 성공적 응답: 200 OK
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write('<h1>Hello Node.js</h1>');
  res.write('<h2>HTTP Server</h2>');
  res.write('<h2> 배고파 밥~!</h2>');
  res.end(); // 응답 종료
});

// 서버 가동
server.listen(5555, () => {
  console.log('http://localhost:5555');
});
