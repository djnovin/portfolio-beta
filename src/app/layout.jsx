import "tailwindcss/tailwind.css"
import AnalyticsWrapper from './Analytics';
 
import Link from "next/link"
import NavLink from "../components/NavLink"
import Banner from "../components/Banner"


const RootLayout = ({ children }) => {

    return (
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Next.js</title>
          </head>
          <body className="dark:bg-black">
            <section>
              <Banner />
            </section>
            <header className="flex flex-row w-full justify-between align-middle py-4 px-6">
                <div>
                  <Link className="font-bold dark:text-white" href="/">NOVIN</Link>
                </div>
                <div className="flex flex-row gap-4">
                  <NavLink  href="/">Home</NavLink>
                  <NavLink  href="/blog">Blog</NavLink>
                </div>
            </header>
            <section className="px-6">
                <div>{children}</div>
                <AnalyticsWrapper />
            </section>
            </body>
        </html>
      );
    }    

export default RootLayout