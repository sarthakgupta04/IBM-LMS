// routes/index.js
const express = require("express");
const router = express.Router();
const passport = require("passport");

console.log('router loaded');

router.use('/user', require('./user'));
router.use('/loan', require('./loan')); 

module.exports = router;
