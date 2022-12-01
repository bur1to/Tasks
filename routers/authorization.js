const express = require('express');

const router = express.Router();

const {
  authorization
} = require('../controllers/authorization');

router.get('/', authorization);

module.exports = router;
