// node-basic/ex23-mysql.js
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 5555;

let conn; // 전역 변수로 변경

app.use(express.json()); // json 데이터 파싱 미들웨어
app.use(express.urlencoded({ extended: true }));

// 즉시 실행 함수
(async () => {
  try {
    // db 접속
    // createConnection() ==> DB 단일 연결
    // createPool() ==> DB에 다중 연결(커넥션 풀)
    conn = await mysql.createConnection({
      host: 'localhost',
      port: '3306',
      user: 'master', // root
      password: 'tiger', // 1234
      database: 'kbdb',
    });
    // 연결 성공 시 바로 로그 출력
    console.log('MySQL DB 연결 성공');
  } catch (err) {
    // console.log('conn :', conn);
    conn.connect((err) => {
      if (err) {
        console.log('MySQL DB 연결 실패');
        console.log(err);
      }
    });
  }
})();

app.post('/api/users', async (req, res) => {
  const { name, email, passwd, role } = req.body;
  if (!name || !email || !passwd) {
    return res.status(400).send(`<h3>name, email, passwd를 입력해야 합니다.</h3>`);
  }
  try {
    const sql = `insert into members(name, email, passwd, role) values(?, ?, ?, ?)`;
    /**
     * conn.query(sql, [인파라미터값들])
     * ==> 반환값은 [rows (or OkPacket), fields]
     * select 문일 경우 => rows
     * insert/delete/update ==> OkPacket{affectedRows:1, insertId: 8, ...}
     */
    const [result] = await conn.query(sql, [name, email, passwd, role]); // response가 배열로
    console.log('result: ', result);
    if (result.affectedRows > 0) {
      res.send(`<h2>등록된 회원번호는 ${result.insertId} 입니다.</h2>`);
    } else {
      res.send(`<h2>회원가입 실패. 다시 시도하세요.</h2>`);
    }
  } catch (err) {
    res.status(500).send('<h2>Server Error: ' + err.message + '</h2>');
  }
});

// select문 - read (조회)
app.get('/api/users', async (req, res) => {
  //const sql = `select id, name, email, role, createdAt from members order by id desc`;
  const sql = `select id , name, email, role , date_format(createdAt, '%Y-%m-%d') 'createdAt'
                from members order by id desc;`;
  try {
    //const result = await conn.query(sql);
    //console.log('result: ', result); // [[ {data}, {data}, ... ], [field 정보]]
    const [rows] = await conn.query(sql); // rows: [ {data}. {data}, ... ]
    if (rows.length == 0) {
      return res.send(`<h2>등록된 회원이 없습니다.</h2>`);
    }
    let str = `
      <h2>모든 회원 목록</h2>
      <ul>`;
    // rows 반복문 돌면서 li 태그에 회원정보 출력하기
    for (let data of rows) {
      str += `<li>${data.id}, ${data.name}, ${data.email}, ${data.role}, ${data.createdAt},
        </li>`;
    }

    str += `<ul>`;
    //res.send(str);
    res.json(rows);
  } catch (err) {
    res.status(500).send(`<h2>Server Error: ` + err.message + `</h2>`);
  }
});

/**회원번호로 회원 정보 조회
 * post 방식일 때 사용자 입력 값을 받는 방법 : req.body
 * path변수값 : req.params
 * querystring : req.query
 *            ?name=a&email=b
 */
app.get('/api/users/:id', async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.send('<h2>잘못 들어온 경로입니다.</h2>');
  }
  try {
    const sql = `select id, name, email, role, 
          date_format(createdAt, '%Y-%m%d') createdAt 
          from members where id = ?`;
    // query()로 실행시켜서 해당 회원정보를 브라우저에 보내기
    const [result] = await conn.query(sql, [id]);
    if (result.length > 0) {
      const { id: no, name, email, role, createdAt } = result[0];
      let str = `<h2>${no}번 회원 정보</h2>
            <h3>이름: ${name}</h3>
            <h3>이메일: ${email}</h3>
            <h3>가입일: ${createdAt}</h3>
            <h3>ROLE: ${role}</h3>`;
      res.send(str);
    } else {
      res.status(404).send(`<h2>ID ${id}에 해당하는 회원을 찾을 수 없습니다.</h2>`);
    }
  } catch (err) {
    res.status(500).send(`<h2>Server Error: ${err.message}</h2>`);
  }
  // id(PK)로 가져올 경우 데이터는 1개
});

/**CRUD
 * C : Create - insert 문 ==> POST
 * R : Read - select 문 ==> GET
 * U : Update - update 문 ==> PUT / PATCH
 * D : Delete - delete 문
 */
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.send(`유효하지 않은 회원번호입니다.`);
  }
  try {
    // delete문 작성해서 실행시킨 뒤 그 결과를 확인 후 결과에 따른 메시지 처리
    const sql = `delete from members where id=?`;

    await conn.beginTransaction(); // 트랜잭션 시작 (수동 커밋일 경우)

    const [result] = await conn.query(sql, [id]);
    console.log(result);

    await conn.commit(); // 수동 commit -> 트랜잭션 완료
    console.log(id + '번 정보 삭제');

    if (result.affectedRows > 0) {
      // 삭제 성공(MySQL Workbench가 켜져 있으면 껏다 켜기)
      res.status(200).send(`회원정보 삭제 예정: 회원번호=${req.params.id}`);
    } else {
      await conn.rollback(); // 트랜잭션 취소
      res.status(404).send(`${id}번 회원을 찾을 수 없습니다.`);
    }
  } catch (err) {
    res.status(500).send('Server Error: ' + err.message);
  }
});

//회원정보 수정: put/patch
//모든 정보 수정시 put방식, 정보의 일부분 수정시에는 patch방식
app.put('/api/users/:id', async (req, res) => {
  // 회원번호 받기
  const { id } = req.params;

  // 수정할 회원정보
  const { name, email, passwd, role } = req.body;

  try {
    const sql = `update members set name=?, email=?, passwd=?, role=? where id=?`;
    const [result] = await conn.query(sql, [name, email, passwd, role, id]);
    console.log(result);

    if (result.affectedRows > 0) {
      res.status(200).send(`<h2>${id}번 회원님의 정보를 수정했습니다.</h2>`);
    } else {
      res.send(`<h2>존재하지 않는 회원입니다. 회원번호를 확인하세요.</h2>`);
    }
  } catch (error) {
    res.status(500).send(`<h3>Server Error: ${error.message}</h3>`);
  }
});

app.patch('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log('id : ', id);
  console.log('updataData: ', updateData);

  // 동적으로 sql문을 구성해야 함
  const columns = Object.keys(updateData); // 매개변수 객체의 key 값들만 추출
  const values = Object.values(updateData); // value 값들만 추출
  console.log('columns: ', columns);
  console.log('values: ', values);

  if (columns.length === 0) {
    return res.status(400).send(`<h3>수정할 값을 입력해야 합니다.</h3>`);
  }
  const setStr = columns.map((col) => `${col}=?`).join(',');
  const sql = `update members set ${setStr} where id=?`;
  console.log('sql: ', sql);
  try {
    const [result] = await conn.query(sql, [...values, id]);
    if (result.affectedRows > 0) {
      res.status(200).send(`<h2>${id}번 회원님의 정보를 수정했습니다.</h2>`);
    } else {
      res.status(404).send(`<h2>존재하지 않는 회원입니다. 회원번호를 확인하세요.</h2>`);
    }
  } catch (error) {
    res.status(500).send(`<h3>Server Error: ${error.message}</h3>`);
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
