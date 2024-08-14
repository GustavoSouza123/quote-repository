import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
    try {
        const quote = await axios.get(
            `http://localhost:8000/api/quotes/${params.quoteId}`
        );

        const tags = await axios.get('http://localhost:8000/api/tags');

        const res = await axios.get('http://localhost:8000/api/all');
        let tagsFromQuotes = {};
        if (res.data.length) {
            res.data.forEach((quote) => {
                tagsFromQuotes[quote.id] = [
                    ...(tagsFromQuotes[quote.id] || ''),
                    quote.tag,
                ];
            });
        }

        /* the code below generate the following error:
        "You defined a loader for route "0-0-1" but didn't return anything from your `loader` 
            function. Please return a value or `null`." */
        // if (typeof quote.data.message === 'string') {
        //     throw new Response('', {
        //         status: 404,
        //         statusText: 'Not Found',
        //     });
        // }

        return {
            quote: quote.data[0],
            tags: tags.data,
            tagsFromQuotes: tagsFromQuotes[quote.data[0].id],
        };
    } catch (error) {
        console.log(error);
    }
}

export default function QuoteContent() {
    const { quote, tags, tagsFromQuotes } = useLoaderData();

    return (
        <div className="flex flex-col">
            <div className="">
                <p>{quote.id}</p>
                <p>{quote.quote}</p>
                <p>{quote.author}</p>

                <div className="flex gap-2">
                    {tagsFromQuotes ? (
                        tagsFromQuotes.map((tag, id) => (
                            <div
                                className="cursor-pointer underline font-light"
                                key={id}
                            >
                                {tag}
                                {id + 1 == tagsFromQuotes.length ? '' : ', '}
                            </div>
                        ))
                    ) : (
                        <div className="">No tags</div>
                    )}
                </div>
            </div>
        </div>
    );
}
