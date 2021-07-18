const { response } = require('express');
const Courses = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    index(req, res, next) {
        Courses.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
        // res.render('home');
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
