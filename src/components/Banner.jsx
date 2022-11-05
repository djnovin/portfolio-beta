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
            <div className="bg-blue-600 text-white w-full flex flex-col gap-1 px-6 pt-12 md:py-2 md:align-center pb-6 md:justify-center md:flex-row transition-all duration-300">
            <p className="text-sm font-semibold">🎉 Your FREE one on one consultation is set to expire soon. RESERVE your spot now!</p>
            <Link className="underline text-sm font-light hover:text-gray-300 transition-all duration-300" href="/">Claim Now →</Link>
        </div>
        )
    }
}

export default Banner