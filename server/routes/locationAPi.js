const express = require('express');
const router = express.Router();

const ApiCtrl = require('../controllers/locationAPi');

router.get('', ApiCtrl.getMeta);


module.exports = router;