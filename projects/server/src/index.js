require("dotenv/config");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
// const db = require("./models");
const route = require("./routes");
const mysql = require("mysql2");
const PORT = process.env.PORT || 8000;
const app = express();
// app.use(
//   cors({
//       origin: [
//         process.env.WHITELISTED_DOMAIN &&
//           process.env.WHITELISTED_DOMAIN.split(","),
//       ],
//   })
// );
app.use(cors());
const options = {
  origin: "http://localhost:3000",
};
app.use(cors(options));
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  password: "password",
  database: "db_kopio",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db connected");
  }
});
app.use(express.json());
// db.sequelize.sync({ alter: true });

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});
app.get("/update-user", (req, res) => {
  const qString = "Select * FROM user_details";
  db.query(qString, (err, result) => {
    if (err) {
      res.status(400).json({
        message: "query error",
      });
    }
    res.status(200).json({
      message: "data fetched",
      result: result,
    });
  });
});
app.patch("/users/:id/password", (req, res) => {
  const id = parseInt(req.params.id);
  const { oldPassword, newPassword } = req.body;
  console.log(req.body);

  db.query(
    "SELECT password FROM users WHERE id = ?",
    [id],
    async (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const password = results[0].password;
      const isPasswordCorrect = await bcrypt.compare(oldPassword, password);
      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Old password is incorrect",
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedPassword, id],
        (error, results, fields) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              message: "Internal Server Error",
            });
          }
          return res.send("Password updated successfully");
        }
      );
    }
  );
});

app.patch("/editprofile", (req, res) => {
  // console.log(req.query.id);
  console.log(req.body);
  const qString = `update user_details ud JOIN users u on ud.UserId=u.id set ud.firstName ="${req.body.firstName}",ud.lastName ="${req.body.lastName}",ud.birthDate="${req.body.birthDate}",ud.gender=${req.body.gender},u.email="${req.body.email}" where ud.UserId=${req.body.User_id}`;
  db.query(qString, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: "query error",
      });
    }
    res.status(200).json({
      message: "data fetched",
      result: result,
    });
  });
});
app.patch("/updatefoto", (req, res) => {
  // console.log(req.query.id);
  console.log(req.body);
  const qString = `update user_details  set imgUser="${req.body.imgUser}" where UserId=${req.body.User_id}`;
  db.query(qString, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: "query error",
      });
    }
    res.status(200).json({
      message: "data fetched",
      result: result,
    });
  });
});
app.patch("/edit-password", (req, res) => {
  const qString = `update users set password ="${req.body.password}" `;
  db.query(qString, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "query error",
      });
    }
    res.status(200).json({
      message: "data fetched",
      result: result,
    });
  });
});

app.get("/users/:UserId", (req, res) => {
  console.log(req.params);
  const qString =
    "SELECT  * FROM (SELECT DATE_FORMAT(ud.birthDate, '%Y-%m-%d') as birthDate,ud.lastName,ud.firstName,ud.imgUser,ud.UserId,ud.gender,u.username,u.isVerify,u.email FROM user_details ud JOIN users u on ud.UserId=u.id) as n where n.UserId =" +
    req.params.UserId;
  db.query(qString, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "query error",
      });
    }
    res.status(200).json({
      message: "data fetched",
      result: result[0],
    });
  });
});

app.use("/user", route.userRoute);
app.use("/admin", route.adminRoute);

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, clientPath, "index.html"));
// });

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
