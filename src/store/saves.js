import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import makeNewFile from "../functions/newMakeFile";
import { useEffect } from "react";

export const deleteCard = createAsyncThunk(
    "deleteCard" ,
    async function(id){
        try{
            await axios.delete("https://back-birga.ywa.su/user/savedCard", {
                params:{
                    "userId" : 2144832745,
                    "cardId" : id
                }

            } )
            return id
        }
        catch(e){
            console.log(e)
        }
    }
)

export const addCard = createAsyncThunk(
    "addCard" ,
    async function (par){
        try{
            await axios.post('https://back-birga.ywa.su/card/save' , {
                "userId" : 2144832745,
                "cardId" : par[0]
            })
            return par[0]
        }
        catch(e){
            console.log(e)
        }
    }
)

export const deleteResponce = createAsyncThunk(
    "deleteReponce",
    async function(id){
        try{
            await axios.delete("https://back-birga.ywa.su/user/savedResponse" , { params : {
                "responseId" : id,
                "userId" : 2144832745
            } })

            return id
        }
        catch(e){
            console.log(e)
        }
    }
)

export const addResponce = createAsyncThunk(
    "addResponce",
    async function(par){
        try{
            await axios.post('https://back-birga.ywa.su/response/save', {
                    "responseId" : par[0],
                    "userId" : 2144832745
            })

            const responseUser = await axios.get("https://back-birga.ywa.su/user/findOne" , {
                params : {
                    "id" : par[1].user.id
                }
            })

            const crateNumber = await axios.get("https://back-birga.ywa.su/advertisement/findCount" , {
                params : {
                    "userId" : par[1].user.id
                }
            })
            const advertisementUser = await axios.get("https://back-birga.ywa.su/user/findOne" , {
                params : {
                    "id" : 2144832745
                }
            })

            const rez = {...par[1] , user : responseUser.data , createNumber : crateNumber.data, advertisement : {...par[1].addAdvertisment, user : advertisementUser.data} }
            // rez.user = responseUser.data
            // rez.createNumber = crateNumber.data
            // rez.advertisement.user = advertisementUser.data
            return par[0]
        }
        catch(e){
            console.log(e)
        }
    }
)


export const deleteAdvertisement = createAsyncThunk(
    "deleteAdvertisement" , 
    async function(id){
        try{
            await axios.delete("https://back-birga.ywa.su/user/savedAdvertisement" , {
                params : {
                    "advertisementId" : id,
                    "userId" : 2144832745
                }
            })
            return id
        }
        catch(e){
            console.log(e)
        }
    }
)
export const addAdvertisment = createAsyncThunk(
    "addAdvertisement",
    async function(par){
        try{
            let im = await axios.post('https://back-birga.ywa.su/advertisement/save' , {
                "advertisementId" : par[0],
                "userId" : 2144832745
            })

            const advertisementUser = await axios.get("https://back-birga.ywa.su/user/findOne" , {
                params : {
                    "id" : par[1].user.id
                }
            })

            const advertisementCrateNumber = await axios.get("https://back-birga.ywa.su/advertisement/findCount" , {
                params : {
                    "userId" : par[1].user.id
                }
            })
            const rez = {...par[1] , user : advertisementUser.data, createNumber : advertisementCrateNumber.data }

            return par[0]
            
        }
        catch(e){
            console.log(e)
        }
    }
)




export const fetchSavedCards = createAsyncThunk(
    "fetchSavedCards",
    async function ([page]) {
        


        let im = await axios.get('https://back-birga.ywa.su/card/saved' , {
            params : {
                "userId" : 2144832745,
                "page" : page,
                limit : 4
            }
        })


         let cards = im.data
         let localCards = []


         for (let e of cards)
            {

                let files =  await makeNewFile(e.folder, e.photos)
                localCards.push({
                    id : e.id,
                    title : e.title,
                    description : e.description,
                    behanceLink : e.behance,
                    dribbbleLink : e.dribble,
                    dropfileLink : e.dropFile,
                    photosNames : e.photos,
                    photos : files
                })
            }



        return localCards
    }
)




export const fetchSavedResponses = createAsyncThunk(
    "fetchSavedResponses",
    async function ([page]) {
        let imTwo = await axios.get('https://back-birga.ywa.su/response/saved' , {
            params : {
                "userId" : 2144832745,
                limit : 4,
                page : page
            }
        })



        // let imTwo = await axios.get('https://back-birga.ywa.su/response/saved' , {
        //     params : {
        //         "userId" : 2144832745
        //     }
        // })

        let responces = imTwo.data



        for (let i = 0; i < responces.length; i++) {
            let photos = [];
    
            if (responces[i].photos) {
              photos = await makeNewFile(responces[i].folder, responces[i].photos);
            }


            const responseUser = await axios.get("https://back-birga.ywa.su/user/findOne" , {
                params : {
                    "id" : responces[i].user.id // тут
                }
            })
            const advertisementUser = await axios.get("https://back-birga.ywa.su/user/findOne" , {
                params : {
                    "id" : responces[i].advertisement.user.id
                }
            })


    
            responces[i].photos = photos;

                    
            let one = new Date(responces[i].advertisement.startTime)
  
            let two;
            if (responces[i].advertisement.endTime){
               two = new Date(responces[i].advertisement.endTime)
            }
            else{
               two = ""
            }

            let files = await makeNewFile(responces[i].advertisement.folder, responces[i].advertisement.photos);

            responces[i].advertisement = {
                id : responces[i].advertisement.id,
                taskName : responces[i].advertisement.title,
                executionPlace: "Можно выполнить удаленно",
                time : {start : one , end : two},
                tonValue : responces[i].advertisement.price,
                taskDescription : responces[i].advertisement.description,
                photos : files,
                photosName : responces[i].advertisement.photos,
                customerName : responces[i].advertisement.user.fl,
                userPhoto : responces[i].advertisement.user.photo || "",
                rate : '5',
                isActive : true,
                creationTime : responces[i].advertisement.createdAt,
                viewsNumber : responces[i].advertisement.views,
                status : responces[i].advertisement.status,
                user : advertisementUser.data

            }
    
            try {
              let luo = await axios.get(
                "https://back-birga.ywa.su/advertisement/findCount",
                {
                  params: {
                    userId: responseUser.data.id,
                  },
                }
              );
              responces[i].createNumber = luo.data;

              responces[i].user = responseUser.data

            } catch (e) {
              window.Telegram.WebApp.showAlert(e);
            }
          }
        
        


        return responces
    }
)

export const fetchSavedAdvertisements = createAsyncThunk(
    "fetchSavedAdvertisements",
    async function ([page]) {
        let im = await axios.get('https://back-birga.ywa.su/advertisement/saved' , {
            params : {
                "userId" : 2144832745,
                limit : 4,
                page : page
            }
        })
        console.log(im.data)




        let advertisements = im.data
        let trueAdvertisements = []

        for (let order of advertisements){

        
            let one = new Date(order.startTime)
  
            let two;
            if (order.endTime){
               two = new Date(order.endTime)
            }
            else{
               two = ""
            }

            let files = await makeNewFile(order.folder, order.photos);
            const advertisementUser = await axios.get("https://back-birga.ywa.su/user/findOne" , {
                params : {
                    "id" : order.user.id
                }
            })

            const advertisementCrateNumber = await axios.get("https://back-birga.ywa.su/advertisement/findCount" , {
                params : {
                    "userId" : order.user.id
                }
            })


            


            trueAdvertisements.push(
                {
                    id : order.id,
                    taskName : order.title,
                    executionPlace: "Можно выполнить удаленно",
                    time : {start : one , end : two},
                    tonValue : order.price,
                    taskDescription : order.description,
                    photos : files,
                    photosName : order.photos,
                    customerName : order.user.fl,
                    userPhoto : order.user.photo || "",
                    rate : '5',
                    isActive : true,
                    creationTime : order.createdAt,
                    viewsNumber : order.views ,
                    responces : order.responses,
                    user : advertisementUser.data,
                    createNumber : advertisementCrateNumber.data,
                    status : order.status,
                    category : order.category.id
                }
            )

        }










        // тут логика получения моих заданий
        return trueAdvertisements
    }
)
export const fetchAllIds = createAsyncThunk( 
    "fetchAllIds", 
    async function (params) {
        try{
            let imOne = await axios.get("https://back-birga.ywa.su/advertisement/savedIds" , {
                params : {
                    "userId" : 2144832745
                }
            })
            let imTwo = await axios.get("https://back-birga.ywa.su/response/savedIds" , {
                params : {
                    "userId" : 2144832745
                }
            })
            let imThree = await axios.get("https://back-birga.ywa.su/card/savedIds" , {
                params : {
                    "userId" : 2144832745
                }
            })
            return {
                advertisement : imOne.data,
                responces : imTwo.data,
                cards : imThree.data
            }
        }
        catch(e){
            alert(JSON.stringify(e))
        }
    }
)
export const fetchAllValues = createAsyncThunk(
    "fetchhAllValues",
    async function() {
        try{

        
        let im = await axios.get('https://back-birga.ywa.su/advertisement/saved' , {
            params : {
                "userId" : 2144832745
            }
        })
        let advertisements = im.data.savedAdvertisements
        let trueAdvertisements = []

        for (let order of advertisements){

        
            let one = new Date(order.startTime)
  
            let two;
            if (order.endTime){
               two = new Date(order.endTime)
            }
            else{
               two = ""
            }

            let files = await makeNewFile(order.folder, order.photos);
            const advertisementUser = await axios.get("https://back-birga.ywa.su/user/findOne" , {
                params : {
                    "id" : order.user.id
                }
            })

            const advertisementCrateNumber = await axios.get("https://back-birga.ywa.su/advertisement/findCount" , {
                params : {
                    "userId" : order.user.id
                }
            })


            


            trueAdvertisements.push(
                {
                    id : order.id,
                    taskName : order.title,
                    executionPlace: "Можно выполнить удаленно",
                    time : {start : one , end : two},
                    tonValue : order.price,
                    taskDescription : order.description,
                    photos : files,
                    photosName : order.photos,
                    customerName : im.data.fl,
                    userPhoto : im.data.photo || "",
                    rate : '5',
                    isActive : true,
                    creationTime : order.createdAt,
                    viewsNumber : order.views ,
                    responces : order.responses,
                    user : advertisementUser.data,
                    createNumber : advertisementCrateNumber.data,
                    status : order.status
                }
            )

        }











        let imTwo = await axios.get('https://back-birga.ywa.su/response/saved' , {
            params : {
                "userId" : 2144832745
            }
        })

        let responces = imTwo.data.savedResponses



        for (let i = 0; i < imTwo.data.savedResponses.length; i++) {
            let photos = [];
    
            if (responces[i].photos) {
              photos = await makeNewFile(responces[i].folder, responces[i].photos);
            }


            const responseUser = await axios.get("https://back-birga.ywa.su/user/findOne" , {
                params : {
                    "id" : 2144832745 // тут
                }
            })
            const advertisementUser = await axios.get("https://back-birga.ywa.su/user/findOne" , {
                params : {
                    "id" : responces[i].advertisement.user.id
                }
            })


    
            responces[i].photos = photos;

                    
            let one = new Date(responces[i].advertisement.startTime)
  
            let two;
            if (responces[i].advertisement.endTime){
               two = new Date(responces[i].advertisement.endTime)
            }
            else{
               two = ""
            }

            let files = await makeNewFile(responces[i].advertisement.folder, responces[i].advertisement.photos);

            responces[i].advertisement = {
                id : responces[i].advertisement.id,
                taskName : responces[i].advertisement.title,
                executionPlace: "Можно выполнить удаленно",
                time : {start : one , end : two},
                tonValue : responces[i].advertisement.price,
                taskDescription : responces[i].advertisement.description,
                photos : files,
                photosName : responces[i].advertisement.photos,
                customerName : responces[i].advertisement.user.fl,
                userPhoto : responces[i].advertisement.user.photo || "",
                rate : '5',
                isActive : true,
                creationTime : responces[i].advertisement.createdAt,
                viewsNumber : responces[i].advertisement.views,
                status : responces[i].advertisement.status,
                user : advertisementUser.data

            }
    
            try {
              let luo = await axios.get(
                "https://back-birga.ywa.su/advertisement/findCount",
                {
                  params: {
                    userId: imTwo.data.id,
                  },
                }
              );
              responces[i].createNumber = luo.data;

              responces[i].user = responseUser.data

            } catch (e) {
              window.Telegram.WebApp.showAlert(e);
            }
          }
        

        im = await axios.get('https://back-birga.ywa.su/card/saved' , {
            params : {
                "userId" : 2144832745
            }
        })


         let cards = im.data.savedCards
         let localCards = []


         for (let e of cards)
            {

                let files =  await makeNewFile(e.folder, e.photos)
                localCards.push({
                    id : e.id,
                    title : e.title,
                    description : e.description,
                    behanceLink : e.behance,
                    dribbbleLink : e.dribble,
                    dropfileLink : e.dropFile,
                    photosNames : e.photos,
                    photos : files
                })
            }
        
        return [trueAdvertisements, responces, localCards]
    }
    catch (e){
        console.log(e)
    }
    }

)
const saves = createSlice({
    name : 'saves',
    initialState : {
        reponsesStatus : null,
        cardsStatus : null,
        advertisementStatus : null,
        responces : [],
        cards : [],
        tasks : [],
        responsesIds : [],
        advertisementIds : [],
        cardIds : []

    },
    reducers : {
        clearAll(state){
            state.cardsStatus = null
            state.advertisementStatus = null
            state.reponsesStatus = null
            state.cards = []
            state.tasks = []
            state.responces = []
        }
    },
    extraReducers : builder => {

        builder.addCase(fetchAllIds.fulfilled , ( (state , action) => {
            state.advertisementIds = action.payload.advertisement
            state.cardIds = action.payload.cards
            state.responsesIds = action.payload.responces
        } ))
        builder.addCase(fetchSavedAdvertisements.fulfilled , ( (state , action) => {
            
            state.tasks.push(...action.payload)
            console.log(action.payload)
            if (action.payload.length < 4){
                state.advertisementStatus = "all"
            }
            else{

                state.advertisementStatus = "complete"
            }
        } ))
        builder.addCase(fetchSavedCards.fulfilled , ( (state , action) => {
            state.cards.push(...action.payload)
            if (action.payload.length < 4){
                state.cardsStatus = "all"
            }
            else{
                state.cardsStatus = "complete"
            }
        } ))
        builder.addCase(fetchSavedResponses.fulfilled , ( (state , action) => {
            state.responces.push(...action.payload)
            if (action.payload.length < 4){
                state.reponsesStatus = "all"
            }
            else{
                state.reponsesStatus = "complete"
            }
        } ))
        builder.addCase(fetchSavedResponses.pending , ( (state , action) => {
            if (state.responces.length === 0){
                state.reponsesStatus = "pending"
            }
            else{
                state.reponsesStatus = "complete"
            }
        } ))
        builder.addCase(fetchSavedCards.pending , ( (state , action) => {
            if (state.cards.length === 0){
                state.cardsStatus = "pending"
            }
            else{
                state.cardsStatus = "complete"
            }
        } ))
        builder.addCase(fetchSavedAdvertisements.pending, ((state , action) => {
            if (state.tasks.length === 0){
                state.advertisementStatus = "pending"
            }
            else{
                state.advertisementStatus = "complete"
            }

        }))
        builder.addCase(deleteCard.fulfilled, ((state, action) => {
            state.cards = state.cards.filter((e,i) => {
                return e.id !== action.payload
            })
        }))
        builder.addCase(addCard.fulfilled , ((state, action) => {
            state.cardIds.push({id : action.payload})
            // state.cards.push(action.payload)
        }))
        builder.addCase(deleteResponce.fulfilled, ((state, action) => {
            state.responces = state.responces.filter( (e, i) => {
                return e.id !== action.payload
            } )
        }))
        builder.addCase(addResponce.fulfilled , ((state, action) => {
            state.responsesIds.push({id : action.payload})
            // state.responces.push(action.payload)
        }))
        builder.addCase(deleteAdvertisement.fulfilled, ((state , action) => {
            state.tasks = state.tasks.filter((e , i) => {
                return e.id !== action.payload
            })
        }))
        builder.addCase(fetchAllValues.fulfilled, ( (state, action) => {
            // state.tasks = action.payload[0]
            // state.responces = action.payload[1]
            // state.cards = action.payload[2]
        } ))
        builder.addCase(addAdvertisment.fulfilled, ( (state ,action) => {
            state.advertisementIds.push({id :action.payload})
            // state.tasks.push(action.payload)
        } ))
    }

}
)
export default saves.reducer
export const {clearAll} = saves.actions 