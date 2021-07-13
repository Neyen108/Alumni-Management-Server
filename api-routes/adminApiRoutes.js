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

//add entry POST request
router.post("/api/admin/addEntry", jsonParser, adminPost.postAddEntry);

//delete entry POST request
router.post("/api/admin/deleteEntry", jsonParser, adminPost.postDeleteEntry);

//add batch
router.post("/api/admin/addBatch", jsonParser, adminPost.postAddBatch);

module.exports = router;
