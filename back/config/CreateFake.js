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
        "photography, art",
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

    const test11 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test11,
      [
        "Jenna",
        "Ikonen",
        "Jenna",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "24",
        "female",
        "photography, music",
        "Bio",
        "62.60118",
        "29.76316",
        "10",
        "http://localhost:5000/upload/11.jpg",
        "1",
        "Joensuu",
        "Fi",
        "bisexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test12 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test12,
      [
        "Joel",
        "Turunen",
        "Joel",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "28",
        "male",
        "books, photography",
        "Bio",
        "65.73641",
        "24.56371",
        "10",
        "http://localhost:5000/upload/12.jpg",
        "1",
        "Kemi",
        "Fi",
        "bisexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test13 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test13,
      [
        "Melissa",
        "Melonen",
        "Melissa",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "31",
        "female",
        "sports, music, photography",
        "Bio",
        "62.893335",
        "24.655899",
        "10",
        "http://localhost:5000/upload/13.jpg",
        "1",
        "Espoo",
        "Fi",
        "homosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test14 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test14,
      [
        "Tracy",
        "Smith",
        "Tracy",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "30",
        "female",
        "books, movies, music",
        "Bio",
        "60.466087",
        "22.025087",
        "10",
        "http://localhost:5000/upload/14.jpg",
        "1",
        "Nantali",
        "Fi",
        "heterosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test15 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test15,
      [
        "Tiina",
        "Lehtonen",
        "Tiina",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "30",
        "female",
        "art, gaming, sports",
        "Bio",
        "65.021545",
        "25.469885",
        "10",
        "http://localhost:5000/upload/15.jpg",
        "1",
        "Oulu",
        "Fi",
        "heterosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test16 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test16,
      [
        "Niko",
        "Kokkonen",
        "Niko",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "35",
        "male",
        "music, movies, books",
        "Bio",
        "62.893335",
        "27.679338",
        "10",
        "http://localhost:5000/upload/16.jpg",
        "1",
        "Kuopio",
        "Fi",
        "bisexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test17 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test17,
      [
        "Lena",
        "Jefferson",
        "Lena",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "30",
        "female",
        "photography, art, movies",
        "Bio",
        "59.832394",
        "22.970695",
        "10",
        "http://localhost:5000/upload/17.jpg",
        "1",
        "Hanko",
        "Fi",
        "heterosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test18 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test18,
      [
        "Nikki",
        "Seven",
        "Nikki",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "28",
        "male",
        "photography, art, sports",
        "Bio",
        "62.893335",
        "27.679338",
        "10",
        "http://localhost:5000/upload/18.jpg",
        "1",
        "Kuopio",
        "Fi",
        "bisexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    //HERE!!
    const test19 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test19,
      [
        "Luke",
        "Manner",
        "Luke",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "31",
        "male",
        "photography",
        "Bio",
        "59.832394",
        "22.970695",
        "10",
        "http://localhost:5000/upload/19.jpg",
        "1",
        "Hanko",
        "Fi",
        "heterosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test20 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test20,
      [
        "Leo",
        "Kann",
        "Leo",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "32",
        "male",
        "books",
        "Bio",
        "60.192059",
        "24.945831",
        "10",
        "http://localhost:5000/upload/20.jpg",
        "1",
        "Helsinki",
        "Fi",
        "bisexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test21 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test21,
      [
        "Till",
        "Lund",
        "Till",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "27",
        "male",
        "music",
        "Bio",
        "62.893335",
        "27.679338",
        "10",
        "http://localhost:5000/upload/21.jpg",
        "1",
        "Kuopio",
        "Fi",
        "bisexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test22 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test22,
      [
        "Travis",
        "Lex",
        "Travis",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "26",
        "male",
        "sports",
        "Bio",
        "60.454510",
        "22.264824",
        "10",
        "http://localhost:5000/upload/22.jpg",
        "1",
        "Turku",
        "Fi",
        "homosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test23 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test23,
      [
        "Iina",
        "Vaan",
        "Iina",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "29",
        "female",
        "photography, art",
        "Bio",
        "60.205490",
        "24.655899",
        "10",
        "http://localhost:5000/upload/23.jpg",
        "1",
        "Espoo",
        "Fi",
        "bisexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test24 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test24,
      [
        "Ofilia",
        "Trace",
        "Offilia",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "41",
        "female",
        "photography",
        "Bio",
        "64.222176",
        "27.727850",
        "10",
        "http://localhost:5000/upload/24.jpg",
        "1",
        "Kajaani",
        "Fi",
        "homosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );

    const test25 =
      "INSERT INTO users (firstName, lastName, username, email, password, activ_status, birthdate, gender, interests, bio, geo_lat, geo_long, fame, profile_pic, online, city, country, orientation) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      test25,
      [
        "Jane",
        "Doe",
        "Jane",
        "email9@email.com",
        "$2b$10$K2V/gUHEzGkyidtb4KTBD.fXqZn39gWYaOm1ofVwq8GYunC21dDEm",
        "1",
        "19",
        "female",
        "sports, movies",
        "Bio",
        "62.791668",
        "22.841667",
        "10",
        "http://localhost:5000/upload/25.jpg",
        "1",
        "Seinäjoki",
        "Fi",
        "heterosexual",
      ],
      (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      }
    );
  }

  if (round < 1) {
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

    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["11", "1", "http://localhost:5000/upload/11.jpg", "11.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["12", "1", "http://localhost:5000/upload/12.jpg", "12.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["13", "1", "http://localhost:5000/upload/13.jpg", "13.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["14", "1", "http://localhost:5000/upload/14.jpg", "14.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["15", "1", "http://localhost:5000/upload/15.jpg", "15.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["16", "1", "http://localhost:5000/upload/16.jpg", "16.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["17", "1", "http://localhost:5000/upload/17.jpg", "17.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["18", "1", "http://localhost:5000/upload/18.jpg", "18.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["19", "1", "http://localhost:5000/upload/19.jpg", "19.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["20", "1", "http://localhost:5000/upload/20.jpg", "20.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["21", "1", "http://localhost:5000/upload/21.jpg", "21.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["22", "1", "http://localhost:5000/upload/22.jpg", "22.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["23", "1", "http://localhost:5000/upload/23.jpg", "23.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["24", "1", "http://localhost:5000/upload/24.jpg", "24.jpg"]
    );
    db.query(
      "INSERT INTO user_images (user_id, profile, img, pic_name) VALUES (?, ?, ?, ?)",
      ["25", "1", "http://localhost:5000/upload/25.jpg", "25.jpg"]
    );

    console.log("Pictures inserted.");
  }

  round++;
}
