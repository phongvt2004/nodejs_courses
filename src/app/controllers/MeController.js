const { response } = require('express');
const Courses = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    // [GET] /stored/courses
    storedCourses(req, res, next) {
        let coursesQuery = Courses.find({});
        if (req.query.hasOwnProperty('_sort')) {
            coursesQuery = coursesQuery.sort({
                [req.query.column] : req.query.type,
            });
        }
        Promise.all([coursesQuery, Courses.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    trashCourses(req, res, next) {
        Courses.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
