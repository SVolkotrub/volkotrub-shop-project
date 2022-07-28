import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProductToCart: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
        },
        changeProductQuantity: (state, action) => {
            state.quantity += 1;
            state.products[action.payload].productQuantity += 1;
        },
        decreaseProductQuantity: (state, action) => {
            state.quantity -= 1;
            state.products[action.payload].productQuantity -= 1;
        },
        updateAttributeIndex: (state, action) => {
            state.products[action.payload.productIndex].selectedAttributes[action.payload.indexAttribute][1] = action.payload.index;
        },
        deleteProduct: (state, action) => {
            state.quantity -= 1;
            state.products.splice([action.payload], 1);  
        },
    
    }
});

export const { addProductToCart, deleteProduct,changeProductQuantity,decreaseProductQuantity,updateAttributeIndex } = cartSlice.actions;
export default cartSlice.reducer;