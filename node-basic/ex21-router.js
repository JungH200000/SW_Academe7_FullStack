// node-basic/ex21-router.js
// '/' ==> index.html
// '/users' ==> 회원관련 페이지
// '/board' ==> 게시판 관련 페이지
// express.Router()를 사용하면 라우터를 파일 단위로 분리할 수 있다.
/** 구성
 * node-basic/ex21-router.js : 메인 서버 페이지
 * node-basic/routes/users.js
 * node-basic/routes/board.js
 */
const express = require('express');
// 라우터 모듈 가져오기
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');

const app = express();
app.set('port', 5588);

// static 미들웨어 설정
app.use(express.static(__dirname + '/public'));

// '/' 요청 시 index.html 보여주기
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}`);
});
