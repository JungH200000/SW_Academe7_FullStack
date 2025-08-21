// userRouter.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const str = `
        <div>
            <h1>Users</h1>
        </div>
    `;
    res.send(str);
});
module.exports = router;
