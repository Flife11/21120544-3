const Movie = require('../models/Movie')

const get3BoxOffice = async(req, res, next) => {
    try {
        const index = req.body.index;
        console.log(index);
        const boxOffice = await Movie.getboxOffice(index);
        res.status(201).json({"boxOffice": boxOffice});
    } catch(error) {
        next(error);
    }
}

module.exports = {get3BoxOffice};