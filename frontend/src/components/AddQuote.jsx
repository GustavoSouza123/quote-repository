import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Checkbox from './Checkbox';

export async function loader() {
    try {
        const tags = await axios.get('http://localhost:8000/api/tags');
        return { tags: tags.data };
    } catch (error) {
        console.log(error);
    }
}

export default function AddQuote() {
    const { tags } = useLoaderData();
    const navigate = useNavigate();

    const values = {
        quote: '',
        author: '',
        tags: [],
    };

    const checkboxesObj = tags.map((tag) => {
        return { id: tag.id, tag: tag.tag, checked: false };
    });

    const [data, setData] = useState(values);
    const [checkboxes, setCheckboxes] = useState(checkboxesObj);

    useEffect(() => {
        const selectedCheckboxes = checkboxes
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id);
        setData({ ...data, tags: selectedCheckboxes });
    }, [checkboxes]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCheck = (index) => {
        setCheckboxes(
            checkboxes.map((checkbox, curId) =>
                curId === index
                    ? { ...checkbox, checked: !checkbox.checked }
                    : checkbox
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`http://localhost:8000/api/quotes/`, data)
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
                <div className="">Add quote</div>
                <div className="w-[360px] flex justify-between items-center">
                    <label htmlFor="quote">Quote</label>
                    <textarea
                        name="quote"
                        id="quote"
                        rows={6}
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
                        onChange={handleInput}
                        className="w-80 h-10 bg-transparent border border-gray outline-none px-2 rounded"
                    />
                </div>

                <div className="w-[360px] flex justify-center flex-wrap gap-3">
                    {checkboxes.map((checkbox, id) => (
                        <Checkbox
                            key={id}
                            tag={checkbox.tag}
                            isChecked={checkbox.checked}
                            handleCheck={() => handleCheck(id)}
                        />
                    ))}
                </div>

                <div className="flex justify-center">
                    <input
                        type="submit"
                        // value={isEditing ? 'Update' : 'Add'}
                        value="Add"
                        className="w-24 bg-blue px-3 py-2 rounded cursor-pointer"
                    />
                </div>
            </form>
        </>
    );
}
