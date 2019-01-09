const express = require('express');
const router = express.Router();

const location_controller = require('../controllers/location.controller');

router.get('/allGhost', location_controller.test);

router.get('/cards', location_controller.cards);

router.post('/create', location_controller.location_create);

router.post('/addComment/:id', location_controller.newComment);

router.get('/detail/:id', location_controller.location_details);

module.exports = router;
