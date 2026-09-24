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
        Account:"",
        backendemail2:""
        
},
reducers:{
    setLogindata(state,action){
        const {name,value}=action.payload;
        state.Logindata[name]=value;
    },
    setbackendemail2(state,action){
        state.backendemail2=action.payload;
    },
   setnavclass(state,action){
        state.navclass=action.payload;
    },
    setAccount(state,action){
        state.Account=action.payload;
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