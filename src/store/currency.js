import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_CURRENCY } from "../components/graphql/getCurrency";

export const fetchCurrency = createAsyncThunk(
    "currency/fetchCurrency",
    async function (_, { rejectWithValue }) {
        try {
            const client = new ApolloClient({ uri: 'http://localhost:4000/', cache: new InMemoryCache(), });
            const response = await client.query({ query: GET_CURRENCY }).then((result) => {
                return result.data.currencies;
            }).catch((error) => { throw new Error("Something went wrong..."); });
            console.log(response);
            return response;
        } catch (error) { return rejectWithValue(error.message); }
    }
);


export const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencies: [],
        currency: "$",
        status: null,
        error: null,
    },
    reducers: {
        updateCurrency: (state, action) => {
            state.currency = action.payload;  
        }
    },
    extraReducers: {
        [fetchCurrency.pending]: (state) => { 
            state.status = "loading";
            state.error = null;
        },
        [fetchCurrency.fulfilled]: (state, action) => { 
            state.status = "resolved";
            state.currencies = action.payload;
        },
        [fetchCurrency.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    }
});

export const { updateCurrency } = currencySlice.actions;

export default currencySlice.reducer;