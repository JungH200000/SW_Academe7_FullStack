// postRouter.js
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// /api/posts ==> postRouter
router.get('/', (req, res) => {
    const str = `
        <div>
            <h1>Posts</h1>
        </div>
    `;
    res.send(str);
});

//파일업로드 처리 필요 (multer미들웨어 설정해야 함)
router.post('/', postController.createPost);

module.exports = router;
