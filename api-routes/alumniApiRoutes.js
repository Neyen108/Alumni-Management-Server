const express = require("express");

//importing the Alumni-api POST services
const alumniPost = require("../api-services/alumni-api/post/alumniPost");

//create router
const router = express.Router();

// create application/json parser
const jsonParser = express.json();

/*
==========================================================|| ROUTES ||=======================================================================
*/

//login POST request for alumni
router.post("/api/alumni/login", jsonParser, alumniPost.postLogin);

router.post("/api/alumni/editEntry", jsonParser, alumniPost.postEditEntry);

router.post(
  "/api/alumni/getAlumniInfo",
  jsonParser,
  alumniPost.postGetAlumniInfo
);

module.exports = router;
