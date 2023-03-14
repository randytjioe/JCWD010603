const db = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../models');

const Admins = db.admin;
const Branch = db.branch;

const adminController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const result = await Admins.findOne({
            where: {
                email: {
                    [Op.eq]: sequelize.literal(`BINARY '${email}'`)
                }
            }
        })

        if (!result) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        else {
            const check = bcrypt.compare(password, result.password)

            if (!check) {
                return res.status(400).json({
                    message: "Wrong password"
                })
            }

            else {
                return res.status(200).json({
                    message: "Logged in",
                    result: result
                })
            }
        }
    },

    createAdmin: async (req, res) => {
        const data = req.body

        const t = await sequelize.transaction();
        try {
            const password = bcrypt.hashSync(data.password, 10)

            const dataAdmin = {
                username: data.username,
                email: data.email,
                password: password,
                isSuperAdmin: false,
                BranchId: data.branches
            }

            const admin = await Admins.create({ ...dataAdmin }, { transaction: t })
            if (!admin) {
                throw new Error('Failed to create')
            }
            await t.commit();
            res.status(201).send('Create user success')
        } catch (err) {
            console.log(err);
            await t.rollback();
            return res.status(400).send(err)
        }
    },

    getAdmin: async (req, res) => {
        try {
            const result = await Admins.findAll({
                attributes: ['id', 'username', 'email', 'isSuperAdmin', 'BranchId'],
                include: {
                    model: Branch,
                    attributes: ['city']
                }
            });
            return res.status(200).json({
                message: 'admin data fetched',
                result: result,
            });

        } catch (err) {
            return res.status(400).json({
                message: err,
            });
        }
    },

    deleteAdmin: async (req, res) => {
        try {
            const { id } = req.params;

            const admin = await Admins.findByPk(id);
            if (!admin) {
                return res.status(404).json({
                    message: "Admin not found",
                });
            }

            if (admin.isSuperAdmin) {
                return res.status(400).json({
                    message: "Cannot delete super admin",
                });
            }

            await admin.destroy();
            return res.status(200).json({
                message: "Admin deleted successfully",
            });
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    },

    createBranches: async (req, res) => {
        const data = req.body;

        const t = await sequelize.transaction();
        try {
            const dataBranch = {
                name: data.name,
                district: data.district,
                city: data.city,
                province: data.province,
                postalCode: data.postalCode
            }

            const branch = await Branch.create({ ...dataBranch }, { transaction: t })
            if (!branch) {
                throw new Error('Failed to create')
            }
            await t.commit();
            res.status(201).send('Create branches success')
        } catch (err) {
            console.log(err);
            await t.rollback();
            return res.status(400).send(err)
        }
    },

    getBranches: async (req, res) => {
        try {
            const result = await Branch.findAll({
                attributes: ['id', 'name', 'district', 'city', 'province', 'postalCode'],
            });
            return res.status(200).json({
                message: 'branch data fetched',
                result: result,
            });

        } catch (err) {
            return res.status(400).json({
                message: err,
            });
        }
    },

    deleteBranches: async (req, res) => {
        try {
            const { id } = req.params;

            const branch = await Branch.findByPk(id);
            if (!branch) {
                return res.status(404).json({
                    message: "Branches not found",
                });
            }

            await branch.destroy();
            return res.status(200).json({
                message: "Branch deleted successfully",
            });
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    },
}

module.exports = adminController
