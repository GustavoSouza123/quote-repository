import React from 'react';

export default function QuotePreview({ quote, tags }) {
    return (
        <div className="flex flex-col gap-1 py-5 border-b">
            <div className="">{quote.quote}</div>
            <div className="">{quote.author}</div>
            <div className="flex gap-2">
                {tags[quote.id] ? (
                    tags[quote.id].map((tag, id) => (
                        <div className="cursor-pointer underline" key={id}>
                            {tag}
                            {id+1 == tags[quote.id].length ? '' : ', '}
                        </div>
                    ))
                ) : (
                    <div className="">No tags</div>
                )}
            </div>
        </div>
    );
}
