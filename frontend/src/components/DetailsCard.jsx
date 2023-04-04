import React from 'react';

export default function DetailsCard({ name, email, source, destination, fare }) {
  return (
    <div className="bg-gray-200 text-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between">
        <div className="text-xl font-medium">{source} --</div>
        <div className="text-xl font-medium"> &nbsp;{destination}</div>
      </div>
      <div className="flex justify-center my-6">
        <div className="text-2xl font-bold">{name}</div>
      </div>
      <div className="flex justify-center mb-4">
        <div className="text-xl font-medium">₹{fare}</div>
      </div>
    </div>
  );
}
