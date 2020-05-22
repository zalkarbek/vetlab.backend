module.exports = async function({ socket }, data) {
  const EVENTS = this.getSocksEvents();
  const { id, personalId, otdelId, subOtdelId } = data;
  const vnytNapravlenieService = this.getService('vnytNapravlenie');
  await vnytNapravlenieService.personalAcceptVnytNapravlenie({
    id,
    personalId,
    otdelId,
    subOtdelId
  });
  const vnytNapravlenie = await vnytNapravlenieService.getVnytNapravlenieById(id);
  socket.emit(EVENTS.CLIENT_VNYT_NAPRAVLENIE_ACCEPT_SUCCESS, vnytNapravlenie);
  // socket.broadcast.emit(EVENTS.CLIENT_VNYT_NAPRAVLENIE_ACCEPT_SUCCESS, vnytNapravlenie);
};
