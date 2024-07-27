import React from 'react';
import { useState } from 'react';
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
    const [quotes, setQuotes] = useState([
        {
            quote: 'A super hiper interesting, meaningful and useful quote from a very famous author',
            author: 'Gustavo Souza',
        },
        {
            quote: 'Another quote, this time shorter',
            author: 'John Doe',
        },
        {
            quote: 'The last quote of this dummy quotes to test my app',
            author: 'Foo Person',
        },
    ]);

    return (
        <div className="min-h-[100dvh] flex flex-col items-center py-10">
            <Title content={isAdding ? 'Add Quote' : 'Quote Repository'} />

            <div className="">
                <RandomQuote />
            </div>

            <div className="w-full max-w-[1200px] mx-10 px-5 py-5 border border-solid border-gray-200">
                <div className="flex justify-between">
                    <Search />
                    <AddQuoteButton />
                </div>

                {quotes.map((quote) => (
                    <QuotePreview quote={quote.quote} author={quote.author} />
                ))}
            </div>
        </div>
    );
}
