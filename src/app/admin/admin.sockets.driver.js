
const driverModel = require('../../db/models/driver');
const busModel = require('../../db/models/bus');
const { mongoose } = require('../../db/index');

module.exports = {
  onGetDriver({ socket }) {
    return async () => {
      const drivers = await driverModel
        .find()
        .select('driverName driverPhone driverState driverBus desc')
        .populate({
          path: 'driverBus',
          select: 'busLine busGosNomer busType desc'
        })
        .exec();
      socket.emit('on_admin_get_driver', { drivers });
    };
  },

  onCreateDriver({ socket }) {
    return async (data) => {
      if(data && Array.isArray(data.drivers)) {
        let nCreated = 0;
        data.drivers.forEach((driver, index) => {
          if(driver && driver.driverPhone && driver.driverPwd && driver.driverBus) {

            const newDriver = new driverModel({
              _id: mongoose.Types.ObjectId(),
              driverName: driver.driverName,
              driverPhone: driver.driverPhone,
              driverState: driver.driverState,
              authorized_token: driver.driverAuthToken,
              desc: driver.desc
            });
            newDriver.hashPassword(driver.driverPwd);

            const driverBus = driver.driverBus;

            const newBus = new busModel({
              _id: mongoose.Types.ObjectId(),
              busLine: driverBus.busLine,
              busGosNomer: driverBus.busGosNomer,
              busType: driverBus.busType,
              desc: driverBus.desc,
            });

            newDriver.driverBus = newBus._id;
            newBus.busDriver = newDriver._id;

            newDriver.save().then(async() => {
              newBus.save().then(async () => {
                nCreated += 1;
                if((index + 1) === data.drivers.length) {
                  socket.emit('on_admin_create_driver', {
                    error: false,
                    message: 'create success',
                    nCreated
                  });
                }
              });
            });

          } else {
            socket.emit('on_admin_create_driver', {
              error: true,
              message: 'Данные заполнены не полностью'
            });
          }
        });
      } else {
        socket.emit('on_admin_create_driver', {
          error: true,
          message: 'Данные пустые'
        });
      }
    };
  },

  onUpdateDriver({ socket }) {
    return async (data) => {
      if(data && Array.isArray(data.drivers)) {
        let nModified = 0;
        data.drivers.forEach((driver, index) => {
          const driverBus = driver.driverBus;
          delete driver.driverBus;
          driverModel.updateOne({ _id: driver._id }, driver).then((result) => {
            nModified += result.nModified;
            busModel.updateOne({ busDriver: driver._id }, driverBus ).then((result) => {
              if((index + 1) === data.drivers.length) {
                socket.emit('on_admin_update_driver', {
                  error: false,
                  message: 'updated success',
                  nModified
                });
              }
            });
          });
        });
      } else {
        socket.emit('on_admin_update_driver', {
          error: true,
          message: 'drivers is not array'
        });
      }
    };
  },

  onDeleteDriver({ socket }) {
    return async (data) => {
      if(data && Array.isArray(data.drivers)) {
        let nDeleted = 0;
        data.drivers.forEach((driver, index) => {
          driverModel.deleteOne({ _id: driver._id }).then((deletedDriver) => {
            busModel.deleteOne({ busDriver: driver._id }).then(() => {
              nDeleted += 1;
              if((index + 1) === data.drivers.length) {
                socket.emit('on_admin_delete_driver', {
                  error: false,
                  message: 'delete success',
                  nDeleted
                });
              }
            });
          });
        });
      } else {
        socket.emit('on_admin_delete_driver', {
          error: true,
          message: 'drivers is not array'
        });
      }
    };
  },

  onUpdateDriverState({ socket }) {
    return async (data) => {
      if(data && data._id) {
        try {
          const updated = await driverModel.updateOne({ _id: data._id }, { driverState: data.driverState });
          socket.emit('on_admin_change_driver_state', {
            error: false,
            message: 'success change state',
            updated
          });
        } catch (err) {
          socket.emit('on_admin_change_driver_state', {
            error: true,
            message: 'change failed',
            err
          });
        }
      } else {
        socket.emit('on_admin_change_driver_state', {
          error: true,
          message: 'error wrong data',
        });
      }
    };
  },

  onChangeDriverPwd({ socket }) {
    return async (data) => {
      if(data && data._id && data.newPwd) {
        try {
          const driver = await driverModel.findById({ _id: data._id }).exec();
          driver.hashPassword(data.newPwd);
          await driver.save();
          socket.emit('on_admin_change_driver_pwd', {
            error: false,
            message: 'changed password success',
          });
        } catch (err) {
          socket.emit('on_admin_change_driver_pwd', {
            error: true,
            message: 'something wrong',
            err
          });
        }
      } else {
        socket.emit('on_admin_change_driver_pwd', {
          error: true,
          message: 'error empty data',
        });
      }
    };
  }

};