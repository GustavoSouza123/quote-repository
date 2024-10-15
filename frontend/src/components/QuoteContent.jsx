import React from 'react';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Button from './Button';

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
    const navigate = useNavigate();

    let created = new Date(quote.createdAt).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
    });

    let updated = '-';
    if (quote.updatedAt != null) {
        updated = new Date(quote.updatedAt).toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
        });
    }

    const handleEditQuoteBtnClick = (e) => {
        e.stopPropagation();
        navigate(`/quotes/${quote.id}/edit`);
    };

    const handleDeleteQuoteBtnClick = async (e) => {
        e.stopPropagation();
        try {
            if (confirm(`Do you want to delete quote ${quote.id}?`)) {
                await axios
                    .delete(
                        `${import.meta.env.VITE_QUOTES_API}api/quotes/${quote.id}`
                    )
                    .then(() => {
                        alert('Quote deleted successfully!');
                        navigate('/');
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-1 items-center py-10 text-center">
            <div className="text-xl font-semibold">“{quote.quote}”</div>
            <div className="">– {quote.author}</div>

            <div className="flex flex-wrap justify-center gap-2 my-5">
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

            <div className={`flex gap-5 justify-center items-center mt-5`}>
                <Button onClick={handleEditQuoteBtnClick} action="Edit" />
                <Button onClick={handleDeleteQuoteBtnClick} action="Delete" />
            </div>
        </div>
    );
}
