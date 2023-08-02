const user_route = require('../routes/route');
const User = require('../models/user_scehma');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
// SignUP API
module.exports.SignUP = async function (req, res) {
    try {
        const { username, email, phone_number, password, confirm_password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(req.body.password,salt);
        const new_user = new User({
            username: username,
            email: email,
            phone_number: phone_number,
            password: hashpass,
            confirm_password: confirm_password
        })
        if (password != confirm_password) {
            return res.status(401).json({ message: "Password does not match confirm password" })
        }
        const user = await new_user.save();
        return res.status(200).json({
            message: "Registered Sucessfully",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}

// Login API
module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User does not found" })
        }
        const validated = await bcrypt.compare(req.body.password,user.password);
        if (!validated) {
            return res.status(401).json({ message: "Wrong Password" })
        }
        return res.status(200).json({
            user,
            data: {
                token: jwt.sign(user.toJSON(), 'Guruji_Astro', { expiresIn: 10000 })
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}

// Password Updated API
module.exports.update = async function (req, res) {
    try {
        const { email, password, new_password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User does not found" })
        }
        const validated = await bcrypt.compare(req.body.password,user.password);
        if(!validated){
          return res.status(403).json('Wrong Password');
        }
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(new_password,salt);
        const update = await User.findByIdAndUpdate(user._id,{
          password:hashpass
        })
        return res.status(200).json({
            message: "Updated Successfully",
            update
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}

// User Deleted API
module.exports.delete = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User does not found" })
        }
        const validated = await bcrypt.compare(req.body.password,user.password);
        if(!validated){
          return res.status(403).json('Wrong Password');
        }
        const del = await User.findByIdAndDelete(user._id, {
            id: user._id
        })
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}