const router = require('express').Router()
const db = require('../utils/db');
const {getCabs, getDistances, getLocations, addBooking, getBookings, editCab} = require('../utils/db');

router.get('/cabs', async (req, res) => {
    const cabs = await getCabs();

    res.json(cabs);
})

router.post('/cabs', async (req, res) => {
    const result = await editCab(req.body);
    
    console.log('updated cab is', result);
    res.json(result)
})

router.get('/distances', async (req, res) => {
    const distances = await getDistances();
    
    res.json(distances);
})

router.get('/locations', async (req, res) => {
    const locations = await getLocations();
    
    res.json(locations);
})

router.post('/booking', async (req, res) => {
    // console.log('Booking details is', req.body.booking_details);
    
    const result = addBooking(req.body);
    res.json(result);
})

router.get('/bookings', async (req, res) => {
    const email = req.query.email;

    console.log('email:', email);
    const bookings = await getBookings(email);

    console.log('bookings is:', bookings);
    res.json(bookings);
})

module.exports = router;