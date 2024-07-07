export const DidYouFindThisArticleHelpful = () => {
    return (
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
    )
}
