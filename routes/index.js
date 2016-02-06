var express = require('express');
var path = require('path');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/posts', function(req, res, next) {
  Post.find(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.param('post', function(req, res, next, id){
  var query = Post.findById(id);

  query.exec(function (err, post){
    if(err) { return next(err); }
    if(!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res) {
  res.json(req.post);
});

router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if(err) { return next(err); }

    res.json(post);
  });
});

router.get('/posts/:post/comments', function(req, res, next) {
  // console.log('req: ', req.originalUrl.toString().split('/')[2]);
  console.log('req: ', req.post.toString());
              // console.log('req comments: ', path.parse(req.url).base);
});

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});


module.exports = router;
