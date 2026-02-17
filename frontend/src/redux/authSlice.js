import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

name:"auth",
initialState:{
user:null,
isLoading:false
},
reducers:{
    setLoading:(state,action)=>{
        state.isLoading= action.payload
    },
    setUser:(state,action)=>{
        state.user=action.payload
    }
}
})


export const {setLoading,setUser} = authSlice.actions;
export default   authSlice.reducer