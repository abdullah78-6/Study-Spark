import React, { useEffect } from 'react'
import axios from "axios"
import {toast} from "react-hot-toast"
import {useSelector,useDispatch} from "react-redux"
import { control } from '../Redux/slice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Mylearning = ({url}) => {
    const Backendemail=useSelector(state=>state.main.backendemail);
  return (
    <div>
        <Navbar url={url}/>
        Here The Course Purchase By The Student Will 
        Appeaer Here
        <button>Go to the course detail page </button>
        <button>go to check purchase notes </button>
        <button>go to check purchase pyq</button>
        <Footer url={url}/>
    </div>
  )
}

export default Mylearning
