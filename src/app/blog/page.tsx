import { Category } from '@/components/Categories'
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
        <div className='h-full px-8 flex flex-col gap-y-4'>
            {blogs.map(blog => (
                <Link
                    className='flex flex-row justify-between items-center gap-2 group'
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                >
                    <div className='flex flex-row items-center gap-2'>
                        <span className='group-hover:underline'>
                            {blog.title}
                        </span>
                        <Category category={blog.category} />
                    </div>
                    <span className='text-gray-500'>{blog.date}</span>
                </Link>
            ))}
        </div>
    )
}

export default page
