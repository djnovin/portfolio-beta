import { Blog, Blogs } from '../types'

export const sortByDate = (blogs: Blogs) => {
    return blogs.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}
