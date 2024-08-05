import React from 'react'
import { Twitter, Linkedin } from '@geist-ui/icons'

const Footer = () => {
    return (
        <div
            className='relative h-[800px]'
            style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
        >
            <div className='relative h-[calc(100vh+800px)] -top-[100vh]'>
                <div className='h-[800px] sticky top-[calc(100vh-800px)]'>
                    <div className='bg-[#E0FF85] h-full w-full flex flex-col justify-between'>
                        <div>
                            <div className='text-2xl font-light text-[#1F5040] pt-20 px-8'>
                                My goal is to help you learn and enjoy coding. I
                                love to engage in discourses prevalant in the
                                tech industry and share my knowledge with
                                others. It is my hope that you find this blog to
                                be a source of inspiration and knowledge.
                            </div>
                        </div>
                        <div>
                            <div className='w-full border-b border-gray-200' />
                            <form className='w-full py-8'>
                                <p className='text-[#1F5040] px-8 py-4 w-full'>
                                    Sign up to receive updates about our
                                    products and collaborations.
                                </p>
                                <div className='flex flex-row justify-center w-full h-[64px] px-4'>
                                    <input
                                        className='border border-gray-200 py-2 px-4 w-full'
                                        placeholder='Email address'
                                        type='email'
                                    />
                                    <button
                                        className='bg-[#1F5040] text-white h-full max-w-[200px] px-8'
                                        type='submit'
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <p className='text-[#1F5040] px-8 py-4 text-xs w-full'>
                                    By signing up, you agree to our Privacy
                                    Policy and Terms of Service.
                                </p>
                            </form>
                            <div className='w-full border-b border-gray-200' />

                            <div className='text-xs font-light text-[#1F5040] px-8 text-center py-4 flex flex-row justify-center gap-x-8'>
                                <a href='https://twitter.com/novinnoori'>
                                    <Twitter size={16} />
                                </a>
                                <a href='https://www.linkedin.com/in/novinnoori/'>
                                    <Linkedin size={16} />
                                </a>
                            </div>
                            <div className='w-full border-b border-gray-200' />
                            <div className='text-xs font-light text-[#1F5040] px-8 text-center py-4'>
                                <a
                                    href='mailto:hello@novinnoori.com'
                                    className='hover:underline'
                                >
                                    hello@novinnoori.com
                                </a>
                            </div>
                            <div className='w-full border-b border-gray-200' />
                            <div className='text-xs font-light text-[#1F5040] px-8 text-center py-8'>
                                © 2024 Novin Noori. All rights reserved. The
                                material on this site may not be reproduced,
                                distributed, transmitted, cached or otherwise
                                used, except with the prior written permission
                                of Novin Noori. Ad Choices
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
