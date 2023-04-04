import React from 'react';

export default function DetailsCard({ name, email, source, destination, fare }) {
  return (
    <div className="flex-1 bg-[#fde68a] rounded-lg shadow-lg p-6">
      <div className="flex justify-between">
        <div className="md:text-xl text-red-700 font-medium">{source.toUpperCase()} </div> 
        <span className='md:text-xl text-red-700'>&nbsp;-&nbsp;</span>
        <div className="md:text-xl text-right text-red-700 font-medium"> &nbsp;{destination.toUpperCase()}</div>
      </div>

      <div className="flex justify-center my-6">
        <div className="text-xl md:text-2xl font-bold underline text-[#03345E]">{name}</div>
      </div>
      <div className="flex justify-center mb-4">
        <div className="md:text-xl font-medium text-[#03345E]">₹{fare}</div>
      </div>
    </div>
  );
}
