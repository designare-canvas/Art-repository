const mysqlConnection = require("./dbConnect");

mysqlConnection.connect((err) => {
  if (err) {
    console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
    return;
  }
  console.log("Connection Established Successfully");
});

mysqlConnection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASENAME} DEFAULT CHARSET = utf8mb4 DEFAULT COLLATE = utf8mb4_unicode_ci;`,
  function (err, result) {
    if (err) {
      throw err;
      return;
    }
    console.log("Database created");
  }
);

mysqlConnection.query(`USE ${process.env.DATABASENAME}`);

const admin = `Create TABLE IF NOT EXISTS admin(
    username VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    Fname VARCHAR(255) NOT NULL,
    Lname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
)`;

const users = `Create TABLE IF NOT EXISTS users(
    username VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    Fname VARCHAR(255) NOT NULL,
    Lname VARCHAR(255) NOT NULL,
    DOB DATE NOT NULL,
    Description VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    profileImgUrl LONGTEXT,
    coverImgUrl LONGTEXT,
    state VARCHAR(255),
    country VARCHAR(255),
    pincode INT(16),
    isArtist BOOLEAN NOT NULL DEFAULT 0,
    admin_id VARCHAR(40),
    PRIMARY KEY (username),
    FOREIGN KEY (admin_id) REFERENCES admin(username)
)`;

const arts = `Create TABLE IF NOT EXISTS arts(
    id INT AUTO_INCREMENT,
    isPublished BOOLEAN NOT NULL DEFAULT 0,
    dateOfPublish DATETIME,
    timestamp DATETIME NOT NULL,
    title VARCHAR(255),
    description TEXT,
    username VARCHAR(40) NOT NULL,
    admin_id VARCHAR(40),
    PRIMARY KEY (id),
    FOREIGN KEY (admin_id) REFERENCES admin(username) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const tags = `Create TABLE IF NOT EXISTS tags(
    postId int,
    tagName VARCHAR(255),
    PRIMARY KEY(postId,tagName),
    FOREIGN KEY (postId) REFERENCES arts(id) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const likes = `Create TABLE IF NOT EXISTS likes(
    timestamp DATETIME NOT NULL,
    username VARCHAR(40),
    postId int,
    PRIMARY KEY (username, postId),
    FOREIGN KEY (postId) REFERENCES arts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const comments = `Create TABLE IF NOT EXISTS comments(
    timestamp DATETIME NOT NULL,
    username VARCHAR(40),
    commentData VARCHAR(255),
    postId int,
    PRIMARY KEY (timestamp, username, postId),
    FOREIGN KEY (postId) REFERENCES arts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const artImages = `Create TABLE IF NOT EXISTS artImages(
    timestamp DATETIME NOT NULL,
    imageUrl LONGTEXT,
    postId int,
    PRIMARY KEY (timestamp, postId),
    FOREIGN KEY (postId) REFERENCES arts(id) ON DELETE CASCADE ON UPDATE CASCADE
)`;

mysqlConnection.query(admin, (err, result) => {
  if (err) throw err;
  else console.log(" Admin Table created");
});

mysqlConnection.query(users, (err, result) => {
  if (err) throw err;
  else console.log(" Users Table created");
});

mysqlConnection.query(arts, (err, result) => {
  if (err) throw err;
  else console.log(" Arts Table created");
});

mysqlConnection.query(tags, (err, result) => {
  if (err) throw err;
  else console.log(" Tags Table created");
});

mysqlConnection.query(likes, (err, result) => {
  if (err) throw err;
  else console.log(" Likes Table created");
});

mysqlConnection.query(comments, (err, result) => {
  if (err) throw err;
  else console.log(" Commnets Table created");
});

mysqlConnection.query(artImages, (err, result) => {
  if (err) throw err;
  else console.log(" Art Images Table created");
});
