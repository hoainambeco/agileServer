const jwt = require('jsonwebtoken')
const User = require('../models/users.model')
require('dotenv').config()
const ky_tu_ma_hoa = process.env.TOKEN_SEC_KEY
const auth = async (res,req,next)=>{
    if(req.header('Authorization') === undefined){
        return res.status(403).send('token empty?')
    }
    const  token =req.header('Authorization').replace('Bearer','');
    console.log(token)
    const data = jwt.verify(token,ky_tu_ma_hoa)
    try {
        const  user = await  User.findOne({
            _id: data._id,'tokens.token':token
        })
        if (!user){
            throw  new Error()
        }
        req.user = user
        req.token = token
        next
    }catch (error){
        console.log(error)
        res.status(401).send({error:'Not authorized to access this resource'})
    }
}
module.exports = auth
