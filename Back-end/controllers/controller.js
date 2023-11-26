const Movie = require('../models/Movie')

const RenderHome = async(req, res, next) => {
    const data = await Movie.getRatingMovie();
    res.render('home', {"data": data});
}


module.exports = {RenderHome};
