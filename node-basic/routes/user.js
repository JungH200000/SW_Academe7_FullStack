// node-basic/routes/user.js
const express = require('express');
const router = express.Router();

// /users
router.get('/', (req, res) => {
  res.send(`<h1>User Home</h1>`);
});

// /users/10
router.get('/:id', (req, res) => {
  res.send(`<h1>User Profile</h1>
            <h2>회원번호: ${req.params.id}</h2>`);
});

module.exports = router;
