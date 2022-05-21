const router = require("express").Router();
const pgConnection = require("../database/dbConnect");
const util = require("util");

const query = util.promisify(pgConnection.query).bind(pgConnection);

router.post("/tags", async (req, res) => {

  const result = await query("SELECT postId FROM tags WHERE tagname LIKE $1", [
    `%${req.body.tags}%`,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  let newres = result.rows.map((e) => e.postid);
  newres = [...new Set(newres)];
  
  const newResult = [];
  await Promise.all(
    newres.map(async (rowData) => {
      const res1 = await query(
        "SELECT * FROM arts WHERE id =$1 AND isPublished=TRUE",
        [rowData]
      ).catch((err) => {
        const { sqlMessage, ...other } = err;
        res.json({ success: false, message: sqlMessage });
      });
      if (res1.rows.length) {
        const res2 = await query("SELECT * FROM artImages WHERE postId = $1", [
          rowData,
        ]).catch((err) => {
          const { sqlMessage, ...other } = Err;
          res.json({ success: false, message: sqlMessage });
        });
        const res3 = await query("SELECT COUNT(*) FROM likes WHERE postId = $1", [
          rowData,
        ]).catch((Err) => {
          const { sqlMessage, ...other } = Err;
          return res.json({ success: false, message: sqlMessage });
        });
        newResult.push({ art: res1.rows[0],likes: parseInt(res3.rows[0].count), image: res2.rows[0] });
      }
    })
  );

  res.json({ success: true, data: newResult });
});

router.post("/artist",async(req,res) => {

  const res1 = await query("SELECT * FROM users WHERE username LIKE $1", [
    `%${req.body.text}%`,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  res.json({success:true, data:res1});
})

module.exports = router;
