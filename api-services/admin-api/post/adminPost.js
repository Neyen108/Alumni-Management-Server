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
