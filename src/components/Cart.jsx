/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';
import { addToCart } from '../app/Store/action'
import Link from 'next/link';
const Cart = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [cartIds, setCartIds] = useState([]);
    const [selectedOption, setSelectedOption] = useState('')
    const [totalAmount, setTotalAmount] = useState(0);
    const store = useSelector(state => state);
    console.log('this is our store', store);

    useEffect(() => {
        setAllProducts(store?.cart)
        setIsLoading(false)
    }, [])



    const removeHandle = (product) => {
        setIsLoading(true)
        const newFilteredArr = store?.cart?.filter(item => item?.id !== product.id);
        console.log(newFilteredArr);
        dispatch(addToCart(newFilteredArr));
        setAllProducts(newFilteredArr)
        localStorage.setItem('cartItems', JSON.stringify(newFilteredArr));
        setIsLoading(false)
    }

    const increaseItem = (item) => {
        setIsLoading(true);

        // Create a new item object with the updated quantity
        const updatedItem = {
            ...item, // Spread the existing item properties
            quantity: item.quantity + 1, // Update the quantity
        };

        console.log(updatedItem);

        // Filter out the old item and create a new array with the updated item
        const filterOut = store?.cart?.filter(product => product?.id !== item.id);
        const newArr = [...filterOut, updatedItem]; // Include the updated item

        console.log(newArr);

        // Update the Redux store and local storage
        if (newArr?.length > 0) {
            dispatch(addToCart(newArr)); // Dispatch the new array to Redux
            setAllProducts(newArr); // Update local state if needed
            localStorage.setItem('cartItems', JSON.stringify(newArr)); // Update local storage
        }

        setIsLoading(false);
    }

    const decrease = (item) => {
        setIsLoading(true);

        // Create a new item object with the updated quantity
        if (item?.quantity <= 1) {
            removeHandle(item);
        } else {
            const updatedItem = {
                ...item, // Spread the existing item properties
                quantity: item.quantity - 1, // Update the quantity
            };
            console.log(updatedItem);

            // Filter out the old item and create a new array with the updated item
            const filterOut = store?.cart?.filter(product => product?.id !== item.id);
            const newArr = [...filterOut, updatedItem]; // Include the updated item

            console.log(newArr);

            // Update the Redux store and local storage
            if (newArr?.length > 0) {
                dispatch(addToCart(newArr)); // Dispatch the new array to Redux
                setAllProducts(newArr); // Update local state if needed
                localStorage.setItem('cartItems', JSON.stringify(newArr)); // Update local storage
            }

            setIsLoading(false);
        }


    }



    if (isLoading) {
        return <div className='min-h-screen w-full flex justify-center items-center'>
            <GridLoader />
        </div>
    }

    return (
        <div className='w-full mt-11'>
                {
                    store?.cart.length == 0 && <div className='text-xl text-center text-red-800'><h2>There is nothing to show!</h2> <Link href="/product" className='underline hover:text-black'> Please add product</Link></div> 
                }
            <div className='p-5 flex flex-wrap gap-5 justify-center'>
                {
                    store?.cart.map(item => <div key={item?.id} className="relative w-[20%] hover:scale-105 duration-500 bg-white border border-gray-200 rounded-xl p-1 shadow dark:bg-gray-900 dark:border-gray-700">

                        <div className='bg-white mb-4 rounded-lg'>
                            <Image width={100} height={100} className="p-8 w-full h-32 object-contain rounded-lg" src={item?.image} alt="product image" />
                        </div>
                        <p className='bg-red-800 w-8 h-8 rounded-full justify-center items-center text-lg font-semibold flex text-white absolute top-2 right-2'>{item?.quantity}</p>
                        <div className="px-2 pb-5">
                            <a href="#">
                                <p className="text-sm  font-semibold line text-gray-900 dark:text-white leading-4">{item?.title}</p>
                            </a>
                            <div className="flex-row-reverse flex items-center justify-between mt-2 mb-3">
                                <div className="flex flex-row-reverse items-center gap-1">
                                    <svg className="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <span className="text-xs font-semibold">{item?.rating?.rate}</span>
                                </div>
                                <span className="text-xl font-semibold font-mono text-gray-900 dark:text-white">${item?.price}</span>
                            </div>
                        </div>
                        <div className='flex justify-center items-center w-full bottom-3 left-0 right-0 mx-auto '>
                            <button onClick={() => removeHandle(item)} className="text-white max-w-20 duration-300  mx-auto w-[95%] bg-red-700 hover:bg-red-800 ring-red-300 rounded-md text-xs py-1">Remove</button>
                            <div className='w-1/2 flex items-center justify-end gap-3'>
                                <button onClick={() => increaseItem(item)} className='bg-red-800 w-7 h-7 rounded-full text-white justify-center items-center flex'>+</button>
                                <button onClick={() => decrease(item)} className='bg-red-800 w-7 h-7 rounded-full text-white justify-center items-center flex'>-</button>

                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>

    );
};

export default Cart;