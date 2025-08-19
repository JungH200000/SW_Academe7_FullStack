// terminal에서 npm install express
const express = require('express');
// terminal에서 npm install cors
const cors = require('cors');
const mysql = require('mysql2/promise'); // async와 await 구문 사용 가능

const PORT = 7777;

const app = express();

// javascript에서 웹과 서버의 port 번호가 동일하지 않으면 cors 오류 등이 생김
// cors를 사용하면 cors 오류는 사라짐
app.use(cors()); //cors 미들웨어 설정
app.use(express.json()); //json유형의 데이터를 받도록 미들웨어 설정

const conn = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'master',
  password: 'tiger',
  database: 'kbdb',
});
console.log('conn: ', conn);

// DB 사용 전이라 배열로 만들어 놓음
let users = [{ id: 1, name: '마스터김', email: 'admin@a.b.c', role: 'ADMIN', createdAt: '2025-08-14' }];
let idCnt = users.length;

//post '/api/signup'
app.post('/api/signup', async (req, res) => {
  //회원정보는 post방식일 때 request의 body에 포함되어 온다
  const { name, passwd, email, role } = req.body;
  console.log(name, passwd, email, role);
  //유효성 체크
  if (!name || !passwd || !email || !role) {
    return res.status(400).json({ result: 'fail', message: '모든 값을 입력해야 해요' });
  }
  // SQL문 준비
  const sql = `insert into members (name, email, passwd, role) values(?, ?, ?, ?)`;
  // 파라미터에 전달할 준비
  const userData = [name, email, passwd, role];
  try {
    const [result] = await conn.query(sql, userData);
    console.log('result: ', result);
    // affectedRows는 추가된 row 개수
    // insertId는 추가된 row의 id 번호
    if (result.affectedRows > 0) {
      res.json({ result: 'success', message: `등록 성공 회원번호는 ${result.insertId}번 입니다.` });
    } else {
      res.json({ result: 'fail', message: `등록 실패 이메일 중복여부 확인하세요.` });
    }
  } catch (err) {
    console.error('error: ', err);
    res.status(500).json({ result: 'fail', message: 'DB Error: ' + err.message }); // sql 오류인 경우 서버 오류
  }

  res.json({ result: 'success', message: `회원가입 처리되었어요. 회원번호는 ${newUser.id}번입니다` });
});

//전체회원 목록
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`서버 시작됨 http://localhost:7777`);
});
