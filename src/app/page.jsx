// `app/page.js` maps to root `/` URL 
import Link from 'next/link'


const Page = () => {
    return (
    <>
    <div className="px-6 flex flex-col py-48 md:px-24">
    <div className="flex flex-col align-middle justify-center mb-10">
      <h1 className="dark:text-white text-center capitalize text-5xl md:text-6xl">Hi! 👋 My name is <span className="font-medium">Novin Noori</span> and I am a full stack engineer based in Sydney, Australia.</h1>
    </div>
      <div className="flex flex-row justify-center items-center md:align-start gap-4">
        <button className="btn duration-200 transition-all border text-black hover:bg-black hover:bg-solid hover:text-white bg-white dark:text-black border-solid rounded-md py-2 px-8"><Link href="./contact">Contact Me</Link></button>
        <button className="btn duration-200 transition-all border text-white hover:bg-white hover:bg-solid hover:text-black bg-black dark:text-white border-solid rounded-md py-2 px-8"><Link href="./projects">View Projects</Link></button>
      </div>
      </div>
    </>
      )
  }

export default Page

