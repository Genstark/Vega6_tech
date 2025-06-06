import React, { useState } from 'react';
import axios from '../axios';

const AddBlog: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        if (image) data.append('image', image);

        await axios.post('/blogs', data, {
            headers: { Authorization: localStorage.getItem('token') },
        });
        alert('Blog added!');
    };

    return (
        <div className="container">
            <h2>Add Blog</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                    type="file"
                    onChange={(e) =>
                        setImage(e.target.files && e.target.files[0] ? e.target.files[0] : null)
                    }
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddBlog;
