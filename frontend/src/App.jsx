import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import './css/index.css';

import Title from './components/Title';
import RandomQuote from './components/RandomQuote';
import Form from './components/Form';

export default function App() {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingQuote, setEditingQuote] = useState({});
    const [formTable, setFormTable] = useState('');
    const [search, setSearch] = useState('');
    const [searchTags, setSearchTags] = useState([]);
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
                    res.data.forEach((quote) => {
                        tagsObj[quote.id] = [
                            ...(tagsObj[quote.id] || ''),
                            quote.tag,
                        ];
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
                    <Outlet />
                )}
            </div>
        </div>
    );
}
