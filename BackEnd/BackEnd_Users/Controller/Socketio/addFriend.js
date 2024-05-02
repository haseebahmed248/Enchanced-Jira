const redisClient = require('../../Redis/redis')

const addFriend = async(name,cb,socket)=>{
    console.log("username: "+name);
    const friend = await redisClient.hget(`userid:${name}`,"userid");
    console.log(friend)
    const friendList = await redisClient.lrange(`friends:${socket.decoded.username}`,0,-1);
    socket.emit("friends",friendList);
    console.log(friendList)
    if(name === socket.decoded.username){
        cb({errorMsg:"You can't add yourself as a friend",done:false});
        return;
    }
    await redisClient.lpush(`friends:${socket.decoded.username}`,friend);
    cb({done:true});
}
module.exports = addFriend;