import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import makeNewFile from "../functions/newMakeFile";
import translation from "../functions/translate";
import en from "../constants/language";



export const fetchResponseByAdvertisement = createAsyncThunk(
    "fetchResponseByAdvertisement",
    async function([id, task, page]){
        let im = await axios.get(
            "https://www.connectbirga.ru/response/findByAdvertisement",
            {
              params: {
                advertisementId: id,
                limit : 4,
                page : page
              },
              headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
            }
          );
          let responces = im.data;
          for (let i = 0; i < responces.length; i++) {
            let photos = [];
    
            if (responces[i].photos) {
              photos = await makeNewFile(responces[i].folder, responces[i].photos);
            }

            let b = await axios.get("https://www.connectbirga.ru/card/countByUser" , {
                params : {
                    advertisementId: responces[i].user.id,
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
            } )
    
            responces[i].photos = photos;
            responces[i].advertisement = task
            responces[i].user.cardsNumber = b.data
            
    
            try {
              let imTwo = await axios.get(
                "https://www.connectbirga.ru/advertisement/findCount",
                {
                  params: {
                    userId: responces[i].user.id,
                  },
                  headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
                }
              );
              responces[i].createNumber = imTwo.data;
            } catch (e) {
               console.warn(e)
              window.Telegram.WebApp.showAlert(e);
            }
          }
    
          return responces;
    }
)

export const deleteResponse = createAsyncThunk(
    "deleteResponse",
    async function(id){
        try{

            await axios.delete("https://www.connectbirga.ru/response", {
                params : {
                    id : id
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
            })
            return id
        }
        catch(e){
            console.log(e)
            window.Telegram.WebApp.showAlert(e)
        }
    }
)
export const setStartResponse = createAsyncThunk(
    "setStartResponse",
    async function([responce , advertisement]){
        let myData = new FormData()
        myData.append("isWatched" , "inProcess")
        const messageOne = translation("📣✅ Вы были выбраны исполнителем на задание")
        try{
            await axios.put("https://www.connectbirga.ru/response" , myData, {
                params : {
                    id : responce.id
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
            } )

            await axios.get("https://www.connectbirga.ru/user/sendMessage", {
                params: {
                  chatId: responce.user.id,
                  text:
                  messageOne + ` «<b>${advertisement.taskName}</b>«` ,
                  buttonUrl:
                    "https://birga.ywa.su/MyAds?open=1" ,
                    languageCode : en ? "en" : "ru"
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
              });


        }

        catch(e){
            window.Telegram.WebApp.showAlert(e)
        }
    }
)
export const addResponse = createAsyncThunk(
    "addResponse" , 
    async function (par){
        try{
            // for (let i = 0 ; i < 20;i++){

            //     await axios.post("https://www.connectbirga.ru/response" , par[0], {
            //         params : {
            //             advertisementId : par[1].advertisement.id,
            //             userId : par[1].user.id
            //         }
            //     })
            // }

            const messageOne = translation("📣 Вы получили отклик на задачу «")
            const messageTwo = translation("» от ")
            await axios.post("https://www.connectbirga.ru/response" , par[0], {
                params : {
                    advertisementId : par[1].advertisement.id,
                    userId : par[1].user.id
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }

            })


            const en = true
            
            await axios.get("https://www.connectbirga.ru/user/sendMessage" , {
                params : {
                  "chatId" : par[1].advertisement.user.chatId,
                  "text" : messageOne + par[1].advertisement.taskName.bold() + messageTwo +  par[1].user.fl ,
                  "languageCode" : en ? "en" : "ru"
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
              })

            return par[1]
        }
        catch(e){
            console.log(e)
            window.Telegram.WebApp.showAlert(e)
        }
        
    }
)
export const postResponse = createAsyncThunk(
    "postResponse" , 
    async function(id){
        let myData = new FormData()
        myData.append("isWatched" , "watched")
        try{
            await axios.put("https://www.connectbirga.ru/response" , myData, {
                params : {
                    id : id
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
            } )
        }
        catch(e){
            window.Telegram.WebApp.showAlert(e)
        }
    }
)
export const fetchResponses = createAsyncThunk(
    "fetchResponses",
    async function (par){
        try{

        
        let im = await axios.get('https://www.connectbirga.ru/response/findByUser' , {
            params : {
                "userId" : 858931156,
                page : par[1],
                limit : 4
                
            },
            headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
        })
        let localResponses = im.data

        let me = par[0]
        

        for (let i = 0; i < localResponses.length; i++){
            let one = new Date(localResponses[i].advertisement.startTime)
  
            let two;
            if (localResponses[i].advertisement.endTime){
               two = new Date(localResponses[i].advertisement.endTime)
            }
            else{
               two = ""
            }

            let files = await makeNewFile(localResponses[i].advertisement.folder, localResponses[i].advertisement.photos);

            try {
                let imTwo = await axios.get(
                  "https://www.connectbirga.ru/advertisement/findCount",
                  {
                    params: {
                      userId: me.id,
                    },
                    headers : {
                        "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                      }
                  }
                );
                localResponses[i].createNumber = imTwo.data;
              } catch (e) {
                 console.warn(e)
                window.Telegram.WebApp.showAlert(e);
              }
            
            console.log(localResponses)

            const advertisementUser = await axios.get("https://www.connectbirga.ru/user/findOne" , {
                params : {
                    "id" : localResponses[i].advertisement.user.id
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
            })

            const advertisementCrateNumber = await axios.get("https://www.connectbirga.ru/advertisement/findCount" , {
                params : {
                    "userId" : localResponses[i].advertisement.user.id
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
            })
            
            
            localResponses[i].advertisement = {
              id : localResponses[i].advertisement.id,
              taskName : localResponses[i].advertisement.title,
              executionPlace: "Можно выполнить удаленно",
              time : {start : one , end : two},
              tonValue : localResponses[i].advertisement.price,
              taskDescription : localResponses[i].advertisement.description,
              photos : files,
              photosName : localResponses[i].advertisement.photos,
              customerName : me.firstName,
              userPhoto : me.photo || "",
              rate : '5',
              isActive : true,
              creationTime : localResponses[i].advertisement.createdAt,
              category : localResponses[i].advertisement.category.id,
              viewsNumber : localResponses[i].advertisement.advertisement,
              user : advertisementUser.data,
              createNumber : advertisementCrateNumber.data

              
            }

            let photos = [];
    
            if (localResponses[i].photos) {
              photos = await makeNewFile(localResponses[i].folder, localResponses[i].photos);
            }
    
            localResponses[i].photos = photos;
    
            try {
              localResponses[i].user = {
                "id" : me.id,
                "fl" : me.firstName,
                "link" : me.link,
                "photo" : me.photo,
                "about" : me.profile.about,
                "stage" : me.profile.stage,
                "completedAdvertisements" : me.completedTasks
                
              }
            } catch (e) {
              window.Telegram.WebApp.showAlert(e);
            }
            


        }
        return localResponses
    }
    catch(e){
        window.Telegram.WebApp.showAlert(e)
        console.log(e)
    }
    }
)

const responses = createSlice({
    name : 'responses',
    initialState : {
        status : null,
        responsesByAStatus : null,
        responses : [],
        responsesByA : []
    },
    reducers :{
        clearResponses(state,action){
            state.status = null
            state.responses = []
        },
        clearResponsesByA(state , action){
            state.responsesByAStatus = "pending"
            state.responsesByA = []
        }
    },
    extraReducers : builder => {

        builder.addCase(fetchResponseByAdvertisement.fulfilled, ((state , action) => {
            state.responsesByAStatus = "completed"
            state.responsesByA.push(...action.payload)
            if (action.payload.length < 4){
                state.responsesByAStatus = "all"
            }
        }))

        builder.addCase(fetchResponseByAdvertisement.pending, ((state , action) => {
            if (state.responsesByA.length === 0){
                state.responsesByAStatus = "pending"
            }
            else{
                state.responsesByAStatus = "completed"
            }
        }))

        builder.addCase(deleteResponse.fulfilled, ((state , action) => {
            state.responses = state.responses.filter((e , i ) => e.id !== action.payload)
        }))
        builder.addCase(addResponse.fulfilled, ( (state , action) => {
            state.responses.push(action.payload)
        }))
        builder.addCase(fetchResponses.pending , ((state , action) => {
            if (state.responses.length === 0){
                state.status = "pending"
            }
            else{
                state.status = "complete"
            }
        }  ))
        builder.addCase(fetchResponses.fulfilled , ((state , action) => {
            state.responses.push(...action.payload)
            if (action.payload.length < 4){
                state.status = "all"
            }
            else{
                state.status = "complete"
            }
        }))
    }
})
export const {clearResponses , clearResponsesByA} = responses.actions
export default responses.reducer