const router = require("express").Router();
const mysqlConnection = require("../database/dbConnect");
const util = require("util");

const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

router.get("/:username", async (req, res) => {
  const result = await query("SELECT * FROM users WHERE username = ?", [
    req.params.username,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  res.json({ success: true, data: result[0] });
});

router.get("/all", async (req, res) => {
  const result = await query("SELECT * FROM user").catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  res.json({ success: true, data: result });
});

router.put("/:username",async (req,res) => {
  if(req.body.user.username === req.params.username || req.body.isAdmin){
    const res1 = await query(
      "UPDATE users SET profileImgUrl = ?,coverImgUrl = ?,Fname = ?, Lname = ?, DOB = ?, country = ? WHERE username = ?",
      [
        req.body.profileImgUrl,
        req.body.coverImgUrl,
        req.body.Fname,
        req.body.Lname,
        req.body.DOB,
        req.body.country,
        req.params.username,
      ]
    ).catch((Err) => {
      const { sqlMessage, ...other } = Err;
      return res.json({ success: false, message: sqlMessage });
    });
  }else{
    return res.json({success: false, message: "You can only Update your Account!"});
  }

  res.json({success:true, message:"Account updated successfuly!"});
})

router.delete("/:username", async (req,res) => {
  console.log(req.body);

  if(req.body.user.username === req.params.username || req.body.isAdmin){
    const res1 = await query(
      "DELETE FROM users WHERE username = ?",
      [
        req.params.username,
      ]
    ).catch((Err) => {
      const { sqlMessage, ...other } = Err;
      return res.json({ success: false, message: sqlMessage });
    });
  }else{
    return res.json({success: false, message: "You can only Delete your Account!"});
  }
  res.json({success:true,message:"Account deleted successfully"});
})

module.exports = router;
