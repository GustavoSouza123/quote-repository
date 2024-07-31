import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Form({ table, tags, isEditing, editingQuote }) {
    const values =
        table == 'quotes'
            ? {
                  quote: isEditing ? editingQuote.quote : '',
                  author: isEditing ? editingQuote.author : '',
              }
            : table == 'tags'
              ? {
                    tag: '',
                }
              : {};

    const [data, setData] = useState(values);

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isEditing) {
            await axios
                .put(`http://localhost:8000/api/${table}/${editingQuote.id}`, data)
                .then(() => location.reload())
                .catch((error) => console.log(error));
        } else {
            await axios
                .post(`http://localhost:8000/api/${table}`, data)
                .then(() => location.reload())
                .catch((error) => console.log(error));
        }
    };

    const inputs =
        table == 'quotes' ? (
            <>
                <div className="w-[360px] flex justify-between items-center">
                    <label htmlFor="quote">Quote</label>
                    <textarea
                        name="quote"
                        id="quote"
                        rows={6}
                        defaultValue={editingQuote ? editingQuote.quote : ''}
                        onChange={handleInput}
                        className="w-80 bg-transparent border border-gray outline-none p-2 rounded resize-none"
                    ></textarea>
                </div>

                <div className="w-[360px] flex justify-between items-center">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        defaultValue={editingQuote ? editingQuote.author : ''}
                        onChange={handleInput}
                        className="w-80 h-10 bg-transparent border border-gray outline-none px-2 rounded"
                    />
                </div>

                <div className="w-[360px] flex flex-wrap gap-3">
                    {tags.map((tag, id) => (
                        <div className="flex items-center" key={id}>
                            <input
                                className="mr-1"
                                type="checkbox"
                                name={tag.tag}
                                id={tag.tag}
                            />
                            <label htmlFor={tag.tag}>{tag.tag}</label>
                        </div>
                    ))}
                </div>
            </>
        ) : table == 'tags' ? (
            <>
                <div className="w-[340px] flex justify-between items-center">
                    <label htmlFor="quote">Tag</label>
                    <input
                        type="text"
                        name="tag"
                        id="tag"
                        onChange={handleInput}
                        className="w-80 h-10 bg-transparent border border-gray outline-none px-2 rounded"
                    />
                </div>
            </>
        ) : (
            <div>Error</div>
        );

    return (
        <>
            <form
                className="w-full flex flex-col items-center gap-5 py-10"
                onSubmit={handleSubmit}
                method="post"
            >
                {inputs}

                <div className="flex justify-center">
                    <input
                        type="submit"
                        value="Add"
                        className="w-24 bg-blue px-3 py-2 rounded cursor-pointer"
                    />
                </div>
            </form>
        </>
    );
}
