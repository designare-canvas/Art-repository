const router = require("express").Router();
const mysqlConnection = require("../database/dbConnect");
const util = require("util");

router.post("/upload", (req, res) => {
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

  mysqlConnection.query(
    "INSERT INTO `arts` (`timestamp`,`title`,`description`,`username`) VALUES (?,?,?,?)",
    [
      now,
      req.body.Title,
      req.body.Description,
      req.body.user.username,
    ],
    async (err, result) => {
      if (err) {
        const { sqlMessage, ...other } = err;
        res.json({ success: false, message: sqlMessage });
      } else {
        const rows1 = await query(
          "INSERT INTO `artImages` (`timestamp`,`imageUrl`,`postId`) VALUES (?,?,?)",
          [now, req.body.Image, result.insertId]
        ).catch((Err) => {
          const { sqlMessage, ...other } = Err;
          res.json({ success: false, message: sqlMessage });
        });
        const Res2 = req.body.Tags.map(async (tag) => {
          const rows2 = await query(
            "INSERT INTO `tags`(`postId`,`tagName`) VALUES (?,?)",
            [result.insertId, tag]
          ).catch((Err) => {
            const { sqlMessage, ...other } = Err;
            res.json({ success: false, message: sqlMessage });
          });
        });
        if(rows1 && Res2)
        {
            res.json({success:true, message: "Post created successfully!"});
        }
      }
    }
  );
});

module.exports = router;
