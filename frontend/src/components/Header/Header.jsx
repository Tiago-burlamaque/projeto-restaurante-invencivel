import React from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";

function Header() {
    return (
        <header className='w-full h-35  px-3 flex bg-gradient-to-r from-blue-500 via-blue-950 to-blue-500'>
            <div className='w-60 flex items-center justify-center py-20 text-center text-yellow-200'>
                <Link to='/privateRouter/home'><h1 className='bebas-neue-regular text-5xl '>Invencivel Restaurant</h1></Link>
            </div>
            <div className='w-full h-30  px-10 flex items-center justify-center'>
                <input type="text" className='focus:outline-none focus:border-b-8 focus:border-b-blue-500 text-white transition-color    ease-in-out duration-300 w-full p-2 placeholder:text-gray-300 bg-neutral-500 h-15' placeholder='Buscar lanche, bebida, sobrimesas... ' id='search' />
                <label htmlFor='search' form className='border-l-2  h-15 w-20  bg-neutral-500 flex items-center justify-center text-3xl text-gray-300 cursor-pointer' ><CiSearch /></label>
            </div>
        </header>
    )
}

export default Header
