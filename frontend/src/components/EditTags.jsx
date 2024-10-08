import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';

export async function loader() {
    try {
        const tags = await axios.get(
            `${import.meta.env.VITE_QUOTES_API}api/tags`
        );
        return { tags: tags.data.length ? tags.data : {} };
    } catch (error) {
        console.log(error);
    }
}

export default function EditTags() {
    const { tags } = useLoaderData();
    const navigate = useNavigate();

    const [tagsData, setTagsData] = useState([]);

    const handleInput = (event, index) => {
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

    const handleDeleteTag = async (index) => {
        try {
            if (confirm(`Do you want to delete tag ${index}?`)) {
                await axios
                    .delete(
                        `${import.meta.env.VITE_QUOTES_API}api/tags/${index}`
                    )
                    .then(() => navigate('/'))
                    .catch((error) => console.log(error));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        tagsData.forEach(async (tag) => {
            await axios
                .put(`${import.meta.env.VITE_QUOTES_API}api/tags/${tag.id}`, {
                    tag: tag.tag,
                })
                .then(() => navigate('/'))
                .catch((error) => console.log(error));
        });
    };

    return (
        <>
            <form
                className="w-full flex flex-col items-center gap-5 py-10"
                method="post"
                onSubmit={handleSubmit}
            >
                <div className="">Edit Tags</div>

                {tags.length ? (
                    tags.map((tag) => (
                        <div className="flex items-center gap-5" key={tag.id}>
                            <label htmlFor="tag">Tag {tag.id}</label>
                            <input
                                type="text"
                                name="tag"
                                id="tag"
                                defaultValue={tag.tag}
                                onChange={() => handleInput(event, tag.id)}
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
                    <div>No tags</div>
                )}

                <div className="flex justify-center">
                    <input
                        type="submit"
                        value="Update"
                        className="w-24 bg-blue px-3 py-2 rounded cursor-pointer"
                    />
                </div>
            </form>
        </>
    );
}
