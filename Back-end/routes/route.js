const express = require('express');
const router = express.Router();
// const routerRegister = require('../routes/routeRegister')
const { RenderIndex } = require('../controllers/controller');

// router.use('/register', routerRegister);

router.get('/', RenderIndex)


module.exports = router;