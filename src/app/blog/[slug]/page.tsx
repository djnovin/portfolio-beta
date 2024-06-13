import React from 'react'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { BLOGS } from '@/constants/blog'
import { useMDXComponents } from '../../../mdx-components'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyButton } from '@/components/CopyButton'
import { Metadata, ResolvingMetadata } from 'next'
import { auth } from 'auth'
import { SignInButton } from '@/components/SignIn'
import { prisma } from '../../../auth'
import Image from 'next/image'
import { revalidatePath } from 'next/cache'
import cn from 'classnames'
import { DeleteCommentButton } from '@/components/DeleteCommentButton'
import { Blogs } from '@/types/index'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import ScrollToTopButton from '@/components/ScrollToTop'
import { CommentInput } from '@/components/CommentInput'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

type Comments = {
    id: string
    body: string
    blogSlug: string
    author: string
    authorId: string
    createdAt: string
    updatedAt: string
}

const getAdjacentPosts = (currentPostSlug: string, allPosts: Blogs) => {
    const currentIndex = allPosts.findIndex(
        post => post.slug === currentPostSlug
    )
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
    const nextPost =
        currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
    return { prevPost, nextPost }
}

const getSimilarPosts = (currentPostSlug: string, allPosts: Blogs): Blogs => {
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

const getBlogComments = async (slug: string) => {
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

const getBlog = (slug: string) => {
    return BLOGS.find(blog => blog.slug === slug)
}

const RemoteMdxPage = ({ slug }: { slug: string }) => {
    const source = fs.readFileSync(
        path.join(process.cwd(), 'src/app/mdx', `${slug}.mdx`),
        'utf8'
    )

    const typographicRatios = {
        h1: 16 * 1.2 * 3,
        h2: 16 * 1.2 * 2,
        h3: 16 * 1.2 * 1,
        p: 16
    }

    return (
        /* @ts-ignore */
        <MDXRemote
            source={source}
            components={useMDXComponents({
                h1: ({ children }) => (
                    <h1
                        className='font-bold'
                        style={{
                            fontSize: typographicRatios.h1 + 'px',
                            lineHeight: typographicRatios.h1 * 1.2 + 'px',
                            margin: '20px 0'
                        }}
                        tabIndex={0}
                    >
                        {children}
                    </h1>
                ),
                h2: ({ children }) => (
                    <h2
                        className='font-medium'
                        style={{
                            fontSize: typographicRatios.h2 + 'px',
                            lineHeight: typographicRatios.h2 * 1.2 + 'px',
                            margin: '20px 0'
                        }}
                        tabIndex={0}
                    >
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3
                        className='font-semibold'
                        style={{
                            fontSize: typographicRatios.h3 + 'px',
                            lineHeight: typographicRatios.h3 * 1.2 + 'px'
                        }}
                        tabIndex={0}
                    >
                        {children}
                    </h3>
                ),
                p: ({ children }) => (
                    <p
                        style={{
                            fontSize: typographicRatios.p + 'px',
                            lineHeight: typographicRatios.p * 1.2 + 'px',
                            margin: '20px 0'
                        }}
                    >
                        {children}
                    </p>
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
                    <strong className='font-bold'>{children}</strong>
                ),
                ul: ({ children }) => (
                    <ul className='list-disc list-inside'>{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className='list-decimal'>{children}</ol>
                ),
                li: ({ children }) => <li>{children}</li>,
                code: ({ className, children }) => {
                    const language =
                        className?.replace('language-', '') || 'typescript'
                    const codeString = Array.isArray(children)
                        ? children.join('')
                        : children

                    return (
                        <div className='relative my-10 border border-solid border-black'>
                            <div className='flex flex-row justify-between gap-4 space-x-4 items-center bg-gray-100'>
                                <div>
                                    <span className='pl-4'>{language}</span>
                                </div>
                                {codeString &&
                                    codeString.toString().length > 0 && (
                                        <CopyButton
                                            className=''
                                            textString={codeString?.toString()}
                                            aria-label='Copy code'
                                        />
                                    )}
                            </div>
                            <div className='w-full border-t border-solid border-black'></div>
                            <SyntaxHighlighter
                                className='!my-0 !px-4 !bg-gray-50'
                                language={language}
                                style={solarizedlight}
                                wrapLines={true}
                                aria-label={`Code block in ${language}`}
                            >
                                {codeString?.toString() || ''}
                            </SyntaxHighlighter>
                        </div>
                    )
                }
            })}
        />
    )
}

type Props = {
    params: {
        slug: string
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
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
            site: '@djnovinnoori',
            title: blog?.title,
            description: blog?.content.substring(0, 160) + ' ...'
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

        if (comment && blogSlug && author) {
            await prisma.comment.create({
                data: {
                    body: comment,
                    blogSlug: blogSlug,
                    author: {
                        connect: {
                            id: author
                        }
                    }
                }
            })
        }

        revalidatePath(`/blog/${params.slug}`)
    }

    const handleSubscribe = async (formData: FormData) => {
        'use server'

        const email = formData.get('email') as string
        const subscribe = formData.get('subscribe') as string

        if (email && subscribe) {
            await prisma.newsletterSubscription.create({
                data: {
                    email: email,
                    subscribed: subscribe === 'on' ? true : false
                }
            })
        }

        revalidatePath(`/blog/${params.slug}`)
    }
    const session = await auth()
    return (
        <>
            <ProgressBar />
            <ScrollToTopButton />
            <div className='px-8 pb-20'>
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
                                className='flex flex-row gap-x-8 justify-start items-center mt-8'
                                aria-label='Comment'
                            >
                                <div>
                                    <div className='relative rounded-full bg-gray-200 w-12 h-12 overflow-hidden'>
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
                                <div className='flex flex-col gap-y-2'>
                                    <div className='flex flex-row gap-x-1'>
                                        <p className='font-semibold'>
                                            {session?.user?.id ===
                                            comment.authorId
                                                ? 'You'
                                                : comment.author.name}
                                        </p>
                                        <p
                                            className={cn('text-gray-500', {
                                                'mr-4':
                                                    session?.user?.id ===
                                                    comment.authorId
                                            })}
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
                                                    <div className='relative my-10 border border-solid border-black'>
                                                        <div className='flex flex-row justify-between gap-4 space-x-4 items-center bg-gray-100'>
                                                            <div>
                                                                <span className='pl-4'>
                                                                    {language}
                                                                </span>
                                                            </div>
                                                            {codeString &&
                                                                codeString.toString()
                                                                    .length >
                                                                    0 && (
                                                                    <CopyButton
                                                                        className=''
                                                                        textString={codeString?.toString()}
                                                                        aria-label='Copy code'
                                                                    />
                                                                )}
                                                        </div>
                                                        <div className='w-full border-t border-solid border-black'></div>
                                                        <SyntaxHighlighter
                                                            className='!my-0 !px-4 !bg-gray-50'
                                                            language={language}
                                                            style={
                                                                solarizedlight
                                                            }
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
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div>
                    {session ? (
                        <form
                            className='mt-8 w-full flex flex-row gap-4'
                            action={handleComment}
                        >
                            <div>
                                <div className='relative rounded-full bg-gray-200 w-12 h-12 overflow-hidden'>
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
                                {/* <input
                                    className='border border-solid border-black p-4 rounded-none'
                                    type='text'
                                    placeholder='Comment'
                                    aria-label='Comment input'
                                    name='comment'
                                /> */}
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
                                If you want to comment, please sign in first.
                            </p>
                            <SignInButton />
                        </div>
                    )}
                </div>
                <form
                    action={handleSubscribe}
                    className='border border-solid border-black p-4 mt-8 flex flex-col'
                >
                    <h2
                        aria-label='Subscribe to newsletter title'
                        className='text-2xl font-bold mb-4'
                        role='heading'
                    >
                        Subscribe
                    </h2>

                    <p
                        aria-label='Subscribe to newsletter description'
                        className='mb-4'
                        role='description'
                    >
                        If you enjoyed this article, consider subscribing to my
                        newsletter. I will send you an email every time I
                        publish a new article.
                    </p>
                    <label
                        aria-label='Email label'
                        className='mb-2'
                        htmlFor='email'
                        role='label'
                    >
                        Email
                    </label>
                    <input
                        aria-label='Email input'
                        className='mb-4 rounded-none border border-solid border-black py-2 px-4'
                        name='email'
                        placeholder='Email'
                        role='textbox'
                        type='email'
                    />
                    <div className='flex flex-row gap-x-2'>
                        <input
                            aria-label='Subscribe to newsletter checkbox'
                            id='subscribe'
                            name='subscribe'
                            role='checkbox'
                            type='checkbox'
                        />
                        <label htmlFor='subscribe'>
                            Subscribe to newsletter
                        </label>
                    </div>
                    <button
                        className='bg-black text-white py-2 px-4 mt-4 rounded-none border border-solid border-black'
                        type='submit'
                    >
                        Subscribe
                    </button>
                </form>

                <div className='flex flex-row gap-x-4 mt-10 justify-between items-start'>
                    {prevPost && (
                        <div className=''>
                            <Link
                                className=''
                                href={`/blog/${prevPost.slug}`}
                                aria-label={`Link to ${prevPost.title}`}
                            >
                                <h3 className='text-xl font-bold'>
                                    Previous Post
                                </h3>
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
                                    <h3 className='text-xl font-bold'>
                                        {blog.title}
                                    </h3>
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
            </div>
        </>
    )
}
