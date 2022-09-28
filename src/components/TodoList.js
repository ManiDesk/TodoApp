import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from './FireBase'
import EdidTaskModal from "./EditTaskModal";
import DeleteModal from "./DeleteModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from "react-redux";
// import * as importantTaskaction from '../components/store/action/action'
function TodoList(props) {
  const [modalopensts, setmodalopensts] = useState(false)
  const [delmodalopensts, setdelmodalopensts] = useState(false)
  const [checked, setChecked] = useState(props.taskcompleted)
  const [user, loading, error] = useAuthState(auth);
  const [important, setimportant] = useState(props.taskimportant)
  // const [checked, setChecked] = useState(completed)
  //const state = useSelector((state) => state);
  //console.log(state, "startreducer");
  // const dispatch = useDispatch();
  /* function to update firestore */
  const handleChangecheckbox = async () => {

    if (user) {
      const taskDocRef = doc(db, 'nirtodoapp' + user.uid, props.taskid)
      try {
        updateDoc(taskDocRef, {
          taskcompleted: checked

        })

        checked ? toast.success("This task was moved to Completed") : toast.error("This task was moved to Pending")
      } catch (err) {
        alert(err)
      }
    }
    else {
      console.log('user is not signed in to retrive username')
    }




  }

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    auth.onAuthStateChanged(user => {

      if (user) {

        const taskDocRef = doc(db, 'nirtodoapp' + user.uid, props.taskid)
        try {
          toast.success("Successfully deleted");
          deleteDoc(taskDocRef)
          setTimeout(() => {
            modalClose()
          }, 500)
        } catch (err) {
          alert(err)
        }
      }
      else {
        console.log('user is not signed in to retrive username')
      }
    })

  }

  const onhandliEdit = () => {
    //alert()
    setmodalopensts(true)
  }
  const onhandlidelete = () => {
    //alert()
    setdelmodalopensts(true)
  }
  const modalClose = () => {
    //settaskErr([Errormessage.taskErrMessage = '', Errormessage.teskCommetsErrMessage = '']);
    setmodalopensts(false);
    setdelmodalopensts(false)

  }
  //   const addfavor = (data) => {


  //     if (state.favItem.some((fav) => fav.id === data.id)) {
  //         deletefav1(data.id);
  //         return;
  //     }
  //     console.log((state.favItem.some((fav) => fav.id === data.id)))
  //     console.log(data);
  //     dispatch(addtofavitem(data));


  // }
   
  const addtoimportance = () => {
    

   
    //setimportant(!important)
    if (user) {
      const taskdocimportant = doc(db, 'nirtodoapp' + user.uid, props.taskid);
      try {
        updateDoc(taskdocimportant, {
          taskimportant: !important

        })
        // dispatch(importantTaskaction.addtoimportance(!important));
        setimportant(!important)
        important ? toast.error('Removed Importance') : toast.success('Marked as important')
      } catch (err) {
        alert(err)
      }
     
    }
  }
 
  return (
    <React.Fragment>

      <div className={`card task mb-3 ${checked ? 'task--completed' : 'task--pending'}`} >
        <div className="card-header bg-white d-flex py-4">
          <div className="custom-control custom-checkbox ">

            <input type="checkbox" className="custom-control-input"
              checked={checked}
              onChange={handleChangecheckbox}
              id={`checkbox${props.taskid}`} name="example1" />
            <label className="custom-control-label" htmlFor={`checkbox${props.taskid}`} onClick={() => setChecked(!checked)}></label>
          </div>

          <a className="w-100  card-link d-flex align-items-center justify-content-between flex-lg-fill" data-toggle="collapse" href={`#collapseid${props.taskid}`}>
            <div className="nir-card-title">
              {props.taskname}</div>
            <div className="nir-card-icon">{props.taskdate} <span className="nir-card-time">{props.tasktime}  </span>
              <i className="far fa-chevron-down"></i>
            </div>
          </a>
          {checked ? null :  <div className="ml-2" onClick={addtoimportance}>{important ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}</div>}
        </div>

        <div id={`collapseid${props.taskid}`} className="collapse" data-parent="#accordion">
          <div className="card-body">
            {props.taskdes}


          </div>
          <div className="card-footer text-right">
            {checked ? null : <button type="button" className="btn btn-primary btn-sm" data-toggle='modal' data-target={`#modal${props.taskid}`} onClick={onhandliEdit}>Edit</button>}
            <button type="button" className="btn btn-danger btn-sm" data-toggle='modal' data-target={`#modal${props.taskid}`} onClick={onhandlidelete}>Delete</button>
          </div>

        </div>

      </div>
      {modalopensts && <EdidTaskModal modalClose={modalClose} editid={props.taskid} edittasktitle={props.taskname} edittaskdesk={props.taskdes} edittasktime={props.tasktime}  edittaskdate={props.taskdate} />}
      {delmodalopensts && <DeleteModal modalClose={modalClose} modalDelete={handleDelete} delid={props.taskid} deltaskname={props.taskname} deltaskdesk={props.taskdes} deltasktime={props.tasktime} deltaskdate={props.taskdate} />}
    </React.Fragment>
  )
}
export default React.memo(TodoList);