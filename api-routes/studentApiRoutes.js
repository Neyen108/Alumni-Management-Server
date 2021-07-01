const express = require("express");

//importing the student-api POST services
const studentPost = require("../api-services/student-api/post/studentPost");

//create router
const router = express.Router();

// create application/json parser
const jsonParser = express.json();

//login POST request for student
router.post("/api/student/login", jsonParser, studentPost.postLogin);

module.exports = router;
