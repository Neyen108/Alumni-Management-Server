const express = require('express');
const app = express();

const adminApiRoutes = require('./api-routes/adminApiRoutes');


app.use(adminApiRoutes);









