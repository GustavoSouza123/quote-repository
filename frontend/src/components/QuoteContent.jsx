import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
    try {
        const quote = await axios.get(
            `${import.meta.env.VITE_QUOTES_API}api/quotes/${params.quoteId}`
        );

        const tags = await axios.get(
            `${import.meta.env.VITE_QUOTES_API}api/tags`
        );

        const res = await axios.get(
            `${import.meta.env.VITE_QUOTES_API}api/all`
        );
        let tagsFromQuotes = {};
        if (res.data.length) {
            res.data.forEach((quote) => {
                tagsFromQuotes[quote.id] = [
                    ...(tagsFromQuotes[quote.id] || ''),
                    { tagId: quote.tagId, tag: quote.tag },
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
            tagsFromQuotes: tagsFromQuotes[quote?.data[0]?.id] || [],
        };
    } catch (error) {
        console.log(error);
    }
}

export default function QuoteContent() {
    const { quote, tags, tagsFromQuotes } = useLoaderData();

    let created = quote.createdAt
        .replace('.000Z', '')
        .replace(/-/g, '/')
        .split('T');
    let time = created[1].split(':');
    time[0] = parseInt(time[0]) - 5;
    time = time.join(':');
    created[1] = time;
    created = created.join(', ');

    let updated = '-';
    if (quote.updatedAt) {
        let updated = quote.updatedAt
            .replace('.000Z', '')
            .replace(/-/g, '/')
            .split('T');
        let time2 = updated[1].split(':');
        time2[0] = parseInt(time2[0]) - 5;
        time2 = time2.join(':');
        updated[1] = time2;
        updated = updated.join(', ');
    }

    return (
        <div className="w-full flex flex-col gap-1 items-center py-10 text-center">
            <div className="text-xl font-semibold">“{quote.quote}”</div>
            <div className="">– {quote.author}</div>

            <div className="flex flex-wrap gap-2 my-5">
                <div className="">Tags:</div>
                {tagsFromQuotes.length ? (
                    tagsFromQuotes.map((tag, id) => (
                        <div
                            className="cursor-pointer underline font-light"
                            key={id}
                        >
                            {tag.tag}
                            {id + 1 == tagsFromQuotes.length ? '' : ', '}
                        </div>
                    ))
                ) : (
                    <div className="">No tags</div>
                )}
            </div>

            <div className="text-[#aaa]">Created at: {created}</div>
            <div className="text-[#aaa]">Updated at: {updated}</div>
        </div>
    );
}
