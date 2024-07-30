import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import dots from '../assets/dots.svg';

export default function QuotePreview({ quote, tags }) {
    const [isEditing, setIsEditing] = useState(false);
    const [click, setClick] = useState(false);
    const [display, setDisplay] = useState('hidden');

    const handleEditQuoteBtnClick = () => {
        setIsEditing(true);
    };

    const handleDeleteQuoteBtnClick = async () => {
        try {
            if (confirm(`Do you want to delete quote ${quote.id}?`)) {
                await axios.delete(
                    `http://localhost:8000/api/quotes/${quote.id}`
                );
                location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = () => {
        setClick(true);
    };

    const handleMouseEnter = (e) => {
        setDisplay('block');
    };

    const handleMouseLeave = (e) => {
        setDisplay('hidden');
        setClick(false);
    };

    return (
        <div
            className="relative flex flex-col gap-1 justify-between py-5 border-t border-gray hover:bg-hover transition"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="pr-10">“{quote.quote}”</div>
            <div className="">– {quote.author}</div>
            <div className="flex gap-2">
                {tags[quote.id] ? (
                    tags[quote.id].map((tag, id) => (
                        <div
                            className="cursor-pointer underline font-light"
                            key={id}
                        >
                            {tag}
                            {id + 1 == tags[quote.id].length ? '' : ', '}
                        </div>
                    ))
                ) : (
                    <div className="">No tags</div>
                )}
            </div>
            <div className={`absolute top-5 right-2 ${display}`}>
                <img
                    className="w-6 cursor-pointer"
                    src={dots}
                    alt="More options"
                    onClick={handleClick}
                />
            </div>
            <div
                className={`absolute bottom-5 right-5 ${click ? 'flex' : 'hidden'} gap-5 justify-center items-center`}
            >
                <div
                    onClick={handleEditQuoteBtnClick}
                    className="cursor-pointer hover:hover:text-[#aaa] transition"
                >
                    Edit
                </div>
                <div
                    onClick={handleDeleteQuoteBtnClick}
                    className="cursor-pointer hover:text-[#aaa] transition"
                >
                    Delete
                </div>
            </div>
        </div>
    );
}
