import { useState, useEffect } from 'react';
import { myLocations } from '../utils/db';
import { useNavigate } from 'react-router-dom';
import SearchCabs from './SearchCabs';

function SearchCabsForm() {
    const [locations, setLocations] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [sourceSelected, setSourceSelected] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        setLocations(myLocations);
    }, [myLocations]);

    const handleSourceChange = (e) => {
        let updatedSource = e.target.value;

        if (!sourceSelected && updatedSource == '') {
            setSourceSelected(false);
            return;
        }

        setSource(updatedSource);
        setSourceSelected(true);

        const newDestinations = locations.filter(location => location != updatedSource);
        setDestinations(newDestinations);
        setDestination(newDestinations[0]);
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
                        <option value="">Select source</option>
                        {locations.map(location => {
                            return <option key={`${location}`} value={`${location}`}>{`${location}`}</option>
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
                            return <option key={`${destination}`} value={`${destination}`}>{`${destination}`}</option>
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
