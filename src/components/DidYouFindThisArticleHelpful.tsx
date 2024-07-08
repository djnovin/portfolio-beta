export const DidYouFindThisArticleHelpful = () => {
    return (
        <div
            className='mt-40 mb-20 p-4 border border-solid border-gray-200 rounded-full shadow-gray-300 bg-white flex flex-row gap-x-4 justify-between items-center w-[400px] mx-auto'
            aria-label='Helpful article feedback'
        >
            <p className='font-normal text-normal text-gray-500'>
                Was this article helpful?
            </p>
            <div className='flex flex-row gap-x-4 items-center'>
                <button>
                    <svg
                        data-testid='geist-icon'
                        height='16'
                        stroke-linejoin='round'
                        viewBox='0 0 16 16'
                        width='16'
                        // style='color: currentcolor;'
                    >
                        <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.75 7.75C6.30228 7.75 6.75 7.30228 6.75 6.75C6.75 6.19772 6.30228 5.75 5.75 5.75C5.19772 5.75 4.75 6.19772 4.75 6.75C4.75 7.30228 5.19772 7.75 5.75 7.75ZM11.25 6.75C11.25 7.30228 10.8023 7.75 10.25 7.75C9.69771 7.75 9.25 7.30228 9.25 6.75C9.25 6.19772 9.69771 5.75 10.25 5.75C10.8023 5.75 11.25 6.19772 11.25 6.75ZM11.5249 11.2622L11.8727 11.7814L10.8342 12.4771L10.4863 11.9578C9.94904 11.1557 9.0363 10.6298 8.00098 10.6298C6.96759 10.6298 6.05634 11.1537 5.51863 11.9533L5.16986 12.4719L4.13259 11.7744L4.48137 11.2558C5.2414 10.1256 6.53398 9.37982 8.00098 9.37982C9.47073 9.37982 10.7654 10.1284 11.5249 11.2622Z'
                            fill='currentColor'
                        ></path>
                    </svg>
                </button>
            </div>
            {/* <form className='flex flex-row gap-x-4 justify-center mt-4'>
                <button className='bg-black text-white py-2 px-4 rounded-none border border-solid border-black'>
                    Yes
                </button>
                <button className='bg-black text-white py-2 px-4 rounded-none border border-solid border-black'>
                    No
                </button>
            </form> */}
        </div>
    )
}
