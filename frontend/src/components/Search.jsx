import React from 'react';

export default function Search() {
    return (
        <div className="flex items-center">
            <div>Search</div>
            <input type="text" className="w-72 h-4 bg-transparent border border-gray outline-none px-2 py-4 rounded ml-3" />
        </div>
    );
}
