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
        backendemail2:"",
        sidemenu:"",
        image:"",
        Coursedata:{
            name:"",
            description:"",
            module:"",

        },
        courseloading:false,
        studentcourse:[],
        Totalteachercourses:[],
        displayloading:false,
        
},
reducers:{
    setLogindata(state,action){
        const {name,value}=action.payload;
        state.Logindata[name]=value;
    },
    setdisplayloading(state,action){
        state.displayloading=action.payload;

    },
    setTotalteachercourses(state,action){
        state.Totalteachercourses=action.payload;
    },
    setstudentcourse(state,action){
        state.studentcourse=action.payload;
    },
    setcourseloading(state,action){
        state.courseloading=action.payload;
    },
    setCoursedata(state,action){
        const {name,value}=action.payload;
        state.Coursedata[name]=value;
    },
    setimage(state,action){
        state.image=action.payload;
    },
    setsidemenu(state,action){
        state.sidemenu=action.payload;
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