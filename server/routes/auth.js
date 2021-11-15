const bcrypt = require("bcrypt");
const router = require("express").Router();
const mysqlConnection = require("../database/dbConnect");
const util = require("util");
const { appendFile } = require("fs");

const saltRounds = 12;

router.post("/login", async (req, res) => {
  const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

  const username = req.body.username;
  const password = req.body.password;

  mysqlConnection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (result.length) {
        bcrypt.compare(password, result[0].password, (error, resultnew) => {
          if (resultnew) {
            const { password, ...other } = result[0];
            req.session.user = other;
            req.session.isAdmin = false;
            res.status(200).json({ success: true, isAdmin:false });
          } else {
            res.json({
              success: false,
              message: "Wrong password or username entered!",
            });
          }
        });
      } else {
        res.json({ success: false, message: "User does not exist!" });
      }
    }
  );
});

router.post("/adminLogin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  mysqlConnection.query(
    "SELECT * FROM admin WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (result.length) {
        const { password, ...other } = result[0];
        req.session.user = other;
        req.session.isAdmin = true;
        res.status(200).json({ success: true, isAdmin:true });
      } else {
        res.json({
          success: false,
          message: "Wrong password or username entered!",
        });
      }
    }
  );
});

router.post("/signup", (req, res) => {
  const username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) console.log(err);

    const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

    mysqlConnection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, result) => {
        if (result.length) {
          res.json({
            success: false,
            message: "username already taken!",
          });
        } else {
          mysqlConnection.query(
            "SELECT * FROM users WHERE email = ?",
            [req.body.email],
            (err, Res) => {
              if (Res.length) {
                res.json({
                  success: false,
                  message: "email already taken!",
                });
              } else {
                mysqlConnection.query(
                  "INSERT INTO `users`(`Fname`,`Lname`,`username`,`email`,`password`,`DOB`,`country`) VALUES (?,?,?,?,?,?,?)",
                  [
                    req.body.Fname,
                    req.body.Lname,
                    username,
                    req.body.email,
                    hash,
                    req.body.DOB,
                    req.body.country,
                  ],
                  async (err, result) => {
                    if (err) {
                      const { sqlMessage, ...other } = err;
                      res.json({ success: false, message: sqlMessage });
                    } else {
                      const rows = await query(
                        "SELECT * FROM users WHERE username = ?",
                        [username]
                      );
                      const { password, ...other } = rows[0];
                      req.session.user = other;
                      res.status(200).json({
                        success: true,
                        message: "Account created successfully!",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "User logged out successfully" });
});

router.get("/user", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user, isAdmin: req.session.isAdmin });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
