// ex19_express.js
//public/page17_semantic.html 파일을 브라우저에 출력
//fs모듈 대신 res.sendFile('파일명')
const express = require('express');
const app = express();
app.set('port', 5566);

//public폴더 내에 정적인 파일들(css/images/js...)을 둔다
//public폴더를 정적인 파일들의 위치로 설정
//미들웨어
// app.use('/', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

//GET '/' ===> public/index.html을 보여주기
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/page', (req, res) => {
    const fileName = __dirname + '/public/page17_semantic.html';
    console.log(fileName);
    res.sendFile(fileName);
});

app.listen(app.get('port'), () => {
    console.log('http://localhost:' + app.get('port'));
});
