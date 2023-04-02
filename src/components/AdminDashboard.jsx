import { useEffect, useState } from "react";
import CardDetailsAdmin from './CardDetailsAdmin';
import axios from 'axios';

export default function AdminDashboard() {
    const [cabs, setCabs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCabs() {
            const result = await axios.get('http://localhost:5500/api/cabs');
            const data = result.data;

            console.log('data is', data);
            setCabs(data);
            setLoading(false);
        }

        getCabs();
    });

    return (
        <div className="flex flex-col items-center justify-center mt-2">
            <h1 className="font-bold text-3xl text-gray-700 mb-4">Admin Dashboard</h1>

            {loading && <p className="font-medium text-xl">Loading...</p>}
            {!loading && cabs.lenght === 0 && <p className="font-medium text-xl">No results found...</p>}
            {!loading && cabs.length > 0 && 
                <div className="flex flex-wrap justify-center gap-4">
                    {
                        cabs.map(cab => {
                            return <CardDetailsAdmin key={cab._id} name={cab.name} cabId={cab._id} price_per_min={cab.price_per_min} time_to_arrive={cab.time_to_arrive}/>
                        })
                    }    
                </div>
            }
        </div>
    );
}