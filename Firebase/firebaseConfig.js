const admin = require("firebase-admin");

//dotenv module is required to parse the environment variables into json format
require("dotenv").config();

//parsing the environment variable into JSON format
var serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const _db = admin.firestore();

const getDb = () => {
    if(_db){
        return _db;
    }else{
        console.log(err);
    } 
}

exports.getDb = getDb;