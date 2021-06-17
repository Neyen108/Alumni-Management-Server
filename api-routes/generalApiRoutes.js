const express = require("express");

//importing the General-api GET services
const generalGet = require("../api-services/general-api/get/generalGet");

//create router
const router = express.Router();

// create application/json parser
const jsonParser = express.json();

/*
==========================================================|| ROUTES ||=======================================================================
*/

//get batches GET request
router.get("/api/general/getBatches", jsonParser, generalGet.getBatches);

//get Batch data GET request

module.exports = router;
