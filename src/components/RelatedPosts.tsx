import { Blog } from '../types'

export const RelatedPosts = ({
    params,
    similarPosts
}: {
    params: { slug: string }
    similarPosts: Blog[]
}) => (
    <div>
        <h2 className='text-2xl font-bold mt-8'>Related Posts</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4'>
            {similarPosts.map(blog => {
                if (blog.slug === params.slug) {
                    return null
                }

                return (
                    <div
                        key={blog.slug}
                        className='border border-solid border-black p-4'
                    >
                        <h3 className='text-xl font-bold'>{blog.title}</h3>
                        <p>{blog.content.substring(0, 160)} ...</p>
                        <a
                            className='text-blue-500 hover:underline'
                            href={`/blog/${blog.slug}`}
                            aria-label={`Link to ${blog.title}`}
                        >
                            Read more
                        </a>
                    </div>
                )
            })}
        </div>
    </div>
)
