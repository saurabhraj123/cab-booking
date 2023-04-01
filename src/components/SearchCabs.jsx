import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { myLocations } from "../utils/db";
import { dijkstra } from "../utils/ds";
import { distances } from "../utils/db";
import { getMatrix } from "../utils/db";
import { cabs } from "../utils/db";
import CabCard from "./CabCard";

export default function SearchCabs() {
    const [searchParams] = useSearchParams();
    
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const[shortestDistance, setShortestDistance] = useState(0);
    const[sortedCabs, setSortedCabs] = useState(null);

    useEffect(() => {
        let fromIndex = myLocations.indexOf(searchParams.get('from'));
        setFrom(fromIndex);
        
        const matrix = getMatrix(distances);
        const result = dijkstra(matrix, fromIndex);

        let toIndex = myLocations.indexOf(searchParams.get('to'));
        setTo(toIndex);

        const shortest_distance = result[toIndex];
        console.log('shortest distance is:', shortestDistance);
        setShortestDistance(shortest_distance);

        const cabs_update = cabs.sort((a, b) => {
            return parseInt(a.time_to_arrive) - parseInt(b.time_to_arrive);
        });

        setSortedCabs(cabs_update);

    });

    console.log('from', searchParams.get('from'));

    return (
        <>
            {!sortedCabs && <h1 className="m-auto">Searching for cabs..</h1>}
            {sortedCabs && 
            <>
                <div className="flex justify-between mx-28 mb-8">
                    <p><span className="font-medium">SOURCE:</span> {myLocations[from].toUpperCase()}</p>
                    <p><span className="font-medium">IDEAL TIME:</span> {shortestDistance} min</p>
                    <p><span className="font-medium">DESTINATION:</span> {myLocations[to].toUpperCase()}</p>
                </div>
                <div className="flex flex-1 flex-col items-center gap-4">
                    {
                        sortedCabs.map(cab => {
                            return <CabCard key={cab.id} shortestDistance={shortestDistance} cab={cab}/>
                        })
                    }        
                </div>
            </>
            }
        </>
        );
}