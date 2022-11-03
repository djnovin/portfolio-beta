import Image from 'next/image'
import Link from 'next/link'
import Data from '../lib/data'
import BlogCard from './BlogCard'

import { use } from "react"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getPosts = async() => {
    const posts = await prisma.post.findMany()
    return posts
}

const BlogFeed = async() => {
    const posts = await getPosts()
    console.log(posts)
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {posts?.map((post) => (
                    <Link href={`/blog/${post.id}`} key={post.id}>
                        <BlogCard />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogFeed