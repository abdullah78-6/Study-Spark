import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import { control } from '../../Redux/slice';
import {toast} from "react-hot-toast"
import axios from "axios"
import { ClipLoader } from "react-spinners";
const Addpyq = ({url}) => {
    const pyqdata=useSelector(state=>state.main.pyqdata);
    const pyqfile=useSelector(state=>state.main.pyqfile);
    const pyqloading=useSelector(state=>state.main.pyqloading);
    const backendemail2=useSelector(state=>state.main.backendemail2);    
    const disaptch=useDispatch();
    const Onchangehandler=(e)=>{
    disaptch(control.setpyqdata({
        name:e.target.name,
        value:e.target.value
    }))
}
const Addpyqs=async(e)=>{
    e.preventDefault();
    if(!pyqfile){
        toast.error("Plese select a pyq");
        return 
    }
    if(!backendemail2){
        toast.error("Teacher Login Required");
        return ;
    }
    disaptch(control.setpyqloading(true));
    const formdata=new FormData();
    formdata.append("authorname",pyqdata.authorname);
    formdata.append("pyq_file",pyqfile);
    formdata.append("subject",pyqdata.subject);
    formdata.append("collegename",pyqdata.collegename);
    formdata.append("status",pyqdata.status);
    formdata.append("price",pyqdata.price);
    try {
        const res=await axios.post(url+"/api/pyq/add_pyq",formdata,{
            
         withCredentials:true
            
            
        })
        if(res.data.status){
            disaptch(control.setpyqloading(false));
            toast.success(res.data.message);
        }
        else{
            disaptch(control.setpyqloading(false));
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log("add pyqs error",error);
        disaptch(control.setpyqloading(false));
        
    }

}

  return (
    <div>
      {pyqloading&&<ClipLoader/>}
              <form onSubmit={Addpyqs}>
                  <div>
                      <div>
                          <label htmlFor='name'>Teacher name</label>
                      </div>
                      <div>
                          <input onChange={Onchangehandler} value={pyqdata.authorname} name="authorname" id="name" type="text"placeholder='teacher name' required/>
                      </div>
                  </div>
                  <label htmlFor='Notes pdf'>
                      <input onChange={(e)=>disaptch(control.setpyqfile(e.target.files[0]))} type="file" accept='application/pdf,image/'required />
                  </label>
                  <label htmlFor="subject">subject</label>
                  <input name="subject" onChange={Onchangehandler} value={pyqdata.subject} id="subject" type="text"placeholder='subject' required/>
                  <label htmlFor="collegename">collegename</label>
                  <input name="collegename" onChange={Onchangehandler} value={pyqdata.collegename} id="collegename" type="text"placeholder='college name' required/>
                  <label htmlFor='price'>price</label>
                  <input name="price" onChange={Onchangehandler} value={pyqdata.price} type="number" placeholder='₹ amount'/>
                  <h1>Status</h1>
                  <select onChange={Onchangehandler} value={pyqdata.status} name="status">
                      <option value="paid">Paid</option>
                      <option value="free">Free</option>
                  </select>
                  <button>Add notes</button>
      
              </form>
    </div>
  )
}

export default Addpyq
