"use client"

import Link from 'next/link'
import { useState, useEffect } from "react"
import { useTheme } from 'next-themes'


const NavBar = () => {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

    return (
    <>
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link href="/">Homepage</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <Link href="/" className="btn btn-ghost normal-case font-bold text-xl">NOVIN</Link>
  </div>
  <div className="navbar-end">
  </div>
</div>
</>  
    )
}

export default NavBar