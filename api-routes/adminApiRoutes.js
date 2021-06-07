const express = require('express');

//importing the Admin-api GET services
const adminGet = require('../api-services/admin-api/get/adminGet');

//create router 
const router = express.Router();

// create application/json parser
const jsonParser = express.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = express.urlencoded({ extended: false });

//login GET request
router.get('/api/admin/login', jsonParser, adminGet.getLogin);

module.exports = router;

