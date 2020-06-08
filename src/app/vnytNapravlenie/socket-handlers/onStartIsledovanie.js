module.exports = async function({ socket }, data) {
  const EVENTS = this.getSocksEvents();
  const {
    vnytNapravlenieId,
    napravlenieId,
    metodJSON,
    opPokazatelJSON,
    personalId,
    otdelId,
    subOtdelId
  } = data;

  const isService = this.getService('isledovanie');
  const vnytService = this.getService('vnytNapravlenie');
  const newIs = await isService.startIsledovanie({
    vnytNapravlenieId,
    napravlenieId,
    metodJSON,
    opPokazatelJSON,
    personalId,
    otdelId,
    subOtdelId
  });

  await vnytService.updateVnytNapravlenieStatus(vnytNapravlenieId, 'research');
  const isledovanie = await isService.getById(newIs.id);
  socket.broadcast.emit(EVENTS.CLIENT_VNYT_NAPRAVLENIE_STATUS_UPDATED, {
    id: vnytNapravlenieId,
    status: 'research'
  });
  socket.broadcast.emit(EVENTS.CLIENT_START_ISLEDOVANIE_SHARE, isledovanie);
  return isledovanie;
};
