import React, { useState } from 'react';
import axios from '../axios';

function AddBlog() {
    const [form, setForm] = useState({ title: '', description: '', image: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', form.title);
        data.append('description', form.description);
        data.append('image', form.image);

        await axios.post('/blogs', data, {
            headers: { Authorization: localStorage.getItem('token') },
        });
        alert('Blog added!');
    };

    return (
        <div className="container">
            <h2>Add Blog</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
                <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddBlog;
