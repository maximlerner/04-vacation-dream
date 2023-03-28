const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const multer = require("multer");
// const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../03-uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "01-vacation-dream",
});
connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Get all vacations from table vacation_list
app.get("/", (req, res) => {
  let sql;
  if (req.query.vacation) {
    sql = `SELECT * FROM vacation_list WHERE vacationID = ${req.query.vacation}`;
  } else {
    sql = `SELECT * FROM vacation_list`;
  }
  connection.query(sql, (error, vacations) => {
    res.send(vacations);
  });
});

app.get("/getUsers", (req, res) => {
  let sql;
  sql = `SELECT * FROM users_list`;

  connection.query(sql, (error, users) => {
    res.send(users);
  });
});

//Create new user in users_list table
//-----------------------------------
app.post("/register", (req, res) => {
  console.log(req.body);

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const password = req.body.password;
  const role = "user";

  // bcrypt.genSalt(10,function(error,salt) {
  bcrypt.hash(password, salt, function (error, hash) {
    let sql = `INSERT INTO  users_list (firstName,lastName,userName,password,role) VALUES ('${firstName}','${lastName}','${userName}','${hash}','${role}')`;

    connection.query(
      sql,
      [firstName, lastName, userName, password, role],
      (error, users) => {
        res.json(users);
      }
    );
  });
  // })
});

//login with the user registered
//-------------------------------
app.post("/login", (req, res) => {
  console.log(req.body.userName);

  const userName = req.body.userName;
  const password = req.body.password;

  connection.query(
    `SELECT * FROM users_list WHERE userName = '${userName}'  AND password = '${password}'`,
    [userName, password],
    (error, user) => {
      console.log("user");
      const exportUserName = user?.[0]?.userName;
      console.log(exportUserName === true);

      if (user?.[0]?.userName) {
        console.log("user name is defined");
        res.send({
          userInfo: { userName: user[0].userName, userRole: user[0].role },
        });
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
    }
  );
});

//Create new vacation in vacation_list
//-------------------------------------
app.post("/newVacation", upload.single("myFile"), (req, res) => {
  console.log(`storage: ${req.body}`);

  const description = req.body.description;
  const destination = req.body.destination;
  const image = req.body.image;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const price = req.body.price;
  const followers = 0;

  let sql;
  sql = `INSERT INTO  vacation_list (description,destination,image,dateStart,dateEnd,price,followers) VALUES ('${description}','${destination}','${image}','${dateStart}','${dateEnd}','${price}','${followers}')`;

  connection.query(
    sql,
    [description, destination, image, dateStart, dateEnd, price, followers],
    (error, Vacations) => {
      res.json(Vacations);
    }
  );
});

//update statistics in vacation_list table
//------------------------------------------
app.put("/updateStatistics", (req, res) => {
  const vacation_ID = req.body.vacationID;
  const followUpdate = req.body.followUpdate;
  const followers = req.body.followersCount;
  console.log(vacation_ID, followUpdate, followers);
  let sql;
  sql = `UPDATE vacation_list SET followers = ${followers} + ${followUpdate}`;
  connection.query(sql, (error, results) => {
    res.send(results);
  });
});

app.put("/updateVacation/:vacationID", (req, res) => {
  console.log(req.body);
  console.log(req.params.vacationID);

  const description = req.body.description;
  const destination = req.body.destination;
  const image = req.body.image;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const price = req.body.price;
  const followers = req.body.followers;

  const vacationID = req.params.vacationID;

  let sql;
  sql =
    `UPDATE vacation_list SET
      description = '${description}',
      destination = '${destination}',
      image = '${image}',
      dateStart = '${dateStart}',
      dateEnd = '${dateEnd}',
      price = '${price}',
      followers = '${followers}'
      WHERE vacationID = ` + vacationID;

  connection.query(
    sql,
    [description, destination, image, dateStart, dateEnd, price, followers],
    (error, Vacation) => {
      res.json(Vacation);
    }
  );
});

// delete vaction from table by id
//---------------------------------------
app.delete("/deleteVacation/:vacationID", (req, res) => {
  const deleteVacation = req.params.vacationID;
  console.log(deleteVacation);

  let sql;
  sql = "DELETE FROM vacation_list WHERE vacationID = ?";

  connection.query(sql, deleteVacation, (error, results) => {
    res.send(results);
  });
});

app.listen(3030, console.log("Listening to 3030"));
