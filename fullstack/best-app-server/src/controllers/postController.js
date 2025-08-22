// postController.js
// MVC패턴 (Model/View/Controller)
//DB 관련한 CRUD   로직 처리
const pool = require('../config/dbPool');
const fs = require('fs');
const path = require('path');

exports.createPost = async (req, res) => {
    console.log('createPost 들어옴');
    const { name, title, content } = req.body;
    //첨부파일은 req.file로 추출한다
    const file = req.file;
    console.log('file: ', file);
    let fileName = null;
    if (file) {
        fileName = file.filename; //실제 업로드된 파일명 => DB 저장
    }

    if (!name || !title) {
        return res.status(400).json({ result: 'fail', message: '작성자와 제목은 필수로 입력해야 해요' });
    }
    try {
        const sql = `insert into posts(name,title,content,attach)
                    values(?,?,?,?)`;

        const [result] = await pool.query(sql, [name, title, content, fileName]);
        if (result.affectedRows > 0) {
            return res.status(201).json({ result: 'success', message: `글 등록 성공 글번호: ${result.insertId}` });
        }
        res.json({ result: 'fail', message: '글 등록 실패' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 'error', message: error.message });
    }
};

//listPost
exports.listPost = async (req, res) => {
    try {
        //1. 전체 게시글 수 가져오기
        const sql = `select count(id) count from posts`;
        const [[{ count }]] = await pool.query(sql);
        // console.log('result: ', result[0][0].count); //result=[ [ { count: 9 } ], [ `count` BIGINT(21) NOT NULL ] ]
        console.log('count: ', count);

        //2. 전체 게시목록 가져오기
        const sql2 = `select id,name,title,content,
        attach as file, date_format(wdate,'%Y-%m-%d') as wdate
        from posts order by id desc`;
        const [posts] = await pool.query(sql2);
        console.log('posts: ', posts);

        //응답 { data:[{},{}], totalCount:10}
        res.json({ data: posts, totalCount: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 'error', message: error.message });
    }
};
//deletePost 구성해서 delete문 실행시키기
exports.deletePost = async (req, res) => {
    ///api/posts/3
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ result: 'fail', message: '잘못된 요청입니다' });
    }
    try {
        //1. 해당 게시글의 첨부파일명을 가져와서
        const sql = `select attach as file from posts where id=?`;
        const [result] = await pool.query(sql, [id]);
        if (result.length === 0) {
            return res.status(404).json({ result: 'fail', message: '해당 글은 존재하지 않습니다' });
        }
        const data = result[0];
        let filePath = null;
        if (data.file) {
            filePath = path.join(__dirname, '..', '..', 'public', 'uploads', data.file);
        }
        console.log('filePath: ', filePath);

        //2. DB에서 해당 글 삭제 처리
        const sql2 = `delete from posts where id=?`;
        const [result2] = await pool.query(sql2, [id]);
        if (result2.affectedRows === 0) {
            return res.status(404).json({ result: 'fail', message: '해당 글은 존재하지 않습니다' });
        }
        //3. 첨부파일이 있다면 서버 uploads폴더에서 해당 파일 삭제 처리
        if (fs.existsSync(filePath)) {
            console.log('***********');
            fs.unlinkSync(filePath); //파일을 동기방식으로 삭제하는 함수. 비동기: fs.unlik()
        }
        res.json({ result: 'success', message: `${id}번 글을 삭제했습니다` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 'error', message: error.message });
    }
};
