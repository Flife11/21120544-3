const Movie = require('../models/Movie')

const RenderIndex = (req, res, next) =>{
    res.render('index', {condition: true});
}


module.exports = {RenderIndex};
