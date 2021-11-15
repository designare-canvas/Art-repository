const router = require("express").Router();
const mysqlConnection = require("../database/dbConnect");
const util = require("util");

const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

router.get("/allusers", async (req, res) => {
  const result = await query("SELECT * FROM users").catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  const newRes = [];
  // console.log(result);
  await Promise.all(
    result.map(async (rowData) => {
      const res2 = await query("SELECT * FROM arts where username = ?", [
        rowData.username,
      ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
      });
      newRes.push({ user: rowData, posts: res2 });
    })
  );
  res.json({ success: true, data: newRes });
});

router.get("/requests",async(req,res) => {
  const result = await query("SELECT * FROM requests").catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  res.json({success:true, data: result});
})

router.post("/changeReq",async(req,res) => {

  if(req.body.type==="accept"){
    const result = await query("UPDATE users SET isArtist=? WHERE username =?",[
      1,
      req.body.user.username
    ]).catch((Err) => {
      const { sqlMessage, ...other } = Err;
      return res.json({ success: false, message: sqlMessage });
    });
  }
  const result2=await query("DELETE FROM requests WHERE username = ?",[
    req.body.user.username
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  res.json({success:true, message:"Operation performed successfully!"});
})

router.post("/createReq",async (req,res) => {

  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  const result = await query("INSERT INTO `requests` (`timestamp`,`username`,`admin_id`,`current_status`,`permission_asked`) VALUES (?,?,?,?,?)",[
    now,
    req.body.user.username,
    req.body.user.admin_id?req.body.user.admin_id:"admin123",
    "User",
    "Artist"
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  res.json({success:true, message:"Request created successfully!"});
})

module.exports = router;
