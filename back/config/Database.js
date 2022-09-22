import mysql from "mysql";

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "",
  database: "matcha_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql =
    "CREATE TABLE IF NOT EXISTS users (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    firstname VARCHAR(255), lastname VARCHAR(255), username VARCHAR(255), \
    email VARCHAR(255), password VARCHAR(255), activ_status INT(11) DEFAULT 0,\
    birthdate INT(11), gender VARCHAR(255) ,orientation VARCHAR(255) DEFAULT 'bisexual',\
    interests VARCHAR(500), bio VARCHAR(500), geo_lat DOUBLE, geo_long DOUBLE,\
    dist_min INT(11) DEFAULT 0, dist_max INT(11) DEFAULT 0, age_min INT(11) DEFAULT 0, age_max INT(11) DEFAULT 0, profile_views INT(11) DEFAULT 0, profile_pic VARCHAR(500),\
    fame INT(11) DEFAULT 0, online INT(11) DEFAULT 0, refresh_token VARCHAR(500), reset_token VARCHAR(500),activ_token VARCHAR(500),\
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("User table created");
  });
  var block =
    "CREATE TABLE IF NOT EXISTS block (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    user_id INT(11), blocked_id INT(11))";
  db.query(block, function (err, result) {
    if (err) throw err;
    console.log("Block table created");
  });
  var user_images =
    "CREATE TABLE IF NOT EXISTS user_images (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    user_id INT(11), pic_name VARCHAR(255), img VARCHAR(500))";
  db.query(user_images, function (err, result) {
    if (err) throw err;
    console.log("Images table created");
  });
  var matches =
    "CREATE TABLE IF NOT EXISTS matches (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
     liker INT(11), liked INT(11), match_status INT(11) DEFAULT 0)";
  db.query(matches, function (err, result) {
    if (err) throw err;
    console.log("Matches table created");
  });
  var chat =
    "CREATE TABLE IF NOT EXISTS chat (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    user1 INT(11), user2 INT(11), time TIMESTAMP NOT NULL)";
  db.query(chat, function (err, result) {
    if (err) throw err;
    console.log("Chat table created");
  });
  var messages =
    "CREATE TABLE IF NOT EXISTS messages (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
     chat_id INT(11), sender VARCHAR(500), receiver VARCHAR(500), text VARCHAR(500), read_status INT(11) DEFAULT 0, time TIMESTAMP NOT NULL)";
  db.query(messages, function (err, result) {
    if (err) throw err;
    console.log("Messages table created");
  });
  var block =
    "CREATE TABLE IF NOT EXISTS block (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
  user_id INT(11) NOT NULL, blocked_id INT(11) NOT NULL)";
  db.query(block, function (err, result) {
    if (err) throw err;
    console.log("Block table created");
  });
  var report =
    "CREATE TABLE IF NOT EXISTS report (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
  user_id INT(11) NOT NULL, reported_id INT(11) NOT NULL)";
  db.query(report, function (err, result) {
    if (err) throw err;
    console.log("Report table created");
  });
  var notifications =
    "CREATE TABLE IF NOT EXISTS notifications (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
  sender_id INT(11) NOT NULL, sender_name VARCHAR(500),reciever_id INT(11) NOT NULL, type VARCHAR(255) NOT NULL, mark INT(11) DEFAULT 0,time TIMESTAMP NOT NULL)";
  db.query(notifications, function (err, result) {
    if (err) throw err;
    console.log("Notifications table created");
  });
});

// const test =
// "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online) \
// VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
// db.query(test, ["John", "Doe", "John", "email@email.com" ,"$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm", "1", "18", "male", "music", "Bio", "60.192059", "24.945831", "3", "http://localhost:5000/upload/1.jpg", "1"], (err, result) => {
//   if (err) throw err;
//   console.log("1 record inserted");
// });

//   const test1 =
// "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online) \
// VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
// db.query(test1, ["Peter", "Son", "Peter", "email@email.com" ,"$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm", "1", "20", "male", "music", "Bio", "61.504967", "23.743065", "2", "http://localhost:5000/upload/2.jpg", "0"], (err, result) => {
//     if (err) throw err;
//     console.log("2 records inserted");
// });

//   const test2 =
// "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online) \
// VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
// db.query(test2, ["Bella", "Jefferson", "Bella", "email@email.com" ,"$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm", "1", "26", "female", "music", "Bio", "65.021545", "25.469885", "4", "http://localhost:5000/upload/3.jpg", "1"], (err, result) => {
//     if (err) throw err;
//     console.log("3 record inserted");
// });

//   const test3 =
// "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online) \
// VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
// db.query(test3, ["Laura", "Palmer", "Laura", "email@email.com" ,"$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm", "1", "22", "female", "music", "Bio", "60.454510", "22.264824", "5", "http://localhost:5000/upload/4.jpg", "1"], (err, result) => {
//     if (err) throw err;
//     console.log("4 record inserted");
// });

// db.query("INSERT INTO user_images (user_id, img) VALUES (?, ?)", ["1","http://localhost:5000/upload/1.jpg" ])
// db.query("INSERT INTO user_images (user_id, img) VALUES (?, ?)", ["2","http://localhost:5000/upload/2.jpg" ])
// db.query("INSERT INTO user_images (user_id, img) VALUES (?, ?)", ["3","http://localhost:5000/upload/3.jpg" ])
// db.query("INSERT INTO user_images (user_id, img) VALUES (?, ?)", ["4","http://localhost:5000/upload/4.jpg" ])

export default db;
