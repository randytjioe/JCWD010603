const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");

const Record_stock = db.record_stock;

const Branch = db.branch;
const Category = db.category;
const Product = db.product;

const productController = {
  create: async (req, res) => {
    const { name, BranchId } = req.body;
    const stock = parseInt(req.body.stock);
    let status = parseInt(req.query.status);
    if (stock == null || undefined || "" || 0) {
      status = 0;
    }

    const t = await sequelize.transaction();
    try {
      if (!req.file) {
        throw new Error("File is not compatible");
      }

      // get filename
      let fileName = req.file.filename;
      // rewrite filename and add url
      fileName = process.env.render_img + fileName;

      // combine object req.body and added image name
      const data = {
        ...req.body,
        imgProduct: fileName,
      };
      // console.log(data);
      const result = await Product.create({ ...data }, { transaction: t });
      if (!result) {
        throw new Error("Failed add new product");
      }

      if (status) {
        console.log("record running");
        const record = {
          stockBefore: 0,
          stockAfter: stock,
          desc: `Added new stock product ${name}`,
          TypeStockId: 1,
          ProductId: result.dataValues.id,
          BranchId: BranchId,
        };

        const stockReport = await Record_stock.create(
          { ...record },
          { transaction: t }
        );

        if (!stockReport) {
          throw new Error("Failed create record stock new product");
        }
      }

      await t.commit();
      res.status(201).json({ message: "Success add new product" });
    } catch (err) {
      console.log(err);
      await t.rollback();
      return res.status(401).json({ message: err.message });
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const { BranchId } = req.body;
    const stock = parseInt(req.body.stock);
    let status = parseInt(req.query.status);

    const t = await sequelize.transaction();
    try {
      if (stock == 0) {
        throw new Error(
          `Failed update product because value stock changed to 0`
        );
      }

      let data = {};

      if (req.file) {
        let fileName = req.file.filename;
        // rewrite filename and add url
        fileName = process.env.render_img + fileName;

        // combine object req.body and added image name
        data = {
          ...req.body,
          imgProduct: fileName,
        };
      } else {
        data = {
          ...req.body,
        };
      }
      const checkStock = await Product.findOne(
        { where: { id: id } },
        { transaction: t }
      );

      if (!checkStock) {
        throw new Error("Product is not found");
      }

      const befStock = checkStock.dataValues.stock;
      const name = checkStock.dataValues.name;

      const result = await Product.update(
        { ...data },
        {
          where: {
            id: id,
          },
        },
        { transaction: t }
      );

      if (!result) {
        throw new Error("Failed update data");
      }

      if (status) {
        const record = {
          stockBefore: befStock,
          stockAfter: stock,
          desc: `Updated the stock product ${name} to ${stock} pcs`,
          TypeStockId: 2,
          ProductId: id,
          BranchId: BranchId,
        };
        const stockReport = await Record_stock.create(
          { ...record },
          { transaction: t }
        );
        if (!stockReport) {
          throw new Error("Failed update report stock data");
        }
      }
      await t.commit();
      res.status(201).json({ message: "Success update data" });
    } catch (err) {
      await t.rollback();
      return res.status(401).json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const { BranchId } = req.query;

    const t = await sequelize.transaction();
    try {
      const checkStock = await Product.findOne(
        { where: { id: id } },
        { transaction: t }
      );

      if (!checkStock) {
        throw new Error("Product is not found");
      }

      const befStock = checkStock.dataValues.stock;
      const name = checkStock.dataValues.name;

      const record = {
        stockBefore: befStock,
        stockAfter: 0,
        desc: `Delete the stock of product ${name}, because the product has been deleted`,
        TypeStockId: 3,
        ProductId: id,
        BranchId: BranchId,
      };

      const result = await Product.destroy(
        { where: { id: id } },
        { transaction: t }
      );
      if (!result) {
        throw new Error("Delete data failed");
      }

      const stockReport = await Record_stock.create(
        { ...record },
        { transaction: t }
      );
      if (!stockReport) {
        throw new Error("Failed update report stock data");
      }

      await t.commit();
      res.status(201).json({ message: "Delete data success" });
    } catch (err) {
      await t.rollback();
      return res.status(401).json({ message: err.message });
    }
  },
  getCountProductByBranch: async (req, res) => {
    try {
      const id = req.params.id;
      const filterBranch = await Product.count({
        include: [
          {
            model: Branch,
            attributes: ["name"],
          },
        ],
        // attributes: [sequelize.fn("COUNT", sequelize.col("BranchId"))],
        where: {
          BranchId: id,
        },
      });

      res.status(200).json({
        message: "count product berdasarkan branch",
        result: filterBranch,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const result = await Product.count({
        include: [
          {
            model: Branch,
            attributes: ["name"],
          },
        ],
        // attributes: [sequelize.fn("COUNT", sequelize.col("BranchId"))],
      });

      res.status(200).json({
        message: "data fetched",
        result: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getStockByBranch: async (req, res) => {
    try {
      const id = req.params.id;
      const countStock = await Product.findAll({
        attributes: [[sequelize.fn("sum", sequelize.col("stock")), "stock"]],
        where: {
          BranchId: id,
        },
      });

      res.status(200).json({
        message: "count stock berdasarkan branch",
        result: countStock,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getProductByName: async (req, res) => {
    try {
      const name = req.query.name;
      const filterName = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      res.status(200).json({
        message: "find product berdasarkan nama",
        result: filterName,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  },
  getProductByNameByBranch: async (req, res) => {
    try {
      const name = req.query.name;
      const branch = req.query.branch;
      const filterName = await Product.findAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.like]: `%${name}%`,
              },
            },
            { BranchId: branch },
          ],
        },
      });
      res.status(200).json({
        message: "find product berdasarkan nama",
        result: filterName,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  },
  getFilterProductByNameByBranch: async (req, res, next) => {
    const { filter, sort, BranchId, order } = req.query;
    const paramQuerySQL = {};

    // filtering by category
    if (filter !== "" && typeof filter !== "undefined") {
      const query = filter.category.split(",").map((item) => ({
        [Op.eq]: item,
      }));

      paramQuerySQL.where = {
        [Op.and]: [{ BranchId: BranchId }, { CategoryId: { [Op.or]: query } }],
      };
    }

    // sorting
    if (sort !== "" && typeof sort !== "undefined") {
      let query;
      if (sort.charAt(0) !== "-") {
        query = [[sort, order]];
      } else {
        query = [[sort.replace("-", ""), order]];
      }

      paramQuerySQL.order = query;
    }

    try {
      const data = await Product.findAll(paramQuerySQL);
      if (data) {
        res.status(200).json({
          message: "filter product berhasil",
          result: data,
        });
      }
    } catch (err) {
      next(err);
      res.status(400).json({
        message: err.message,
      });
    }
  },
  getFilterProductByNameByAllBranch: async (req, res, next) => {
    const { filter, sort, order } = req.query;
    const paramQuerySQL = {};

    // filtering by category
    if (filter !== "" && typeof filter !== "undefined") {
      const query = filter.category.split(",").map((item) => ({
        [Op.eq]: item,
      }));

      paramQuerySQL.where = {
        CategoryId: { [Op.or]: query },
      };
    }

    // sorting
    if (sort !== "" && typeof sort !== "undefined") {
      let query;
      if (sort.charAt(0) !== "-") {
        query = [[sort, order]];
      } else {
        query = [[sort.replace("-", ""), order]];
      }

      paramQuerySQL.order = query;
    }

    try {
      const data = await Product.findAll(paramQuerySQL);
      if (data) {
        res.status(200).json({
          message: "filter product berhasil",
          result: data,
        });
      }
    } catch (err) {
      next(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const filterId = await Product.findOne({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
        ],
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: "filter product berdasarkan id",
        result: filterId,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },

  getCategory: async (req, res) => {
    try {
      const getCategory = await Category.findAll();
      res.status(200).json({
        message: "get category",
        result: getCategory,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getProduct: async (req, res) => {
    try {
      const getProduct = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
        ],
      });
      return res.status(200).json({
        message: "get product",
        result: getProduct,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getProductbyBranch: async (req, res) => {
    try {
      const id = req.params.id;
      const getProduct = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
        ],
        where: {
          BranchId: id,
        },
      });
      res.status(200).json({
        message: "get product",
        result: getProduct,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },

  getProductSuggestion: async (req, res) => {
    const { BranchId } = req.params;

    try {
      const getProduct = await Product.findAll({
        where: {
          BranchId,
          stock: { [Op.gt]: 0 }, // only fetch products with available stock
        },
        limit: 6,
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
        ],
      });

      res.status(200).json({
        message: `get product suggestion for branch ${BranchId} with available stock`,
        result: getProduct,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getProductFilterBranch: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = parseInt(req.query.search) || "";
    const offset = limit * (page - 1);
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order || "DESC";
    const id = req.params.id;
    const t = await sequelize.transaction();

    try {
      const totalRows = await Product.count(
        {
          where: {
            [Op.and]: [
              {
                BranchId: id,
              },
            ],
          },
        },
        { transaction: t }
      );
      if (totalRows == 0) {
        throw new Error("Fetching data failed");
      }

      const totalPage = Math.ceil(totalRows / limit);
      const result = await Product.findAll(
        {
          where: {
            [Op.and]: [
              {
                BranchId: id,
              },
            ],
          },
          include: [
            {
              model: Category,
              attributes: ["name"],
            },
          ],
          offset: offset,
          limit: limit,
          order: [[sortBy, order]],
        },
        { transaction: t }
      );

      if (!result) {
        throw new Error("Fetching all product branch failed");
      }

      await t.commit();
      res.status(201).json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage,
        order: order,
      });
    } catch (err) {
      await t.rollback();
      return res.status(401).json({ message: err.message });
    }
  },
};

module.exports = productController;
