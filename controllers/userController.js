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


module.exports = { registerUser };