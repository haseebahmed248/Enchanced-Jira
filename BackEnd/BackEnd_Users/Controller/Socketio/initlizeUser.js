const redisClient = require("../../Redis/redis");
const initializeUser = async socket => {
    socket.join(socket.decoded.id);
    await redisClient.hset(
      `userid:${socket.decoded.username}`,
      "userid",
      socket.decoded.id,
      "connected",
      true
    );
    const friendList = await redisClient.lrange(
      `friends:${socket.decoded.username}`,
      0,
      -1
    );
    console.log(`${socket.decoded.username} friends:`, friendList);
    socket.emit("friends", friendList);
  };

  module.exports = initializeUser