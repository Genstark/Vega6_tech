import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import axios from '../axios';

interface Blog {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    // Add other fields if needed
}

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get('/blogs');
            setBlogs(response.data);
        })();
    }, []);

    const handleView = (blog: Blog) => {
        console.log('Viewing:', blog);
    };

    const handleEdit = (blog: Blog) => {
        console.log('Editing:', blog);
    };

    const handleDelete = async (id: string) => {
        console.log('Deleting:', id);
        try {
            await axios.delete(`/blogs/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token') || '',
                },
            });
            setBlogs(blogs.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
        }
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
