require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Post = mongoose.model('Post');

// Get User specific posts
router.get("/myposts", requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "name")
        .then((posts) => {
            res.json({ posts })
        })
        .catch((err) => {
            console.log(err);
        })
})

// Get All posts
router.get("/allpost", requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "name")
        .populate("comments.postedBy", "_id, name")
        .then((posts) => {
            res.json({ posts })
        })
        .catch((err) => {
            console.log(err);
        })
})

// Get Followed and Self posts
router.get("/followedposts", requireLogin, (req, res) => {
    Post.find( {$or: [ {postedBy: {$in: req.user.following}}, {postedBy: req.user._id}]})
        .populate("postedBy", "name")
        .populate("comments.postedBy", "_id, name")
        .then((posts) => {
            res.json({ posts })
        })
        .catch((err) => {
            console.log(err);
        })
})

// Create a post
router.post("/createpost", requireLogin, (req, res) => {
    const { title, body, pic } = req.body;
    if (!title || !body || !pic) {
        return res.status(422).json({
            error: "One or more fields is missing"
        })
    }
    req.user.password = undefined;
    req.user.__v = undefined;
    Post.create({ title, body, pic, postedBy: req.user })
        .then((result) => {
            res.json({
                post: result
            })
        })
        .catch((err) => {
            console.log(err);
        })

})

// Like a post
router.put("/like", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, { new: true })
        .populate("postedBy", "name")
        .populate("comments.postedBy", "_id, name")
        .exec((err, data) => {
            if (err) {
                return res.status(422).json({
                    error: err
                })
            }
            res.json(data)
        })
})

// Unlike a post
router.put("/unlike", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, { new: true })
        .populate("postedBy", "name")
        .populate("comments.postedBy", "_id, name")
        .exec((err, data) => {
            if (err) {
                return res.status(422).json({
                    error: err
                })
            }
            res.json(data)
        })
})

// Comment a post
router.put("/comment", requireLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, { new: true })
        .populate("postedBy", "name")
        .populate("comments.postedBy", "_id, name")
        .exec((err, data) => {
            if (err) {
                return res.status(422).json({
                    error: err
                })
            }
            res.json(data)
        })
})

// Delete Comment
router.delete("/deletecomment/:postId", requireLogin, (req, res) => {
    const commentId = req.body.commentId
    Post.findOne({ _id: req.params.postId })        
        .exec((err, post) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            post.comments.forEach((comment) => {
                if (comment._id.toString() === commentId.toString()) {
                    Post.findByIdAndUpdate(req.params.postId, {
                        $pull: { comments: comment }
                    }, { new: true })
                        .populate("postedBy", "name")
                        .populate("comments.postedBy", "_id, name")
                        .exec((err, data) => {
                            if (err) {
                                return res.status(422).json({
                                    error: err
                                })
                            }
                            res.json(data)
                        })                        
                }
            })
        })
})

// Delete Post
router.delete("/deletepost/:postId", requireLogin, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then((result) => {
                        res.json({ result })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        })
})

module.exports = router