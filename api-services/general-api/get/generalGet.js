const getDb = require("../../../Firebase/firebaseConfig").getDb;

exports.getBatches = async (req, res, next) => {
  const db = getDb();

  const alumniDbRef = await db.collection("alumni-db");

  const batches = await alumniDbRef.get();

  if (!batches.empty) {
    const batchesData = [];

    batches.forEach((doc) => {
      batchesData.push(doc.data());
    });

    return res.json({
      batchesData: batchesData,
    });
  } else {
    return res.status(404).send("Not Found");
  }
};
