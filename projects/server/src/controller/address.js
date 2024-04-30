const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
const User = db.user;
const User_detail = db.user_detail;
const Address = db.address;

const Branch = db.branch;
const Category = db.category;
const Product = db.product;

const addressController = {
  addAddress: async (req, res) => {
    try {
      const {
        address,
        city,
        province,
        district,
        postalCode,
        isPrimary,
        UserId,
        Ket,
        idCity,
        idProv,
      } = req.body;
      const data = {
        address,
        city,
        province,
        district,
        postalCode,
        UserId,
        isPrimary,
        Ket,
        idCity,
        idProv,
      };
      const checkPrimaryAddress = await Address.findOne({
        where: { [Op.and]: [{ isPrimary: true }, { UserId: UserId }] },
      });
      if (isPrimary) {
        if (checkPrimaryAddress) {
          await Address.update(
            {
              isPrimary: false,
            },
            {
              where: {
                id: checkPrimaryAddress.dataValues.id,
              },
            }
          );
        }
      }
      const result = await Address.create({ ...data });
      res.send(result);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: error.message,
      });
    }
  },
  updateAddress: async (req, res) => {
    try {
      const id = req.query.id;
      const {
        address,
        city,
        province,
        district,
        postalCode,
        isPrimary,
        UserId,
        Ket,
        idCity,
        idProv,
      } = req.body;
      const data = {
        address,
        city,
        province,
        district,
        postalCode,
        isPrimary,
        Ket,
        idCity,
        idProv,
      };
      const checkPrimaryAddress = await Address.findOne({
        where: {
          [Op.and]: [
            { isPrimary: true },
            { UserId: UserId },
            { deletedAt: null },
          ],
        },
      });
      if (isPrimary) {
        if (checkPrimaryAddress) {
          await Address.update(
            {
              isPrimary: false,
            },
            {
              where: {
                id: checkPrimaryAddress.dataValues.id,
              },
            }
          );
        }
      }
      const result = await Address.update(
        {
          ...data,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.send(result);
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getAddressById: async (req, res) => {
    try {
      const id = req.params.id;
      const filterAddressId = await Address.findOne({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: "filter address berdasarkan id",
        result: filterAddressId,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getAddressByisPrimary: async (req, res) => {
    try {
      const id = req.params.id;
      const filterAddressId = await Address.findOne({
        where: { [Op.and]: [{ isPrimary: true }, { UserId: id }] },
      });
      res.status(200).json({
        message: "filter address berdasarkan id",
        result: filterAddressId,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getAddressBranches: async (req, res) => {
    try {
      const id = req.params.id;
      const filterBranches = await Branch.findOne({
        where: { id: id },
      });
      res.status(200).json({
        message: "filter address branches berdasarkan id",
        result: filterBranches,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getAddress: async (req, res) => {
    try {
      const getAddress = await Address.findAll();
      res.status(200).json({
        message: "get address",
        result: getAddress,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getListAddressByUserId: async (req, res) => {
    try {
      const UserId = req.params.UserId;
      const filterListAddress = await Address.findAll({
        where: {
          UserId: UserId,
        },
      });
      res.status(200).json({
        message: "filter address berdasarkan user id",
        result: filterListAddress,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  deleteAddress: async (req, res) => {
    try {
      const { id } = req.query;

      const address = await Address.findByPk(id);
      if (!address) {
        return res.status(404).json({
          message: "Address not found",
        });
      }

      await address.destroy();
      return res.status(200).json({
        message: "Address deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
};

module.exports = addressController;
