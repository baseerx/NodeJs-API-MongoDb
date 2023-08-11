const asyncHandler=require('express-async-handler');
const express=require('express');
const User=require('../models/userModel');
const mongoose=require('mongoose');
const bycrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const registerUser=asyncHandler(async (req, res) => { 
    const { name, email, password } = req.body;
    if(!name||!email||!password) {
        res.status(422).json({ error: "Please add all the fields" });
        throw new Error("Please add all the fields");
    }
    const encryptedPassword=await bycrypt.hash(password, 12);
    User.create({
        name,
        email,
        password: encryptedPassword
    });
    // Your route logic here
    res.status(201).json({ message: "User created Successfully.." });
})

const loginUser=asyncHandler(async (req, res) => {
    
    const {email, password}=req.body;

    if(!email||!password) {
       
        res.status(422).json({error: "Please add all the fields"});
        throw new Error("Please add all the fields");
    }
    const user=await User.findOne({email});
    if(user) {
        const isMatch=await bycrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({error: "Invalid Credentials"});
            throw new Error("Invalid Credentials");
        }
        const token=jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "15m"});
        // const token=jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.json({token});
    } else {
        res.status(400).json({error: "Invalid Credentials"});
        throw new Error("Invalid Credentials");
    }
})

// following is the protected route

const currentUser=asyncHandler(async (req, res) => {
     res.json(req.user);
})

module.exports = { registerUser,loginUser,currentUser };