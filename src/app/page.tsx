import React from 'react'

const inProgress = true

const Page = () => {
    return inProgress ? (
        <div className='h-screen flex justify-center items-center px-8'>
            <h1 className='uppercase'>Currently Updating My Page</h1>
        </div>
    ) : (
        <div className='h-screen flex justify-center items-center px-8'>
            <h1 className='uppercase'>
                I am a Software Designer / Engineer based in Sydney, Australia.
                I am currently working at Akcelo as a Frontend Engineer.
            </h1>
        </div>
    )
}

export default Page
