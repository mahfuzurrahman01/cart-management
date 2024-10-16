/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';
import { addProductInStore } from '../app/action'
const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const [cartProducts, setCartProducts] = useState([]);
    const [cartIds, setCartIds] = useState([]);
    const store = useSelector(state => state?.reducer);

    console.log(store)
    const getProducts = async () => {
        setIsLoading(true)
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response?.status == '200' && response?.data) {
            console.log(response?.data)
            setAllProducts(response?.data);
            setIsLoading(false)
        }
    }



    useEffect(() => {
        try {
            getProducts()
        } catch (error) {
            console.log(error)
        }
    }, [])



    const handleChange = (event) => {
        const newValue = event.target.value;
        console.log(newValue)
        sortingFunc(newValue)
    };

    // sorting here with this function

    const sortingFunc = async (selectedOption) => {
        setIsLoading(true)
        console.log(selectedOption)
        if (selectedOption == '') {
            setIsLoading(false)
        };
        if (selectedOption == 'price-high-low') {
            const sortedProducts = allProducts.sort((a, b) => b.price - a.price);
            setAllProducts(sortedProducts);
            setIsLoading(false)
        }
        if (selectedOption == 'price-low-high') {
            const sortedProducts = allProducts.sort((a, b) => a.price - b.price);
            setAllProducts(sortedProducts);
            setIsLoading(false)
        }
        if (selectedOption == 'high-rated') {
            const sortedProducts = allProducts.sort((a, b) => b.rating.rate - a.rating.rate);
            setAllProducts(sortedProducts);
            setIsLoading(false)
        }

    }



    useEffect(() => {
        setCartProducts(store?.cart);
        const productIds = store?.cart.reduce((acc, product) => {
            acc.push(product.id);
            return acc;
        }, []);
        setCartIds(productIds)
    }, [store?.cart])

    console.log("store we are", store?.cart)

    // add to cart handle that will add our cart item in store

    const addToCartHandle = (product) => {
        product['quantity'] = 0;
        const newArr = [...cartProducts, product];
        const newIdArr = [...cartIds, product?.id];
        setCartIds(newIdArr)
        setCartProducts(newArr)

    }

    useEffect(() => {
        dispatch(addProductInStore(cartProducts))
    }, [cartProducts])


    if (isLoading) {
        return <div className='min-h-screen w-full flex justify-center items-center'>
            <GridLoader />
        </div>
    }

    return (
        <div className='w-full mt-11'>
            {
                allProducts?.length > 0 &&
                <div className='w-[80%] mx-auto flex justify-between'>
                    <h1 className='text-center font-mono text-3xl text-red-800 font-bold tracking-tight'>All products</h1>

                    <select onChange={handleChange} class="px-4 py-2 text-red-800 font-semibold bg-white sm:text-sm">
                        <option value="">Select option</option>
                        <option value="price-low-high">$ Low to High</option>
                        <option value="price-high-low">$ High to low</option>
                        <option value="high-rated">High rated</option>
                    </select>

                </div>
            }
            <div className='  p-5 flex flex-wrap gap-5 justify-center'>
                {
                    allProducts?.map(item => <div key={item?.id} className="relative w-[20%] hover:scale-105 duration-500 bg-white border border-gray-200 rounded-xl p-1 shadow dark:bg-gray-900 dark:border-gray-700">

                        <div className='bg-white mb-4 rounded-lg'>
                            <Image width={100} height={100} className="p-8 w-full h-32 object-contain rounded-lg" src={item?.image} alt="product image" />
                        </div>

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
                        {
                            cartIds?.includes(item?.id) ? <button className="text-white duration-300 absolute bottom-1 left-0 right-0 mx-auto w-[95%] bg-red-700 hover:bg-red-800 ring-red-300 rounded-md text-xs py-1">Added</button> : <button onClick={() => addToCartHandle(item)} className="text-white duration-300 absolute bottom-1 left-0 right-0 mx-auto w-[95%] bg-gray-700 hover:bg-gray-800 ring-red-300 rounded-md text-xs py-1">Add to cart</button>
                        }
                    </div>)
                }
            </div>
        </div>

    );
};

export default Products;