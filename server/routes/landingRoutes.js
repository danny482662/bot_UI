const express = require('express');
const router = express.Router();



const { getBasicInfo } = require('../controller/landingController');

router.get('/', getBasicInfo);

module.exports = router;
