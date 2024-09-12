import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import makeNameFiles from "../functions/makeNameFiles";
import makeNewFile from "../functions/newMakeFile";
export const deleteShablon = createAsyncThunk(
  "shablon/deleteShablon",
  async function(id){
    try{
      await axios.delete("https://www.connectbirga.ru/template" , {
        params : {
          id : id
        }
      })
      return id
    }
    catch(e){
      console.warn(e)
    }
  }
)
export const putShablon = createAsyncThunk(
  "shablon/putShablon" ,
  async function(data){
    try{
      let im = await axios.put("https://www.connectbirga.ru/template" , data[0] , 
        {
          params : {
            id : data[1]
          },
          headers : {
            "X-API-KEY-AUTH" : "X_API_KEY_AUTH_SOME_KEY_FOR_AUTHlkfdjsdofjs"
          }
        }
      )
      let photos = makeNameFiles(data[2].photos , im.data.photos)
      return {
          ...data[2],
          photos : photos,
          photosNames : im.data.photos,
          id : im.data.id
      }

    }
    catch(e){
      window.Telegram.WebApp.showAlert(JSON.stringify(e))
        console.log(e)
    }
  }
)
export const postShablon = createAsyncThunk(
  "shablon/postShablon",
  async function(data){
    try{
        let im = await axios.post("https://www.connectbirga.ru/template" , data[0] , 
        {
          params : {
            userId : 2144832745
          },
          headers: {
            "Content-Type" :'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
            "X-API-KEY-AUTH" : "X_API_KEY_AUTH_SOME_KEY_FOR_AUTHlkfdjsdofjs"
          },
        }
        )

        let files = makeNameFiles(data[1].photos, im.data.photos)
        return {
          ...data[1],
          photos : files,
          photosNames : im.data.photos,
          id : im.data.id
        }
        

    }
    catch(e){
      window.Telegram.WebApp.showAlert("Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.")
      console.warn(e)
    }
  }
)
export const fetchAllShablons = createAsyncThunk(
  "shablon/fetchAllShablons",
  async function(id){
    try{
        let im = await axios.get("https://www.connectbirga.ru/template/findByUser" , 
            {
                params : {
                    userId : 2144832745 
                    // userId : 2144832745 
                },
                headers : {
                  "X-API-KEY-AUTH" : "X_API_KEY_AUTH_SOME_KEY_FOR_AUTHlkfdjsdofjs"
                }
            }
        )
      
        let localShablons = []
        let servShablons = im.data
      
        for (let e of servShablons){
          
          let files = []
          if (e.photos){
             files = await makeNewFile(e.folder, e.photos)
          }
              localShablons.push({
                  id : e.id,
                  name : e.name,
                  text : e.text,
                  photos : files, // photos - это файлы
                  photosNames : e.photos // photosNames - это фотки
          })
        }
        
          
            
            
        
      
          
        
        return localShablons
        

    }
    catch(e){
        console.warn(e)
    }
  }
    
)
const shablon = createSlice({
  name: "shablon",
  initialState: {
    status: null,
    postStatus : null,
    putStatus : null,
    shablonsArr: [
      { name: "Шаблон 1", description: "Это шаблон один хахахах", photos: [] },
      { name: "Шаблон 2222", description: "Это шаблон два хахахах", photos: [] },
    ],
  },
  reducers : {
    
  },
  extraReducers : (builder) => {
    builder.addCase(postShablon.pending , (state , action) => {
      state.postStatus = "pending"
  })
  builder.addCase(putShablon.pending , (state , action) => {
    state.putStatus = "pending"
  })


    builder.addCase(fetchAllShablons.fulfilled , (state , action) => {
        state.shablonsArr = action.payload
    })
    builder.addCase(postShablon.fulfilled , (state , action) => {
       state.postStatus = "complete"
      state.shablonsArr.push(action.payload)
    })
    builder.addCase(putShablon.fulfilled , (state, action) => {
      state.putStatus = "complete"
      state.shablonsArr = state.shablonsArr.map((e , i) => {
        if (e.id === action.payload.id){
          return action.payload
        }
        else{
          return e
        }
      })
    })
    builder.addCase(deleteShablon.fulfilled, (state , action) => {
      state.shablonsArr = state.shablonsArr.filter(e => 
          e.id !== action.payload
      )
    } ) 
  }
});
export default shablon.reducer;
