// api ke andr kya hoga aur kaise hoga usk kaam mein ayengi 

const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
async function registerController(req, res) {
     const {username,password} = req.body;


    const existingUser = await UserModel.findOne({username});


    if(existingUser){
        return res.status(409).json({message:'Username already exists'});
    }

    const user = await UserModel.create({
        username,
        password:await bcrypt.hash(password,10)
    });

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({message:'User registered successfully',user}); 
}

async function loginController(req, res) {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
     return res.status(400).json({
        message: 'Invalid password'
     });
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({ message: 'Login successful', user:{
        id: user._id,
        username: user.username
    }
});
}

 

module.exports = {
    registerController,
    loginController
};