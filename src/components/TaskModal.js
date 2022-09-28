import React, { useState, useRef } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from './FireBase'
// import SuceessMessage from "./auth/SuccessMessage";
import { toast } from 'react-toastify';
//Date picker npm
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
function TaskModal({ modalClose }) {


  const [user, loading, error] = useAuthState(auth);
  // const [modalOpen, setmodalOpen] = useState(false);
  const [tname, setTname] = useState('');  
  const [tdes, settdes] = useState('');
  const [tTime, settTime] = useState('');
  const [tdate, settdate] = useState('');
  const inputref = useRef();
  const [taskErr, settaskErr] = useState(Errormessage);
  const [errMsg, seterrMsg] = useState({
    errsts: false,
    errmesgname: ''
  });



  const handleSubmit = async (e) => {
  
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
      

        if (user) {
          addDoc(collection(db, "nirtodoapp" + user.uid), {
            userid: user.uid,
            taskname: tname,
            taskdes: tdes,
            taskcompleted: false,
            taskimportant: false,
            createdat: Timestamp.now(),
           // taskTime: tTime.toString(),
          //taskDate : tdate.toString(),
          taskTime: new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(tTime),
          //taskDate : tdate.toString(),
          taskDate :   new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(tdate)
        }).then(         
              // console.log({
              //   userid: user.uid,
              //   taskname: tname,
              //   taskdes: tdes,
              //   taskcompleted: false,
              //   taskimportant: false,
              //   createdat: Timestamp.now(),
              //   taskTime: new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(tTime),
              //   //taskDate : tdate.toString(),
              //   taskDate :   new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(tdate)
              // }),
            toast.success(tname + ' - ' + "Successfully Added"),
            setTimeout(() => {

              modalClose()
            }, 1500)
          ).catch(err => alert(err.message))
        }
        else {
          console.log('user is not signed in to add todo to database');
        }


      } catch (err) {
        alert(err)
      }


    }

  }



  return (
    <React.Fragment>
      <div className="modal fade" id="myModal" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* <SuceessMessage successmsg= {successMsg.success_sts} successmsgname= {successMsg.successgname} failuremsg = {errMsg.errsts} failuremsgName = {errMsg.errmesgname}  /> */}
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Add Your task</h4>
              <button type="button" className="close" onClick={modalClose} data-dismiss="modal">&times;</button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <form >
                <div className="form-group">
                  <label >Task Name</label>
                  <input ref={inputref} type="text" className="form-control" id="tname" name="tname" value={tname} onChange={(e) => setTname(e.target.value)} />
                  <p className="err-msg">{Errormessage.taskErrMessage}</p>
                </div>
                <div className="form-group w-100">
                  
                <div className="d-flex gap-3"> 
                <div ><label >Task date</label>  <Calendar className = "w-100" id="icon" value={tdate} onChange={(e) => settdate(e.target.value)} showIcon  showButtonBar  /></div> 
                   <div><label >Task time</label> <Calendar className = "w-100 " id="icon" value={tTime} onChange={(e) => settTime(e.target.value)} showIcon icon="pi pi-calendar-times"  timeOnly hourFormat="12"  /></div>
                
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
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
              <button type="button" className="btn btn-light" onClick={modalClose} data-dismiss="modal">Cancel</button>

            </div>

          </div>
        </div>
      </div>

    </React.Fragment>
  )
}
export default TaskModal;