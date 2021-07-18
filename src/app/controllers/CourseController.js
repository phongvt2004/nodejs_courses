const { response } = require('express');
const Courses = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Courses.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch((err) => {
                next(err);
            });
    }
    create(req, res, next) {
        res.render('courses/create');
    }
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${foreq.bodyrmData.videoId}/sddefault.jpg`;
        const course = new Courses(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((err) => {
                next(err);
            });
    }
    edit(req, res, next) {
        Courses.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    //PUT
    update(req, res, next) {
        Courses.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    destroy(req, res, next) {
        Courses.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    forceDestroy(req, res, next) {
        Courses.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    restore(req, res, next) {
        Courses.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
