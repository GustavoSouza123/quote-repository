import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
    try {
        const quote = await axios.get(
            `http://localhost:8000/api/quotes/${params.quoteId}`
        );
        return { quote };
    } catch (error) {
        console.log(error);
    }
}

export default function QuoteContent() {
    const { quote } = useLoaderData();
    console.log(quote);

    return (
        <div className="flex flex-col">
            <div className="">
                {quote.data.map((quote) => (
                    <>
                        <p>{quote.id}</p>
                        <p>{quote.quote}</p>
                        <p>{quote.author}</p>
                    </>
                ))}
            </div>
        </div>
    );
}
