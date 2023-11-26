const Movie = require('../models/Movie')

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

const RenderSearch = async(req, res, next) => {
    try {
        const name = req.params.name;
        const page = req.params.page;
        if (!(page==='undefined')) {
            console.log(req.params);
            const Movies = await Movie.search(name, page);
            // console.log(Movies);
            res.render('search', Movies);
        }
    } catch(error) {
        next(error);
    }
}

module.exports = {RenderHome, RenderDetail, RenderSearch};
