import Link from 'next/link'
import Hero from '../../components/ContactHero'
import Form from '../../components/ContactForm'

const Page = () => {
    return (
        <>
        <div className='mb-10'>
        <Hero/>
        </div>
        <Form />
        </>
    )
}

export default Page