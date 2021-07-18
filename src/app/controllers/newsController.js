class NewsController {
    index(req, res) {
        res.render('news');
    }
    show(req, res) {}
}

module.exports = new NewsController();
