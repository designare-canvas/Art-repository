const router = require("express").Router();
const mysqlConnection = require("../database/dbConnect");
const util = require("util");

const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

router.post("/tags", async (req, res) => {

  const result = await query("SELECT postId FROM tags WHERE tagName LIKE ?", [
    `%${req.body.tags}%`,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  let newres = result.map((e) => e.postId);
  newres = [...new Set(newres)];

  const newResult = [];
  await Promise.all(
    newres.map(async (rowData) => {
      const res1 = await query(
        "SELECT * FROM arts WHERE id =? AND isPublished=1",
        [rowData]
      ).catch((err) => {
        const { sqlMessage, ...other } = Err;
        res.json({ success: false, message: sqlMessage });
      });
      if (res1.length) {
        const res2 = await query("SELECT * FROM artImages WHERE postId = ?", [
          rowData,
        ]).catch((err) => {
          const { sqlMessage, ...other } = Err;
          res.json({ success: false, message: sqlMessage });
        });
        const res3 = await query("SELECT COUNT(*) FROM likes WHERE `postId` = ?", [
          rowData,
        ]).catch((Err) => {
          const { sqlMessage, ...other } = Err;
          return res.json({ success: false, message: sqlMessage });
        });
        newResult.push({ art: res1[0],likes: res3[0]["COUNT(*)"], image: res2[0] });
      }
    })
  );

  res.json({ success: true, data: newResult });
});

router.post("/artist",async(req,res) => {

  const res1 = await query("SELECT * FROM users WHERE username LIKE ?", [
    `%${req.body.text}%`,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  res.json({success:true, data:res1});
})

module.exports = router;
