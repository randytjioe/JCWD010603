require("dotenv/config");
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { join } = require("path");
const db = require("./models");
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
const db_project = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  password: "password",
  database: "db_kopio",
});

db_project.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db_project connected");
  }
});
app.use(express.json());
// db.sequelize.sync({ alter: true });

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/update-user", (req, res) => {
  const qString = "Select * FROM user_details";
  db_project.query(qString, (err, result) => {
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
app.get("/filter", (req, res) => {
  // console.log(req.query);
  const { order } = req.query;
  const { orderby } = req.query;
  delete req.query.order;
  delete req.query.orderby;
  const arrQuery = Object.entries(req.query);

  // console.log(categories);
  let categories = arrQuery.filter((val) => {
    return val[0];
  });

  let where = "";

  /// start
  if (categories.length) {
    where = " where (";

    if (categories.length) {
      // console.log(categories);
      categories.map((val, idx) => {
        idx
          ? (where += `or c.name = '${val[0]}' `)
          : (where += ` c.name = '${val[0]}' `);
      });
    }

    where += ")";
  }

  ///end

  qString =
    "Select p.name,p.price,p.imgProduct,c.name as category FROM products p JOIN categories c on p.CategoryId=c.id" +
    where +
    " order by " +
    orderby +
    " " +
    order;

  db_project.query(qString, (err, result) => {
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
app.get("/user/addresses", (req, res) => {
  const qString = "Select * FROM addresses";
  db_project.query(qString, (err, result) => {
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

app.get("/product-all", (req, res) => {
  const offset = req.query.page ? req.query.page : 0;
  console.log(offset);
  const qString =
    "Select p.name,p.price,p.imgProduct,c.name as category FROM products p JOIN categories c on p.CategoryId=c.id limit 6 offset " +
    offset;
  db_project.query(qString, (err, result) => {
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

app.get("/productall", (req, res) => {
  const qString =
    "Select p.name,p.price,p.imgProduct,c.name as category FROM products p JOIN categories c on p.CategoryId=c.id";
  db_project.query(qString, (err, result) => {
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
app.get("/find", (req, res) => {
  console.log(req.query);
  let qString = "Select * from products ";

  qString = qString + " where name LIKE '%" + req.query.name + "%' ";

  console.log(qString);
  db_project.query(qString, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "query error",
      });
    }

    console.log(res.data);
    res.status(200).json({
      message: "data fetched",
      result: result,
    });
  });
});
app.get("/category", (req, res) => {
  const qString = "Select * from categories";
  db_project.query(qString, (err, result) => {
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

  db_project.query(
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
      db_project.query(
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
  db_project.query(qString, (err, result) => {
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

app.patch("/editaddress", (req, res) => {
  // console.log(req.query.id);
  console.log(req.body);
  const qString = `update addresses set district ="${req.body.district}",province ="${req.body.province}",city="${req.body.city}",postalCode=${req.body.postalCode},address="${req.body.address}" ,isPrimary=${req.body.isPrimary},Ket="${req.body.ket}" where id=${req.body.id}`;
  db_project.query(qString, (err, result) => {
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

app.patch("/editprimary", (req, res) => {
  // console.log(req.query.id);
  console.log(req.body);
  const qString = `update addresses set isPrimary=${req.body.isPrimary} where id=${req.body.id}`;
  db_project.query(qString, (err, result) => {
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
  db_project.query(qString, (err, result) => {
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

app.delete("/delete-address", (req, res) => {
  // console.log(req.query.id);
  // console.log(req.body);
  const qString = `delete from addresses where id=${req.query.id}`;
  db_project.query(qString, (err, result) => {
    if (err) {
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

app.get("/users/:UserId", (req, res) => {
  console.log(req.params);
  const qString =
    "SELECT  * FROM (SELECT DATE_FORMAT(ud.birthDate, '%Y-%m-%d') as birthDate,ud.lastName,ud.firstName,ud.imgUser,ud.UserId,ud.gender,u.username,u.isVerify,u.email FROM user_details ud JOIN users u on ud.UserId=u.id) as n where n.UserId =" +
    req.params.UserId;
  db_project.query(qString, (err, result) => {
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

app.get("/update-address/:id", (req, res) => {
  console.log(req.params);
  const qString = "SELECT  * FROM addresses where id =" + req.params.id;
  db_project.query(qString, (err, result) => {
    if (err) {
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
app.get("/listaddress/:Userid", (req, res) => {
  console.log(req.params);
  const qString = "SELECT  * FROM addresses where Userid =" + req.params.Userid;
  db_project.query(qString, (err, result) => {
    if (err) {
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
app.get("/editdetailaddress/:id", (req, res) => {
  console.log(req.params);
  const qString = "SELECT  * FROM addresses where id =" + req.params.id;
  db_project.query(qString, (err, result) => {
    if (err) {
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
app.use("/user", route.userRoute);
app.use("/admin", route.adminRoute);
app.use("/api_rajaongkir", route.rajaOngkirRoute);
app.use("/post_image", express.static(`${__dirname}/public/POST`));
app.use("/user/avatar", express.static(`${__dirname}/public/IMAGE_PRODUCT`));

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

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
