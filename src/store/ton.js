import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import en from "../constants/language";


export const fetchTon = createAsyncThunk(
    'ton/fetchTon',
    async function () {
        async function getCurrencies() { // Полуение долларов
            const response = await fetch(
              "https://www.cbr-xml-daily.ru/daily_json.js"
            );
            const data = await response.json();
            const result = await data;
            return result.Valute.USD.Value;
          }
      
          async function getTonPrice() { // получени цены ton (в долларах)
            const response = await fetch(
              "https://api.coingecko.com/api/v3/coins/the-open-network"
            );
            const data = await response.json();
            return data.market_data.current_price.usd;
          }
          let one = await getCurrencies();
          let two = await getTonPrice();
          return en ? two : one * two;
    }
)
const ton = createSlice ({
    name : 'ton',
    initialState : {
        value : 0,
        status : null
    },
    reducers : {

    },
    extraReducers : builder => {
        builder.addCase( fetchTon.pending , (state) => {state.status = 'loading' })
        builder.addCase( fetchTon.fulfilled , (state , action) => {state.status = 'resolved'
        state.value = action.payload } )
        builder.addCase (fetchTon.rejected , (state, action) => {state.status = 'erroe'} ) 
          }
    }


 )
export default ton.reducer