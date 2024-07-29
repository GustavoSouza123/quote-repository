import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Form() {
    const [data, setData] = useState({
        quote: '',
        author: '',
    });

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios
            .post('http://localhost:8000/api/quotes', data)
            .then((res) => location.reload())
            .catch((error) => console.log(error));
    };

    return (
        <>
            <form
                className="flex flex-col gap-10 py-10"
                onSubmit={handleSubmit}
                method="post"
            >
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
