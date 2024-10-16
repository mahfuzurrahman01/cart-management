import { ADD_TO_CART } from "./constant";

export const addToCart = type => {
    return {
      type: ADD_TO_CART,
      data: type,
    };
  };