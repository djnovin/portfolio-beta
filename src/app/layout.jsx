"use client"

import "tailwindcss/tailwind.css"
import AnalyticsWrapper from './Analytics';
 
import Link from "next/link"
import NavLink from "../components/NavLink"
import NavBar from "../components/NavBar";
import Banner from "../components/Banner"

import { useState, createContext } from "react"
import ThemeContext from "../context/ThemeContext"

const RootLayout = ({ children }) => {
  const [theme, setTheme] = useState('light');
    return (
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Next.js</title>
          </head>
              <body className="dark:bg-black">
                <ThemeContext.Provider value={{theme}}>
                  <div className="">
                  <section>
                    <Banner />
                  </section>
                  <header className="flex flex-row w-full justify-between items-center align-middle">
                    <NavBar />
                  </header>
                  <section className="">
                      <div className="">{children}</div>
                  </section>
                  </div>
                  <AnalyticsWrapper />
                </ThemeContext.Provider>
                </body>

        </html>
      );
    }    

export default RootLayout