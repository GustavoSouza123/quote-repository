import React from 'react';

export default function QuotePreview({ quote, author }) {
    return (
        <div className="bg-yellow-200 mt-5">
            <div className="bg-yellow-500 inline-block w-2/3">{quote}</div>
            <div className="bg-yellow-100 inline-block w-1/3 text-right">
                {author}
            </div>
        </div>
    );
}
