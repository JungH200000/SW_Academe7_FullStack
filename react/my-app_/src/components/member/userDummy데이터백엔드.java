const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 더미 회원 데이터
let users = [
    { id: 1, name: '홍길동', email: 'hong@test.com', passwd: '1234', role: 'USER', createAt: '2025-08-14' },
    { id: 2, name: '이몽룡', email: 'lee@test.com', passwd: 'abcd', role: 'ADMIN', createAt: '2025-08-14' }
];

let userIdCounter = users.length;

// 회원 등록
app.post('/users', (req, res) => {
    const { name, email, passwd, role } = req.body;
    if (!name || !email || !passwd || !role) {
        return res.status(400).send('모든 필드를 입력해야 합니다');
    }
    // 이메일 중복 체크
    if (users.find(u => u.email === email)) {
        return res.status(400).send('이미 존재하는 이메일입니다');
    }

    const newUser = {
        id: ++userIdCounter,
        name,
        email,
        passwd,
        role,
        createAt: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    res.json({ result: 'ok', user: newUser });
});

// 회원 목록
app.get('/users', (req, res) => {
    res.send(users);
});

// 회원 상세보기
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return res.status(404).send('회원이 없습니다');
    res.send(user);
});

// 회원 수정
app.post('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, passwd, role } = req.body;

    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) return res.status(404).send('회원이 없습니다');

    // 이메일 중복 체크 (자기 자신 제외)
    if (users.some(u => u.email === email && u.id !== parseInt(id))) {
        return res.status(400).send('이미 존재하는 이메일입니다');
    }

    users[userIndex] = {
        ...users[userIndex],
        name,
        email,
        passwd,
        role
    };
    res.json({ result: 'ok', user: users[userIndex] });
});

// 회원 삭제
app.get('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return res.status(404).send('회원이 없습니다');

    users.splice(index, 1);
    res.json({ result: 'ok' });
});

app.listen(PORT, () => {
    console.log(`server on : http://localhost:${PORT}`);
});
