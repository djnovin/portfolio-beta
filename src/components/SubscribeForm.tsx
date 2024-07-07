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
                newsletter. I will send you an email every time I publish a new
                article.
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
                <label htmlFor='subscribe'>Subscribe to newsletter</label>
            </div>
            <button
                className='bg-black text-white py-2 px-4 mt-4 rounded-none border border-solid border-black'
                type='submit'
            >
                Subscribe
            </button>
        </form>
    )
}
