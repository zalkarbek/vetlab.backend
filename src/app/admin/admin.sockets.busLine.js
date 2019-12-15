
const busLineModel = require('../../db/models/busLine');

module.exports = {

  onGetBusLine({ socket }) {
    return async () => {
      const lines = await busLineModel.find().exec();
      socket.emit('on_admin_get_bus_line', { data: lines });
    };
  },

  onCreateBusLine({ socket }) {
    return async (data) => {
      if(data && data.city && Array.isArray(data.lines)) {
        let nCreated = 0;
        data.lines.forEach((line, index) => {
          if(line && line.lineNomer) {
            const newBusLine = new busLineModel({
              lineCity: data.city,
              lineNomer: line.lineNomer,
              lineName: line.lineName,
              lineOpisanie: line.lineOpisanie,
              lineState: line.lineState,
              desc: line.desc
            });
            newBusLine.save().then((err) => {
              if(!err) nCreated += 1;
              if((index + 1) === data.lines.length) {
                socket.emit('on_admin_create_bus_line', {
                  error: false,
                  message: 'save success',
                  nCreated
                });
              }
            });
          }
        });
      } else {
        socket.emit('on_admin_create_bus_line', {
          error: true,
          message: 'lines is not a array'
        });
      }
    };
  },

  onUpdateBusLine({ socket }) {
    return async (data) => {
      if(data && Array.isArray(data.lines)) {
        let nModified = 0;
        data.lines.forEach((line, index) => {
          if(line && line._id) {
            busLineModel.updateOne({ _id: line._id }, line).then((err) => {
              if(!err) nModified += 1;
              if((index + 1) === data.lines.length) {
                socket.emit('on_admin_update_bus_line', {
                  error: false,
                  message: 'updated success',
                  nModified
                });
              }
            });
          }
        });
      } else {
        socket.emit('on_admin_update_bus_line', {
          error: true,
          message: 'lines is not array'
        });
      }
    };
  },

  onDeleteBusLine({ socket }) {
    return async (data) => {
      if(data && Array.isArray(data.busLine)) {
        let nDeleted = 0;
        data.busLine.forEach((line, index) => {
          busLineModel.deleteOne({ _id: line }).then((err) => {
            if(!err) nDeleted += 1;
            if((index + 1) === data.length) {
              socket.emit('on_admin_delete_bus_line', {
                error: false,
                message: 'delete success',
                nDeleted
              });
            }
          });
        });
      } else {
        socket.emit('on_admin_delete_bus_line', {
          error: true,
          message: 'data is not a array',
        });
      }
    };
  },

};