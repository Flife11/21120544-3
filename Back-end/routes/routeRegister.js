const express = require('express');
const router = express.Router();
const { RenderInformation,RenderRegister } = require('../controllers/controller');

router.post('/success', RenderInformation);

router.get('/', RenderRegister);

module.exports = router;