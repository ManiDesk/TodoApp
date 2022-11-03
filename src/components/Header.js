import React ,{Fragment ,useEffect, useState} from 'react'
import { auth, db, logout } from "./FireBase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import logo from '../to-do-list.png';
import userimage from '../user.png';

function Header(){

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [phone, setphone] = useState("");
    const navigate = useNavigate();
  
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setphone(data.phone);
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
  
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
  
      fetchUserName();
    }, [user, loading]);
return(
    <React.Fragment>
      <header>
      <nav className=" navbar-expand-md navbar-light p-1  fixed-top  nav-bg-primary bg-white  nir-header">
      <div className="container-fluid d-flex align-items-center px-3">
        <a className="navbar-brand" href="{/}"> <img src={logo} width="32" height="32" alt="logo" /> To do</a>
                       
        
         <ul className='nir-ul-item ml-auto'>
         <li className="nav-item navbar-dropdown dropdown-user dropdown">
        <a className="nav-link dropdown-toggle  hide-arrow px-0" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 mr-0">
                    <div className="avatar avatar-online">
                <img src={userimage} alt="" className="w-px-40 h-auto rounded-circle" />
              </div>
                    </div>
                    
                  </div>
        </a>
        <div className="dropdown-menu p-0" aria-labelledby="navbarDropdownMenuLink">
          
          <li>
                <a className="dropdown-item py-2" href="#">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 mr-3">
                      <div className="avatar avatar-online w-30px h-30px">
                        <img src={userimage} alt="user" className="w-px-40 h-auto rounded-circle" />
                      </div>
                    </div>
                    <div className="flex-grow-1 line-height-18">
                      <span className="fw-bold-600 d-block">{name}</span>
                      <small className="text-muted fs-13">Project Manager</small>
                    </div>
                  </div>
                </a>
              </li>
              <li className="py-1">
                <a className="dropdown-item  drop-item-inner pe-none" href="#">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 mr-3">
                      <span className="drop-min-width"><i className="far fa-envelope"></i></span>
                    </div>
                    <div className="flex-grow-1">
                      <span className="align-middle">{user?.email}</span>
                    </div>
                  </div>


                </a>
                <a className="dropdown-item  drop-item-inner pe-none" href="#">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 mr-3">
                      <span className="drop-min-width"><i className="far fa-mobile"></i></span>
                    </div>
                    <div className="flex-grow-1">
                      <span className="align-middle">{phone}</span>
                    </div>
                  </div>


                </a>
              </li>

              <li >
                <a className="dropdown-item border-top py-2" href="#"  onClick={logout}>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 mr-3">
                      <span className="drop-min-width"><i className="far fa-sign-out-alt"></i></span>
                    </div>
                    <div className="flex-grow-1">
                      <span className="align-middle">Log Out</span>
                    </div>
                  </div>


                </a>
              </li>

 
         
        </div>
      </li>   
         </ul>
       
        </div>
        
    </nav>
    </header>
    </React.Fragment>
)
}
export default Header;