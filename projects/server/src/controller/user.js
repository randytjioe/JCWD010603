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
  login: async (req, res) => {
    const { email, password } = req.body;
    const result = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (!result) {
      return res.status(400).json({
        message: "User not found",
      });
    } else {
      const check = bcrypt.compare(password, result.password);

      if (!check) {
        return res.status(400).json({
          message: "Wrong password",
        });
      } else {
        return res.status(200).json({
          message: "Logged in",
          result: result,
        });
      }
    }
  },
  register: async (req,res) => {
    const data = req.body

    const t = await sequelize.transaction();
    try {

    // check password 

    const password = bcrypt.hashSync(data.password, 10)

    const dataUser = {
        email : data.email,
        username : data.username,
        password : password,
        isVerify : false
    }

    const user = await User.create({...dataUser}, {transaction: t})
    if(!user){
        throw new Error('Create user failed')
    }

    const dataUserDetail = {
        UserId: user.dataValues.id,  
        birthDate : data.birthDate,
        gender : data.gender,
        firstName : data.firstName,
        lastName : data.lastName,
    }

    const userDetail = await User_detail.create({...dataUserDetail}, {transaction: t})
    if(!userDetail){
        throw new Error('Create user detail failed')
    }

    const dataAddress = {
        UserId: user.dataValues.id,  
        address : data.address,
        province : data.province,
        city : data.city,
        district : data.district,
        postalCode : data.postalCode,
        isActive : true
    }

    const address = await Address.create({...dataAddress}, {transaction: t})
    if(!address){
        throw new Error('Create user detail failed')
    }

    const token = jwt.sign({...user.dataValues}, secret_key, {expiresIn: "1h"})
    const href = `http://localhost:8000/user/verify/${token}`
      // verify via email
      const mail = await mailer({
        to: data.email,
        subject: "Verify Your Account!",
        html: `<!DOCTYPE html>
        <html>
        <head>
        
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Email Confirmation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
          /**
           * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
           */
          @media screen {
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 400;
              src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 700;
              src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
          }
          /**
           * Avoid browser level font resizing.
           * 1. Windows Mobile
           * 2. iOS / OSX
           */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
           * Remove extra space added to tables and cells in Outlook.
           */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
           * Better fluid images in Internet Explorer.
           */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
           * Remove blue links for iOS devices.
           */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
           * Fix centering issues in Android 4.4.
           */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
           * Collapse table borders to avoid space between cells.
           */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #1a82e2;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
          </style>
        
        </head>
        <body style="background-color: #e9ecef;">
          <!-- start body -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
        
            <!-- start hero -->
            <tr>
              <td align="center" bgcolor="#2C3639">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                      <center><h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email </h1>
                      </center>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end hero -->
        
            <!-- start copy block -->
            <tr>
              <td align="center" bgcolor="#2C3639">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <center><p style="margin: 0;">Welcome to KOPIO, please tap the button below to confirm your email address.</p></center>    
                    </td>
                  </tr>
                  <!-- end copy -->
        
                  <!-- start button -->
                  <tr>
                    <td align="left" bgcolor="#ffffff">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                  <a href="${href}" target="_blank" style="display: inline-block; padding: 10px 20px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify!</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end button -->
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                      <p style="margin: 0;">Cheers,<br> Admin</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end copy block -->
        
            <!-- start footer -->
            <tr>
              <td align="center" bgcolor="#2C3639" style="padding: 24px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <!-- start permission -->
                  <tr>
                    <td align="center" bgcolor="#2C3639" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #DCD7C9;">
                      <p style="margin: 0;">You received this email because we received a request for verification email for your account. If you didn't request verification email you can safely delete this email.</p>
                      <p style="margin: 0;">This email will expired in 30 days</p>
                    </td>
                  </tr>
                  <!-- end permission -->
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end footer -->
        
          </table>
          <!-- end body -->
        
        </body>
        </html>`
      })
      console.log(mail);

      await t.commit();
      res.status(201).send('Create user success')
    } catch(err) {
        await t.rollback();
        return res.status(400).send(err.message)
    }
},
verify : async (req,res) => {
    token = req.params.token
    
    const t = await sequelize.transaction();
    try {
        if(!token){
            throw new Error('Token is undefined')   
        }

        

        const verifyUser = jwt.verify(token, secret_key)
        console.log(verifyUser.exp);
        
        if(Date.now() >= verifyUser.exp * 1000){
            throw new Error('Token has been expired')
        }
        
        const user = await User.findByPk(verifyUser.id, {transaction: t})
        if(!user){
            throw new Error('Verify email failed, user not found')
        }

        if(user.dataValues.isVerify === true){
            throw new Error("Email has been verified")
        }
        
        await User.update({
            isVerify : true
        }, {
            where: {
                id : user.id
            }
        }, {transaction: t})

        res.status(201).send('Verify user success')
        await t.commit();
        
    } catch (err) {
        await t.rollback();
        return res.status(401).send(err.message)
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
    res.status(400).send(err);
  }
},
};

module.exports = userController;

