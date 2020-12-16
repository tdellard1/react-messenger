const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const auth = require("./auth");
const misc = require("./misc");


router.post("/ping", misc.ping);

router.get("/welcome", misc.welcome);

router.post("/register",
    body("password").isLength({min: 6}),
    body("username").exists(),
    body("username").isLength({min: 1}),
    body("email").isEmail(),
    auth.registerUser);

router.post("/login",
    body("password").isLength({min: 6}),
    body("username").exists(),
    auth.loginUser);

module.exports = router;
