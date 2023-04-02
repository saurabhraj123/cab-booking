const router = require('express').Router()
const db = require('../utils/db');
const {getCabs, getDistances, getLocations} = require('../utils/db');

router.get('/cabs', async (req, res) => {
    const cabs = await getCabs();

    res.json(cabs);
})

router.get('/distances', async (req, res) => {
    const distances = await getDistances();
    
    res.json(distances);
})

router.get('/locations', async (req, res) => {
    const locations = await getLocations();
    
    res.json(locations);
})

module.exports = router;