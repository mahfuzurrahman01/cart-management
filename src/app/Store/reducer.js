import { ADD_TO_CART } from "./constant";
const initialValue = { cart: [] }
export const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: action.data,
            };
        default:
            return state;
    }
};