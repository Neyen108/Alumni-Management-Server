const express = require("express");

//importing the Admin-api POST services
const adminPost = require("../api-services/admin-api/post/adminPost");

//create router
const router = express.Router();

// create application/json parser
const jsonParser = express.json();

/*
==========================================================|| ROUTES ||=======================================================================
*/

//login POST request
router.post("/api/admin/login", jsonParser, adminPost.postLogin);

//edit entry POST request
router.post("/api/admin/edit", jsonParser, adminPost.postEdit);

module.exports = router;
