import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getPosts = async() => {
    const posts = await prisma.post.findMany()
    return posts
}

const Layout = async({ children }) => {
    const posts = await getPosts()
    console.log(posts)
    return (
    <>
        <div className="pb-48">{children}</div>
    </>
    )
}

export default Layout