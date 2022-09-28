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
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <Fragment>
      <Header />
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-3 col-12 p-0 nir-box">
              <LeftSideBox />
            </div>
            <div className="col-lg-8 col-md-6 col-sm-6 col-12">

              <CenterMainContent />

            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-12 p-0 nir-box">
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