

const BlogCard = ({ post }) => {
    return (
        <div>
            <h1 className="text-4xl font-semibold dark:text-white">{post.title}</h1>
            <h2 className="text-xs font-light dark:text-white">{post.createdAt}</h2>
        </div>
    )
}

export default BlogCard