module.exports = async function({ socket }, data) {
  const EVENTS = this.getSocksEvents();
  const payload = socket.payload;
  const { napravlenieId, otdelId } = data;
  const otdelService = this.getService('otdel');
  const naService = this.getService('napravlenie');
  const vnytService = this.getService('vnytNapravlenie');

  const otdel = await otdelService.getOtdelById(otdelId);
  const napravilPersonalId = payload.personal.id;
  const napravlenDepartmentId = otdel.departmentId;

  const newInDirection = await vnytService.createVnytNapravlenie({
    ...data,
    napravilPersonalId,
    napravlenDepartmentId,
    status: 'pending'
  });
  const vnytDirection = await vnytService.getVnytNapravlenieById(newInDirection.id);
  await naService.updateNapravlenieStatus(napravlenieId, 'sended');

  if(!newInDirection) {
    socket.broadcast.emit(
      EVENTS.CLIENT_NAPRAVLENIE_SEND_TO_OTDEL,
      { error: true, message: 'error' }
    );
    return null;
  }
  socket.broadcast.emit(
    EVENTS.CLIENT_NAPRAVLENIE_SEND_TO_OTDEL,
    { error: false, data: vnytDirection }
  );
  return vnytDirection;
  // socket.to(`room_department_${otdel.departmentId}_otdel_${otdel.id}`).emit(
  //   EVENTS.CLIENT_NAPRAVLENIE_SEND_TO_OTDEL,
  //   napravlenies
  // );
};
