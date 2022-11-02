
import Hero from "../../components/BlogHero"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getPosts = async() => {
    const posts = await prisma.post.findMany()
    return posts
}

const Page = async() => {
    const posts = await getPosts()
    console.log(posts)
    return (
    <>
        <Hero />
        <ul>
            {posts?.map((post) => (
                <li className="dark:text-white" key={post.key}>{post.title}</li>
            ))}
        </ul>
    </>
    )
}

export default Page