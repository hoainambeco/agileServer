const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hoainambeco:01684490544Fe@cluster0.f6gva.mongodb.net/Agile').then(function () {
    console.log('Connected to MongoDB');
}).catch(e => {
    console.log('Error: ', e);
});
const jwt = require('jsonwebtoken');
require('dotenv').config();
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    fullName: String,
    userName: String,
    password: String,
    gender : String,
    age : Number,
    address: String,
    startWorkDate: Date,
    role:String,
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})
userSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log(user)
    const token = jwt.sign({_id: user._id}, chuoi_ky_tu_bi_mat)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (TaiKhoan, MatKhau) => {
    const user = await Users.findOne({
        userName: TaiKhoan
    })
    if (!user) {
        throw  new Error({error: 'Tài khoản không tồn tại'})
    }
    const isMacth = await bcrypt.compare(MatKhau, user.password)
    console.log(isMacth)
    if (!isMacth) {
        throw new Error({error: 'Mật khẩu không đúng'})
    }
    return user
}
const Users = mongoose.model('NhanVien', userSchema)
module.exports = Users
