import React from 'react';
import { visit } from '@hotwired/turbo';

interface NavbarProps {
    isLoggedIn: boolean;
}

export function Navbar(props: NavbarProps) {
    const { isLoggedIn } = props;

    const navigateToIndex = () => {
        visit('/posts', { action: 'replace' });
    };

    const navigateToNewPost = () => {
        visit('/posts/new', { action: 'replace' });
    };

    const navigateToLogin = () => {
        visit('/users/sign_in', { action: 'replace' });
    };

    const navigateToRegister = () => {
        visit('/users/sign_up', { action: 'replace' });
    };

    const navigateToLogout = () => {
        visit('/users/sign_out', { action: 'replace' });
    };

    return (
        <nav className="bg-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={navigateToIndex}>Mi Blog</h1>
            <div className="flex gap-4">
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={navigateToNewPost}>Nuevo Post</button>
                {isLoggedIn ? null : <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={navigateToRegister}>Register</button>}    
                {isLoggedIn ? <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={navigateToLogout}>Logout</button> : <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={navigateToLogin}>Login</button>}
            </div>
        </nav>
    )
}