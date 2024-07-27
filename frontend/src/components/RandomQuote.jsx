import React from 'react';

export default function RandomQuote() {
    return (
        <div className="max-w-[600px] flex flex-col justify-center px-5 py-8 my-10 text-xl border border-gray">
            <span className="text-center">
                "A super hiper interesting, meaningful and useful quote from a
                very famous author"
            </span>
            <span className="text-right mt-3">— A very famous author</span>
        </div>
    );
}
