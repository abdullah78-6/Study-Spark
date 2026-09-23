import {createSlice} from "@reduxjs/toolkit"
const clientslice=createSlice({
    name:"client",
    initialState:{
        Logindata:{
            name:"",
            email:"",
            password:""
        },
        backendemail:"",
        type:"Sign up",
        navclass:"",
        
},
reducers:{
    setLogindata(state,action){
        const {name,value}=action.payload;
        state.Logindata[name]=value;
    },
   setnavclass(state,action){
        state.navclass=action.payload;
    },
    setbackendemail(state,action){
        state.backendemail=action.payload;
    },
    settype(state,action){
        state.type=action.payload;
    }
}
})
export const control=clientslice.actions;
export default clientslice.reducer;