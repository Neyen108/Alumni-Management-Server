const crypto = require("crypto");
const getDb = require("../../../Firebase/firebaseConfig").getDb;
const getFieldValue = require("../../../Firebase/firebaseConfig").getFieldValue;

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
    console.log("[*] Error in postLogin");

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
};

exports.postAddEntry = async (req, res, next) => {
  const db = getDb();
  const values = req.body.values;

  try {
    //create alumni Entry
    const alumniDocRef = await db
      .collection("alumni-db")
      .doc(values.batch)
      .collection("alumni-data")
      .doc(values.id);

    await alumniDocRef.set(values);

    //set password
    const password = crypto.randomBytes(3).toString("hex");
    const batchDocRef = await db.collection("alumni-db").doc(values.batch);

    await batchDocRef.set(
      {
        passwords: {
          [values.id]: password,
        },
      },
      { merge: true }
    );

    //create user
    const userDocRef = await db
      .collection("users")
      .doc("alumni-user")
      .collection("alumni-user-credentials")
      .doc(values.id);

    await userDocRef.set({
      alumniDataRef: alumniDocRef,
      id: values.id,
      password: password,
    });

    return res.status(200).send("Success");
  } catch {
    console.log("[*] Error in postAddEntry");
    return res.status(404).send("Error");
  }
};

exports.postDeleteEntry = async (req, res, next) => {
  const db = getDb();
  const values = req.body.values;

  try {
    //delete alumni entry
    const alumniDocRef = await db
      .collection("alumni-db")
      .doc(values.batch)
      .collection("alumni-data")
      .doc(values.id);

    await alumniDocRef.delete();

    //delete password
    const batchDocRef = await db.collection("alumni-db").doc(values.batch);
    const FieldValue = getFieldValue();

    await batchDocRef.set(
      {
        passwords: {
          [values.id]: FieldValue.delete(),
        },
      },
      { merge: true }
    );

    //delete user
    const userDocRef = await db
      .collection("users")
      .doc("alumni-user")
      .collection("alumni-user-credentials")
      .doc(values.id);

    await userDocRef.delete();

    return res.status(200).send("Success");
  } catch {
    console.log("[*] Error in postDeleteEntry");
    return res.status(404).send("Error");
  }
};

exports.postAddBatch = async (req, res, next) => {
  const batch = req.body.batch;
  const alumniDataArr = req.body.alumniData;
  console.log(typeof alumniDataArr);

  const db = getDb();

  try {
    const batchDocRef1 = db.collection("alumni-db").doc(batch);

    const batchDoc = await batchDocRef1.get();

    if (batchDoc.exists) {
      return res.send("The Batch Already Exists!");
    } else {
      await batchDocRef1.set({ batchName: batch });

      alumniDataArr.forEach(async (alumniData) => {
        const alumniDocRef = await db
          .collection("alumni-db")
          .doc(batch)
          .collection("alumni-data")
          .doc(alumniData.id);

        await alumniDocRef.set(alumniData);

        //set password
        const password = crypto.randomBytes(3).toString("hex");
        const batchDocRef = await db.collection("alumni-db").doc(batch);

        await batchDocRef.set(
          {
            passwords: {
              [alumniData.id]: password,
            },
          },
          { merge: true }
        );

        //create user
        const userDocRef = await db
          .collection("users")
          .doc("alumni-user")
          .collection("alumni-user-credentials")
          .doc(alumniData.id);

        await userDocRef.set({
          alumniDataRef: alumniDocRef,
          id: alumniData.id,
          password: password,
        });
      });

      return res.status(200).send("Success");
    }
  } catch {
    console.log("[*] Error in postAddBatch");
    return res.status(404).send("Error");
  }
};
