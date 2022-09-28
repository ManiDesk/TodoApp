import React, { useState, useRef, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, where, Timestamp } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from './FireBase'
import TodoList from "./TodoList";
import Loader from "./Loader";
import TaskModal from "./TaskModal";
import { useDispatch, useSelector } from "react-redux";
function CenterMainContent() {
  const [user, loading, error] = useAuthState(auth);
  const [modalOpen, setmodalOpen] = useState(false);
  const [loadingsp, setLoadingsp] = useState(false);
  const [cardlistsP, setcardlistP] = useState([]);
  const [cardlistsC, setcardlistC] = useState([]);
  const [pendingCount, setpendingCount] = useState(0);
  const [completedCount, setcompletedCount] = useState(0);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const mani = useSelector((state) => {
    return state.tasks;
  });
  console.log(mani)
  //const [taskErr, settaskErr] = useState(Errormessage);

  //const [tasks, setTasks] = useState([])

  // firebase
  useEffect(() => {
    fetchtodoListpending()
    fetchtodoListCompleted()
  }, [user, loading])

  const fetchtodoListpending = () => {

    try {

      if (user) {
        const taskColRef = query(collection(db, 'nirtodoapp' + user.uid), where("taskcompleted", "==", false))

        onSnapshot(taskColRef, (snapshot) => {
          setpendingCount(snapshot.docs.length)

          setcardlistP(snapshot.docs.map(doc => ({

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
  const fetchtodoListCompleted = async () => {

    if (user) {
      const taskColRef = query(collection(db, 'nirtodoapp' + user.uid), where("taskcompleted", "==", true))

      onSnapshot(taskColRef, (snapshot) => {
        setcompletedCount(snapshot.docs.length)

        setcardlistC(snapshot.docs.map(doc => ({

          id: doc.id,
          data: doc.data()
        }))
        )

      })
    }
    else {
      console.log('user is not signed in to retrive username')
    }



  }
  const modalopen = () => {

    setmodalOpen(true);

  }



  const modalClose = () => {
    //settaskErr([Errormessage.taskErrMessage = '', Errormessage.teskCommetsErrMessage = '']);
    setmodalOpen(false);
  }
  return (
    <React.Fragment>
      <div className="nir-main-content">
        <div className="nir-main-header">
          <h4><i className="far fa-lightbulb-on"></i> My Day</h4>
        </div>
        <div className="nir-main-add-task mt-3">
          {/* Start To box */}
          <div className="nir-main-add-task-item ">
            <div className="row">
              <div className="col-lg-4 col-md-12 mx-auto col-12 col-sm-12">
                <div className="card nir-main-add-task-item-add" data-toggle='modal' data-target="#myModal" onClick={modalopen}>
                  <div className="card-body">
                    <h4 className="card-title"><i className="far fa-plus"></i>Add Task</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End To box */}
          <div className="nir-main-add-task-item-list-box  mt-3">
            <div className="nir-main-add-task-item-list  mb-3">

              <div id="accordion">

                {/* <!-- Nav pills --> */}
                <ul className="nav nav-tabs mb-3 " role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="pill" href="#pending">Pending <span className="badge badge-primary badge-pill">{pendingCount}</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#completed">Completed <span className="badge badge-success badge-pill">{completedCount}</span></a>
                  </li>

                </ul>

                {/* <!-- Tab panes --> */}
                <div className="tab-content">
                  <div id="pending" className="tab-pane active">
                    {cardlistsP == '' ?
                      <React.Fragment>
                        <p className="nir-nodata-found">No data found</p>
                      </React.Fragment>
                      :

                      <React.Fragment>
                        <div>

                          {loadingsp ? <Loader /> :
                            <div>
                              {

                                cardlistsP.map(
                                  cardlistp => (
                                    <TodoList key={cardlistp.id} taskid={cardlistp.id} taskimportant={cardlistp.data.taskimportant} taskcompleted={cardlistp.data.taskcompleted} taskname={cardlistp.data.taskname} tasktime={cardlistp.data.taskTime} taskdes={cardlistp.data.taskdes} />
                                  )
                                )}


                            </div>
                          }

                        </div>


                      </React.Fragment>



                    }
                  </div>
                  <div id="completed" className="tab-pane fade">
                    {cardlistsC == '' ? <React.Fragment>
                      <p className="nir-nodata-found">No data found</p>
                    </React.Fragment> :
                      <React.Fragment>

                        {

                          cardlistsC.map(
                            cardlistc => (
                              <TodoList key={cardlistc.id} taskimportant={cardlistc.data.taskimportant} taskid={cardlistc.id} taskcompleted={cardlistc.data.taskcompleted} taskname={cardlistc.data.taskname} tasktime={cardlistc.data.taskTime} taskdes={cardlistc.data.taskdes} />
                            )
                          )}
                      </React.Fragment>
                    } </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- The Modal --> */}

      {modalOpen && <TaskModal modalClose={modalClose} />}


    </React.Fragment>
  )
}
export default CenterMainContent;