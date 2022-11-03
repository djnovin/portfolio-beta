import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getPosts = async({params}) => {
    const posts = await prisma.post.findUnique({
        where: {
            
        }
    })
    return posts
}

const Page = ({post}) => {

    return (
        <p></p>
    )
}

export default Page