import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <div>
            <section className=" text-gray-900">
                <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                    <h1 className="text-4xl font-bold leading-none sm:text-5xl">Discover the
                        <span className="text-red-800">future of shopping with Algo</span>Store
                    </h1>
                    <p className="px-8 mt-8 mb-12 text-lg ">AlgoStore is more than just an online store; it&apos;s a shopping revolution.</p>
                    <div className="flex flex-wrap justify-center ">
                        <Link href="/product">
                            <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-red-800 text-white" >Get started</button>
                        </Link>
                        <Link href="/product">
                        <button className="px-8 py-3 m-2 text-lg border rounded text-gray-900 border-gray-700">All products</button>
                        </Link>
                    
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;