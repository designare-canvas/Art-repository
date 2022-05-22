const bcrypt = require("bcrypt");
const router = require("express").Router();
const pgConnection = require("../database/dbConnect");
const util = require("util");
const { appendFile } = require("fs");

const saltRounds = 12;

router.post("/login", async (req, res) => {
  const query = util.promisify(pgConnection.query).bind(pgConnection);

  const username = req.body.username;
  const password = req.body.password;

  pgConnection.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
    (err, result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (error, resultnew) => {
          if (resultnew) {
            const { password, ...other } = result.rows[0];
            req.session.user = other;
            req.session.isAdmin = false;
            res.status(200).json({ success: true, isAdmin: false });
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

  pgConnection.query(
    "SELECT * FROM admin WHERE username = $1 AND password = $2",
    [username, password],
    (err, result) => {
      
      if (result.rows.length) {
        const { password, ...other } = result.rows[0];
        req.session.user = other;
        req.session.isAdmin = true;
        res.status(200).json({ success: true, isAdmin: true });
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
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) console.log(err);

    const query = util.promisify(pgConnection.query).bind(pgConnection);

    pgConnection.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
      (err, result) => {
        if (result.rows.length) {
          res.json({
            success: false,
            message: "username already taken!",
          });
        } else {
          pgConnection.query(
            "SELECT * FROM users WHERE email = $1",
            [req.body.email],
            (err, Res) => {
              if (Res.rows.length) {
                res.json({
                  success: false,
                  message: "email already taken!",
                });
              } else {
                pgConnection.query(
                  "INSERT INTO users(Fname,Lname,username,email,password,DOB,country,timestamp,profileImgUrl,coverImgUrl) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
                  [
                    req.body.Fname,
                    req.body.Lname,
                    username,
                    req.body.email,
                    hash,
                    req.body.DOB,
                    req.body.country,
                    now,
                    req.body.profileImgUrl,
                    req.body.coverImgUrl,
                  ],
                  async (err, result) => {
                    if (err) {
                      const { sqlMessage, ...other } = err;
                      res.json({ success: false, message: sqlMessage });
                    } else {
                      const rows = await query(
                        "SELECT * FROM users WHERE username = $1",
                        [username]
                      );
                      const { password, ...other } = rows.rows[0];
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

  console.log(req.session);

  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user,
      isAdmin: req.session.isAdmin,
    });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
