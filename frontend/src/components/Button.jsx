import React from 'react';

export default function Button({ onClick, action }) {
    return (
        <>
            <div
                className="bg-blue px-3 py-2 rounded cursor-pointer"
                onClick={onClick}
            >
                {action}
            </div>
        </>
    );
}
