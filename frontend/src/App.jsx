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
    const [tags, setTags] = useState({});

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/quotes')
            .then((res) => setQuotes(res.data))
            .catch((error) => console.log(error));

        axios
            .get('http://localhost:8000/api/all')
            .then((res) => {
                let tagsObj = {};
                res.data.forEach((tag) => {
                    tagsObj[tag.id] = [...(tagsObj[tag.id] || ''), tag.tag];
                });
                setTags(tagsObj);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="min-h-[100dvh] flex flex-col items-center px-5 py-10">
            <Title content={isAdding ? 'Add Quote' : 'Quote Repository'} />

            <div className="">
                <RandomQuote />
            </div>

            <div className="w-full max-w-[1200px] mx-10 px-5 py-5 border">
                <div className="flex justify-between pb-5 border-b">
                    <Search />
                    <AddQuoteButton />
                </div>

                {quotes.length > 0 ? (
                    quotes.map((quote) => (
                        <QuotePreview
                            quote={quote}
                            tags={tags}
                            key={quote.id}
                        />
                    ))
                ) : (
                    <div className="pt-5">No quotes found</div>
                )}
            </div>
        </div>
    );
}
