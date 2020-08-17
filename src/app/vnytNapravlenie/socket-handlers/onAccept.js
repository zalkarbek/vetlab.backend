module.exports = async function({ socket }, data) {
  const EVENTS = this.getSocksEvents();
  const { id, personalId, otdelId, subOtdelId } = data;
  const vnyService = this.getService('vnytNapravlenie');
  await vnyService.personalAcceptVnytNapravlenie({
    id,
    personalId,
    otdelId,
    subOtdelId
  });
  const vnyt = await vnyService.getVnytNapravlenieById(id);
  socket.broadcast.emit(EVENTS.CLIENT_VNYT_NAPRAVLENIE_ACCEPT_SUCCESS, {
    data: vnyt
  });
  return vnyt;
};
