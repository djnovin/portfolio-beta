"use client";

import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"


const NavLink = ({ href, children }) => {
    let segment = useSelectedLayoutSegments()
    let active = href === `/${segment}`
console.log(href);
    return (
            <Link className={active ? " text-gray-600 dark:text-white transition-all duration-500" : "dark:text-white"} href={href}>{children}</Link> 
    )
}

export default NavLink