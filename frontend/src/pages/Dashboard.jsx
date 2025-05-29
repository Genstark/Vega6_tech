import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get('/auth/me', {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setUser(res.data);
        };
        fetch();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <h2>Welcome, {user.email}</h2>
            <img
                src={`http://localhost:5000/uploads/${user.profileImage}`}
                alt="Profile"
                width={100}
                style={{ float: 'right', borderRadius: '50%' }}
            />
            <button onClick={() => navigate('/blogs')} style={{ marginTop: 20 }}>
                Go to Blog List
            </button>
        </>
    );
}

export default Dashboard;
