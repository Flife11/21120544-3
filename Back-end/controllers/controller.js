const Movie = require('../models/Movie');
const Review = require('../models/Review');

const RenderHome = async(req, res, next) => {
    try {
        const Movies = await Movie.getRatingMovie();
        // const boxOffice = await Movie.getboxOffice(0);
        res.render('home', {"Movies": Movies});
    } catch(error) {
        next(error);
    }
}

const RenderDetail = async(req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        if (!(id===undefined) && id.match(/21544\{ (.*?)\ }/g)===null) {
            // console.log(id, 1);
            try {
                const MovieD = await Movie.get(id);
                // console.log(MovieD);
                res.render('Moviedetail', MovieD);
            } catch(error) {
                throw(error);
            }
            // console.log(MovieD);
        }
    } catch(error) {
        next(error);
    }
}

var searchValue = "";
const RenderSearch = async(req, res, next) => {
    try {
        const name = req.params.name || searchValue;
        // console.log(name, req.params.name, searchValue);
        searchValue = name;
        const page = req.params.page;
        if (!(page==='undefined')) {
            // console.log(req.params);
            const Movies = await Movie.search(name, page);
            // console.log(Movies);
            res.render('search', Movies);
        }
    } catch(error) {
        next(error);
    }
}

const RenderReview = async(req, res, next) => {
    try {
        const id = req.params.id;
        const page = req.params.page;
        console.log(id);
        if (!(id==='undefined')) {
            // console.log(req.params);
            const Reviews = await Review.getReviewByOffset(page, id);
            // console.log(Reviews);
            res.render('review', Reviews);
            // res.send(JSON.stringify(Reviews));
        }
    } catch(error) {
        next(error);
    }
}

module.exports = {RenderHome, RenderDetail, RenderSearch, RenderReview};
