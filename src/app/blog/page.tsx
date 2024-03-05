import { blogs } from '@/constants/blog'
import Link from 'next/link'
import React from 'react'
const inProgress = false

const page = () => {
    return inProgress ? (
        <div className='h-screen flex justify-center items-center px-8'>
            <h1 className='uppercase'>Blog In Progress</h1>
        </div>
    ) : (
        <div className='h-screen px-8'>
            {blogs.map(blog => (
                <div key={blog.id}>
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </div>
            ))}
        </div>
    )
}

export default page
