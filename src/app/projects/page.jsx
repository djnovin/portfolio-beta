import Link from 'next/link'
import Image from 'next/image'
import Hero from "../../components/ProjectHero"



const Page = () => {
    return (
        <>
        <Hero />
        <div className='grid grid-cols-1 gap-20 md:gap-4 lg:grid-cols-2'>
            <div className='relative w-full h-full overflow-hidden  '>
                <Link href="https://www.nftmaster.com/">
                    <div>
                    <div className='h-full w-full mb-6 relative overflow-hidden shadow-sm hover:shadow-lg hover:cursor-pointer transition-all rounded-md duration-300'>
                    <Image 
                    src="/nftmaster.png"  
                    alt="NFT master" 
                    height={1080}
                    width={2000}
                    quality={70}
                    objectFit='contain'

                    />
                    </div>
                    
                    <div className='px-4 pb-10'>
                    <div className='flex flex-row justify-between'>
                    <h1 className="text-2xl font-semibold"> NFTMASTER </h1>
                    <h1 className="text-2xl font-semibold"> 2022 - Present </h1>
                    </div>

                    <h1 className="text-lg mb-4 font-semibold"> www.nftmaster.com </h1>
                    <h2 className="text-base font-base mb-2 ">Tech Stack</h2>

                    <p className='text-xs mb-4 font-light'>React, ASP.NET, BootStrap, JQuery, Amazon S3, XRPL, JWT, XUMM, MongoDB, Cloudfront</p>
                    <h2 className="text-base font-base mb-2 ">Role</h2>
                    <p className='text-xs mb-4 font-light'>Software Engineer</p>


                    <p className='text-xs mb-4 font-light'></p>

                    </div>
                    </div>
                </Link>
            </div>
            
        </div>
        </>
    )
}

export default Page

