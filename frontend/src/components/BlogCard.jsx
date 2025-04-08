import React from "react";

const BlogCard = ({ blog, onView, onEdit, onDelete }) => {
    return (
        <div className="blog-card">
            <img src={blog.imageUrl} alt={blog.title} className="blog-img" />
            <div className="blog-content">
                <h3>{blog.title}</h3>
                <p className="desc-preview">{blog.description.slice(0, 100)}...</p>
                <div className="actions">
                    <button className="view" onClick={() => onView(blog)}>View</button>
                    <button className="edit" onClick={() => onEdit(blog)}>Edit</button>
                    <button className="delete" onClick={() => onDelete(blog._id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
