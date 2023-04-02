import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { dijkstra } from "../utils/ds";
import { getMatrix } from "../utils/db";
import CabCard from "./CabCard";


export default function SearchCabs() {
    const [searchParams] = useSearchParams();

    const [locations, setLocations] = useState([]);
    const [fromIndex, setFromIndex] = useState(0);
    const [toIndex, setToIndex] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [shortestDistance, setShortestDistance] = useState(0);
    const [sortedCabs, setSortedCabs] = useState(null);
    const [matrix, setMatrix] = useState([]);

    useEffect(() => {
        setFrom(searchParams.get('from'));
        setTo(searchParams.get('to'));

        async function fetchLocations() {
            const result = await axios.get('http://localhost:5500/api/locations');
            const fetched_locations = result.data; 
            setLocations(fetched_locations);

            console.log('fethced locations are:', locations);

            const from_index = fetched_locations.findIndex(item => item.location === from);
            setFromIndex(from_index);

            console.log('from index is:', fromIndex);

            const to_index = fetched_locations.findIndex(item => item.location === to);
            setToIndex(to_index);

            console.log('to index is:', toIndex);
        }

        fetchLocations();

        // let fromIndex = myLocations.indexOf(searchParams.get('from'));
        // setFrom(fromIndex);

        async function getDistances() {
            const result = await axios.get('http://localhost:5500/api/distances');
            const distances = result.data;

            console.log('distances are:', distances);

            const _matrix = getMatrix(locations, distances);
            setMatrix(_matrix);

            console.log(fromIndex);

            const distance_output = dijkstra(matrix, fromIndex);
            console.log('distance output is:', distance_output);
            const shortest_distance = distance_output[toIndex];

            console.log('shortest distance is:', shortestDistance);
            setShortestDistance(shortest_distance);
        }

        getDistances();

        // const matrix = getMatrix(distances);
        
        async function getCabs() {
            const result = await axios.get('http://localhost:5500/api/cabs');
            const cabs = result.data;

            const cabs_update = cabs.sort((a, b) => {
                return parseInt(a.time_to_arrive) - parseInt(b.time_to_arrive);
            });
    
            setSortedCabs(cabs_update);
        }

        getCabs();
        console.log('cabs are:', sortedCabs);

    }, [sortedCabs]);

    console.log('from', searchParams.get('from'));

    return (
        <>
            {!sortedCabs && <h1 className="m-auto">Searching for cabs..</h1>}
            {sortedCabs &&
                <>
                    <div className="flex justify-between mx-28 mb-8">
                        <p><span className="font-medium">SOURCE:</span> {from.toUpperCase()}</p>
                        <p><span className="font-medium">IDEAL TIME:</span> {shortestDistance} min</p>
                        <p><span className="font-medium">DESTINATION:</span> {to.toUpperCase()}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-4">
                        {
                            sortedCabs.map(cab => {
                                return <CabCard key={cab.id} shortestDistance={shortestDistance} source={from} destination={to} cab={cab} />
                            })
                        }
                    </div>
                </>
            }
        </>
    );
}