
const Layout = async({ children }) => {
    return (
        <div className="flex flex-col justify-center align-middle items-center">
            <div className="w-full px-4 md:px-20 lg:px-72">{children}</div> 
        </div>
    )
}

export default Layout