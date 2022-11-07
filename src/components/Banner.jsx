"use client";

import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"

const Banner = ({ href }) => {

    let segment = useSelectedLayoutSegments()
    let active = href === `/${segment}`

    console.log(active)

    if (`/${segment}` !== '/blog'){
        return (
            <></>
            )
    }
    else {
        return (
            <div className=" bg-purple-600 w-full flex flex-col gap-1 px-6 pt-10 md:py-2 md:align-center pb-6 md:justify-center md:flex-row transition-all duration-300">
            <p className="text-sm text-white font-semibold">🎉 Enjoy the Content? Subscribe to the blog now! </p>
            <Link className="underline text-sm text-white font-light hover:text-gray-300 transition-all duration-300" href="/">Subscribe Now →</Link>
        </div>
        )
    }
}

export default Banner