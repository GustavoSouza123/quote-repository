import React from 'react';

export default function RandomQuote({ quote }) {
    return (
        <div className="max-w-[600px] flex flex-col justify-center px-5 py-8 my-10 text-xl border border-gray">
            {quote.length ? (
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
