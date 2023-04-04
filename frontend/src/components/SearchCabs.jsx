import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { dijkstra } from "../utils/ds";
import { getMatrix } from "../utils/db";
import CabCard from "./CabCard";
import { BACKEND_URI } from '../utils/globals'


export default function SearchCabs() {
    const [searchParams] = useSearchParams();

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [shortestDistance, setShortestDistance] = useState(0);
    const [sortedCabs, setSortedCabs] = useState(null);

    async function fetchLocations() {
        const result = await axios.get(`${BACKEND_URI}/api/locations`);
        const fetched_locations = result.data;
        
        setLocations(result.data);
        return fetched_locations;
    }

    async function getDistances() {
        const result = await axios.get(`${BACKEND_URI}/api/distances`);
        const distances = result.data;

        const locations = await fetchLocations();

        const from = searchParams.get('from');
        setFrom(from);

        const to = searchParams.get('to');
        setTo(to);

        const from_index = locations.findIndex(item => item.location === from);
        const to_index = locations.findIndex(item => item.location === to);

        console.log('from_index:', from_index)
        
        const _matrix = getMatrix(locations, distances);
        const distance_output = dijkstra(_matrix, from_index);

        console.log('distance output is:,', distance_output, 'from is', from_index);
        const shortest_distance = distance_output[to_index];

        console.log('shortest distance is:', shortest_distance);
        setShortestDistance(shortest_distance);
        setLoading(false);
    }

    async function getCabs() {
        const result = await axios.get(`${BACKEND_URI}/api/cabs`);
        const cabs = result.data;

        const cabs_update = cabs.sort((a, b) => {
            return parseInt(a.time_to_arrive) - parseInt(b.time_to_arrive);
        });

        setSortedCabs(cabs_update);
    }

    useEffect(() => {
        getDistances();
        getCabs();
    }, [loading]);

    return (
        <>
            {loading && <h1 className="m-auto">Searching for cabs..</h1>}
            {!loading &&
                <div className="flex flex-col items-center">
                    <div className="mb-4 md:flex md:w-full md:justify-between md:max-w-[85%]">
                        <p><span className="font-medium">SOURCE:</span> {from.toUpperCase()}</p>
                        <p><span className="font-medium">IDEAL TIME:</span> {shortestDistance} min</p>
                        <p><span className="font-medium">DESTINATION:</span> {to.toUpperCase()}</p>
                    </div>
                    
                    <div className="flex flex-col w-full justify-center gap-3 md:max-w-[85%] md:flex-row md:flex-wrap md:justify-start">
                        {
                            sortedCabs.map(cab => {
                                return <CabCard key={cab._id} shortestDistance={shortestDistance} source={from} destination={to} cab={cab} />
                            })
                        }
                    </div>
                </div>
            }
        </>
    );
}