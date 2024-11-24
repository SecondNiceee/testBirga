import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import makeNewFile from "../functions/newMakeFile";





export const deleteServerCard = createAsyncThunk(
    "telegramUserInfo/putCard",
    async function (data){
        try{
            await axios.delete(`${process.env.REACT_APP_HOST}/card` , {
                params : {
                    id : data
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
            }
            )

            return data
        }
        catch(e){
            window.Telegram.WebApp.showAlert(JSON.stringify(e))
            console.warn(e)
        }
    }
)

export const putCard = createAsyncThunk(
    "telegramUserInfo/putCard",
    async function (data){
        try{
            //window.Telegram.WebApp.initDataUnsafe.user.id 
            //
            let im = await axios.put(`${process.env.REACT_APP_HOST}/card` , data[0] , 
                {
                    params : {
                        id : String(window.Telegram.WebApp.initDataUnsafe.user.id),
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Contrsol-Allow-Origin": "*",
                        "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY

                      },
                }
            )
            let photos = []
            data[2].photos.forEach((e, i) => {
                let blob = e.slice(0 , e.size, "image/png")
                let newFile = new File([blob], im.data.photos[i], {type: 'image/png'});
                photos.push(newFile)
             })
             let localCard = {
                ...data[2],
                photosNames : im.data.photos,
                photos : photos,
                id : im.data.id
            }
            return localCard
        }
        catch(a){
            console.warn(a)
        }
    }
)
export const postCard = createAsyncThunk(
    "telegramUserInfo/postUserInfo",
    async function (data){
        try{
            let im = await axios.post(`${process.env.REACT_APP_HOST}/card` , data[0] , 
                {
                    params : {
                        userId : String(window.Telegram.WebApp.initDataUnsafe.user.id),
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Control-Allow-Origin": "*",
                        "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                      },
                }
             )
             let photos = []
             data[2].photos.forEach((e, i) => {
                let blob = e.slice(0 , e.size, "image/png")
                let newFile = new File([blob], im.data.photos[i], {type: 'image/png'});
                photos.push(newFile)

             })
            let localCard = {
                ...data[2],
                photosNames : im.data.photos,
                photos : photos,
                id : im.data.id
            }
            return localCard
        }
        catch(e){
            alert(JSON.stringify(e))
            console.warn(e)
            return false
        }
    }
)
export const putUserInfo = createAsyncThunk(
    "telegramUserInfo/putUserInfo",
    async function (data){
        console.log("------------------------------------")
        console.log("------------------------------------")
        console.log(data[0])
        try{
            await axios.put(`${process.env.REACT_APP_HOST}/user` , data[0] , {
                params : {
                    userId : String(window.Telegram.WebApp.initDataUnsafe.user.id),
                },
                headers: {
                    "Content-Type" :'application/json',
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY,
                  },
            })
            return true
        }
        catch(e){
            console.warn(e)
        }
    }
)
export const fetchUserInfo = createAsyncThunk(
  "telegramUserInfo/fetchUserInfo",
  async function () {
    try {

        //window.Telegram.WebApp.initDataUnsafe.user.id
        let firstName = window.Telegram.WebApp.initDataUnsafe.user ? window.Telegram.WebApp.initDataUnsafe.user.first_name : "Коля"
        let lastName = window.Telegram.WebApp.initDataUnsafe.user ?  window.Telegram.WebApp.initDataUnsafe.user.last_name : "Титов"
        let UserId = window.Telegram.WebApp.initDataUnsafe.user.id
        let user;
        
        try{


             user = await axios.get(`${process.env.REACT_APP_HOST}/user/findOne`, {
              params: {
                id: UserId,
              },
              headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
            });
            console.log('====================================');
            console.log(user);
            console.log('====================================');
        }
        catch(e){

            console.log(String(window.Telegram.WebApp.initDataUnsafe.start_param.split(':')[1]))
            await axios.post(`${process.env.REACT_APP_HOST}/user/createByBot` , {}, {

                
                params : {
                    referId :String(window.Telegram.WebApp.initDataUnsafe.start_param.split(':')[1]),
                    id : window.Telegram.WebApp.initDataUnsafe.user.id,
                    language_code : window.Telegram.WebApp.initDataUnsafe.user ? window.Telegram.WebApp.initDataUnsafe.user.language_code : "en",
                    link : window.Telegram.WebApp.initDataUnsafe.user.link
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
            })
            user = await axios.get(`${process.env.REACT_APP_HOST}/user/findOne`, {
                params: {
                  id: UserId,
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
              });
        }

        let localCards = []

        let allCards = await axios.get(`${process.env.REACT_APP_HOST}/card/findByUser` , {
            params : {
                userId : UserId
            },
            headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
        })
        for (let e of allCards.data)
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
                    photos : files,
                    
                })
            }

        //window.Telegram.WebApp.initDataUnsafe.user.id
        //window.Telegram.WebApp.initDataUnsafe.user.id  window.Telegram.WebApp.initDataUnsafe.user.id

        let photoUrl = user.data.photo ? user.data.photo : ""

        return ( {
            firstName: firstName,
            lastName: lastName,
            address : user.data.address,
            mnemonic : user.data.mnemonic,
            id: UserId,
            link : user.data.link,
            photo: photoUrl,
            about : user.data.about,
            stage : user.data.stage,
            deals : user.data.deals,
            completedTasks : user.data.completedAdvertisements,
            cards : localCards,
            congradulations : user.data.congradulations,
            lastTransaction : user.data.lastTransaction,
            congratulate : user.data.congratulate
          } );
    }
    catch (e){
        console.log(e)
    }

    // let photo = 'бла бла фото еб'


  }
);

const telegramUserInfo = createSlice({
  name: "telegramUserInfo",
  initialState: {
    state: null,
    postState : null,
    putState : null,
    id: "",
    photo: "",
    link : "",
    firstName: "неверный ферст нэйм",
    lastName: "",
    completedTasks : [],
    deals : 0,
    lastTransaction : "NO",
    congratulate : null,
    profile : {
        about : "",
        stage : 0,
        cards : [
        ]
    },
  },
  reducers : {
    changeProfile(state , action){
        state.profile = action.payload
    },
    addCard(state, action){
        state.profile.cards.push(action.payload)
    },
    changeCards(state, action){
        state.profile.cards[action.payload.id] = action.payload.card
    },
    deleteCard(state , action){
        state.profile.cards = state.profile.cards.filter((e, i) => {
            return i !== action.payload
        })

    }
},
  
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.lastTransaction = action.payload.lastTransaction
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.photo = action.payload.photo ? action.payload.photo : "";
      state.profile = {...state.profile , about : action.payload.about, stage : action.payload.stage === null ? '0' : action.payload.stage};
      state.profile.cards = action.payload.cards;
      state.profile.userId = action.payload.id
      state.completedTasks = action.payload.completedTasks
      state.deals = action.payload.deals
      state.mnemonic = action.payload.mnemonic
      state.address = action.payload.address
      state.profile.cards.sort((a, b) => a.id - b.id)
      state.congradulations = action.payload.address
      state.congratulate = action.payload.congratulate
      state.state = "yes";
      
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(postCard.fulfilled , (state , action) => {
        state.postState = "complete"
        if (action.payload){
            state.profile.cards.push(action.payload)

        }
    });
    builder.addCase(postCard.pending , (state , action) => {
        state.postState = "pending"
    })
    builder.addCase(putCard.pending , (state , action) => {
        state.putState = "pending"
    })
    builder.addCase(putCard.fulfilled , (state , action) => {
         state.putState = "complete"
        state.profile.cards = state.profile.cards.map( (e) => {
            if (e.id === action.payload.id){
                return action.payload
            }
            else{
                return e
            }
        }
        )
    })
  },
});

export default telegramUserInfo.reducer;
export const {changeProfile, addCard, changeCards, deleteCard} = telegramUserInfo.actions
