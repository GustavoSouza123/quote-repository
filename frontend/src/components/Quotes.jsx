import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import QuotePreview from './QuotePreview';

export default function Quotes() {
    const navigate = useNavigate();

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

    const handleAddQuoteBtnClick = () => {
        navigate('quotes/add');
        // setIsAdding(true);
        // setFormTable('quotes');
    };

    const handleAddTagBtnClick = () => {
        // setIsAdding(true);
        // setFormTable('tags');
    };

    const handleEditTagsBtnClick = () => {
        // setIsEditing(true);
        // setFormTable('tags');
    };

    // const handleEditQuoteBtnClick = (selectedQuote) => {
    //     let selectedTags = [];
    //     if (tagsFromQuotes[selectedQuote.id]) {
    //         selectedTags = tagsFromQuotes[selectedQuote.id].map(
    //             (tagFromQuote) =>
    //                 tags
    //                     .map((tag) =>
    //                         tag.tag === tagFromQuote ? tag.id : null
    //                     )
    //                     .filter((id) => id != null)[0]
    //                 );
    //     }
    //     selectedQuote = { ...selectedQuote, tags: selectedTags };
    //     setIsEditing(true);
    //     setFormTable('quotes');
    //     setEditingQuote(selectedQuote);
    // };

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

    const filteredQuotes = quotes
        .filter((quote) => quote.quote.match(new RegExp(search, 'g')))
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
        <>
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
                                <span className="ml-1">{search || '-'}</span>
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
                    {filteredQuotes.length > 0 ? (
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

            <div className="lg:min-w-[290px] lg:max-w-[270px] sm:w-full py-5 flex flex-col gap-5 sm:order-first sm:border-t sm:border-gray">
                <div className="">
                    <span className="block mb-2 font-semibold">Tags:</span>
                    <div className="flex gap-2 flex-wrap">
                        {tags ? (
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

                <div className="flex gap-3">
                    <Button
                        onClick={handleAddQuoteBtnClick}
                        action="Add Quote"
                    />
                    <Button onClick={handleAddTagBtnClick} action="Add Tag" />
                    <Button
                        onClick={handleEditTagsBtnClick}
                        action="Edit Tags"
                    />
                </div>
            </div>
        </>
    );
}
