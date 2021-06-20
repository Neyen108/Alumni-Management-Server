const getDb = require("../../../Firebase/firebaseConfig").getDb;

exports.postLogin = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  //getting the database
  const db = getDb();

  //reference to the admin-user-credentials collection
  const adminUserCredentialsRef = await db
    .collection("users")
    .doc("admin-user")
    .collection("admin-user-credentials");

  //getting the document where id == username and password == password
  const adminUser = await adminUserCredentialsRef
    .where("id", "==", username)
    .where("password", "==", password)
    .limit(1)
    .get();

  //send response to client
  if (!adminUser.empty) {
    const id = await adminUser.docs[0].data().id;

    return res.json({
      id: id,
    });
  } else {
    console.log("No matching Documents found");

    return res.status(404).send("Not Found");
  }
};

exports.postEdit = async (req, res, next) => {
  const db = getDb();

  const alumniData = req.body.alumniData;
  delete alumniData.key;
  try {
    const alumniDocRef = await db
      .collection("alumni-db")
      .doc(`${alumniData.batch}`)
      .collection("alumni-data")
      .doc(`${alumniData.id}`);

    const response = await alumniDocRef.set(alumniData);

    return res.status(200).send("Success");
  } catch {
    console.log("[*] Error in postEdit");

    return res.status(404).send("Not Found");
  }

  console.log(alumniData);
};
