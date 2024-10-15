import Header from '@/components/Header';
import Products from '@/components/Products';
import React from 'react';

const page = () => {
    return (
        <div>
            <Header />
            <div className='w-full bg-gray-800 text-gray-100 min-h-screen justify-center flex items-center'>
                <Products />
            </div>
        </div>
    );
};

export default page;