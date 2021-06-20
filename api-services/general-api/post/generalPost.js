const getDb = require("../../../Firebase/firebaseConfig").getDb;

exports.postBatchInfo = async (req, res, next) => {
  const db = getDb();

  const batchName = req.body.batchName;

  const batchRef = await db
    .collection("alumni-db")
    .doc(`${batchName}`)
    .collection("alumni-data");

  const batchDetails = await batchRef.get();

  if (!batchDetails.empty) {
    const batchData = [];

    batchDetails.forEach((doc) => {
      batchData.push(doc.data());
    });

    if (batchData.length !== 0) {
      return res.json({
        batchData: batchData,
      });
    }
  } else {
    console.log("[*] postBatchInfo Error");

    return res.status(404).send("Not Found");
  }
};

exports.postAlumniData = async (req, res, next) => {
  const db = getDb();
  const batch = req.body.batch;
  const id = req.body.id;

  try {
    const alumniDocRef = await db
      .collection("alumni-db")
      .doc(`${batch}`)
      .collection("alumni-data")
      .doc(`${id}`);

    const alumniDataDoc = await alumniDocRef.get();

    const alumniData = await alumniDataDoc.data();

    return res.json({
      alumniData: alumniData,
    });
  } catch {
    console.log("[*] postAlumniData Error");

    return res.status(404).send("Not Found");
  }
};
