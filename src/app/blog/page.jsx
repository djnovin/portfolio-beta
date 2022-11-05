import Hero from "../../components/BlogHero"

import Link from "next/link"
import Image from "next/image"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getPosts = async() => {
    const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
    })
    return posts
}

const Page = async() => {
    const posts = await getPosts()
    console.log(posts)
    return (
    <>
        <Hero />
        <div className="grid grid-cols-1 gap-20 md:gap-4 md:grid-cols-2">
        {posts?.map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                            <div>
                                <div className="relative w-full h-full mb-6 overflow-hidden">
                                    <Image 
                                    height={960}
                                    width={1080}
                                    quality={70}
                                    src={post.thumbnail}
                                    alt={post.title} 
                                    objectFit='contain'
                                    className=""/>
                                </div>
                                <h1 className="text-4xl font-semibold dark:text-white">{post.title}</h1>
                            </div>
                </Link>
                ))}
        </div>
    </>
    )
}

export default Page