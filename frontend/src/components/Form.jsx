import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Form({ table, tags }) {
    const values =
        table == 'quotes'
            ? {
                  quote: '',
                  author: '',
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
        await axios
            .post(`http://localhost:8000/api/${table}`, data)
            .then((res) => location.reload())
            .catch((error) => console.log(error));
    };

    const inputs =
        table == 'quotes' ? (
            <>
                <div className="w-[330px] flex justify-between items-center">
                    <label htmlFor="quote">Quote</label>
                    <input
                        type="text"
                        name="quote"
                        id="quote"
                        onChange={handleInput}
                        className="w-72 h-4 bg-transparent border border-gray outline-none px-2 py-4 rounded"
                    />
                </div>

                <div className="w-[330px] flex justify-between items-center">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        onChange={handleInput}
                        className="w-72 h-4 bg-transparent border border-gray outline-none px-2 py-4 rounded"
                    />
                </div>

                <div className="w-[330px] flex flex-wrap gap-3">
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
                <div className="w-[310px] flex justify-between items-center">
                    <label htmlFor="quote">Tag</label>
                    <input
                        type="text"
                        name="tag"
                        id="tag"
                        onChange={handleInput}
                        className="w-72 h-4 bg-transparent border border-gray outline-none px-2 py-4 rounded"
                    />
                </div>
            </>
        ) : (
            <div>Error</div>
        );

    return (
        <>
            <form
                className="flex flex-col gap-5 py-10"
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
