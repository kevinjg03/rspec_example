import React from 'react';
import { Navbar } from '../navbar/navbar';

interface ContactPageProps {
    title: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
}

export function ContactPage(props: ContactPageProps) {
    return (
        <>
        <Navbar isLoggedIn={false} />
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <p>{props.phone}</p>
            <p>{props.email}</p>
            <p>{props.address}</p>
            <p>{props.facebook}</p>
            <p>{props.instagram}</p>
            <p>{props.twitter}</p>
            <p>{props.linkedin}</p>
        </div>
        </>
    )
}