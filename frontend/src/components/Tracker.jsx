import { useState } from "react";
import TrackerForm from "./TrackerForm";
import DetailsCard from "./DetailsCard";


export default function Tracker() {
    const [email, setEmail] = useState('');
    const [showBookings, setShowBookings] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleBookings = (value) => {
        setBookings(value);
    }

    const handleLoading = (value) => {
        setLoading(value);
    }

    const handleShowBookings = (value) => {
        setShowBookings(value);
    }

    const handleSetEmail = (value) => {
        setEmail(value);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <TrackerForm email={email} setEmail={handleSetEmail} setLoading={handleLoading} setBookings={handleBookings} setShowBookings={handleShowBookings} />

            <div className='flex justify-center items-center mt-10'>
                {loading && <p className='text-lg'>Loading booking details...</p>}
                {!loading && showBookings &&
                    <div className="flex flex-col gap-2 items-center">
                        {bookings.length === 0 && <p className='text-lg text-red-500'>No results found...</p>}
                        {bookings.length > 0 &&
                            <>
                                <h2 className='text-xl font-medium'>Booking Details</h2>
                                <div className="flex flex-wrap gap-4">
                                    {bookings.map(booking => {
                                        return <DetailsCard key={booking._id} name={booking.name} source={booking.source} destination={booking.destination} fare={booking.fare} />
                                    })}
                                </div>
                            </>}

                    </div>
                }
            </div>
        </div>
    );
}