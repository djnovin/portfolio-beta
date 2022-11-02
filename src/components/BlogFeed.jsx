import Image from 'next/image'
import Link from 'next/link'
import Data from '../lib/data'

const Feed = ({ posts }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {posts?.map((post) => (
                    <div key={post.id}>
                        <h1 className="text-4xl font-semibold dark:text-white">{post.title}</h1>
                        <h2 className="text-xs font-light dark:text-white">{post.createdAt}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feed