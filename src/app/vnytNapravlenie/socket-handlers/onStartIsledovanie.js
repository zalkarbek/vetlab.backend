module.exports = async function({ socket }, data) {
  const EVENTS = this.getSocksEvents();
  const {
    vnytNapravlenieId,
    napravlenieId,
    metodIdJSON,
    opPokazatelIdJSON,
    personalId,
    otdelId,
    subOtdelId
  } = data;

  const isService = this.getService('isledovanie');
  const vnytService = this.getService('vnytNapravlenie');
  const newIs = await isService.startIsledovanie({
    vnytNapravlenieId,
    napravlenieId,
    metodIdJSON,
    opPokazatelIdJSON,
    personalId,
    otdelId,
    subOtdelId
  });

  await vnytService.updateVnytNapravlenieStatus(vnytNapravlenieId, 'research');
  const isledovanie = await isService.getById(newIs.id);
  socket.broadcast.emit(EVENTS.CLIENT_START_ISLEDOVANIE_SHARE, isledovanie);
  return isledovanie;
};
