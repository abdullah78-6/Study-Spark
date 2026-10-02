import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import { control } from '../../Redux/slice';
import {toast} from "react-hot-toast"
import axios from "axios"
import { ClipLoader } from "react-spinners";
const Addnotes = ({url}) => {
const disaptch=useDispatch();
const backendemail2=useSelector(state=>state.main.backendemail2);    
const Notesdata=useSelector(state=>state.main.Notesdata);
const notesfile=useSelector(state=>state.main.notesfile);
const notesloading=useSelector(state=>state.main.notesloading);
const Onchangehandler=(e)=>{
    disaptch(control.setNotesdata({
        name:e.target.name,
        value:e.target.value
    }))
}
const Addnotes=async(e)=>{
    e.preventDefault();
    if(!notesfile){
        toast.error("Plese select a notes");
        return 
    }
    if(!backendemail2){
        toast.error("Teacher Login Required");
        return ;
    }
    disaptch(control.setnotesloading(true));
    const formdata=new FormData();
    formdata.append("authorname",Notesdata.authorname);
    formdata.append("notes_file",notesfile);
    formdata.append("subject",Notesdata.subject);
    formdata.append("status",Notesdata.status);
    formdata.append("price",Notesdata.price);
    try {
        const res=await axios.post(url+"/api/notes/add_notes",formdata,{
            
         withCredentials:true
            
            
        })
        if(res.data.status){
            disaptch(control.setnotesloading(false));
            toast.success(res.data.message);
        }
        else{
            disaptch(control.setnotesloading(false));
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log("add notes error",error);
        disaptch(control.setnotesloading(false));
        
    }

}
  return (
    <div>
        {notesloading&&<ClipLoader/>}
        <form onSubmit={Addnotes}>
            <div>
                <div>
                    <label htmlFor='name'>Author name</label>
                </div>
                <div>
                    <input onChange={Onchangehandler} value={Notesdata.authorname} name="authorname" id="name" type="text"placeholder='Notes name' required/>
                </div>
            </div>
            <label htmlFor='Notes pdf'>
                <input onChange={(e)=>disaptch(control.setnotesfile(e.target.files[0]))} type="file" accept='application/pdf,image/'required />
            </label>
            <label htmlFor="subject">Notes subject</label>
            <input name="subject" onChange={Onchangehandler} value={Notesdata.subject} id="subject" type="text"placeholder='Notes subject' required/>
            <label htmlFor='price'>Notes price</label>
            <input name="price" onChange={Onchangehandler} value={Notesdata.price} type="number" placeholder='₹ amount'/>
            <select onChange={Onchangehandler} value={Notesdata.status} name="status">
                <option value="paid">Paid</option>
                <option value="free">Free</option>
            </select>
            <button>Add notes</button>

        </form>
 
    </div>
  )
}

export default Addnotes
