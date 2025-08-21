// postController.js
// MVC패턴 (Model/View/Controller)
//DB 관련한 CRUD   로직 처리
const pool = require('../config/dbPool');
//실습:==> 실습 게시판에 올려주세요
exports.createPost = (req, res) => {
    console.log('createPost 들어옴');
    res.json({ result: 'success', message: 'test중...' });
};
