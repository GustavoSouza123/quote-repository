import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Checkbox from './Checkbox';

export default function Form({ table, tags, isEditing, editingQuote }) {
    const values =
        table == 'quotes'
            ? {
                  quote: isEditing ? editingQuote.quote : '',
                  author: isEditing ? editingQuote.author : '',
                  tags: isEditing ? editingQuote.tags : [],
              }
            : table == 'tags'
              ? {
                    tag: '',
                }
              : {};

    const checkboxesObj = tags.map((tag) => {
        let checkedBool = false;
        if (isEditing && table == 'quotes') {
            checkedBool = editingQuote.tags.includes(tag.id);
        }
        return { id: tag.id, tag: tag.tag, checked: checkedBool };
    });

    const [data, setData] = useState(values);
    const [tagsData, setTagsData] = useState([]);
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

    const handleTagsInput = (event, index) => {
        const updatedTag = {
            id: index,
            tag: event.target.value,
        };

        let updatedTags = [...tagsData];

        if (tagsData.length == 0) {
            updatedTags.push(updatedTag);
        } else {
            const newTag = updatedTags.every((tag) => tag.id != index);
            if (!newTag) {
                updatedTags = tagsData.map((tag) => {
                    if (tag.id === index) {
                        return updatedTag;
                    }
                    return tag;
                });
            } else {
                updatedTags.push(updatedTag);
            }
        }

        setTagsData(updatedTags);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isEditing) {
            if (table == 'tags') {
                tagsData.forEach(async (tag) => {
                    await axios
                        .put(`http://localhost:8000/api/tags/${tag.id}`, {
                            tag: tag.tag,
                        })
                        .then(() => location.reload())
                        .catch((error) => console.log(error));
                });
            } else {
                await axios
                    .put(
                        `http://localhost:8000/api/quotes/${editingQuote.id}`,
                        data
                    )
                    .then(() => location.reload())
                    .catch((error) => console.log(error));
            }
        } else {
            await axios
                .post(`http://localhost:8000/api/${table}`, data)
                .then(() => location.reload())
                .catch((error) => console.log(error));
        }
    };

    const handleDeleteTag = async (index) => {
        try {
            if (confirm(`Do you want to delete tag ${index}?`)) {
                await axios.delete(`http://localhost:8000/api/tags/${index}`);
                location.reload();
            }
        } catch (error) {
            console.log(error);
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
                    {checkboxes.map((checkbox, id) => (
                        <Checkbox
                            key={id}
                            tag={checkbox.tag}
                            isChecked={checkbox.checked}
                            handleCheck={() => handleCheck(id)}
                        />
                    ))}
                </div>
            </>
        ) : table == 'tags' ? (
            isEditing ? (
                tags.map((tag) => (
                    <div className="flex items-center gap-5" key={tag.id}>
                        <label htmlFor="tag">Tag {tag.id}</label>
                        <input
                            type="text"
                            name="tag"
                            id="tag"
                            defaultValue={tag.tag}
                            onChange={() => handleTagsInput(event, tag.id)}
                            className="w-80 h-10 bg-transparent border border-gray outline-none px-2 rounded"
                        />
                        <div
                            onClick={() => handleDeleteTag(tag.id)}
                            className="cursor-pointer hover:text-[#aaa] transition"
                        >
                            Delete
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex justify-between items-center gap-5">
                    <label htmlFor="tag">Tag</label>
                    <input
                        type="text"
                        name="tag"
                        id="tag"
                        onChange={handleInput}
                        className="w-80 h-10 bg-transparent border border-gray outline-none px-2 rounded"
                    />
                </div>
            )
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
                        value={isEditing ? 'Update' : 'Add'}
                        className="w-24 bg-blue px-3 py-2 rounded cursor-pointer"
                    />
                </div>
            </form>
        </>
    );
}
