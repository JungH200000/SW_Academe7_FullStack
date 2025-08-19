// node-basic/ex20-middleware.js
//미들웨어는 요청과 응답 사이에 추가적인 기능을 하는 중간작업을 하고자 할 때 미들웨어를 사용한다
//가령 인증 수행, 세션처리, 예외처리,라우터 등
//미들웨어는 app.use()메서드를 이용한다.
//아래 예제는 요청이 들어올 때마다 로그 기록을 남기는 미들웨어 예제
/**형태
 * app.use(미들웨어) : 모든 요청에서 미들웨어 실행
 * app.use('/path',미들웨어) : 특정경로로 시작하는 요청에서 미들웨어 실행
 * app.post('/path',미들웨어) : 특정 경로의 post방식 요청에서 미들웨어 실행
 *
 **동작 순서
 * 전역 미들웨어 -> 라우터 -> 라우터 수준 미들웨어 -> 응답 -> 에러 처리 미들웨어
 */
const express = require('express');
const app = express();

// 1. 전역 미들웨어 (3개)
app.use((req, res, next) => {
  console.log('1. 미들웨어 요청 처리.');
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.write(`<h1 style='color:green'>Hello Express Middleware</h1>`);
  next(); // 다음 미들웨어로 이동시킴
});
app.use((req, res, next) => {
  console.log('2. 미들웨어 요청 처리..');
  req.user = 'Chung';
  // req.user = 'killer';
  next();
});
app.use((req, res, next) => {
  console.log('3. 미들웨어 요청 처리...');
  if (req.user === 'killer') throw new Error('Killer는 접근 불가');
  res.write(`<h2 style='color:purple'>${req.user} 님 환영합니다.</h2>`);
  next();
});

// 라우터
app.get('/', (req, res) => {
  res.write('<h1>get 방식 /로 요청 들어옴</h1>');
  res.end();
});
// 인증 미들웨어
function auth(req, res, next) {
  console.log('4. auth 미들웨어 들어옴');
  // header 설정 시 'Authorization: Bearer Access토큰값'
  if (!req.headers || !req.headers.authorization) {
    //if (!req.user || req.user === 'killer') { // 테스트
    return res.status(403).end(`<h1 style='color:red'>인증되지 않은 사용자입니다. 이용이 불가능 합니다.</h1>`);
  }
  next();
} //--------------------

// 2. 라우터 기반 미들웨어 설정
app.get('/protected', auth, (req, res) => {
  res.write('<h1>인증된 사용자만 볼 수 있어요-비밀정보</h1>');
  res.write(`<a href='http://localhost:5577/'>복귀</a>`);
  res.end();
});

// 3. Error 처리 미들웨어
// => 다른 미들웨어 뒤에 배치 (가장 마지막에 배치해야 발생된 Error를 잡을 수 있다.)
app.use((err, req, res, next) => {
  console.error(err.stack); // 어느 지점에서 발생했는지 stack 기록 출력
  res.status(500).write('<h2>Sorry, Server Error.</h2>' + err.message); // 500번대는 서버 Error
});

app.listen(5577, () => {
  console.log('http://localhost:5577');
});
