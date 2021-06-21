const admin = require("firebase-admin");

//dotenv module is required to parse the environment variables into json format
require("dotenv").config();

//parsing the environment variable into JSON format
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);

//snippet required for initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//function that returns the db (for export purposes)

const getDb = () => {
  //the firestore database
  const _db = admin.firestore();
  if (_db) {
    return _db;
  } else {
    console.log(err);
  }
};

const getFieldValue = () => {
  const FieldValue = admin.firestore.FieldValue;
  if (FieldValue) {
    return FieldValue;
  } else {
    console.log(err);
  }
};

exports.getDb = getDb;
exports.getFieldValue = getFieldValue;
