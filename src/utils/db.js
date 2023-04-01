export const myLocations = [
    "New Delhi",
    "Central Secretatriate",
    "Moolchand",
    "Nehru Place",
    "Mohan Estate",
    "Badarpur Border",
]

export const distances = [
    {
        location1: "New Delhi",
        location2: "Central Secretatriate",
        dist: 5
    },
    {
        location1: "New Delhi",
        location2: "Moolchand",
        dist: 7
    },
    {
        location1: "Central Secretatriate",
        location2: "Nehru Place",
        dist: 15
    },
    {
        location1: "Central Secretatriate",
        location2: "Mohan Estate",
        dist: 20
    },
    {
        location1: "Moolchand",
        location2: "Nehru Place",
        dist: 5
    },
    {
        location1: "Moolchand",
        location2: "Mohan Estate",
        dist: 35
    },
    {
        location1: "Badarpur Border",
        location2: "Nehru Place",
        dist: 20
    },
    {
        location1: "Badarpur Border",
        location2: "Mohan Estate",
        dist: 10
    },
]

export const cabs = [
    {
        id:1,
        name: "Sedan Cab",
        price_per_min: 0.50, // INR 0.50 per minute
        time_to_arrive: "5"
    },
    {
        id:2,
        name: "SUV Cab",
        price_per_min: 0.60, // INR 0.60 per minute
        time_to_arrive: "10"
    },
    {
        id:3,
        name: "Luxury Cab",
        price_per_min: 1.00, // INR 1.00 per minute
        time_to_arrive: "15"
    },
    {
        id:4,
        name: "Hatchback Cab",
        price_per_min: 0.40, // INR 0.40 per minute
        time_to_arrive: "7"
    },
    {
        id:5,
        name: "Mini-van Cab",
        price_per_min: 0.75, // INR 0.75 per minute
        time_to_arrive: "12"
    }
];


export function getMatrix(distances) {
    const matrix = [];
    const locations = new Set(distances.map((d) => d.location1).concat(distances.map((d) => d.location2)));
    const locationArray = Array.from(locations);
    const numLocations = locations.size;

    // Initialize the matrix with infinite distances
    for (let i = 0; i < numLocations; i++) {
        matrix[i] = [];
        for (let j = 0; j < numLocations; j++) {
            matrix[i][j] = Infinity;
        }
    }

    // Set the distances in the matrix
    distances.forEach((d) => {
        const i = locationArray.indexOf(d.location1);
        const j = locationArray.indexOf(d.location2);
        matrix[i][j] = d.dist;
        matrix[j][i] = d.dist; // assuming the distances are undirected
    });

    return matrix;
}

//   const matrix = getMatrix(distances);

//   console.log(matrix);
