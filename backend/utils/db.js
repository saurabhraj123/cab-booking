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
    time_to_travel: String
})

const distancesSchema = new mongoose.Schema({
    location1: String,
    location2: String,
    dist: Number
})

const locationsSchema = new mongoose.Schema({
    locations: String,
})

const Cabs = mongoose.model('Cabs', cabsSchema);
const Distances = mongoose.model('Distances', distancesSchema);
const Locations = mongoose.model('Locations', locationsSchema);

async function getCabs() {
    const cabs = await Cabs.find();
    return cabs;
    // console.log(cabs);
}

async function getDistances() {
    const distances = await Distances.find();
    return distances;
    // console.log(distances);
}

async function getLocations() {
    const locations = Locations.find();
    return locations;
    // console.log(locations);
}

module.exports = db;
module.exports.getCabs = getCabs;
module.exports.getDistances = getDistances;
module.exports.getLocations = getLocations;
