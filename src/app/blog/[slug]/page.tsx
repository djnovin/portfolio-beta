/* eslint-disable max-lines-per-function */
import Image from 'next/image'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import cn from 'classnames'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import ThumbsUp from '@geist-ui/icons/thumbsUp'
import ThumbsDown from '@geist-ui/icons/thumbsDown'
import MessageCircle from '@geist-ui/icons/messageCircle'
import MoreHorizontal from '@geist-ui/icons/moreHorizontal'

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
            <div className='pb-20'>
                {/* <AdBanner
                    dataAdFormat='auto'
                    dataAdLayout='in-article'
                    dataAdSlot='3651028178'
                    dataFullWidthResponsive={true}
                /> */}
                <section>
                    {/* {blog && (
                        <Breadcrumbs
                            crumbs={[
                                { label: 'Blog', path: '/blog' },
                                {
                                    label: blog.title,
                                    path: `/blog/${blog.slug}`
                                }
                            ]}
                            aria-label='Breadcrumb navigation'
                        />
                    )} */}
                </section>
                <section className='px-8'>
                    <RemoteMdxPage slug={params.slug} />
                </section>
                <DidYouFindThisArticleHelpful />
                <section className='mt-8 px-8'>
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
                                                            className='!my-0 !px-4 !py-0 !bg-gray-50 w-full !text-sm !rounded-md !overflow-clip !shadow-sm !group !hover:cursor-text !transition-colors !duration-200 !ease-in-out !border !border-gray-200'
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
                                            className='p-4 flex flex-row justify-center items-center hover:bg-gray-100 rounded-full'
                                            aria-label={`Like comment`}
                                        >
                                            <ThumbsUp className='size-4' />
                                        </button>
                                        <button
                                            className='p-4 flex flex-row justify-center items-center hover:bg-gray-100 rounded-full'
                                            aria-label={`Dislike comment`}
                                        >
                                            <ThumbsDown className='size-4' />
                                        </button>
                                        <button
                                            className='p-4 flex flex-row justify-center items-center hover:bg-gray-100 rounded-full'
                                            aria-label={`Reply to comment`}
                                        >
                                            <MessageCircle className='size-4' />
                                        </button>
                                        <button
                                            className='p-4 flex flex-row justify-center items-center hover:bg-gray-100 rounded-full'
                                            aria-label={`More options`}
                                        >
                                            <MoreHorizontal className='size-4' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
                <SubscribeForm params={params} />
                <AdjacentPosts prevPost={prevPost} nextPost={nextPost} />
            </div>
        </>
    )
}
