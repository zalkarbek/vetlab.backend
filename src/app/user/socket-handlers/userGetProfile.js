module.exports = async function({ socket }) {
  const EVENTS = this.getSocksEvents();
  const { tokenId, ...profile } = socket.payload;
  socket.emit(EVENTS.USER_CLIENT_GET_PROFILE, profile);
};
