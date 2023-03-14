const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { sequelize } = require("../models");
const secret_key = process.env.secret_key;
const mailer = require("../library/mailer");

const db = require("../models");
const User = db.user;
const User_detail = db.user_detail;
const Address = db.address;

const userController = {
  register: async (req, res) => {
    const data = req.body;

    const t = await sequelize.transaction();
    try {
      // check password

      const password = bcrypt.hashSync(data.password, 10);

      const dataUser = {
        email: data.email,
        username: data.username,
        password: password,
        isVerify: false,
      };

      const user = await User.create({ ...dataUser }, { transaction: t });
      if (!user) {
        throw new Error("Create user failed");
      }

      const dataUserDetail = {
        UserId: user.dataValues.id,
        birthdate: data.birthdate,
        gender: data.gender,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      const userDetail = await User_detail.create(
        { ...dataUserDetail },
        { transaction: t }
      );
      if (!userDetail) {
        throw new Error("Create user detail failed");
      }

      const dataAddress = {
        UserId: user.dataValues.id,
        address: data.address,
        province: data.province,
        city: data.city,
        district: data.district,
        postalCode: data.postalCode,
        isActive: true,
      };

      const address = await Address.create(
        { ...dataAddress },
        { transaction: t }
      );
      if (!address) {
        throw new Error("Create user detail failed");
      }

      const token = jwt.sign({ ...user.dataValues }, secret_key, {
        expiresIn: "1h",
      });
      const href = `http://localhost:8000/user/verify/${token}`;
      // verify via email
      const mail = await mailer({
        to: data.email,
        subject: "Verify Your Account!",
        html: `<a href="${href}"> testing</a>`,
      });
      console.log(mail);

      await t.commit();
      res.status(201).send("Create user success");
    } catch (err) {
      console.log(err);
      await t.rollback();
      return res.status(400).send(err);
    }
  },
  verify: async (req, res) => {
    token = req.params.token;
    console.log(token);

    const t = await sequelize.transaction();
    try {
      if (!token) {
        throw new Error("token is undefined");
      }

      const verifyUser = jwt.verify(token, secret_key);
      console.log(verifyUser);
      const user = await User.findByPk(verifyUser.id, { transaction: t });
      console.log(user);
      if (!user) {
        throw new Error("verify email failed, user not found");
      }
      await User.update(
        {
          isVerify: true,
        },
        {
          where: {
            id: user.id,
          },
        },
        { transaction: t }
      );

      res.status(202).send("Verify user success");
      await t.commit();
    } catch (err) {
      await t.rollback();
      return res.status(401).send(err);
    }
  },
  keeplogin: async (req, res) => {
    try {
      const token = req.headers.authorization;

      const oldUser = jwt.verify(token, secret_key);
      const newUSer = await User.findByPk(oldUser.id);

      delete newUSer.dataValues.password;

      res.status(200).json({
        result: newUSer,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      console.log(req.body);
      if (!user) {
        return res.status(400).json({
          message: "user tidak ditemukan",
        });
      }

      const checkPass = await bcrypt.compareSync(password, user.password);

      if (checkPass) {
        const token = jwt.sign({ id: user.dataValues.id }, secret_key, {
          expiresIn: "1d",
        });
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
  updateFoto: async (req, res) => {
    try {
      const { UserId } = req.body;
      const data = { UserId };

      if (req.file) {
        const image_url = process.env.render_image + req.file.filename;
        console.log(image_url);
        const checkFoto = await User_detail.findOne({
          where: {
            UserId: UserId,
          },
        });

        const file = checkFoto.image_url.split("/")[3];
        const path = path.dirname(`${__dirname}../public/IMAGE_PRODUCT`);
        await fs.unlink(path, file);

        const updateFoto = await User_detail.update({
          ...data,
          image_url,
        });

        res.status(200).json({
          message: "foto updated",
          result: updateFoto,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },

  editProfile: async (req, res) => {
    try {
      const { id, firstName, lastName, birthDate, email, gender } = req.body;
      const data = { firstName, lastName, birthDate, email, gender };

      await User.update(
        {
          ...data,
        },
        {
          where: {
            UserId,
          },
        }
      );

      const result = await User.findByPk(id);
      delete result.dataValues.password;
      delete result.dataValues.avatar_buffer;

      return res.status(200).json({
        message: "user edited",
        result,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.toString(),
      });
    }
  },
  renderAvatar: async (req, res) => {
    try {
      // const id = req.params.id; //27
      var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
      const avatar = await User.findOne({
        where: {
          avatar_url: fullUrl,
        },
      });
      console.log(avatar.id);

      res.set("Content-type", "image/png");

      res.send(avatar.avatar_buffer);
    } catch (err) {
      res.send(err);
    }
  },
  editPassword: async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    console.log(req.user);
    const hashpassword = bcrypt.hashSync(newPassword, 10);
    await User.update(
      {
        newPassword: hashpassword,
      },
      {
        where: {
          email: req.user.email,
        },
      }
    );
  },
};

module.exports = userController;
