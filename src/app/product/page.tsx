
import Header from '@/components/Header';
import Products from '@/components/Products';

import React from 'react';

const page = () => {

    return (
        <div>
            <Header />
            <div className=' text-gray-100 w-[80%] mx-auto justify-center flex items-center'>
                <Products />
            </div>
        </div>
    );
};

export default page;