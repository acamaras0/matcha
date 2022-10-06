import db from "../config/Database.js";

let round = 0;

export default function createFake() {
  db.query("USE matcha_db", (err, result) => {
    if (err) throw err;
    console.log("Using Matcha DB.");
  });
  if (round === 0) {
    const test1 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test1,
      [
        "John",
        "Doe",
        "John",
        "email@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "30",
        "male",
        "music",
        "Bio",
        "60.192059",
        "24.945831",
        "3",
        "http://localhost:5000/upload/1.jpg",
        "1",
        "Helsinki",
        "Fi",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test2 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test2,
      [
        "Peter",
        "Son",
        "Peter",
        "email1@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "20",
        "male",
        "movies",
        "Bio",
        "61.504967",
        "23.743065",
        "2",
        "http://localhost:5000/upload/2.jpg",
        "0",
        "Tampere",
        "Fi",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("2 records inserted");
      }
    );

    const test3 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test3,
      [
        "Bella",
        "Jefferson",
        "Bella",
        "email2@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "26",
        "female",
        "music, movies",
        "Bio",
        "65.021545",
        "25.469885",
        "3",
        "http://localhost:5000/upload/3.jpg",
        "1",
        "Oulu",
        "Fi",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("3 record inserted");
      }
    );

    const test4 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test4,
      [
        "Laura",
        "Palmer",
        "Laura",
        "email3@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "22",
        "female",
        "travel, art",
        "Bio",
        "60.454510",
        "22.264824",
        "0",
        "http://localhost:5000/upload/4.jpg",
        "1",
        "Turku",
        "Fi",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("4 record inserted");
      }
    );

    const test5 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test5,
      [
        "Anamaria",
        "Camarasan",
        "Anamaria",
        "email4@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "27",
        "female",
        "music, art, books",
        "Bio",
        "60.454510",
        "22.264824",
        "1",
        "http://localhost:5000/upload/5.jpg",
        "1",
        "Turku",
        "Fi",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("4 record inserted");
      }
    );

    const test6 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test6,
      [
        "Lola",
        "Jeff",
        "Lola",
        "email5@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "25",
        "female",
        "photography",
        "Bio",
        "65.021545",
        "25.469885",
        "6",
        "http://localhost:5000/upload/6.jpg",
        "1",
        "Oulu",
        "Fi",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("3 record inserted");
      }
    );

    const test7 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test7,
      [
        "Juha",
        "Star",
        "Juha",
        "email6@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "29",
        "male",
        "music, books",
        "Bio",
        "60.192059",
        "24.945831",
        "32",
        "http://localhost:5000/upload/7.jpg",
        "1",
        "Helsinki",
        "Fi",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test8 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test8,
      [
        "Matilda",
        "Lynch",
        "Matilda",
        "email7@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "29",
        "female",
        "art, gaming",
        "Bio",
        "60.192059",
        "24.945831",
        "46",
        "http://localhost:5000/upload/8.jpg",
        "1",
        "Helsinki",
        "Fi",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test9 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test9,
      [
        "Nikki",
        "Lyn",
        "Nikki",
        "email8@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "34",
        "male",
        "gaming",
        "Bio",
        "60.192059",
        "24.945831",
        "67",
        "http://localhost:5000/upload/9.jpg",
        "1",
        "Helsinki",
        "Fi",
        "heterosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test10 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test10,
      [
        "Lucas",
        "Mann",
        "Lucas",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "30",
        "male",
        "photography",
        "Bio",
        "62.893335",
        "27.679338",
        "10",
        "http://localhost:5000/upload/10.jpg",
        "1",
        "Kuopio",
        "Fi",
        "homosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["1", "1", "http://localhost:5000/upload/1.jpg", "1.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["2", "1", "http://localhost:5000/upload/2.jpg", "2.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["3", "1", "http://localhost:5000/upload/3.jpg", "3.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["4", "1", "http://localhost:5000/upload/4.jpg", "4.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["5", "1", "http://localhost:5000/upload/5.jpg", "5.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["6", "1", "http://localhost:5000/upload/6.jpg", "6.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["7", "1", "http://localhost:5000/upload/7.jpg", "7.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["8", "1", "http://localhost:5000/upload/8.jpg", "8.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["9", "1", "http://localhost:5000/upload/9.jpg", "9.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["10", "1", "http://localhost:5000/upload/10.jpg", "10.jpg"]
    );

    round++;
  }
}
