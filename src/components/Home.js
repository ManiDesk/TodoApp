import React, { Fragment, useEffect, useState } from 'react'
import { auth} from "./FireBase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import CenterMainContent from './CenterMainContent';
import Header from './Header';
import LeftSideBox from './LeftSideBox';
import RightSideBox from './RightSideBox';
function Home(props) {
  const [user, loading, error] = useAuthState(auth);
  const[taskclass,setTaskclass] = useState(false);
  const[recentclass,setRecentclass] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

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
  return (
    <Fragment>
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

              <CenterMainContent />

            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-12 p-0 nir-box d-none d-lg-block d-md-block d-sm-block">
              <RightSideBox />
              <div></div>
              <div></div>
              <div></div>

            </div>
          </div>
        </div>

      </section>
    </Fragment>
  )
}

export default Home;