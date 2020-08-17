module.exports = async function({ socket }, data) {
  const EVENTS = this.getSocksEvents();
  const {
    id,
    vnytNapravlenieId,
    isResult,
    isledovanieDataJSON,
    personalId,
    otdelId,
    subOtdelId,
  } = data;
  const isService = this.getService('isledovanie');
  const vnytService = this.getService('vnytNapravlenie');

  const finished = await isService.finishIsledovanie({
    id,
    vnytNapravlenieId,
    isResult,
    isledovanieDataJSON,
    otdelId,
    subOtdelId,
    personalId
  });

  if(finished) {
    const isledovanie = await isService.getById(id);
    await vnytService.updateVnytNapravlenieStatus(vnytNapravlenieId, 'completed');
    socket.broadcast.emit(EVENTS.CLIENT_VNYT_NAPRAVLENIE_STATUS_UPDATED, {
      data: {
        id: vnytNapravlenieId,
        status: 'completed'
      }
    });
    socket.broadcast.emit(EVENTS.CLIENT_FINISH_ISLEDOVANIE_SHARE, {
      data: isledovanie
    });
    return isledovanie;
  }

  return { error: true, message: 'Что то пошло не так' };
};
