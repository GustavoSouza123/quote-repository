import React from 'react';

export default function Checkbox({ tag, isChecked, handleCheck }) {
    return (
        <div className="flex items-center">
            <input
                className="mr-1"
                type="checkbox"
                id={tag}
                checked={isChecked}
                onChange={handleCheck}
            />
            <label htmlFor={tag}>{tag}</label>
        </div>
    );
}
