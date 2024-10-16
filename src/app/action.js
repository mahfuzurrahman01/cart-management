
import { ADD_TO_CART } from "./constant";
export const addProductInStore = type => {
    console.log('product we are getting', type)
    return {
        type: ADD_TO_CART,
        data: type,
    };
};


