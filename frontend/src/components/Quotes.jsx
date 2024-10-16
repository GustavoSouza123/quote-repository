import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';

import RandomQuote from './RandomQuote';
import Button from './Button';
import QuotePreview from './QuotePreview';

export async function loader() {
    try {
        const quotes = await axios.get(
            `${import.meta.env.VITE_QUOTES_API}api/quotes`
        );

        const randomQuote = quotes.data.length
            ? quotes.data[Math.floor(Math.random() * quotes.data.length)]
            : [];

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
                    quote.tag,
                ];
            });
        }

        return {
            quotes: quotes.data.length ? quotes.data : {},
            randomQuote,
            tags: tags.data.length ? tags.data : {},
            tagsFromQuotes: tagsFromQuotes || [],
        };
    } catch (error) {
        console.log(error);
    }
}

export default function Quotes() {
    const { quotes, randomQuote, tags, tagsFromQuotes } = useLoaderData();
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [searchTags, setSearchTags] = useState([]);

    const handleAddQuoteBtnClick = () => {
        navigate('quotes/add');
    };

    const handleAddTagBtnClick = () => {
        navigate('tags/add');
    };

    const handleEditTagsBtnClick = () => {
        navigate('tags/edit');
    };

    const handleSearchInput = (event) => {
        setSearch(event.target.value);
    };

    const handleTagClick = (tag) => {
        if (!searchTags.includes(tag)) {
            setSearchTags([...searchTags, tag]);
        }
    };

    const handleClearTagClick = () => {
        setSearchTags([]);
    };

    const filteredQuotes =
        quotes.length &&
        quotes
            .filter((quote) => quote.quote.match(new RegExp(search, 'gi')))
            .filter((quote) => {
                if (searchTags.length > 0) {
                    if (tagsFromQuotes[quote.id]) {
                        return tagsFromQuotes[quote.id].some((tag) =>
                            searchTags.includes(tag)
                        );
                    }
                    return false;
                }
                return true;
            });

    return (
        <div className='flex flex-col items-center'>
            <div className="">
                <RandomQuote quote={randomQuote} />
            </div>

            <div className="w-full max-w-[1200px] flex sm:flex-col lg:gap-10 sm:items-center justify-between px-4 tn:px-2">
                <div className="flex flex-col flex-grow sm:w-full">
                    <div className="flex flex-col gap-5 py-5">
                        <div className="w-full flex items-center">
                            <input
                                type="text"
                                onChange={handleSearchInput}
                                className="h-4 bg-transparent border border-gray outline-none px-2 py-4 rounded mr-3 flex-grow"
                            />
                            <div className="cursor-pointer hover:hover:text-[#aaa] transition">
                                Search
                            </div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <div className="flex flex-wrap gap-5">
                                <div className="">
                                    Search results:
                                    <span className="ml-1">
                                        {search || '-'}
                                    </span>
                                </div>
                                <div className="">
                                    Tags:
                                    <span className="ml-1">
                                        {searchTags.join(', ') || 'All'}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-end w-24 cursor-pointer"
                                onClick={handleClearTagClick}
                            >
                                Clear filters
                            </div>
                        </div>
                    </div>

                    <div className="">
                        {filteredQuotes?.length > 0 ? (
                            filteredQuotes.map((quote) => (
                                <QuotePreview
                                    quote={quote}
                                    tags={tagsFromQuotes}
                                    handleTagClick={handleTagClick}
                                    key={quote.id}
                                />
                            ))
                        ) : (
                            <div className="py-5 border-t border-gray">
                                No quotes found
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:min-w-[290px] lg:max-w-[270px] sm:w-full py-5 flex flex-col gap-5 sm:order-first">
                    <div className="">
                        <span className="block mb-2 font-semibold">Tags:</span>
                        <div className="flex gap-2 flex-wrap">
                            {tags.length ? (
                                tags.map((tag, id) => (
                                    <div
                                        className="cursor-pointer underline font-light"
                                        onClick={() => handleTagClick(tag.tag)}
                                        key={tag.id}
                                    >
                                        {tag.tag}
                                        {id + 1 == tags.length ? '' : ', '}
                                    </div>
                                ))
                            ) : (
                                <div>No tags</div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={handleAddQuoteBtnClick}
                            action="Add Quote"
                        />
                        <Button
                            onClick={handleAddTagBtnClick}
                            action="Add Tag"
                        />
                        <Button
                            onClick={handleEditTagsBtnClick}
                            action="Edit Tags"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
