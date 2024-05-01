require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSign = (payload,secret,options)=>
    new Promise((resolve,reject)=>{
        jwt.sign(payload,secret,options,(err,token)=>{
            if(err) reject(err);
            resolve(token);
        })
    });
    
module.exports = jwtSign;