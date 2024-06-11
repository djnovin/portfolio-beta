import React from 'react'
import { Metadata } from 'next'

const inProgress = true

export const metadata: Metadata = {
    title: 'Home Page - Novin Noori - Software Engineer',
    description: 'Welcome to my home page where I share my thoughts and ideas.',
    keywords:
        'software engineer, software designer, rust, react, next.js, node.js, graphql, postgresql, redis, typescript, javascript, html, css',
    openGraph: {
        title: 'Home Page - Novin Noori - Software Engineer',
        description:
            'Welcome to my home page where I share my thoughts and ideas.',
        type: 'website',
        url: 'https://novinnoori.com'
    }
}

const Page = () => {
    return inProgress ? (
        <div className='h-screen flex justify-center items-center px-8'>
            <h1 className='uppercase'>Currently Updating My Page</h1>
        </div>
    ) : (
        <div className='h-screen flex justify-center items-center px-8'>
            <h1 className='uppercase'>
                I am a Software Designer / Engineer based in Sydney, Australia.
            </h1>
            <h1>Tech Stack</h1>
            <ul>
                <li>Rust</li>
                <li>React</li>
                <li>Next.js</li>
                <li>Node.js</li>
                <li>GraphQL</li>
                <li>PostgreSQL</li>
                <li>Redis</li>
                <li>Typescript</li>
                <li>JavaScript</li>
                <li>HTML</li>
                <li>CSS</li>
            </ul>
        </div>
    )
}

export default Page
