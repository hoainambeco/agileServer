const bcrypt = require("bcryptjs");

const User = require('../models/users.model')

exports.getAllUsers = async (req, res) => {
    const user = await User.find({});
    res.json(user)
};
exports.postReg = async (req, res) => {
    const u = await User.findOne({userName: req.body.userName});
    console.log(u);
    if(u){
        return res.json({
            message: "Tên đăng nhập đã tồn tại"
        });
    }
    else {
        try {
            const user = new User(req.body);
            user.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            if (!user.role)
                user.role = "User";
            await user.save()
            res.json({message: "Đăng ký thành công"});
        } catch (error) {
            res.json(error)
        }
    }
}
exports.posLogin = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.userName, req.body.password)
        if (!user) {
            return res.json({
                message: 'Thất bại'
            })
        } else {
            const token = await user.generateAuthToken()
            res.json({
                user, token, message: 'Thành công'
            })
        }
    } catch (error) {
        res.json(error)
    }
}
exports.getProfile = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user)
}
exports.postDeleteUser = (req, res) => {
    let dieu_kien = {
        _id: req.params.id
    }
    User.deleteOne(dieu_kien, function (err) {
        if (err) {
            res.json(err)
        } else {
            return res.json({
                message: 'Thành công'
            });
        }
    })
}

exports.postEditUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const userUpdate = {
            fullName: req.body.fullName,
            userName: user.userName,
            password: user.password,
            gender: req.body.gender,
            age: req.body.age,
            address: req.body.address,
            startWorkDate: req.body.startWorkDate,
            role:user.role,
        }
        console.log(userUpdate)
        User.updateOne({_id: req.params.id}, userUpdate, function (err) {
            if (err) {
                res.json(err)
            } else {
                res.json({userUpdate, msg: "Sửa thành công"});
            }
        })
    } catch (error) {
        res.json(error);
    }
}
exports.postEditPassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.json({
                message: "Mật khẩu cũ không đúng"
            });
        }
        const salt = bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(req.body.newPassword, salt);
        await user.save();
        res.json({message: "Đổi mật khẩu thành công"});
    } catch (error) {
        res.json(error);
    }
}
