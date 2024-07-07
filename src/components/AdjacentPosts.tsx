import Link from 'next/link'
import { Blog } from '../types'

export const AdjacentPosts = ({
    prevPost,
    nextPost
}: {
    prevPost: Blog | null
    nextPost: Blog | null
}) => (
    <div className='flex flex-row gap-x-4 mt-10 justify-between items-start'>
        {prevPost && (
            <div className=''>
                <Link
                    className=''
                    href={`/blog/${prevPost.slug}`}
                    aria-label={`Link to ${prevPost.title}`}
                >
                    <h3 className='text-xl font-bold'>Previous Post</h3>
                    <p>{prevPost.title}</p>
                </Link>
            </div>
        )}

        {nextPost && (
            <div className=''>
                <Link
                    className=''
                    href={`/blog/${nextPost.slug}`}
                    aria-label={`Link to ${nextPost.title}`}
                >
                    <h3 className='text-xl font-bold'>Next Post</h3>
                    <p>{nextPost.title}</p>
                </Link>
            </div>
        )}
    </div>
)
