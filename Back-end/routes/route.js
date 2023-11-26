const express = require('express');
const router = express.Router();
// const routerRegister = require('../routes/routeRegister')
const { RenderHome } = require('../controllers/controller');

// router.use('/register', routerRegister);

router.get('/', RenderHome)


module.exports = router;