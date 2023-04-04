import { useState } from 'react';
import SearchCabsForm from './SearchCabsForm';

export default function Home() {
    return (
        <div className="flex items-center justify-center w-full">
            <SearchCabsForm />
        </div>
    );
}