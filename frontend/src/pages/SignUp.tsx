import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

interface SignUpForm {
    email: string;
    password: string;
    profileImage: File | null;
}

const SignUp: React.FC = () => {
    const [form, setForm] = useState<SignUpForm>({ email: '', password: '', profileImage: null });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append('email', form.email);
        data.append('password', form.password);
        if (form.profileImage) {
            data.append('profileImage', form.profileImage);
        }

        await axios.post('/auth/signup', data);
        alert('Signup successful');
        navigate('/');
    };

    return (
        <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <input
                    type="file"
                    onChange={(e) =>
                        setForm({ ...form, profileImage: e.target.files ? e.target.files[0] : null })
                    }
                />
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
};

export default SignUp;
