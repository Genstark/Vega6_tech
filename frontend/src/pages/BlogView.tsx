import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

interface Blog {
    _id: string;
    title: string;
    author: string;
    image?: string;
    content: string;
    // Add other fields if needed
}

const BlogView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                setBlog(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!blog) return <div>Blog not found.</div>;

    return (
        <div className="blog-view">
            <h2>{blog.title}</h2>
            <p>By {blog.author}</p>
            {blog.image && (
                <img
                    src={`http://localhost:5000/uploads/${blog.image}`}
                    alt={blog.title}
                    style={{ maxWidth: '400px', marginBottom: '20px' }}
                />
            )}
            <div>{blog.content}</div>
        </div>
    );
};

export default BlogView;