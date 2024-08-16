import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, useLoaderData } from 'react-router-dom';
import './css/index.css';

import Title from './components/Title';
import RandomQuote from './components/RandomQuote';

export async function loader() {
    try {
        const quotes = await axios.get(
            `${import.meta.env.VITE_QUOTES_API}api/quotes`
        );
        return { quotes: quotes.data.length ? quotes.data : {} };
    } catch (error) {
        console.log(error);
    }
}

export default function App() {
    const { quotes } = useLoaderData();
    const [randomQuote, setRandomQuote] = useState([]);

    useEffect(() => {
        setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [quotes]);

    return (
        <div className="min-h-[100dvh] flex flex-col items-center py-10 px-3">
            <Title content={'Quote Repository'} />

            <div className="">
                <RandomQuote quote={randomQuote} />
            </div>

            <div
                className={`w-full max-w-[1200px] flex sm:flex-col lg:gap-10 sm:items-center justify-between mx-10 px-5 border border-gray`}
            >
                <Outlet />
            </div>
        </div>
    );
}
