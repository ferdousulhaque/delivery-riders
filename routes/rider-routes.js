const express = require('express');
const RiderController = require('../controllers/riders');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        message : 'Delivery App Index'
    })
});

// Riders REST Calls
router.post('/add', RiderController.createUpdateRiderInfo);
router.get('/nearby', RiderController.checkRidersNearby);

module.exports = router;