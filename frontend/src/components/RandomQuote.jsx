import React from 'react';

export default function RandomQuote({ quote }) {
    return (
        <div className="max-w-[500px] flex flex-col justify-center mx-5 px-5 py-8 my-10 text-xl bg-[#262626]">
            {quote ? (
                <>
                    <span className="text-center">“{quote.quote}”</span>
                    <span className="text-right mt-3">— {quote.author}</span>
                </>
            ) : (
                <div>No quotes found</div>
            )}
        </div>
    );
}
