import React from 'react';

export default function AddQuoteButton({ onClick }) {
    return (
        <>
            <div className="bg-blue px-3 py-2 rounded cursor-pointer" onClick={onClick}>Add Quote</div>
        </>
    );
}
