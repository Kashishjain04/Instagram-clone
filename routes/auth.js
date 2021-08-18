require('dotenv').config();
const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

router.post("/signup", (req, res) => {
    const { name, email, password, pic } = req.body;
    // email, password, name validation
    if (!name || !email || !password || !pic) {
        return res.status(422).json({
            error: "One or more fields are empty"
        })
    }
    User.findOne({ email: email })
        .then((user) => {
            // checking wether user already exists
            if (user) {
                return res.status(422).json({
                    error: "User already exists"
                })
            }
            // creating user
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    User.create({ name, email, password: hashedPassword, pic })
                        .then((user) => {
                            // generating token
                            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                            const { _id, name, email, followers, following, pic } = user;
                            res.json({
                                message: "Signed Up Successfully",
                                token,
                                user: { _id, name, email, followers, following, pic }
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    // email, password validation
    if (!email || !password) {
        return res.status(422).json({
            error: "One or more fields are empty"
        })
    }
    // Finding user
    User.findOne({ email: email })
        .then((user) => {
            // User not found
            if (!user) {
                return res.status(422).json({
                    error: "Invalid Email / Password"
                })
            }
            // password validation
            bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (matched) {
                        // generating token
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                        const { _id, name, email, followers, following, pic } = user;
                        res.json({
                            message: "Signed In Successfully",
                            token,
                            user: { _id, name, email, followers, following, pic }
                        })
                    } else {
                        return res.status(422).json({
                            error: "Invalid Email / Password"
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        })
})

module.exports = router