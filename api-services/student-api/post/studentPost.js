const getDb = require("../../../Firebase/firebaseConfig").getDb;

exports.postLogin = async (req, res, next) => {
  const id = req.body.username;
  const password = req.body.password;

  console.log(id, password);
  //getting the database
  const db = getDb();

  //reference to the  collection
  const studentUserCredentialsRef = await db
    .collection("users")
    .doc("student-user")
    .collection("student-user-credentials");

  //getting the document where id == username and password == password
  const studentUser = await studentUserCredentialsRef
    .where("id", "==", id)
    .where("password", "==", password)
    .limit(1)
    .get();

  //send response to client
  if (!studentUser.empty) {
    const studentUserData = await studentUser.docs[0].data();

    return res.json({
      studentUser: studentUserData,
    });
  } else {
    console.log("[*] Error in postLogin");

    return res.status(404).send("Not Found");
  }
};
