import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
    try {
        const quote = await axios.get(
            `http://localhost:8000/api/quotes/${params.quoteId}`
        );

        /* the code below generate the following error:
        "You defined a loader for route "0-0-1" but didn't return anything from your `loader` 
            function. Please return a value or `null`." */
        // if (typeof quote.data.message === 'string') {
        //     throw new Response('', {
        //         status: 404,
        //         statusText: 'Not Found',
        //     });
        // }
        
        return { quote };
    } catch (error) {
        console.log(error);
    }
}

export default function QuoteContent() {
    const { quote } = useLoaderData();
    console.log(quote.data[0])

    return (
        <div className="flex flex-col">
            <div className="">
                {quote.data.map((quote) => (
                    <div key={quote.id}>
                        <p>{quote.id}</p>
                        <p>{quote.quote}</p>
                        <p>{quote.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
