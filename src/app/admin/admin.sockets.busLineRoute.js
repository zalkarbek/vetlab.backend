
const busLineRouteModel = require('../../db/models/busLineRoute');

module.exports = {

  onGetBusLineRoute({ socket }) {
    return async (data) => {
      if(data && data.busLine) {
        const routes = await busLineRouteModel.find({ busLine: data.busLine }).exec();
        socket.emit('on_admin_get_bus_line_routes', { routes: routes });
      }
    };
  },

  onCreateBusLineRoute({ socket }) {
    return async (data) => {
      if(data && data.busLine && Array.isArray(data.routes)) {
        let nCreated = 0;
        data.routes.forEach((route, index) => {
          if(route && data.busLine) {
            const newBusLineRoute = new busLineRouteModel({
              busLine: data.busLine,
              busLineRouteName: route.busLineRouteNumber,
              busLineRouteNumber: index + 1,
              busLineRouteDesc: route.busLineRouteDesc,
              busLineRouteLocation: route.busLineRouteLocation,
              desc: route.desc
            });
            newBusLineRoute.save().then((err) => {
              if(!err) nCreated += 1;
              if((index + 1) === data.routes.length) {
                socket.emit('on_admin_create_bus_line_route', {
                  error: false,
                  message: 'save success',
                  nCreated
                });
              }
            });
          }
        });
      } else {
        socket.emit('on_admin_create_bus_line_route', {
          error: true,
          message: 'routes is not a array'
        });
      }
    };
  },

  onUpdateBusLineRoute({ socket }) {
    return async (data) => {
      if(data && data.routes && Array.isArray(data.routes)) {
        let nModified = 0;
        data.routes.forEach((route, index) => {
          busLineRouteModel.updateOne({ _id: route._id }, route).then((err) => {
            if(!err) nModified += 1;
            if((index + 1) === data.lines.length) {
              socket.emit('on_admin_update_bus_line_route', {
                error: false,
                message: 'updated success',
                nModified
              });
            }
          });
        });
      } else {
        socket.emit('on_admin_update_bus_line_route', {
          error: true,
          message: 'routes is not a array'
        });
      }
    };
  },

  onDeleteBusLineRoute({ socket }) {
    return async (data) => {
      if(data && Array.isArray(data)) {
        let nDeleted = 0;
        data.forEach((id, index) => {
          busLineRouteModel.deleteOne({ _id: id }).then((err) => {
            if(!err) nDeleted += 1;
            if((index + 1) === data.length) {
              socket.emit('on_admin_delete_bus_line_route', {
                error: false,
                message: 'delete success',
                nDeleted
              });
            }
          });
        });
      } else {
        socket.emit('on_admin_delete_bus_line_route', {
          error: true,
          message: 'data is not a array',
        });
      }
    };
  },
};