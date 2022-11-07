"use client";

import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"

const Banner = ({ href }) => {

    let segment = useSelectedLayoutSegments()
    let active = href === `/${segment}`

    console.log(active)

    if (`/${segment}` === '/blog'){
        return (
            <div className=" bg-purple-600 w-full flex flex-col gap-1 px-6 pt-10 md:py-2 md:align-center pb-6 md:justify-center md:flex-row transition-all duration-300">
            <p className="text-sm text-white font-semibold">The Blog is Currently Under Maintanance</p>
            <Link className="underline text-sm text-white font-light hover:text-gray-300 transition-all duration-300" href="/">Back to Home →</Link>
        </div>
            )
    }
    if (`/${segment}` === '/'){
        return (
            <div className=" bg-purple-600 w-full flex flex-col gap-1 px-6 pt-10 md:py-2 md:align-center pb-6 md:justify-center md:flex-row transition-all duration-300">
            <p className="text-sm text-white font-semibold">This website was made using Next JS 13</p>
            <Link className="underline text-sm text-white font-light hover:text-gray-300 transition-all duration-300" href="https://nextjs.org/">Learn More →</Link>
        </div>
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default Banner