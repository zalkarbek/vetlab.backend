module.exports = async function({ socket }, data) {
  const EVENTS = this.getSocksEvents();
  const { id, napravlenieId, personalId, otdelId, subOtdelId, rejectionDescription } = data;
  const vnyService = this.getService('vnytNapravlenie');
  await vnyService.personalRejectNapravlenie({
    id,
    personalId,
    otdelId,
    subOtdelId,
    rejectionDescription,
    napravlenieId
  });

  const vnytNap = await vnyService.getVnytNapravlenieById(id);
  socket.broadcast.emit(EVENTS.CLIENT_VNYT_NAPRAVLENIE_REJECT, vnytNap);
  return vnytNap;
};
