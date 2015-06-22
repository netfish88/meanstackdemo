/**
 * Created by DavidHong on 2015. 6. 21..
 */

var Post = require('../../models/post');
var router = require('express').Router();

router.get('/api/posts',function(req,res,next) {
    Post.find()
        .sort('-date')
        .exec(
        function(err, posts) {
            if (err) {
                return next(err)
            }
            res.status(200).json(posts)

        })
});

router.post('/api/posts', function(req, res, next) {

    var post = new Post({
        username: req.body.username,
        body: req.body.body
    });

    post.save(function (err, post) {
        if(err) { return next(err) }

        res.status(201).json(post)
    })
});

module.exports = router;