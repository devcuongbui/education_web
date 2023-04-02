const Course = require('../models/Course');
const Post = require('../models/Post');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    // [GET] /me/trash/news
    storedNews(req, res, next) {
        Post.find({})
            .then(posts => {
                res.render('me/my-posts', {
                    posts: mutipleMongooseToObject(posts),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
