import Link from 'next/link'

const Page = () => {
    return (
        <form className="flex flex-col justify-center align-middle">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">What is your name?</span>
                    <span className="label-text-alt">Required</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <label className="label">
                    <span className="label-text">What is your Email?</span>
                    <span className="label-text-alt">Required</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <label className="label">
                    <span className="label-text">What is your Mobile?</span>
                    <span className="label-text-alt">Optional</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <label className="label">
    <span className="label-text">Your bio</span>
    <span className="label-text-alt">Alt label</span>
  </label> 
  <textarea className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                <button className="mt-10 btn duration-200 transition-all border text-white hover:bg-white hover:bg-solid hover:text-black bg-black dark:text-white border-solid rounded-md py-2 px-8">Submit</button>
            </div>  
        </form>
    )
}

export default Page