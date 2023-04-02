import axios from "axios";
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export default function ConfirmationCard({ onCancel, source, destination, cab_fare }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [cabBooked, setCabBooked] = useState(false);
    const [error ,setError] = useState(false);

    const form = useRef();

    async function addBooking() {
        const current = form.current;
        const name = current[0].value;
        const email = current[1].value;
        const source = current[2].value;
        const destination = current[3].value;
        const fare = current[4].value;

        const booking_details = {name, email, source, destination, fare};

        console.log(booking_details);

        const result = await axios.post('http://localhost:5500/api/booking', booking_details);

        console.log('result of post', result);

    }

    const handleConfirm = (e) => {
        e.preventDefault();
        setError(false);

        console.log('form is:', form.current[4].value);

        emailjs.sendForm('service_zsulqyv', 'template_7raoxuu', form.current, 'cWM6Fgb7hs57dT2NZ')
            .then(async (result) => {
                addBooking();
                setCabBooked(true);
                console.log(result.text);
            }, (error) => {
                setError(true);
                console.log(error.text);
            });

    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="absolute bg-black/30 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <form ref={form} className="w-[30%] bg-white rounded-lg drop-shadow-xl p-8">
                {!cabBooked && <>
                    <h1 className="text-lg font-medium mb-4">Confirm your booking!</h1>
                    <div className="mb-4">
                        <label htmlFor="full-name" className="block font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            id="full-name"
                            type="text"
                            name="to_name"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={fullName}
                            required
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="reply_to"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <input type="text" name="source" onChange={(e) => setEmail(e.target.value)} value={source} className="hidden" />
                    <input type="text" name="destination" onChange={(e) => setEmail(e.target.value)} value={destination} className="hidden" />
                    <input type="text" name="cab_fare" onChange={(e) => setEmail(e.target.value)} value={cab_fare} className="hidden" />

                    <div className="flex justify-end">
                        <input type="submit" value="Confirm"
                            className="bg-green-500 text-white px-4 py-2 rounded-md mr-4 hover:cursor-pointer"
                            onClick={handleConfirm}
                            
                        />
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>

                    
                </>}

                {error && <p className="text-red-400 mt-4 text-center">Something went wrong. Please try again.</p>}

                {cabBooked && <div className="flex flex-col items-center justify-center">
                    <p className="text-red-400 mt-4 text-center">Your cab has been booked successfully.<br></br> A confirmation mail has been sent to your email.</p>

                    <button className="mt-6 bg-red-400 text-white rounded-lg py-2 px-5 w-16 hover:bg-red-500" onClick={onCancel}>OK</button>
                    </div>
                }
            </form>

        </div>
    );
}
