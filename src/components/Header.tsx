import React from 'react';
import { FaCartArrowDown } from "react-icons/fa";
const Header = () => {
    return (
        <div>
            <header className="p-4  text-gray-900 w-4/5 mx-auto">
                <div className="container flex justify-between h-16 mx-auto">
                    <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex flex-row items-center uppercase gap-3">
                        <FaCartArrowDown className='text-5xl'/>
                        <p className='text-3xl font-mono font-bold'>AlgoStore</p>
                    </a>
                    <ul className="hidden space-x-3 md:flex items-center gap-5">
                        <li className="flex">
                            <a rel="noopener noreferrer" href="/cart" className="font-semibold text-lg">Cart</a>
                        </li>
                        <button className='bg-gray-800 text-white border px-5 py-1 rounded-md'>Subscribe</button>
                    </ul>
                    <button className="flex justify-end p-4 md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Header;