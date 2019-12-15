
const fs = require('fs');
const jwt = require('jsonwebtoken');

const jwtConfig = require('../../config/jwt');
const tokenGenerator = require('../../helpers/token-generator');

const db = require('../../db/models/index');
const crypter = require('../../helpers/crypter');

const privateKey = fs.readFileSync('jwtRS256.key');

class AuthController {

  // Авторизация пользователей
  async userAuthenticate(req, res) {
    const { email, password } = req.body;

    const user = await db.User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.json({
        error: true,
        message: 'Authorization failed login or password wrong'
      });
    }

    if(await crypter.validPwd(password, user.password)) {
      user.tokenId = tokenGenerator.uid();
      const token = jwt.sign({
        userId: user.id,
        name: user.name,
        login: user.login,
        email: user.email,
        tokenId: user.tokenId
      }, privateKey, jwtConfig);

      await user.save();

      return res.json({
        error: false,
        message: 'Authorization success',
        token,
        user: {
          name: user.name,
          login: user.login,
          email: user.email,
        }
      });

    }

    return res.json({
      error: true,
      message: 'Authorization failed login or password wrong',
    });

  }

  // // Авторизация админов
  // async adminAuthenticate(req, res) {
  //   const { jsonStr } = req.body;
  //   let parsedData = {};
  //
  //   if(jsonStr) {
  //     try {
  //       parsedData = JSON.parse(jsonStr);
  //     } catch (e) {
  //       parsedData = {};
  //       return await res.json({
  //         error: true,
  //         message: 'JSON String parsed error'
  //       });
  //     }
  //   }
  //
  //   const { login, pwd } =
  //     (Object.entries(parsedData).length !== 0 && parsedData) ||
  //     (Object.entries(req.body).length !== 0 && req.body) || {};
  //
  //   const admin = await adminModel.findOne({ login: login }).exec();
  //
  //   if(!admin) {
  //     return res.json({
  //       error: true,
  //       message: 'Authorization Failed'
  //     });
  //   }
  //
  //   if(admin.validPwd(pwd)) {
  //     const tokenId = tokenGenerator.generateTokenId();
  //     admin.tokenId = tokenId;
  //     await admin.save();
  //     const token = jwt.sign({
  //       adminId: admin._id,
  //       login: admin.login,
  //       email: admin.email,
  //       tokenId: tokenId,
  //     }, privateKey, jwtConfig);
  //
  //     return res.json({
  //       error: false,
  //       message: 'Authorization success',
  //       profile: {
  //         login: admin.login,
  //         email: admin.email,
  //         name: admin.name,
  //       },
  //       token
  //     });
  //   }
  //   return res.json({
  //     error: true,
  //     message: 'Authorization  login or password wrong',
  //   });
  // }
  // // Авторизация водителей
  // async driverSignIn(req, res) {
  //   const { jsonStr } = req.body;
  //   let parsedData = {};
  //
  //   try {
  //     parsedData = JSON.parse(jsonStr);
  //   }catch (e) {
  //     parsedData = {};
  //     return await res.json({
  //       error: true,
  //       message: 'JSON String parsed error'
  //     });
  //   }
  //   const { driverPhone, driverPwd } = parsedData || req.body;
  //
  //   const driver = await driverModel.findOne({ driverPhone }).exec();
  //   const bus = await busModel.findOne({ busDriver: driver._id }).populate('busLine').exec();
  //
  //   if(!driver) {
  //     return res.json({
  //       error: true,
  //       message: 'Login Error'
  //     });
  //
  //   } else {
  //     if(driver.validPassword(driverPwd)) {
  //
  //       const token = jwt.sign({
  //         driverId: driver._id,
  //         driverName: driver.driverName,
  //         driverBusLineId: bus.busLine._id,
  //         driverBusLineNomer: bus.busLine.lineNomer,
  //         driverPhone: driver.driverPhone,
  //         busId: bus._id
  //       }, privateKey, jwtConfig);
  //
  //       return res.json({
  //         error: false,
  //         message: 'Authorization success',
  //         driverName: driver.driverName,
  //         driverPhone: driver.driverPhone,
  //         driverBusLineNomer: bus.busLine.lineNomer,
  //         token
  //       });
  //
  //     } else {
  //       return  res.json({
  //         error: true,
  //         message: 'Authorization error'
  //       });
  //     }
  //   }
  // }
  // // Регистрация водителей
  // async driverSignUp(req, res) {
  //
  //   const { jsonStr } = req.body;
  //   let parsedData = {};
  //
  //   try {
  //     parsedData = JSON.parse(jsonStr);
  //   }catch (e) {
  //     parsedData = {};
  //     return res.json({
  //       error: true,
  //       message: 'JSON String parsed error'
  //     });
  //   }
  //
  //   const {
  //     driverName,
  //     driverPhone,
  //     driverPwd,
  //     authorized_token,
  //     driverBusGosNomer,
  //     driverBusLineId,
  //     driverBusLineNomer,
  //     driverTransportType,
  //   } = parsedData || req.body;
  //
  //   if(!driverPhone && !driverBusLineId && !driverPwd) {
  //     return res.json({
  //       error: true,
  //       message: 'Empty body'
  //     });
  //   }
  //   const driver = new driverModel({
  //     _id: mongoose.Types.ObjectId(),
  //     driverName,
  //     driverPhone,
  //     authorized_token
  //   });
  //   const bus = new busModel({
  //     _id: mongoose.Types.ObjectId(),
  //     busLine: driverBusLineId,
  //     busGosNomer: driverBusGosNomer,
  //     busType: driverTransportType,
  //     busState: 'active',
  //   });
  //
  //   driver.hashPassword(driverPwd);
  //
  //   driver.driverBus = bus._id;
  //   bus.busDriver = driver._id;
  //
  //   driver.save(async (err) => {
  //     if(err) return res.json({ error: true, message: 'Driver not saved', err });
  //
  //     // сохранение автобуса
  //     bus.save();
  //
  //     // генерация токена для авторизации
  //     const token = jwt.sign({
  //       driverId: driver._id,
  //       driverName,
  //       driverBusLineId,
  //       driverBusLineNomer,
  //       driverPhone,
  //       busId: bus._id
  //     }, privateKey, jwtConfig);
  //
  //     return res.json({
  //       error: false,
  //       message: 'success registration',
  //       token,
  //       driverName,
  //       driverPhone,
  //       driverBusLineNomer
  //     });
  //   });
  // }
}

module.exports = new AuthController();
module.exports.AuthController = AuthController;
