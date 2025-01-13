import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TonClient } from "ton";
import { Address } from "ton-core";


export const getBalance = createAsyncThunk(
    "getBalance",
    async function ({userAddress}) {
        const client = new TonClient({
            endpoint: "https://toncenter.com/api/v2/jsonRPC",
            apiKey : process.env.REACT_APP_API_KEY_TWO
          });
        
        const balance = await client.getBalance(Address.parse(userAddress)) 
        return Number(balance) / 10**9
    }
)
const balance = createSlice(
    {
        name : "balance",
        initialState : {
            value : 0,
            status : null,
        },
        reducers : {

        },
        extraReducers : (build => {
            build.addCase(getBalance.pending , (state, action) => {
                state.status = "pending"
            })
            build.addCase(getBalance.rejected , (state, action) => {
                state.status = "reject"
            })
            build.addCase(getBalance.fulfilled , (state, action) => {
                state.value = action.payload
                state.status = "completed"
            })
        })
    }
)
export default balance.reducer