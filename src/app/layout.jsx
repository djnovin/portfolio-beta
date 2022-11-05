import "tailwindcss/tailwind.css"
import AnalyticsWrapper from './Analytics';
 
import Link from "next/link"
import NavLink from "../components/NavLink"
import NavBar from "../components/NavBar";
import Banner from "../components/Banner"


const RootLayout = ({ children }) => {
    return (
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Next.js</title>
          </head>
          <body className="dark:bg-black">
            <div className="">
            <section>
              <Banner />
            </section>
            <header className="flex flex-row w-full justify-between items-center align-middle">
              <NavBar />
            </header>
            <section className="">
                <div className="">{children}</div>
                <AnalyticsWrapper />
            </section>
            </div>
            </body>
        </html>
      );
    }    

export default RootLayout