const Post = require('../models/Post');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class NewsController {
    // [GET] /news
    index(req, res, next) {
        Post.find({})
            .then((posts) => {
                res.render('news', { 
                    posts: mutipleMongooseToObject(posts)
                 });
            })
            .catch(next);

    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('NEWS DETAIL!!!');
    }
}

module.exports = new NewsController();
