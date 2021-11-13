const router = require("express").Router();
const mysqlConnection = require("../database/dbConnect");
const util = require("util");

router.post("/tags", async (req, res) => {
  const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

  const result = await query("SELECT postId FROM tags WHERE tagName LIKE ?", [
    `%${req.body.tags}%`,
  ]).catch((err) => {
    const { sqlMessage, ...other } = Err;
    res.json({ success: false, message: sqlMessage });
  });

  let newres = result.map((e) => e.postId);
  newres = [...new Set(newres)];

  const newResult = [];
  await Promise.all(
    newres.map(async (rowData) => {
      const res1 = await query("SELECT * FROM arts WHERE id =?", [
        rowData,
      ]).catch((err) => {
        const { sqlMessage, ...other } = Err;
        res.json({ success: false, message: sqlMessage });
      });
      const res2 = await query("SELECT * FROM artImages WHERE postId = ?", [
        rowData,
      ]).catch((err) => {
        const { sqlMessage, ...other } = Err;
        res.json({ success: false, message: sqlMessage });
      });
      newResult.push({ art: res1[0], image: res2[0] });
    })
  );

  res.json({ success: true, data: newResult });
});

module.exports = router;