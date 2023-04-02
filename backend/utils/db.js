const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://me4saurabh4work:9yMEsUCgXwEMJVr8@cab.ck3g351.mongodb.net/cab_central?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

const cabsSchema = new mongoose.Schema({
    name: String,
    price_per_min: Number,
    time_to_arrive: String
})

const distanceSchema = new mongoose.Schema({
    location1: String,
    location2: String,
    dist: Number
})

const locationSchema = new mongoose.Schema({
    locations: String,
})

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    source: String,
    destination: String,
    fare: Number,
})

const Cabs = mongoose.model('Cabs', cabsSchema);
const Distance = mongoose.model('Distances', distanceSchema);
const Location = mongoose.model('Locations', locationSchema);
const Booking = mongoose.model('Booking', bookingSchema);

async function getCabs() {
    const cabs = await Cabs.find();
    return cabs;
    // console.log(cabs);
}

async function getDistances() {
    const distances = await Distance.find();
    return distances;
    // console.log(distances);
}

async function getLocations() {
    const locations = await Location.find();
    return locations;
    // console.log(locations);
}

async function addBooking(booking_details) {
    const booking = new Booking(booking_details);

    const result = await booking.save();
    return result;
}

async function editCab(updated_cab) {
    const id = updated_cab.cabId;

    const cab = await Cabs.findById(id);
    if(!cab) return;

    console.log('old cab is"', cab);
    console.log('cab to updaate is:', updated_cab);

    console.log('time to arrive ka dikkat is:', updated_cab.timeToArrive)
    console.log('type is', typeof(updated_cab.timeToArrive));

    cab.time_to_arrive = updated_cab.timeToArrive;
    cab.name           = updated_cab.cabName;
    cab.price_per_min  = updated_cab.pricePerMin;

    const result = await cab.save();

    return result;
}

async function getBookings(email) {
    const bookings = await Booking.find({email});

    return bookings;
}

module.exports = db;
module.exports.getCabs = getCabs;
module.exports.getDistances = getDistances;
module.exports.getLocations = getLocations;
module.exports.addBooking = addBooking;
module.exports.getBookings = getBookings;
module.exports.editCab = editCab;
