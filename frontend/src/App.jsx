import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/index.css';

import Title from './components/Title';
import RandomQuote from './components/RandomQuote';
import Button from './components/Button';
import QuotePreview from './components/QuotePreview';
import Form from './components/Form';
import QuoteContent from './components/QuoteContent';

export default function App() {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingQuote, setEditingQuote] = useState({});
    const [formTable, setFormTable] = useState('');
    const [search, setSearch] = useState('');
    const [quotes, setQuotes] = useState([]);
    const [randomQuote, setRandomQuote] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsFromQuotes, setTagsFromQuotes] = useState({});

    useEffect(() => {
        const getQuotes = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/quotes');
                if (res.data.length) {
                    setQuotes(res.data);
                    setRandomQuote(
                        res.data[Math.floor(Math.random() * res.data.length)]
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        const getTags = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/tags');
                if (res.data.length) {
                    setTags(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const getTagsFromQuotes = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/all');
                if (res.data.length) {
                    let tagsObj = {};
                    res.data.forEach((tag) => {
                        tagsObj[tag.id] = [...(tagsObj[tag.id] || ''), tag.tag];
                    });
                    setTagsFromQuotes(tagsObj);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getQuotes();
        getTags();
        getTagsFromQuotes();
    }, []);

    const handleAddQuoteBtnClick = () => {
        setIsAdding(true);
        setFormTable('quotes');
    };

    const handleAddTagBtnClick = () => {
        setIsAdding(true);
        setFormTable('tags');
    };

    const handleEditQuoteBtnClick = (quote) => {
        setIsEditing(true);
        setFormTable('quotes');
        setEditingQuote(quote);
    };

    const handleSearchInput = (event) => {
        setSearch(event.target.value);
    };

    const mainPageComponent = (
        <>
            <div className="flex flex-col flex-grow sm:w-full">
                <div className="flex items-center justify-between py-5">
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
                </div>

                <div className="">
                    {quotes ? (
                        quotes.filter(quote => quote.quote.match(new RegExp(search, 'g'))).map((quote) => (
                            <QuotePreview
                                quote={quote}
                                tags={tagsFromQuotes}
                                handleEditQuoteBtnClick={
                                    handleEditQuoteBtnClick
                                }
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

            <div className="lg:w-[270px] sm:w-full py-5 flex flex-col gap-5 sm:border-t sm:border-gray">
                <div className="">
                    <span className="font-semibold">Tags:</span>
                    <div className="flex gap-2 flex-wrap">
                        {tags ? (
                            tags.map((tag, id) => (
                                <div
                                    className="cursor-pointer underline font-light"
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

                <div className="flex gap-3">
                    <Button
                        onClick={handleAddQuoteBtnClick}
                        action="Add Quote"
                    />
                    <Button onClick={handleAddTagBtnClick} action="Add Tag" />
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-[100dvh] flex flex-col items-center px-5 py-10">
            <Title content={'Quote Repository'} />

            <div className="">
                <RandomQuote quote={randomQuote} />
            </div>

            <div
                className={`w-full max-w-[1200px] flex sm:flex-col lg:gap-10 sm:items-center ${isAdding ? 'justify-center' : 'justify-between'} mx-10 px-5 border border-gray`}
            >
                {isAdding || isEditing ? (
                    <Form
                        table={formTable}
                        tags={tags}
                        isEditing={isEditing}
                        editingQuote={editingQuote}
                    />
                ) : (
                    mainPageComponent
                )}
            </div>
        </div>
    );
}
