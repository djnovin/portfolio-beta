const Form = () => {

    return (
        <form className="flex flex-col justify-center align-middle">
            <div className="form-control grid grid-cols-2 gap-4 w-full">
                <div>
                        <label className="label">
                            <span className="label-text">What is your name?</span>
                            <span className="label-text-alt">Required</span>
                        </label>
                    
                    <input type="text" placeholder="Full Name" className="mb-4 input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">What is your Email?</span>
                        <span className="label-text-alt">Required</span>
                    </label>
                
                
                    <input type="text" placeholder="Email" className="mb-4 input input-bordered w-full" />
                </div>
                <div className="col-span-2">
                    <label className="label">
                        <span className="label-text">Message</span>
                    </label> 
                    <textarea className="mb-10 textarea w-full textarea-bordered h-24" placeholder="Message"></textarea>
                </div>
                <div className="col-span-2">
                <button className="btn duration-200 w-full md:w-1/2 transition-all border text-white hover:bg-white hover:bg-solid hover:text-black bg-black dark:text-white border-solid rounded-md py-2 px-8">Send</button>
                </div>
            </div>  
        </form>
    )
}

export default Form 