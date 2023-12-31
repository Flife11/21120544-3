const express = require('express');
const router = express.Router();
// const routerRegister = require('../routes/routeRegister')
const { RenderHome, RenderDetail, RenderSearch, RenderReview, RenderFav } = require('../controllers/controller');

// router.use('/register', routerRegister);

router.get('/', RenderHome)
// router.get('/detail', RenderHome);
router.get('/detail/:id', RenderDetail);
router.get('/search/:name/:page', RenderSearch);
router.get('/review/:id/:page', RenderReview);
router.get('/fav/:page', RenderFav);


module.exports = router;