import { prisma } from 'auth'
import { revalidatePath } from 'next/cache'

export const SubscribeForm = (props: { params: { slug: string } }) => {
    const { params } = props

    const handleSubscribe = async (formData: FormData) => {
        'use server'

        const email = formData.get('email') as string
        const subscribe = formData.get('subscribe') as string

        if (!email) return null

        if (!subscribe) return null

        await prisma.newsletterSubscription.create({
            data: {
                email: email,
                // terms and conditions
                subscribed: subscribe === 'on' ? true : false
            }
        })

        revalidatePath(`/blog/${params.slug}`)
    }

    return (
        <section className='bg-gray-50'>
            <form
                action={handleSubscribe}
                className='mt-8 px-8 py-20 flex flex-col lg:justify-between lg:items-center lg:max-w-6xl lg:flex-row mx-auto gap-10 lg:gap-8'
            >
                <div className='w-full'>
                    <h2
                        aria-label='Subscribe to newsletter title'
                        className='text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-left'
                        role='heading'
                    >
                        <span
                            style={{
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundImage:
                                    'linear-gradient(90deg, #f12711 0%, #f5af19 100%)'
                            }}
                        >
                            Subscribe.{' '}
                        </span>
                        <br className='lg:hidden' />
                        Stay up to date.
                    </h2>

                    <p
                        aria-label='Subscribe to newsletter description'
                        className='mb-4 lg:text-left lg:text-xl text-center text-gray-500'
                        role='description'
                    >
                        If you enjoyed this article, consider subscribing to my
                        newsletter. I will send you an email every time I
                        publish a new article.
                    </p>
                </div>
                <div className='w-full'>
                    <label
                        aria-label='Email label'
                        className='mb-4 font-medium text-gray-700'
                        htmlFor='email'
                        role='label'
                    >
                        Email
                    </label>
                    <input
                        aria-label='Email input'
                        className='mb-8 rounded-md border-solid border-gray-200 py-2 px-4 border-[0.75px] w-full'
                        name='email'
                        placeholder='Email address'
                        role='textbox'
                        type='email'
                    />
                    <div className='flex items-center justify-center'>
                        <div className='group relative w-full'>
                            <div className='absolute -inset-1 rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-10 blur transition duration-500 group-hover:opacity-50'></div>
                            <button
                                type='button'
                                className='relative rounded-lg bg-white px-7 py-4 text-black bg-clip-padding transition duration-500 w-full'
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}
