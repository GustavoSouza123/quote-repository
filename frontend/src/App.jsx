import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import './css/index.css';

import Title from './components/Title';
import RandomQuote from './components/RandomQuote';

export default function App() {
    const [randomQuote, setRandomQuote] = useState([]);

    useEffect(() => {
        const getRandomQuote = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/quotes');
                if (res.data.length) {
                    setRandomQuote(
                        res.data[Math.floor(Math.random() * res.data.length)]
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        getRandomQuote();
    }, []);

    return (
        <div className="min-h-[100dvh] flex flex-col items-center px-5 py-10">
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
