import Cart from '@/components/Cart';
import Header from '@/components/Header';
import React from 'react';

const page = () => {
    return (
        <div className='min-h-screen bg-slate-900'>
            <Header/>
            <Cart/>
        </div>
    );
};

export default page;