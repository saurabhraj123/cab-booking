import axios from 'axios';
import { useState } from 'react';

export default function TrackerForm({email, setEmail, setShowBookings, setBookings, setLoading}) {

    const fetchBookings = async (email) => {
        try {
            console.log('I am here->email is', email);
            const result = await axios.get('http://localhost:5500/api/bookings', { params: {email} });
            console.log('I am here 2');
            setBookings(result.data);
            setShowBookings(true);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log('error fetching booking details');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        // console.log('email here is:', email);
        fetchBookings(email);
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-[190px] shadow-lg w-[20%] bg-[#fde68a] rounded-lg p-4">
                <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
                    <h2 className="text-2xl font-bold mb-2">Track Your Booking</h2>
                    {/* <label htmlFor="email" className="font-medium">Enter your email:</label> */}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="border rounded-lg p-2 mb-3"
                        required
                    />
                    <button type="submit" className="bg-primary-btn font-medium hover:bg-primary-btn-hover text-white px-4 py-2 rounded-lg">
                        Track Booking
                    </button>
                </form>
            </div>
        </>
    );
}
