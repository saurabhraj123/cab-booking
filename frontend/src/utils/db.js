export const myLocations = [
    "New Delhi",
    "Central Secretariat",
    "Moolchand",
    "Nehru Place",
    "Mohan Estate",
    "Badarpur Border",
]

export const distances = [
    {
        location1: "New Delhi",
        location2: "Central Secretariat",
        dist: 5
    },
    {
        location1: "New Delhi",
        location2: "Moolchand",
        dist: 7
    },
    {
        location1: "Central Secretariat",
        location2: "Nehru Place",
        dist: 15
    },
    {
        location1: "Central Secretariat",
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
        price_per_min: 0.50, 
        time_to_arrive: "5"
    },
    {
        id:2,
        name: "SUV Cab",
        price_per_min: 0.60, 
        time_to_arrive: "10"
    },
    {
        id:3,
        name: "Luxury Cab",
        price_per_min: 1.00, 
        time_to_arrive: "15"
    },
    {
        id:4,
        name: "Hatchback Cab",
        price_per_min: 0.40, 
        time_to_arrive: "7"
    },
    {
        id:5,
        name: "Mini-van Cab",
        price_per_min: 0.75, 
        time_to_arrive: "12"
    }
];


export function getMatrix(locations, distances) {
    const matrix = [];
    // const locations = new Set(distances.map((d) => d.location1).concat(distances.map((d) => d.location2)));
    // const locations = new Set(locations_);
    // const locationArray = Array.from(locations);
    console.log('locations is:', locations);
    const numLocations = locations.length;

    // Initialize the matrix with infinite distances
    for (let i = 0; i < numLocations; i++) {
        matrix[i] = [];
        for (let j = 0; j < numLocations; j++) {
            matrix[i][j] = Infinity;
        }
    }

    console.log('matrix is:', matrix);
    console.log('fethced locations are:', locations);

    // Set the distances in the matrix
    distances.forEach((d) => {
        console.log('d is:', d);
        const i = Array.from(locations).findIndex((item) => item.location === d.location1);
        console.log('i is:', i);
        const j = Array.from(locations).findIndex((item) => item.location === d.location2);
        console.log('j is:', j);

        if(i != -1 && j != -1) {
            matrix[i][j] = d.dist;
            matrix[j][i] = d.dist;
        }
    });

    return matrix;
}

//   const matrix = getMatrix(distances);

//   console.log(matrix);
