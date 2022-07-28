import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import currencyReducer from "./currency";
import cartReducer from "./cart";
 
const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    currency: currencyReducer,
  },
})
export default store;

