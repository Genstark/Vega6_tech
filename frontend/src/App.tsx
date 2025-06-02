import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AddBlog from './pages/AddBlog';
import BlogList from './pages/BlogList';
import BlogView from './pages/BlogView';

function App() {
	return (
		<div className='page-wrapper'>
            <div className="container">
                <div className='card'>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/add-blog" element={<AddBlog />} />
							<Route path="/blogs" element={<BlogList />} />
						</Routes>
					</BrowserRouter>
				</div>
			</div>
		</div>
	);
}

export default App;
