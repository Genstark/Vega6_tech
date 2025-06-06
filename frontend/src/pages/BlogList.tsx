import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

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
<<<<<<< HEAD:frontend/src/pages/BlogList.jsx
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data));
=======
        (async () => {
            const response = await axios.get('/blogs');
            setBlogs(response.data);
        })();
        return () => {
            // Clean up function
            setBlogs([]);
            console.log('Cleanup: BlogList component unmounted');
        };
>>>>>>> 51bbbef (few change):frontend/src/pages/BlogList.tsx
    }, []);

    const handleView = (blog: Blog) => {
        console.log('Viewing:', blog);
    };

    const handleEdit = (blog: Blog) => {
        console.log('Editing:', blog);
    };

<<<<<<< HEAD:frontend/src/pages/BlogList.jsx
    const handleDelete = (id) => {
        console.log('Deleting:', id);
=======
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
>>>>>>> 51bbbef (few change):frontend/src/pages/BlogList.tsx
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
