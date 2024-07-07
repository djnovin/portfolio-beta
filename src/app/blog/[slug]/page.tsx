/* eslint-disable max-lines-per-function */
import Image from 'next/image'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import cn from 'classnames'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import {
    Breadcrumbs,
    CommentInput,
    DeleteCommentButton,
    ProgressBar,
    ScrollToTopButton,
    SignInButton
} from '@/components/index'
import { BLOGS } from '@/constants/blog'
import { Metadata } from 'next'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Props } from '@/types/index'
import { auth, prisma } from 'auth'
import { revalidatePath } from 'next/cache'
import {
    getAdjacentPosts,
    getBlog,
    getBlogComments,
    getSimilarPosts
} from '@/lib/index'
import { AdBanner } from '@/components/AdBanner'
import { RemoteMdxPage } from '@/components/MDXPage'
import { AdjacentPosts } from '@/components/AdjacentPosts'
import { DidYouFindThisArticleHelpful } from '@/components/DidYouFindThisArticleHelpful'
import { SubscribeForm } from '@/components/SubscribeForm'
import { RelatedPosts } from '@/components/RelatedPosts'

export const generateMetadata = async ({
    params
}: Props): Promise<Metadata> => {
    const blog = getBlog(params.slug)

    return {
        applicationName: 'Novin Noori - Software Engineer Blog',
        authors: [{ name: 'Novin Noori' }],
        creator: 'Novin Noori',
        description: blog?.content.substring(0, 160) + ' ...',
        generator: 'Novin Noori - Software Engineer Blog',
        keywords: blog?.tags.join(', '),
        publisher: 'Novin Noori',
        title: blog?.title,
        twitter: {
            card: 'summary',
            description: blog?.content.substring(0, 160) + ' ...',
            site: '@djnovinnoori',
            title: blog?.title
        },
        openGraph: {
            description: blog?.content.substring(0, 160) + ' ...',
            title: blog?.title,
            type: 'article',
            url: `https://novinnoori.com/blog/${blog?.slug}`
        }
    }
}

export default async function page({ params }: { params: { slug: string } }) {
    const blog = getBlog(params.slug)
    const similarPosts = getSimilarPosts(params.slug, BLOGS)

    const { prevPost, nextPost } = getAdjacentPosts(params.slug, BLOGS)

    const comments = await getBlogComments(params.slug)

    const handleComment = async (formData: FormData) => {
        'use server'

        const session = await auth()

        const author = session?.user?.id
        const blogSlug = params.slug
        const comment = formData.get('comment') as string

        await prisma.comment.create({
            data: {
                author: {
                    connect: {
                        id: author
                    }
                },
                blogSlug: blogSlug,
                body: comment
            }
        })

        revalidatePath(`/blog/${params.slug}`)
    }

    const session = await auth()

    return (
        <>
            <ProgressBar />
            <ScrollToTopButton />
            <div className='px-8 pb-20'>
                <AdBanner
                    dataAdFormat='auto'
                    dataAdLayout='in-article'
                    dataAdSlot='3651028178'
                    dataFullWidthResponsive={true}
                />
                {blog && (
                    <Breadcrumbs
                        crumbs={[
                            { label: 'Blog', path: '/blog' },
                            { label: blog.title, path: `/blog/${blog.slug}` }
                        ]}
                        aria-label='Breadcrumb navigation'
                    />
                )}
                <RemoteMdxPage slug={params.slug} />
                <div className='my-20' aria-label='Helpful article feedback'>
                    <p className='text-center font-semibold text-lg'>
                        Did you find this article helpful?
                    </p>
                    <form className='flex flex-row gap-x-4 justify-center mt-4'>
                        <button className='bg-black text-white py-2 px-4 rounded-none border border-solid border-black'>
                            Yes
                        </button>
                        <button className='bg-black text-white py-2 px-4 rounded-none border border-solid border-black'>
                            No
                        </button>
                    </form>
                </div>
                <div className='mt-8'>
                    <div>
                        {session ? (
                            <form
                                className='mt-8 w-full flex flex-row gap-4'
                                action={handleComment}
                            >
                                <div>
                                    <div className='relative rounded-full bg-gray-200 w-6 h-6 overflow-hidden'>
                                        <Image
                                            fill={true}
                                            alt='Profile picture'
                                            objectFit='cover'
                                            objectPosition='center'
                                            src={session?.user?.image || ''}
                                            priority={false}
                                            quality={75}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-y-1 w-full'>
                                    <CommentInput />
                                    <button
                                        className='bg-black text-white py-2 px-4 rounded-none border border-solid border-black'
                                        type='submit'
                                    >
                                        {comments.length === 0
                                            ? 'Be the first to comment'
                                            : 'Comment'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className='mt-4 mb-10'>
                                <p
                                    className='mb-4'
                                    aria-label='Comment description'
                                    role='description'
                                >
                                    If you want to comment, please sign in
                                    first.
                                </p>
                                <SignInButton />
                            </div>
                        )}
                    </div>
                    <span
                        className='text-2xl font-bold'
                        aria-label='Comments title'
                    >
                        Comments ({comments.length})
                    </span>
                    {comments.map(comment => {
                        if (!comment) {
                            return null
                        }
                        return (
                            <div
                                key={comment.id}
                                className='flex flex-row gap-x-4 justify-start mt-8'
                                aria-label='Comment'
                            >
                                <div>
                                    <div className='relative rounded-full bg-gray-200 w-6 h-6 overflow-hidden'>
                                        <Image
                                            fill={true}
                                            alt='Profile picture'
                                            objectFit='cover'
                                            objectPosition='center'
                                            src={comment.author.image || ''}
                                            priority={false}
                                            quality={75}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row gap-x-2 mb-2 items-center'>
                                        <p className='font-semibold text-gray-800 text-sm'>
                                            {session?.user?.id ===
                                            comment.authorId
                                                ? 'You'
                                                : comment.author.name}
                                        </p>
                                        <p
                                            className={cn(
                                                'text-gray-400 text-xs',
                                                {
                                                    'mr-4':
                                                        session?.user?.id ===
                                                        comment.authorId
                                                }
                                            )}
                                        >
                                            {comment.createdAt.toLocaleDateString()}
                                        </p>
                                        {session?.user?.id ===
                                            comment.authorId && (
                                            <DeleteCommentButton
                                                id={comment.id}
                                                params={params}
                                                aria-label='Delete comment button'
                                            />
                                        )}
                                    </div>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            h1: ({ children }) => (
                                                <h1
                                                    className='font-bold'
                                                    tabIndex={0}
                                                >
                                                    {children}
                                                </h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2
                                                    className='font-medium'
                                                    tabIndex={0}
                                                >
                                                    {children}
                                                </h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3
                                                    className='font-semibold'
                                                    tabIndex={0}
                                                >
                                                    {children}
                                                </h3>
                                            ),
                                            p: ({ children }) => (
                                                <p>{children}</p>
                                            ),
                                            a: ({ children, href }) => (
                                                <a
                                                    className='text-blue-500 hover:underline'
                                                    href={href}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    aria-label={`Link to ${href}`}
                                                >
                                                    {children}
                                                </a>
                                            ),
                                            strong: ({ children }) => (
                                                <strong className='font-bold'>
                                                    {children}
                                                </strong>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className='list-disc list-inside'>
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children }) => (
                                                <ol className='list-decimal'>
                                                    {children}
                                                </ol>
                                            ),
                                            li: ({ children }) => (
                                                <li>{children}</li>
                                            ),
                                            code: ({ className, children }) => {
                                                const language =
                                                    className?.replace(
                                                        'language-',
                                                        ''
                                                    ) || 'typescript'
                                                const codeString =
                                                    Array.isArray(children)
                                                        ? children.join('')
                                                        : children

                                                return (
                                                    <div className='relative my-4 w-full'>
                                                        <SyntaxHighlighter
                                                            className='!my-0 !px-4 !py-0 !bg-gray-50 w-full !text-sm'
                                                            language={language}
                                                            wrapLines={true}
                                                            aria-label={`Code block in ${language}`}
                                                        >
                                                            {codeString?.toString() ||
                                                                ''}
                                                        </SyntaxHighlighter>
                                                    </div>
                                                )
                                            }
                                        }}
                                    >
                                        {comment.body}
                                    </ReactMarkdown>
                                    <div className='flex flex-row'>
                                        <button
                                            className='py-1 px-4 flex flex-row justify-center items-center space-x-2 rounded-none hover:bg-gray-100'
                                            aria-label={`Like comment`}
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='currentColor'
                                                className='size-6'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                                                />
                                            </svg>

                                            <span className='text-sm font-medium'>
                                                Like
                                            </span>
                                        </button>
                                        <button
                                            className='py-1 px-4 flex flex-row justify-center items-center space-x-2 rounded-none hover:bg-gray-100'
                                            aria-label={`Reply to comment`}
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='currentColor'
                                                className='size-6'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z'
                                                />
                                            </svg>

                                            <span className='text-sm font-medium'>
                                                Reply
                                            </span>
                                        </button>
                                        <button>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='currentColor'
                                                className='size-6'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <DidYouFindThisArticleHelpful />
                <SubscribeForm params={params} />
                <AdjacentPosts prevPost={prevPost} nextPost={nextPost} />
                <RelatedPosts params={params} similarPosts={similarPosts} />
            </div>
        </>
    )
}
