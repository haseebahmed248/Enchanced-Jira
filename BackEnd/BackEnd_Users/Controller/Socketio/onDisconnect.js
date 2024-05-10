const redisClient = require("../../Redis/redis");

const onDisconnect = async socket => {
  await redisClient.hset(
    `userid:${socket.decoded.username}`,
    "connected",
    false
  );
  const friendList = await redisClient.lrange(
    `friends:${socket.decoded.username}`,
    0,
    -1
  );
  const friendRooms = await parseFriendList(friendList).then(friends =>
    friends.map(friend => friend.userid)
  );
  console.log('list disconnect: ',friendRooms)
  socket.to(friendRooms).emit("connected", false, socket.decoded.username);
};

const parseFriendList = async friendList => {
    const newFriendList = [];
    for (let friend of friendList) {
      const parsedFriend = friend.split(".");
      const friendConnected = await redisClient.hget(
        `userid:${parsedFriend[0]}`,
        "connected"
      );
      newFriendList.push({
        username: parsedFriend[0],
        userid: parsedFriend[1],
        connected: friendConnected,
      });
    }
    return newFriendList;
  };

module.exports = onDisconnect;