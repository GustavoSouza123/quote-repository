import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Checkbox from './Checkbox';

export default function EditQuote() {
    const { quote, tags, tagsFromQuotes } = useLoaderData();
    const navigate = useNavigate();

    const values = {
        quote: quote.quote,
        author: quote.author,
        tags: tagsFromQuotes.map((tag) => tag.tagId),
    };

    const checkboxesObj = tags.map((tag) => {
        let checkedBool = false;
        checkedBool =
            tagsFromQuotes.length &&
            tagsFromQuotes.findIndex(
                (tagsFromQuote) => tagsFromQuote.tagId === tag.id
            ) >= 0;
        return { id: tag.id, tag: tag.tag, checked: checkedBool };
    });

    const [data, setData] = useState(values);
    const [checkboxes, setCheckboxes] = useState(checkboxesObj);

    useEffect(() => {
        const selectedCheckboxes = checkboxes
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id);
        setData({ ...data, tags: selectedCheckboxes });
    }, [checkboxes]);

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    // const handleTagsInput = (event, index) => {
    //     const updatedTag = {
    //         id: index,
    //         tag: event.target.value,
    //     };

    //     let updatedTags = [...tagsData];

    //     if (tagsData.length == 0) {
    //         updatedTags.push(updatedTag);
    //     } else {
    //         const newTag = updatedTags.every((tag) => tag.id != index);
    //         if (!newTag) {
    //             updatedTags = tagsData.map((tag) => {
    //                 if (tag.id === index) {
    //                     return updatedTag;
    //                 }
    //                 return tag;
    //             });
    //         } else {
    //             updatedTags.push(updatedTag);
    //         }
    //     }

    //     setTagsData(updatedTags);
    // };

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
            .put(
                `http://localhost:8000/api/quotes/${quote.id}`,
                data
            )
            .then(() => navigate('/'))
            .catch((error) => console.log(error));
    }

    return (
        <form
            className="w-full flex flex-col items-center gap-5 py-10"
            method="post"
            onSubmit={handleSubmit}
        >
            <div className="w-[360px] flex justify-between items-center">
                <label htmlFor="quote">Quote</label>
                <textarea
                    name="quote"
                    id="quote"
                    rows={6}
                    defaultValue={quote.quote}
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
                    defaultValue={quote.author}
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
                    value="Update"
                    className="w-24 bg-blue px-3 py-2 rounded cursor-pointer"
                />
            </div>
        </form>
    );
}
