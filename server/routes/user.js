const router = require("express").Router();
const mysqlConnection = require("../database/dbConnect");

router.get("/:username", async (req, res) => {
  try {
    mysqlConnection.query(
      "SELECT * FROM users WHERE username = ?",
      req.params.username,
      (err, result) => {
        if (err) throw err;
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});
