import React from 'react';

export default function RandomQuote() {
    return (
        <div className="w-96 flex flex-col justify-center px-5 py-8 my-10 border border-solid border-gray-200">
            <span className="text-center">
                "A super hiper interesting, meaningful and useful quote from a
                very famous author"
            </span>
            <span className="text-right mt-3">— A very famous author</span>
        </div>
    );
}
