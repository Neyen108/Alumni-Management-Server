const admin = require("firebase-admin");

//dotenv module is required to parse the environment variables into json format
require("dotenv").config();

//parsing the environment variable into JSON format
var serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);


//snippet required for initialization

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//the firestore database

const _db = admin.firestore();


//function that returns the db (for export purposes)

const getDb = () => {
    if(_db){
        return _db;
    }else{
        console.log(err);
    } 
}

exports.getDb = getDb;