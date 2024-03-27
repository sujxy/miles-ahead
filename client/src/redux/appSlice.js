import {createSlice} from "@reduxjs/toolkit"

export const appSlice = createSlice({
    name: 'appslice',
    initialState:{
        isLogin:true,
        chatHistory:[],
        personalityResult:{},
    },

    reducers:{
        toggleLogin: state =>{
            alert("in toggleLogin isLogin = ",state.isLogin) ;
            state.isLogin = !state.isLogin ;
        },
        setChatHistory:(state,action)=>{
            state.chatHistory = action.payload ; 
        }
    }
})

export const {toggleLogin,setChatHistory} = appSlice.actions
export default appSlice.reducer ;