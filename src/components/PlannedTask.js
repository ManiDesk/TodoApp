import React, { useState, useRef, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, where, Timestamp } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from './FireBase'
import Header from './Header';
import LeftSideBox from './LeftSideBox';
import RightSideBox from './RightSideBox';
import TodoList from "./TodoList";
import Loader from "./Loader";
function PlannedTask() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [importanttaskP, setImportantTaskP] = useState([]);
    // const [importanttaskC, setImportantTaskC] = useState([]);
    // const [loadingsp, setLoadingsp] = useState(false);
    const [pendingCount, setpendingCount] = useState(0);
    // const [completedCount, setcompletedCount] = useState(0);
    const[taskclass,setTaskclass] = useState(false);
    const[recentclass,setRecentclass] = useState(false);
    
  const taskmenu = () =>{
    setTaskclass(!taskclass)
    setRecentclass(false)
  }
  const recent = () =>{
    setRecentclass(!recentclass)
    setTaskclass(false)
  }
  const hidestskrecent =()=>{
    setTaskclass(false)
    setRecentclass(false)
  }
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchImportantTaskP()
        // fetchImportantTaskC()
    }, [user, loading]);
    const fetchImportantTaskP = () => {
        try {
            if (user) {
                const taskColRef = query(collection(db, 'nirtodoapp' + user.uid), where("taskTime", "!=", ""), orderBy("taskTime", "asc"))
                onSnapshot(taskColRef, (snapshot) => {
                    setpendingCount(snapshot.docs.length)

                    setImportantTaskP(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                    )

                })
            }
            else {
                console.log('user is not signed in to retrive username')
            }

        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }

    }

    return (
        <React.Fragment>
            <Header />
            <section className='bodyPadmain'>
                <div className="container-fluid">
                    <div className="row">
                         <div className='mobile-view d-flex d-lg-none d-md-none d-sm-none'>
          <div className={`nir-box nir-task-panel   ${taskclass ? 'd-block' : 'd-none'}`}>
             
             <LeftSideBox hidestskrecent = {hidestskrecent} />
           </div>
           <div className={`nir-box nir-task-panel  ${recentclass ? 'd-block' : 'd-none'}`}>
              <RightSideBox hidestskrecent = {hidestskrecent} />
            </div>
          </div>
          <div className="col-lg-12  col-12 p-0 d-flex d-lg-none d-md-none d-sm-none">
          <div className='d-flex w-100 nir-bottom'>            
          <button type="submit" className="btn btn-primary w-100" onClick={taskmenu} ><div><i className="fal fa-window-alt"></i></div> Task Menu </button>
          <button type="submit" className="btn btn-info w-100"  onClick={recent}><div><i className="fal fa-hand-receiving"></i></div> Recent </button>
           
          </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-12 p-0 nir-box d-none d-lg-block d-md-block d-sm-block">
             
             <LeftSideBox />
           </div>
                        <div className="col-lg-8 col-md-6 col-sm-6 col-12">
                            <div className="nir-main-content">
                                <div className="nir-main-header">
                                    <h4><i className="far fa-lightbulb-on"></i> Planned Task</h4>
                                </div>
                                <div className="nir-main-add-task mt-3">

                                    <div className="nir-main-add-task-item-list-box  mt-3">
                                        <div className="nir-main-add-task-item-list  mb-3">
                                            <div id="accordion">
                                                {/* <!-- Nav pills --> */}
                                                <ul className="nav nav-tabs mb-3 " role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" data-toggle="pill" href="#important">Planned Task <span className="badge badge-primary badge-pill">{pendingCount}</span></a>
                                                    </li>


                                                </ul>

                                                {/* <!-- Tab panes --> */}
                                                <div className="tab-content">
                                                    <div id="important" className="tab-pane active">
                                                        {importanttaskP == '' ? <React.Fragment>
                                                            <p className="nir-nodata-found">No data found</p>
                                                        </React.Fragment> :
                                                            <React.Fragment>

                                                                {

                                                                    importanttaskP.map(
                                                                        cardlistp => (
                                                                            <TodoList key={cardlistp.id} taskid={cardlistp.id} taskimportant={cardlistp.data.taskimportant} taskcompleted={cardlistp.data.taskcompleted} taskname={cardlistp.data.taskname} tasktime={cardlistp.data.taskTime} taskdes={cardlistp.data.taskdes} />
                                                                        )
                                                                    )}
                                                            </React.Fragment>
                                                        }

                                                    </div>


                                                </div>


                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-3 col-12 p-0 nir-box d-none d-lg-block d-md-block d-sm-block">
                  <RightSideBox />

                        </div>
                    </div>
                </div>

            </section>
        </React.Fragment>
    )
}
export default PlannedTask;