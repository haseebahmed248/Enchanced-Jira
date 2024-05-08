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
    const prassedFriendList = await parseFriendList(friendList);
    console.log(`${socket.decoded.username} friends:`, prassedFriendList);
    socket.emit("friends", prassedFriendList);
  };
  

  const parseFriendList = async friendList => {
    const newFriendList = [];
    if (Array.isArray(friendList)) {
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
    }
    console.log("inside friendList: ",friendList);
    console.log("insdie friend List: ",parseFriendList)
    console.log("Insides parsed List: ",newFriendList)
    return newFriendList;
  };

  module.exports = initializeUser