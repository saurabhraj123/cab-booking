import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchCabsForm() {
    const [locations, setLocations] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [sourceSelected, setSourceSelected] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {

        async function fetchLocations() {
            try {
                const fetched_locations = await axios.get('http://localhost:5500/api/locations');
                console.log('locations', fetched_locations);
                setLocations(fetched_locations.data);

                console.log('new locations:', locations);
            }catch(err) {
                console.log('error while fetching locations', err);
            }
        }
        
        fetchLocations();

    });

    const handleSourceChange = (e) => {
        let updatedSource = e.target.value;

        if (!sourceSelected && updatedSource == '') {
            setSourceSelected(false);
            return;
        }

        setSource(updatedSource);
        setSourceSelected(true);

        const newDestinations = locations.filter(item => item.location != updatedSource);
        setDestinations(newDestinations);
        setDestination(newDestinations[0].location);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();

        navigate(`search/?from=${source}&to=${destination}`);

        // do something when the search button is clicked
        console.log(`Searching for cabs from ${source} to ${destination}...`);
    };

    return (
        <div className="flex flex-col justify-center h-full w-[35%] bg-amber-200 p-4">
            <h1 className="text-2xl font-bold mb-4">Search Cabs</h1>
            <form>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="source">
                        Source
                    </label>
                    <select
                        className="border rounded py-2 px-3 w-full"
                        id="source"
                        value={source}
                        onChange={handleSourceChange}
                    >
                        {!sourceSelected && <option value="">Select source</option>}
                        {locations.map(item => {
                            return <option key={`${item._id}`} value={`${item.location}`}>{`${item.location}`}</option>
                        })}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="destination">
                        Destination
                    </label>
                    <select
                        className="border rounded py-2 px-3 w-full"
                        id="destination"
                        value={destination}
                        onChange={handleDestinationChange}
                        disabled={!sourceSelected}
                    >
                        {destinations.map(destination => {
                            return <option key={`${destination._id}`} value={`${destination.location}`}>{`${destination.location}`}</option>
                        })}
                    </select>
                </div>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSearchClick}
                    disabled={!sourceSelected}
                >
                    Search Cabs
                </button>
            </form>
        </div>
    );
}

export default SearchCabsForm;
