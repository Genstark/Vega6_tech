import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);

    const handleView = (blog) => {
        console.log('Viewing:', blog);
    };

    const handleEdit = (blog) => {
        console.log('Editing:', blog);
    };

    const handleDelete = (id) => {
        console.log('Deleting:', id);
    };

    return (
        <div className="container">
            <h2>Blog List</h2>
            {blogs.map(blog => (
                <BlogCard
                    key={blog._id}
                    blog={blog}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default BlogList;
