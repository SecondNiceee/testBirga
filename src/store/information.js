import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import makeNewFile from "../functions/newMakeFile";

export const addWatch = createAsyncThunk(
  "information/addWatch",
  async function (advertisement) {
    if (advertisement.viewsNumber !== undefined && advertisement.viewsNumber !== null) {
      try {
        let myData = new FormData();
        myData.append("views", String(Number(advertisement.viewsNumber) + 1));
        
        await axios.put(`${process.env.REACT_APP_HOST}/advertisement`, myData, {
          params: {
            id: String(advertisement.id),
          },
          headers : {
            "Content-Type": "multipart/form-data",
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        });
      } catch (e) {
        // alert(e)
        console.warn(e);
      }
    }
  }
);
export const deleteAd = createAsyncThunk(
  "information/deleteMyAd",
  async function (id) {
    try {
      await axios.delete(`${process.env.REACT_APP_HOST}/advertisement`, {
        params: {
          id: id,
        },
        headers : {
          "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
      });
      return id;
    } catch (e) {
      console.warn(e);
    }
  }
);
export const putMyTask = createAsyncThunk(
  "inforation/putMyTask",
  async function (data) {
    console.log("ЭТО ПОСТ")
    try {
      let answ = await axios.put(
        `${process.env.REACT_APP_HOST}/advertisement`,
        data[0],
        {
          params: {
            id: String(data[1]),
          },
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            
          },
        }
      );
      let localTask = data[2];
      let changedFiles = [];

      for (let i = 0; i < localTask.photos.length; i++) {
        let file = localTask.photos[i];
        let blob = file.slice(0, file.size, "image/png");
        let newFile = new File([blob], answ.data.photos[i], {
          type: "image/png",
        });
        changedFiles.push(newFile);
      }
      localTask.photos = changedFiles;
      localTask.photosNames = answ.data.photos;

      return {...localTask , myAds : true};
    } catch (e) {
      console.warn(e);
    }

    return false;
  }
);

export const postMyTask = createAsyncThunk(
  "information/postMytask",
  async function (arr) {

      for (let i = 0 ; i < 1; i++){
        try{
          console.log("Создание задания")
          await axios.post(`${process.env.REACT_APP_HOST}/advertisement`, arr[0], {
            headers: {
              "Content-Type" :'multipart/form-data',
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            },
          });
        }
        catch(e){
          window.Telegram.WebApp.showAlert("Задание не было создано. Попробуйте позже")
          alert(JSON.stringify(e))
          console.log(e)
        }
      }



      // let tasks = [];
      // let task = await axios.get(
      //   `${process.env.REACT_APP_HOST}/advertisement/findByUser`,
      //   {
      //     params: {
      //       page: 1,
      //       userId: window.Telegram.WebApp.initDataUnsafe.user.id,
      //       limit: 4,
      //       // userId : window.Telegram.WebApp.initDataUnsafe.user.id
      //     },
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       "Access-Control-Allow-Origin": "*",
      //       "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
      //     },
      //   }
      // );


      // if (task.data.length === 0) {
      //   return [];
      // } else {
      //   for (let order of task.data) {
      //     let files = await makeNewFile(order.folder, order.photos);
      //     let responseCounter = await axios.get(`${process.env.REACT_APP_HOST}/response/countByAdvertisement` , {
      //       params : {
      //         "advertisementId" : order.id
      //       },
      //       headers : {
      //         "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
      //       }
      //     })
      //     tasks.push({
      //       id: order.id,
      //       taskName: order.title,
      //       executionPlace: "Можно выполнить удаленно",
      //       time: {
      //         start: new Date(order.startTime),
      //         end: new Date(order.endTime),
      //       },
      //       tonValue: order.price,
      //       taskDescription: order.description,
      //       photos: files,
      //       photosNames: order.photos,
      //       rate: "5",
      //       isActive: true,
      //       creationTime: order.createdAt,
      //       viewsNumber: order.views,
      //       removedFiles: [],
      //       addedFiles: [],
      //       status: order.status,
      //       user : order.user,
      //       responseCounter : responseCounter.data,
      //       category : order.category.id
      //     });
      //   }
      //   return tasks;
      // }



    // } catch (e) {
    //   alert(e)
    //   alert("Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже");
    //   console.log(e);
    // }

    return true;
  }
);

export const setStartTask = createAsyncThunk(
  "information/setStartTask",
  async function (id) {
    try {
      let myData = new FormData();
      myData.append("status", "inProcess");
      await axios.put(`${process.env.REACT_APP_HOST}/advertisement`, myData, {
        params: {
          id: id,
        },
        headers : {
          "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
      });
      return id;
    } catch (e) {
      alert("Ошибка!");
      console.log(e);
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  "information/fetchMyOrders",

  async function (page) {
    try {
      let tasks = [];
      let task = await axios.get(
        `${process.env.REACT_APP_HOST}/advertisement/findByUser`,
        {
          params: {
            page: page,
            userId: window.Telegram.WebApp.initDataUnsafe.user.id,
            limit: 1,
            // userId : window.Telegram.WebApp.initDataUnsafe.user.id
          },
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY

          },
        }
      );


      if (task.data.length === 0) {
        return [];
      } else {
        for (let order of task.data) {
          let files = await makeNewFile(order.folder, order.photos);
          let responseCounter = await axios.get(`${process.env.REACT_APP_HOST}/response/countByAdvertisement` , {
            params : {
              "advertisementId" : order.id,
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          })
          tasks.push({
            id: order.id,
            taskName: order.title,
            executionPlace: "Можно выполнить удаленно",
            time: {
              start: new Date(order.startTime),
              end: new Date(order.endTime),
            },
            tonValue: order.price,
            taskDescription: order.description,
            photos: files,
            photosNames: order.photos,
            rate: "5",
            isActive: true,
            creationTime: order.createdAt,
            viewsNumber: order.views,
            removedFiles: [],
            addedFiles: [],
            status: order.status,
            user : order.user,
            responseCounter : responseCounter.data,
            category : order.category.id
          });
        }
        return tasks;
      }
    } catch (e) {
      console.warn(e);
    }
  }
);

export const fetchTasksInformation = createAsyncThunk(
  "information/fetchTasksInformation",
  async function (par) {
    // const urlToObject= async(image)=> {
    //   const response = await fetch(image);
    //   // here image is url/location of image
    //   const blob = await response.blob();
    //   const file = new File([blob], image, {type: blob.type});
    //   return file
    // }
    let tasks = [];
    let task;
    
    try {
      task = await axios.get(
        `${process.env.REACT_APP_HOST}/advertisement/findAll`,
        {
          params: {
            limit: 2,
            page: par,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        }
      );
      console.log('====================================');
      console.log(task);
      console.log('====================================');
    } catch (e) {
      alert("Сейчас идет обновление, пожалуйста перезайдите через минуту")
      console.log(e);
    }

    if (task.data.length === 0) {
      return [];
    } else {
      try {
        for (let order of task.data) {
          let one = new Date(order.startTime);

          let two;
          if (order.endTime) {
            two = new Date(order.endTime);
          } else {
            two = "";
          }

          let files = await makeNewFile(order.folder, order.photos);

          let imTwo = await axios.get(
            `${process.env.REACT_APP_HOST}/advertisement/findCount`,
            {
              params: {
                userId: order.user.id,
              },
              headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
            }
          );

          const newUser = {...order.user}
          try{
            if (newUser.photo.includes('http')){
              const response = await axios.get(newUser.photo)
            }
          }
          catch{
            try{
              console.log("photo update")
            const responce = await axios.put(`${process.env.REACT_APP_HOST}/user/photo`, {}, {
              params : {
                userId : newUser.id
              },
              headers : {
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
              }
            })
            newUser.photo = responce.data
          }
          catch(e){ 
            newUser.photo = ""
          }
          }

          tasks.push({
            id: order.id,
            taskName: order.title,
            executionPlace: "Можно выполнить удаленно",
            time: { start: one, end: two },
            tonValue: order.price,
            taskDescription: order.description,
            photos: files,
            photosName: order.photos,
            customerName: order.user.fl,
            userPhoto: order.user.photo ? order.user.photo : "",
            rate: "5",
            isActive: true,
            creationTime: order.createdAt,
            viewsNumber: order.views,
            responces: order.responses,
            status: order.status,
            user: newUser,
            createNumber : imTwo.data,
            category : order.category.id,
            subCategory : order.subCategory[0].id
          });
        }

      } catch (e) {
        console.warn(e);
      }
      return tasks;
    }
  }
);
const information = createSlice({
  name: "taskInformation",
  initialState: {
    orderStatus: null,
    myOrderStatus: null,
    changeOrderStatus: null,
    postTaskStatus: null,
    putTaskStatus: null,
    ordersIds : [],
    taskInformation: {
      category: { name: "", value: "" },
      subCategory: "Выбрать",
      taskName: "",
      taskDescription: "",
      photos: [],
      budget: 0,
      tonValue: 0,
      startTime: "",
      endTime: "",
      singleTime: "",
      isPrivate: false,
      time: { start: null, end: null },

    },

    orderInformations: [],

    myAdsArray: [],
    myPaginationArray: [],
  },
  reducers: {
    clearMyOrders(state,action){
      state.myAdsArray = []
      state.ordersIds = []
      state.myOrderStatus = null
    },
    getMoreMyAds(state, action) {
      for (let i = action.payload * 6; i < action.payload * 6 + 6; i++) {
        if (state.myAdsArray[i]) {
          state.myPaginationArray.push(state.myAdsArray[i]);
        } else {
          state.myOrderStatus = "all";
          break;
        }
      }
    },

    changeStatus(state, action) {
      state.orderStatus = action.payload;
      state.orderInformations = [];
    },
    clearTasks(state){
      state.orderInformations = [];
    },
    addResponce(state, action) {
      state.orderInformations = state.orderInformations.map((e) => {
        if (e.id === action.payload[0]) {
          e.responces.push(action.payload[1]);
        }
        console.log(e);
        return e;
      });
    },
    changeTaskInformation(state, action) {
      state.taskInformation = action.payload;
    },
    changeMyAds(state, action) {
      state.myAdsArray = action.payload;
      state.ordersIds = []
    },
    putMyAds(state, action) {
      let changedAd = action.payload;
      state.myAdsArray = state.myAdsArray.map((myAd) => {
        if (changedAd.id === myAd.id) {
          myAd.taskName = changedAd.taskName;
          myAd.taskDescription = changedAd.taskDescription;
          myAd.tonValue = changedAd.tonValue;
          myAd.time = { start: changedAd.time.start, end: changedAd.time.end };
        }
        return myAd;
      });
    },
    addMyAds(state, action) {
      state.myAdsArray.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasksInformation.pending, (state) => {
      if (state.orderInformations.length > 0) {
        state.orderStatus = "complete";
      } else {
        state.orderStatus = "loading";
      }
    });

    builder.addCase(setStartTask.fulfilled, (state, action) => {
      state.myAdsArray = state.myAdsArray.map((e, i) => e.id === action.payload ? {...e, status : "inProcess"} : e)
    });

    builder.addCase(fetchTasksInformation.fulfilled, (state, action) => {
      state.orderStatus = "complete";
      if (action.payload.length < 2) {
        state.orderStatus = "all";
      }
      state.orderInformations.push(...action.payload);
    });
    builder.addCase(fetchTasksInformation.rejected, (state, action) => {
      state.orderStatus = "error";
    });

    builder.addCase(fetchMyOrders.pending, (state) => {
      
        state.myOrderStatus = "loading";
      
    });
    builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.myAdsArray.push(...action.payload.filter(e => !state.ordersIds.includes(e.id)));
      state.ordersIds.push(...action.payload.map(e => e.id))
      if (action.payload.length < 1) {
        state.myOrderStatus = "all";
      } else {
        state.myOrderStatus = "completed";
      }
    });
    builder.addCase(fetchMyOrders.rejected, (state, action) => {
      state.myOrderStatus = "error";

    });
    builder.addCase(postMyTask.pending, (state) => {
      state.postTaskStatus = "pending";
    });
    builder.addCase(postMyTask.fulfilled, (state, action) => {
      state.postTaskStatus = "completed";
      state.myOrderStatus = null
      state.myAdsArray = [] 
    });
    builder.addCase(postMyTask.rejected, (state) => {
      state.postTaskStatus = "error";
    });

    builder.addCase(putMyTask.pending, (state) => {
      state.putTaskStatus = "pending";
    });
    builder.addCase(putMyTask.fulfilled, (state, action) => {
      state.putTaskStatus = "complete";

      state.myAdsArray = state.myAdsArray.map((e) => {
        if (e.id === action.payload.id) {
          return action.payload;
        } else {
          return e;
        }
      });
    });
    builder.addCase(putMyTask.rejected, (state) => {
      state.putTaskStatus = "error";
    });
    builder.addCase(deleteAd.fulfilled, (state, action) => {
      state.myAdsArray = state.myAdsArray.filter(
        (e) => e.id !== action.payload
      );
    });
  },
});
export const {
  clearMyOrders,
  changeTaskInformation,
  changeMyAds,
  addMyAds,
  putMyAds,
  addResponce,
  changeStatus,
  getMoreMyAds,
  clearTasks
} = information.actions;
export default information.reducer;
