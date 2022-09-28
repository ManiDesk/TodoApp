import React, { useState,useRef } from "react";
import {updateDoc,doc,Timestamp} from "firebase/firestore"
import { toast } from 'react-toastify';
import { useAuthState } from "react-firebase-hooks/auth";
import {db,auth} from './FireBase'
import SuceessMessage from "./auth/SuccessMessage";
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
const Errormessage = { 
  taskErrMessage: '',
  tasktimedateErrMessage: '',
  teskCommetsErrMessage: '',

}
function EdidTaskModal({editid,edittasktitle,edittaskdesk,edittasktime,edittaskdate,modalClose}) {
  const [user, loading, error] = useAuthState(auth);
    // const [modalopensts,setmodalopensts] = useState(modalStatus)
const[etaskid] = useState(editid)
  //const [modalOpen, setmodalopen] = useState(setmodalopen);
  const [tname, setTname] = useState(edittasktitle);
  const [tdes, settdes] = useState(edittaskdesk);
  const [tTime, settTime] = useState(edittasktime);
  const [tdate, settdate] = useState(edittaskdate);
  const inputref = useRef();
const [taskErr, settaskErr] = useState(Errormessage);
//const [modalEventclose, setmodalEventsubmit] = useState(false);
const [errMsg, seterrMsg] = useState({
  errsts : false,
  errmesgname : ''
});
const [successMsg, setsuccessMsg] = useState({
  success_sts : false,
  successgname : ''
});
 
  const handleUpdate = async (e) => {
    e.preventDefault()
    
   
    if ((tname == '' || tname == undefined && tdes == '' || tdes == undefined)) {
      toast("Please fill the all details");
      settaskErr([
        Errormessage.taskErrMessage = 'Please Ender the name',
        // Errormessage.tasktimedateErrMessage = 'Please Ender the date time',
        Errormessage.teskCommetsErrMessage = 'Please Ender the comments',
      ])
     
    }
    else {
    
      
      settaskErr([Errormessage.taskErrMessage = '',
      Errormessage.teskCommetsErrMessage = '']);
      try {
        
        if(user){
          const taskDocRef = doc(db, 'nirtodoapp' + user.uid, editid) 
          updateDoc(taskDocRef , {
            taskname: tname,
            taskdes: tdes,
            taskcompleted: false,
            createdat: Timestamp.now() ,
            taskTime : tTime
          }).then(
            toast.success(tname + ' - ' + "Successfully Updated"),
            setsuccessMsg({
              success_sts : true,
              successgname : tname + ' ' +  'Successfully updated' }),
              setTimeout(()=>{
              
            modalClose()
         },1500)


          ).catch(err=>alert(err.message))
        }
        else{
          console.log('user is not signed in to add todo to database');
        }
    
      

           
                //onClose()
      } catch (err) {
        alert(err)
      }


    }

  }
 
 
  return (
    <React.Fragment>
      <div className="modal fade" id={`modal${etaskid}`} data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
          {/* <SuceessMessage successmsg= {successMsg.success_sts} successmsgname= {successMsg.successgname} failuremsg = {errMsg.errsts} failuremsgName = {errMsg.errmesgname}  /> */}
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Your task</h4>
              <button type="button" className="close" onClick={modalClose} data-dismiss="modal">&times;</button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label >Task Name</label>
                  <input ref={inputref} type="text" className="form-control" id="tname" name="tname" value={tname} onChange={(e) => setTname(e.target.value)} />
                  <p className="err-msg">{Errormessage.taskErrMessage}</p>
                </div>
                <div className="form-group w-100">
                  
                  <div className="d-flex gap-3"> 
                  <div ><label >Task date</label>  <Calendar className = "w-100" id="icon" value={tTime} onChange={(e) => settTime(e.target.value)} showIcon  showButtonBar  /></div> 
                     <div><label >Task time</label> <Calendar className = "w-100 " id="icon" value={tdate} onChange={(e) => settdate(e.target.value)} showIcon icon="pi pi-calendar-times"  timeOnly hourFormat="12"  /></div>
                  
                  </div>
                    {/* <input type="datetime-local" className="form-control" id="usr" value={tTime} onChange={(e) => settTime(e.target.value)} /> */}
  
                  </div>
                <div className="form-group">
                  <label >Description</label>
                  <textarea className="form-control" value={tdes} onChange={(e) => settdes(e.target.value)} rows="5" id="comment"></textarea>
                  <p className="err-msg">{Errormessage.teskCommetsErrMessage}</p>
                </div>
              
          
              </form>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary"   onClick={handleUpdate}>Update</button>
              <button type="button" className="btn btn-light"  onClick={modalClose} data-dismiss="modal">Cancel</button>
          
            </div>

          </div>
        </div>
      </div>

    </React.Fragment>
  )
}
export default EdidTaskModal;