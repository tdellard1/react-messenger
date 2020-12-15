const express = require("express");
const router = express.Router();
const auth = require('./auth');
const misc = require('./misc');


router.post("/ping", misc.ping);

router.get("/welcome", misc.welcome);

router.post("/register", auth.registerUser);

module.exports = router;
