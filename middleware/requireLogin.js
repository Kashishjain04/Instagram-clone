require('dotenv').config();
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({
            error: "You must be Logged In"
        })        
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({
                error: "Unauthorized"
            })
        }
        const {_id} = payload;
        User.findById(_id)
            .then((userData) => {
                req.user = userData;
                next()
            })        
    })
}