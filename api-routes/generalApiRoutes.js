const express = require("express");

//importing the General-api GET services
const generalGet = require("../api-services/general-api/get/generalGet");

//importing the General-api POST services
const generalPost = require("../api-services/general-api/post/generalPost");

//create router
const router = express.Router();

// create application/json parser
const jsonParser = express.json();

/*
==========================================================|| ROUTES ||=======================================================================
*/

//get batches GET request
router.get("/api/general/getBatches", jsonParser, generalGet.getBatches);

//get Batch data POST request
router.post("/api/general/getbatchinfo", jsonParser, generalPost.postBatchInfo);

//get Alumni Data POST request
router.post(
  "/api/general/getAlumniInfo",
  jsonParser,
  generalPost.postAlumniData
);

module.exports = router;
