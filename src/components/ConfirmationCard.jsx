import { useState } from "react";

export default function ConfirmationCard({ onCancel }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirm = () => {
    // Code to confirm the booking
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="absolute bg-black/80 top-0 bottom-0 left-0 right-0 flex justify-center py-48">
      <div className="w-[30%] bg-white rounded-lg drop-shadow-xl p-8">
        <h1 className="text-lg font-medium mb-4">Confirm your booking!</h1>
        <div className="mb-4">
          <label htmlFor="full-name" className="block font-medium mb-1">
            Full Name
          </label>
          <input
            id="full-name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={fullName}
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
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
