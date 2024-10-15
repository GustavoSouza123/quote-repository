import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import dots from '../assets/dots.svg';

export default function QuotePreview({ quote, tags, handleTagClick }) {
    const navigate = useNavigate();

    const [click, setClick] = useState(false);
    const [display, setDisplay] = useState('hidden');

    const handleQuoteClick = (e) => {
        navigate(`/quotes/${quote.id}`);
    };

    // const handleMouseEnter = () => {
    //     setDisplay('block');
    // };

    // const handleMouseLeave = () => {
    //     setDisplay('hidden');
    //     setClick(false);
    // };

    // const handleDotsClick = (e) => {
    //     e.stopPropagation();
    //     setClick(true);
    // };

    return (
        <div
            className="relative flex flex-col gap-1 justify-between py-5 border-t border-gray hover:bg-hover transition"
            onClick={handleQuoteClick}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
        >
            <div className="pr-10">“{quote.quote}”</div>
            <div className="">– {quote.author}</div>
            <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                {tags[quote.id] ? (
                    tags[quote.id].map((tag, id) => (
                        <div
                            className="cursor-pointer underline font-light"
                            onClick={() => handleTagClick(tag)}
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
            {/* <div className={`absolute top-5 right-2 ${display}`}>
                <img
                    className="w-6 cursor-pointer"
                    src={dots}
                    alt="More options"
                    onClick={handleDotsClick}
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
            </div> */}
        </div>
    );
}
