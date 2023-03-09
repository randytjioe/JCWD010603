const db = require("../models");
const User = db.user;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: { [Op.and]: [{ username: username }, { password: password }] },
      });
      console.log(req.body);
      if (!user) {
        return res.status(400).json({
          message: "user tidak ditemukan",
        });
      }

      const checkPass = await bcrypt.compareSync(password, user.password);

      if (checkPass) {
        const token = jwt.sign(
          { id: user.dataValues.id },
          process.env.secret_key,
          { expiresIn: "1d" }
        );
        delete user.dataValues.password;

        return res.status(200).json({
          message: "anda berhasil login",
          result: { token, user },
        });
      }

      return res.status(400).json({
        message: "password anda salah",
      });
    } catch (err) {
      res.status(400).json({
        message: err,
      });
      console.log(err);
    }
  },
  register: async (req, res) => {
    try {
      const { username, password, email, name } = req.body;
      console.log(req.body);
      const checkUsernMail = await User.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: email }],
        },
      });

      console.log(checkUsernMail);

      if (checkUsernMail) {
        return res.status(400).json({
          message: "username atau email sudah terdaftar",
        });
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const createUser = await User.create({
        username: username,
        password: hashPassword,
        email: email,
        name: name,
      });

      return res.status(200).json({
        message: "anda berhasil mendaftar",
        result: createUser,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },
  keeplogin: async (req, res) => {
    try {
      const token = req.headers.authorization;

      const oldUser = jwt.verify(token, process.env.secret_key);
      const newUSer = await User.findByPk(oldUser.id);

      delete newUSer.dataValues.password;

      res.status(200).json({
        result: newUSer,
      });
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  },
};

module.exports = userController;
