"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./Store/action";


export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const products = localStorage.getItem("cartItems");
    if (products) {
      const allProducts = JSON.parse(products);

      console.log(allProducts)
      dispatch(addToCart(allProducts))
    }
  }, [])

  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
