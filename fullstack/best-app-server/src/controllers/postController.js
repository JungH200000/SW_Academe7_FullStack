// postController.js
// MVC패턴 (Model/View/Controller)
//DB 관련한 CRUD   로직 처리
// best-app-server/src/controllers/postController.js

const pool = require('../config/dbPool');

/** 게시글 생성 */
exports.createPost = async (req, res) => {
  // 1. React에서 보낸 데이터를 req.body에서 추출
  const { name, title, content } = req.body;

  // 2. 필수 데이터 유효성 검사
  if (!name || !title || !content) {
    return res.status(400).json({
      result: 'fail',
      message: '이름, 제목, 내용은 필수 입력 항목입니다.',
    });
  }

  // 3. DB에 데이터 저장을 위한 SQL 쿼리
  // 실제 테이블과 컬럼명은 'posts' 테이블에 맞게 조정해야 합니다.
  const sql = 'INSERT INTO posts (name, title, content) VALUES (?, ?, ?)';

  try {
    // 4. SQL 실행 및 결과 반환
    const [result] = await pool.query(sql, [name, title, content]);

    if (result.affectedRows > 0) {
      // 5-1. 성공 시 응답
      res.status(201).json({
        // 201: Created (생성 성공)
        result: 'success',
        message: '게시글이 성공적으로 등록되었습니다.',
        postId: result.insertId, // 새로 생성된 게시글의 ID
      });
    } else {
      // 5-2. 실패 시 응답
      res.status(400).json({
        result: 'fail',
        message: '게시글 등록에 실패했습니다. 다시 시도해 주세요.',
      });
    }
  } catch (error) {
    // 5-3. DB 에러 발생 시 응답
    console.error('게시글 생성 중 DB 에러 발생:', error);
    res.status(500).json({
      result: 'fail',
      message: '서버에 문제가 발생했습니다.',
      error: error.message,
    });
  }
};
