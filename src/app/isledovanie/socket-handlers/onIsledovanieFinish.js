module.exports = async function({ socket }, data) {
  const EVENTS = this.getSocksEvents();
  const {
    id,
    vnytNapravlenieId,
    isResult,
    personalId,
    otdelId,
    subOtdelId,
  } = data;
  const isService = this.getService('isledovanie');
  const vnytService = this.getService('vnytNapravlenie');

  console.log('server finish isledovanie started', data);

  const finished = await isService.finishIsledovanie({
    id,
    vnytNapravlenieId,
    isResult,
    otdelId,
    subOtdelId,
    personalId
  });

  if(finished) {
    const isledovanie = await isService.getById(id);
    await vnytService.updateVnytNapravlenieStatus(vnytNapravlenieId, 'completed');
    socket.broadcast.emit(EVENTS.CLIENT_VNYT_NAPRAVLENIE_STATUS_UPDATED, {
      id: vnytNapravlenieId,
      status: 'completed'
    });
    socket.broadcast.emit(EVENTS.CLIENT_FINISH_ISLEDOVANIE_SHARE, isledovanie);
    return isledovanie;
  }

  return { error: true, message: 'Что то пошло не так' };
};
