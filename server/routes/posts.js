const router = require("express").Router();
const mysqlConnection = require("../database/dbConnect");
const util = require("util");

const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

router.post("/art", (req, res) => {
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  mysqlConnection.query(
    "INSERT INTO `arts` (`timestamp`,`title`,`description`,`username`) VALUES (?,?,?,?)",
    [now, req.body.Title, req.body.Description, req.body.user.username],
    async (err, result) => {
      if (err) {
        const { sqlMessage, ...other } = err;
        return res.json({ success: false, message: sqlMessage });
      } else {
        const rows1 = await query(
          "INSERT INTO `artImages` (`timestamp`,`imageUrl`,`postId`) VALUES (?,?,?)",
          [now, req.body.Image, result.insertId]
        ).catch((Err) => {
          const { sqlMessage, ...other } = Err;
          return res.json({ success: false, message: sqlMessage });
        });
        const Res2 = req.body.Tags.map(async (tag) => {
          const rows2 = await query(
            "INSERT INTO `tags`(`postId`,`tagName`) VALUES (?,?)",
            [result.insertId, tag]
          ).catch((Err) => {
            const { sqlMessage, ...other } = Err;
            return res.json({ success: false, message: sqlMessage });
          });
        });
        if (rows1 && Res2) {
          return res.json({ success: true, message: "Post created successfully!" });
        }
      }
    }
  );
});

router.get("/all", async (req, res) => {
  const result = [];

  // if(req.session.user){
  //   const res1 = await query("SELECT * FROM arts WHERE isPUblished=1 AND username<>?",[req.session.user.username]).catch((err) => {
  //     const { sqlMessage, ...other } = Err;
  //     res.json({ success: false, message: sqlMessage });
  //   });
  // }else{
  //   const res1 = await query("SELECT * FROM arts WHERE isPUblished=1").catch((err) => {
  //     const { sqlMessage, ...other } = Err;
  //     res.json({ success: false, message: sqlMessage });
  //   });
  // }
  const res1 = await query("SELECT * FROM arts WHERE isPUblished=1").catch(
    (Err) => {
      const { sqlMessage, ...other } = Err;
      return res.json({ success: false, message: sqlMessage });
    }
  );

  await Promise.all(
    res1.map(async (rowData) => {
      const res2 = await query("SELECT * FROM artImages WHERE postId = ?", [
        rowData.id,
      ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
      });
      const res3 = await query("SELECT COUNT(*) FROM likes WHERE postId = ?", [
        rowData.id,
      ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
      });
      const res4 = await query("SELECT profileImgUrl FROM users WHERE username = ?",[rowData.username]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
      });
      result.push({ art: rowData, image: res2[0], likes: res3[0]["COUNT(*)"], artistImg: res4[0] });
    })
  );
  // console.log(result);

  return res.json({ success: true, data: result });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const res1 = await query("SELECT * FROM arts WHERE postId = ?", [id]).catch(
    (Err) => {
      const { sqlMessage, ...other } = Err;
      return res.json({ success: false, message: sqlMessage });
    }
  );
  const res2 = await query("SELECT COUNT(*) FROM likes WHERE postId = ?", [
    id,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  const res3 = await query("SELECT * FROM comments WHERE postId = ?", [
    id,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  const res4 = await query("SELECT * FROM artImages WHERE postId = ?", [
    id,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  const result = {
    art: res1[0],
    likes: res2[0]["COUNT(*)"],
    commnets: res3[0],
    image: res4[0],
  };

  return res.json({ success: true, data: result });
});

router.get("/:username", async (req, res) => {
  const username = req.body.params;
  const isPublished = username === req.session.user.username ? 0 : 1;

  const res1 = await query(
    "SELECT * FROM arts WHERE username = ? AND isPublished = ?",
    [username, isPublished]
  ).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });
  const result = [];

  await Promise.all(
    res1.map(async (rowData) => {
      const res2 = await query("SELECT * FROM artImages WHERE postId = ?", [
        rowData.id,
      ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
      });
      const res3 = await query("SELECT COUNT(*) FROM likes WHERE postId = ?", [
        rowData.id,
      ]).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
      });
      result.push({ art: rowData, image: res2[0], likes: res3[0]["COUNT(*)"] });
    })
  );
  // console.log(result);

  return res.json({ success: true, data: result });
});

router.delete("/:id", async (req, res) => {
  const post = await query("SELECT * FROM arts WHERE postId = ?", [
    req.params.id,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  if (req.body.username === post.username || req.body.isAdmin) {
    const res1 = await query("DELETE FROM arts WHERE postId = ?", [
      req.params.id,
    ]).catch((Err) => {
      const { sqlMessage, ...other } = Err;
      return res.json({ success: false, message: sqlMessage });
    });

    return res.json({ success: true, message: "Post deleted successfully" });
  } else {
    return res.json({
      success: false,
      message: "You can delete only your post!",
    });
  }
});

router.put("/post/:id", async (req, res) => {
  const art = await query("SELECT * FROM arts WHERE id = ?", [
    req.params.id,
  ]).catch((Err) => {
    const { sqlMessage, ...other } = Err;
    return res.json({ success: false, message: sqlMessage });
  });

  if (art.username === req.body.user.username || req.body.isAdmin) {
    const res1 = await query(
      "UPDATE arts SET isPublished = ?, dateOfPublish = ?, title = ?, description = ? WHERE id = ?",
      [
        req.body.isPublished,
        req.body.dateOfPublish,
        req.body.title,
        req.body.description,
        req.params.id,
      ]
    ).catch((Err) => {
      const { sqlMessage, ...other } = Err;
      return res.json({ success: false, message: sqlMessage });
    });

    const res2 = await query("UPDATE artImages SET imageUrl = ?", [
      req.body.image,
    ]).catch((Err) => {
      const { sqlMessage, ...other } = Err;
      return res.json({ success: false, message: sqlMessage });
    });

    const delTags = await query("DELETE FROM tags WHERE postId = ?", [
      req.params.id,
    ]).catch((Err) => {
      const { sqlMessage, ...other } = Err;
      return res.json({ success: false, message: sqlMessage });
    });

    const res3 = req.body.Tags.map(async (tag) => {
      const rows = await query(
        "INSERT INTO `tags`(`postId`,`tagName`) VALUES (?,?)",
        [req.params.id, tag]
      ).catch((Err) => {
        const { sqlMessage, ...other } = Err;
        return res.json({ success: false, message: sqlMessage });
      });
    });
    return res.json({ success: true, message: "Post updated successfully" });
  }else{
    return res.json({
      success: false,
      message: "You can update only your Post!",
    });
  }
});

module.exports = router;
