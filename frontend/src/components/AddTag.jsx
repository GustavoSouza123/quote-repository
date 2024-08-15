import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddQuote() {
    const navigate = useNavigate();

    const values = {
        tag: '',
    };

    const [data, setData] = useState(values);

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`http://localhost:8000/api/tags/`, data)
            .then(() => navigate('/'))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <form
                className="w-full flex flex-col items-center gap-5 py-10"
                method="post"
                onSubmit={handleSubmit}
            >
                <div className="">Add Tag</div>
                
                <div className="w-[340px] flex justify-between items-center">
                    <label htmlFor="author">Tag</label>
                    <input
                        type="text"
                        name="tag"
                        id="tag"
                        onChange={handleInput}
                        className="w-80 h-10 bg-transparent border border-gray outline-none px-2 rounded"
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
