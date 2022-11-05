
const Layout = async({ children }) => {
    return (
        <div className="flex flex-col justify-center align-middle items-center">
            <h1 className="dark:text-white text-center capitalize mb-10 text-xl">Want to reach out? Send us a message in the form below!</h1>

            <div>{children}</div> 
        </div>
    )
}

export default Layout