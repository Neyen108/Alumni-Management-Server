const express = require("express");
const getDb = require("./Firebase/firebaseConfig").getDb;
const app = express();

const cors = require("cors");

const adminApiRoutes = require("./api-routes/adminApiRoutes");
const generalApiRoutes = require("./api-routes/generalApiRoutes");
const alumniApiRoutes = require("./api-routes/alumniApiRoutes");
const studentApiRoutes = require("./api-routes/studentApiRoutes");

app.use(cors());
app.use(adminApiRoutes);
app.use(generalApiRoutes);
app.use(alumniApiRoutes);
app.use(studentApiRoutes);

// console.log(getDb());

//start the app at port 5000

app.listen(5000);
