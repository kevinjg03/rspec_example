import React from 'react';
import { Navbar } from '../navbar/navbar';

interface AboutPageProps {
    title: string;
    description: string;
    address: string;
}

export function AboutPage(props: AboutPageProps) {
    return (    
        <>
        <Navbar isLoggedIn={false} />
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <p>{props.address}</p>
        </div>
        </>
    )
}