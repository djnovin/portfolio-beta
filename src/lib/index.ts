import { BLOGS } from '@/constants/blog'
import { Blogs } from '@/types/index'
import { prisma } from 'auth'

export const sortByDate = (blogs: Blogs) => {
    return blogs.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

export const getAdjacentPosts = (currentPostSlug: string, allPosts: Blogs) => {
    const currentIndex = allPosts.findIndex(
        post => post.slug === currentPostSlug
    )
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
    const nextPost =
        currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
    return { prevPost, nextPost }
}

export const getSimilarPosts = (
    currentPostSlug: string,
    allPosts: Blogs
): Blogs => {
    const currentPost = allPosts.find(post => post.slug === currentPostSlug)
    if (!currentPost) return []

    const similarPosts = allPosts
        .filter(post => post.slug !== currentPostSlug)
        .map(post => ({
            ...post,
            tagMatchCount: post.tags.filter(tag =>
                currentPost.tags.includes(tag)
            ).length
        }))
        .filter(post => post.tagMatchCount > 0)
        .sort((a, b) => b.tagMatchCount - a.tagMatchCount)
        .slice(0, 3)

    return similarPosts
}

export const getBlogComments = async (slug: string) => {
    const data = await prisma?.comment?.findMany({
        include: {
            author: true
        },
        where: {
            blogSlug: slug
        }
    })

    console.log(data)

    return data
}

export const getBlog = (slug: string) => {
    return BLOGS.find(blog => blog.slug === slug)
}
