const getDb = require("../../../Firebase/firebaseConfig").getDb;

exports.postLogin = async (req, res, next) => {
  const id = req.body.username;
  const password = req.body.password;

  console.log(id, password);
  //getting the database
  const db = getDb();

  //reference to the  collection
  const alumniUserCredentialsRef = await db
    .collection("users")
    .doc("alumni-user")
    .collection("alumni-user-credentials");

  //getting the document where id == username and password == password
  const alumniUser = await alumniUserCredentialsRef
    .where("id", "==", id)
    .where("password", "==", password)
    .limit(1)
    .get();

  //send response to client
  if (!alumniUser.empty) {
    const alumniUserData = await alumniUser.docs[0].data();

    return res.json({
      alumniUser: alumniUserData,
    });
  } else {
    console.log("[*] Error in postLogin");

    return res.status(404).send("Not Found");
  }
};

exports.postGetAlumniInfo = async (req, res, next) => {
  const alumniDataRef = req.body.alumniDataRef;
  const db = getDb();
  const segment = alumniDataRef._path.segments;

  try {
    const alumniDataDoc = await db
      .doc(`${segment[0]}/${segment[1]}/${segment[2]}/${segment[3]}`)
      .get();
    const alumniData = await alumniDataDoc.data();

    return res.json({
      alumniData: alumniData,
    });
  } catch {
    console.log("[*] Error in postgetAlumniInfo");

    return res.status(404).send("Not Found");
  }
};

exports.postEditEntry = async (req, res, next) => {};
