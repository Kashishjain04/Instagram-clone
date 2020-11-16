require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

router.get("/user/:id", requireLogin, (req, res) => {
    User.find({email: req.params.id})
        .select("-password")
        .then(user => {
            Post.find({ postedBy: user[0]._id })
                .populate("postedBy", "_id name")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({
                            err: err
                        })
                    }
                    res.json({
                        user: user[0], posts
                    })
                })
        }).catch((err) => {
            return res.status(404).json({
                error: "User Not Found"
            })
        })
})

router.put("/follow", requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, { new: true }, (err) => {
        if (err) {
            return res.status(422).json({
                error: err
            })
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, { new: true })
            .select("-password")
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                return res.status(422).json({
                    error: err
                })
            })
    })
})

router.put("/unfollow", requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user._id }
    }, { new: true }, (err) => {
        if (err) {
            return res.status(422).json({
                error: err
            })
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.unfollowId }
        }, { new: true })
            .select("-password")
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                return res.status(422).json({
                    error: err
                })
            })
    })
})

router.put("/updatepic", requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $set: { pic: req.body.url }
    }, { new: true })
        .select("-password")
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            return res.status(422).json({
                error: err
            })
        })
})

module.exports = router