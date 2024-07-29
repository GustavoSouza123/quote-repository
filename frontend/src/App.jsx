import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/index.css';

import Title from './components/Title';
import RandomQuote from './components/RandomQuote';
import Search from './components/Search';
import AddQuoteButton from './components/AddQuoteButton';
import QuotePreview from './components/QuotePreview';
import Form from './components/Form';
import QuoteContent from './components/QuoteContent';

export default function App() {
    const [isAdding, setIsAdding] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [randomQuote, setRandomQuote] = useState([]);
    const [tags, setTags] = useState({});

    useEffect(() => {
        const getQuotes = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/quotes');
                setQuotes(res.data);
                setRandomQuote(
                    res.data[Math.floor(Math.random() * res.data.length)]
                );
            } catch (error) {
                console.log(error);
            }
        };

        const getTags = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/all');
                let tagsObj = {};
                res.data.forEach((tag) => {
                    tagsObj[tag.id] = [...(tagsObj[tag.id] || ''), tag.tag];
                });
                setTags(tagsObj);
            } catch (error) {
                console.log(error);
            }
        };

        getQuotes();
        getTags();
    }, []);

    const handleAddBtnClick = () => {
        setIsAdding(true);
    }

    const mainPageComponent = (
        <>
            <div className="">
                <RandomQuote quote={randomQuote} />
            </div>

            <div className="w-full max-w-[1200px] mx-10 px-5 border border-gray">
                <div className="flex items-center justify-between py-5">
                    <Search />
                    <AddQuoteButton onClick={handleAddBtnClick} />
                </div>

                {quotes ? (
                    quotes.map((quote) => (
                        <QuotePreview
                            quote={quote}
                            tags={tags}
                            key={quote.id}
                        />
                    ))
                ) : (
                    <div className="py-5 border-t border-gray">
                        No quotes found
                    </div>
                )}
            </div>
        </>
    );

    return (
        <div className="min-h-[100dvh] flex flex-col items-center px-5 py-10">
            <Title content={isAdding ? 'Add Quote' : 'Quote Repository'} />
            {isAdding ? <Form /> : mainPageComponent}
        </div>
    );
}
