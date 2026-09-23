import {configureStore} from "@reduxjs/toolkit"
import learn from "./slice.js";
const Learnstore=configureStore({
    reducer:{
    main:learn
    }
})
export default Learnstore;