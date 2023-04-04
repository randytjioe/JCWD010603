const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
const Voucher = db.voucher;
const Voucher_type = db.voucher_type;

const voucherDiscountController = {
    createVoucherType: async (req, res) => {
        const data = req.body;
        const t = await sequelize.transaction();

        try {
            const voucherData = {
                name: data.name
            }
            const voucherType = await Voucher_type.create({ ...voucherData }, { transaction: t })
            if (!voucherType) {
                throw new Error('Failed to create')
            }

            await t.commit();
            res.status(201).send('Voucher type created successfully')
        } catch (err) {
            await t.rollback();
            return res.status(400).send(err)
        }
    },

    getVoucherType: async (req, res) => {
        try {
            const data = await Voucher_type.findAll({
                attributes: ['id', 'name']
            });
            return res.status(200).json({
                message: 'Voucher Category Data Successfully Fetched',
                result: data
            })
        } catch (err) {
            res.status(400).json({
                message: err,
            })
        }
    },

    deleteVoucherType: async (req, res) => {
        try {
            const { id } = req.params;

            const voucherType = await Voucher_type.findByPk(id);
            if (!voucherType) {
                return res.status(404).json({
                    message: "Voucher type not found",
                });
            }

            await voucherType.destroy();
            return res.status(200).json({
                message: "Voucher Type deleted successfully",
            });
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    },

    createVoucher: async (req, res) => {
        const data = req.body;
        const t = await sequelize.transaction();

        try {
            const voucher = {
                name: data.name,
                code: data.code,
                nominal: data.nominal,
                expiredDate: data.expiredDate,
                VoucherTypeId: data.VoucherTypeId
            }
            const vouchers = await Voucher.create({ ...voucher }, { transaction: t })
            if (!vouchers) {
                throw new Error('Failed to create')
            }

            await t.commit();
            res.status(201).send('Voucher created succesfully')
        } catch (err) {
            await t.rollback();
            res.status(400).send(err)
        }
    },
}

module.exports = voucherDiscountController