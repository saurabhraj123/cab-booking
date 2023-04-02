import axios from 'axios';
import React, { useState } from 'react';

export default function CardDetailsAdmin({ cabId, name, price_per_min, time_to_arrive }) {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [cabName, setCabName] = useState(name);
    const [pricePerMin, setPricePerMin] = useState(price_per_min);
    const [timeToArrive, setTimeToArrive] = useState(time_to_arrive);

    const handleNameChange = e => {
        setCabName(e.target.value);
    };

    const handlePriceChange = e => {
        setPricePerMin(e.target.value);
    };

    const handleTimeChange = e => {
        setTimeToArrive(e.target.value);
    };

    const handleSave = e => {
        e.preventDefault();
        
        async function update() {
            const result = await axios.post('http://localhost:5500/api/cabs', {cabId, cabName, pricePerMin, timeToArrive: timeToArrive});

            console.log('update is successful', result);
        }

        update();
        setShowEditPopup(false);
    };

    const handleEdit = () => {
        setShowEditPopup(true);
    }

    const handleCancel = () => {
        setShowEditPopup(false);
    }

    return (
        <div className="bg-[#fde68a] rounded-lg p-4 flex flex-col w-[25%]  justify-between">
            <div className="flex justify-between flex-1">
                <h2 className="text-white font-bold text-gray-800 text-xl">{name}</h2>
                <p className="text-white text-gray-800">₹{price_per_min}/min</p>
            </div>
            <div className="flex justify-between text-gray-800 items-end mt-8 flex-1">
                <p className="text-white font-medium text-gray-800">Time to arrive: {time_to_arrive}</p>
                <button className="ml-4 bg-white text-[#9B7F11] hover:bg-white/70 rounded-lg px-4 py-2 font-bold" onClick={handleEdit}>Edit</button>
            </div>

            {showEditPopup &&
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-black/40 flex justify-center items-center'>
                    <div className='flex bg-white rounded-lg drop-shadow-lg'>
                        <form className="p-4">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                                <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={cabName} onChange={(e) => handleNameChange(e)}/>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="price_per_min" className="block text-gray-700 font-bold mb-2">Price per minute:</label>
                                <input type="number" id="price_per_min" name="price_per_min" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={pricePerMin} onChange={(e) => handlePriceChange(e)}/>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="time_to_arrive" className="block text-gray-700 font-bold mb-2">Time to arrive:</label>
                                <input type="number" id="time_to_arrive" name="time_to_arrive" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={timeToArrive} onChange={(e) => handleTimeChange(e)}/>
                            </div>

                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSave}>Save Edit</button>
                            <button type="submit" className="bg-red-500 ml-6 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCancel}>Cancel</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}
