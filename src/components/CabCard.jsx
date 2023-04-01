import { useState } from "react";
import ConfirmationCard from "./ConfirmationCard";

export default function CabCard({cab, shortestDistance, source, destination}) {
    const [confirmBookingOn, setConfirmBooking] = useState(false);

    function handleBooking() {
        setConfirmBooking(true);
    }

    function onCancel() {
        setConfirmBooking(false);
    }

    return (
        <div className="flex flex-col bg-amber-200/70 p-4 rounded-lg w-[35%]">
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold mb-2">{cab.name}</p>
                <p>₹{cab.price_per_min}/min</p>
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <p><span className="font-medium">Arriving in:</span> {cab.time_to_arrive} mins</p>
                    <p><span className="font-medium">Estimated travel time:</span> {parseInt(cab.time_to_arrive) + parseInt(shortestDistance)} min</p>
                    <p><span className="font-medium">Estimated cost:</span> ₹{Math.round(parseFloat(shortestDistance) * parseFloat(cab.price_per_min))}</p>
                </div>
                <button className="bg-primary-btn rounded-md text-white h-9 px-3 font-medium hover:bg-[#199346]" onClick={handleBooking}>Book Now</button>

                {confirmBookingOn && <ConfirmationCard source={source} destination={destination} cab_fare={Math.round(parseFloat(shortestDistance) * parseFloat(cab.price_per_min))} onCancel={onCancel}/>}
            </div>
        </div>
    );
}