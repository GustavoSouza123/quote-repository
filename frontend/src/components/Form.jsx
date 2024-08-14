import React from "react";
import { useState, useEffect } from "react";
// import axios from "axios";
import { useLoaderData } from "react-router-dom";

export default function Form() {
    const { quote } = useLoaderData();

    return (
        <form
            className="w-full flex flex-col items-center gap-5 py-10"
            method="post"
        >
            <h1>my form</h1>
            <div className="w-[360px] flex justify-between items-center">
                <label htmlFor="quote">Quote</label>
                <textarea
                    name="quote"
                    id="quote"
                    rows={6}
                    defaultValue={quote.data[0].quote}
                    // onChange={handleInput}
                    className="w-80 bg-transparent border border-gray outline-none p-2 rounded resize-none"
                ></textarea>
            </div>

            <div className="w-[360px] flex justify-between items-center">
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    name="author"
                    id="author"
                    defaultValue={quote.data[0].author}
                    // onChange={handleInput}
                    className="w-80 h-10 bg-transparent border border-gray outline-none px-2 rounded"
                />
            </div>

            <div className="w-[360px] flex flex-wrap gap-3">
                <p>//checkboxes</p>
                {/* {checkboxes.map((checkbox, id) => (
                    <Checkbox
                        key={id}
                        tag={checkbox.tag}
                        isChecked={checkbox.checked}
                        handleCheck={() => handleCheck(id)}
                    />
                ))} */}
            </div>

            <div className="flex justify-center">
                <input
                    type="submit"
                    // value={isEditing ? 'Update' : 'Add'}
                    className="w-24 bg-blue px-3 py-2 rounded cursor-pointer"
                />
            </div>
        </form>
    );
}