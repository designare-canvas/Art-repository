const pgConnection = require("./dbConnect");

pgConnection.connect((err) => {
  if (err) {
    console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
    return;
  }
  console.log("Connection Established Successfully");
});

// pgConnection.query(
//   `CREATE DATABASE ${process.env.DATABASENAME} ENCODING='UTF-8'`,
//   function (err, result) {
//     if (err) {
//       throw err;
//       return;
//     }
//     console.log("Database created");
//   }
// );

// pgConnection.query(`USE ${process.env.DATABASENAME}`);

const admin = `Create TABLE IF NOT EXISTS admin(
    username VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    Fname VARCHAR(255) NOT NULL,
    Lname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
)`;

const users = `Create TABLE IF NOT EXISTS "users"(
    username VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    Fname VARCHAR(255) NOT NULL,
    Lname VARCHAR(255) NOT NULL,
    DOB DATE NOT NULL,
    Description VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    profileImgUrl TEXT,
    coverImgUrl TEXT,
    state VARCHAR(255),
    country VARCHAR(255),
    pincode INT,
    isArtist BOOLEAN NOT NULL DEFAULT FALSE,
    timestamp TIMESTAMP NOT NULL,
    admin_id VARCHAR(40) DEFAULT 'admin123',
    PRIMARY KEY (username),
    FOREIGN KEY (admin_id) REFERENCES admin(username),
    constraint valid_pincode 
      check (pincode <= 99999999)
)`;

const arts = `Create TABLE IF NOT EXISTS arts(
    id SERIAL,
    isPublished BOOLEAN NOT NULL DEFAULT FALSE,
    dateOfPublish TIMESTAMP,
    timestamp TIMESTAMP NOT NULL,
    title VARCHAR(255),
    description TEXT,
    username VARCHAR(40) NOT NULL,
    admin_id VARCHAR(40) DEFAULT 'admin123',
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
    timestamp TIMESTAMP NOT NULL,
    username VARCHAR(40),
    postId int,
    PRIMARY KEY (username, postId),
    FOREIGN KEY (postId) REFERENCES arts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const comments = `Create TABLE IF NOT EXISTS comments(
    timestamp TIMESTAMP NOT NULL,
    username VARCHAR(40),
    commentData VARCHAR(255),
    postId int,
    PRIMARY KEY (timestamp, username, postId),
    FOREIGN KEY (postId) REFERENCES arts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const artImages = `Create TABLE IF NOT EXISTS artImages(
    timestamp TIMESTAMP NOT NULL,
    imageUrl TEXT,
    postId int,
    PRIMARY KEY (timestamp, postId),
    FOREIGN KEY (postId) REFERENCES arts(id) ON DELETE CASCADE ON UPDATE CASCADE
)`;

const requests = `CREATE TABLE IF NOT EXISTS requests(
  timestamp TIMESTAMP NOT NULL,
  username VARCHAR(40) NOT NULL,
  admin_id VARCHAR(40) NOT NULL DEFAULT 'admin123',
  current_status VARCHAR(40),
  permission_asked VARCHAR(40),
  PRIMARY KEY (username, admin_id),
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (admin_id) REFERENCES admin(username) ON DELETE CASCADE ON UPDATE CASCADE
)`;

pgConnection.query(admin, (err, result) => {
  if (err) throw err;
  else console.log(" Admin Table created");
});

pgConnection.query(users, (err, result) => {
  if (err) throw err;
  else console.log(" Users Table created");
});

pgConnection.query(arts, (err, result) => {
  if (err) throw err;
  else console.log(" Arts Table created");
});

pgConnection.query(tags, (err, result) => {
  if (err) throw err;
  else console.log(" Tags Table created");
});

pgConnection.query(likes, (err, result) => {
  if (err) throw err;
  else console.log(" Likes Table created");
});

pgConnection.query(comments, (err, result) => {
  if (err) throw err;
  else console.log(" Commnets Table created");
});

pgConnection.query(artImages, (err, result) => {
  if (err) throw err;
  else console.log(" Art Images Table created");
});

pgConnection.query(requests, (err, result) => {
  if (err) throw err;
  else console.log(" Requests Images Table created");
});

pgConnection.query("SELECT * FROM admin",(err,result) => {
  // console.log(result);
  if(result.rows.length === 0){
    pgConnection.query(
      "INSERT INTO admin (username,email,Fname,Lname,password) VALUES ($1,$2,$3,$4,$5)",["admin123","admin@mail.com","new","admin","pass2566"],
      (err, res) => {
        // console.log(res);
        if (err)  console.log(err);
        else console.log("admin inserted");
      }
    );
    }
});