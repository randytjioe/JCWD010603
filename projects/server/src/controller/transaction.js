const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
const Transaction_header = db.transaction_header;
const Transaction_item = db.transaction_item;
const Branch = db.branch;
const User = db.user;
const User_detail = db.user_detail;
const Address = db.address;

const Category = db.category;
const Product = db.product;

const transactionController = {
  getCountTransactionByBranch: async (req, res) => {
    try {
      const id = req.params.id;
      const filterTransaction = await Transaction_header.count({
        where: {
          BranchId: id,
        },
      });

      res.status(200).json({
        message: "count transaction berdasarkan branch",
        result: filterTransaction,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },
  getIncomeTransactionByBranch: async (req, res) => {
    try {
      const id = req.params.id;
      const filterTransaction = await Transaction_header.findAll({
        attributes: [
          [sequelize.fn("sum", sequelize.col("grandPrice")), "income"],
        ],
        where: {
          BranchId: id,
        },
      });

      res.status(200).json({
        message: "sum transaction berdasarkan branch",
        result: filterTransaction,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },
  getData: async (req, res) => {
    try {
      const dataTransaction = await Transaction_header.findAll();

      res.status(200).json({
        message: "datafetch",
        result: dataTransaction,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },
  getTransactionDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const dataTransaction = await Transaction_header.findAll({
        attributes: [
          "noTrans",
          "createdAt",
          // [
          //   (sequelize.fn(
          //     "DATE_FORMAT",
          //     sequelize.col("createdAt"),
          //     "%d-%m-%Y %H:%i:%s"
          //   ),
          //   "DATE"),
          // ],
          [sequelize.fn("sum", sequelize.col("grandPrice")), "income"],
        ],
        include: [
          {
            model: Branch,
            attributes: ["name"],
          },
        ],
        where: {
          BranchId: id,
        },
        group: ["createdAt"],
      });

      res.status(200).json({
        message: "datafetch",
        result: dataTransaction,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },
  // uploadFoto: async (req, res) => {
  //   try {
  //     const UserId = req.params.UserId;

  //     const data = {};

  //     if (req.file) {
  //       console.log(req.file);
  //       data.imgUser = process.env.render_avatar + req.file.filename;
  //     }

  //     await User_detail.update(
  //       {
  //         ...data,
  //       },
  //       {
  //         where: {
  //           UserId,
  //         },
  //       }
  //     );

  //     const result = await User_detail.findByPk(UserId);

  //     return res.status(200).json({
  //       message: "user edited",
  //       result: result,
  //     });
  //   } catch (err) {
  //     return res.status(400).json({
  //       message: err.toString(),
  //     });
  //   }
  // },
};

module.exports = transactionController;
