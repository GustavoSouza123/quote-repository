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

    return (
        <div className="bg-red-600 min-h-[100dvh] flex flex-col items-center py-10">
            <Title content={isAdding ? 'Add Quote' : 'Quote Repository'} />

            <div className="">
                <RandomQuote />
            </div>

            <div className="bg-green-600 w-full max-w-[1200px] mx-10 px-5 py-5">
                <div className="flex justify-between">
                    <Search />
                    <AddQuoteButton />
                </div>
                <QuotePreview />
            </div>
        </div>
    );
}
