const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const auth = require("./auth");
const authMiddleware = require("./auth/middleware");
const misc = require("./misc");
const users = require("./users");
const conversations = require("./conversations");


router.post("/ping", misc.ping);

router.get("/welcome", misc.welcome);

router.post("/register",
    body("email").isEmail().withMessage("Not a valid Email Address"),
    body("username").exists().withMessage("Please supply a username"),
    body("password")
        .isLength({min: 6})
        .withMessage("Password is not long enough"),
    auth.registerUser);

router.post("/login",
    body("email").isEmail().withMessage("Not a valid Email Address"),
    body("password").exists().withMessage("Please supply a password"),
    auth.loginUser);

router.use("/users", authMiddleware, users);
router.use("/conversations", authMiddleware, conversations);

module.exports = router;
