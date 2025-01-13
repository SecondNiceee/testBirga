import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
export const getCategorys = createAsyncThunk(
    'category/getCategorys' , 
    async function(){
        let categorys = await axios.get(`${process.env.REACT_APP_HOST}/category/category`, {
            headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
        } )
        let categorysPar = categorys.data.filter(e => e.category !== 'Другое')
        categorysPar.push(categorys.data.find(e => e.category === 'Другое'))
        return categorysPar
    }
) 
export const getSubCategorys = createAsyncThunk(
    'categorys/getSubCategorys',
    async function(){
        let subCategorys = await axios.get(`${process.env.REACT_APP_HOST}/category/subCategory` , {
            headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
        })
        return subCategorys.data
    }
)
const categorys = createSlice(
    {
        name : 'categorys',
        initialState : {
            categoryStatus : null,
            subCategoryStatus : null,
            category : [],
            subCategory : [],
        },
        extraReducers : builder => {
            builder.addCase(getCategorys.pending, (state) => {state.categoryStatus = 'pending'})
            builder.addCase(getCategorys.fulfilled, (state, action) => {state.categoryStatus = 'OK' 
                state.category = action.payload
            })
            builder.addCase(getCategorys.rejected, (state) => {state.categoryStatus = 'error'} )


            builder.addCase(getSubCategorys.pending, (state) => {state.subCategoryStatus = 'pending'})
            builder.addCase(getSubCategorys.fulfilled, (state, action) => {state.subCategoryStatus = 'OK'
                state.subCategory = action.payload
            })
            builder.addCase(getSubCategorys.rejected, (state) => {state.subCategoryStatus = 'error'})
        }
        
    }
    
)
export default categorys.reducer