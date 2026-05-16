import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Navbar from "../components/Navbar/Navbar"

function Layout() {
    return (
        <section className="h-screen flex flex-col md:flex-col md:flex-col">

            <header>
                <Header />
            </header>
            <nav>
                <Navbar />
            </nav>
            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default Layout
