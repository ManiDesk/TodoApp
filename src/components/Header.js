import React ,{Fragment ,useEffect, useState} from 'react'
import { auth, db, logout } from "./FireBase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import logo from '../to-do-list.png';

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
      <nav className="navbar navbar-expand-md bg-white navbar-light justify-content-space-between nir-header">
        <a className="navbar-brand" href="{/}"> <img src={logo} width="32" height="32" alt="logo" /> To do</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="{someValidPath}"><i className="far fa-lightbulb-on"></i> My Day</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="{someValidPath}"><i className="far fa-star"></i> Important</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="{someValidPath}"><i className="far fa-window-alt"></i> Planned</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="{someValidPath}"><i className="far fa-user"></i> Assigned to me</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="{someValidPath}"><i className="far fa-home-alt"></i> Tasks</a>
                </li>
            </ul>
           
            <form className="form-inline my-2 my-lg-0 mr-3">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search" />
                    <div className="input-group-append"><button className="btn btn-primary" type="submit">Go</button></div>
                </div>
            </form>
         
            <div className="btn-group dropdown nir-dropdown">
    <button type="button" className="btn btn-primary">{name}</button>
    <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
    </button>
    <div className="dropdown-menu">
      <div className="dropdown-item" >{user?.email}</div>
      <div className="dropdown-item" >{phone}</div>
      <div className="dropdown-divider"></div>
      <div className="dropdown-item"  onClick={logout}>Log out</div>
    </div>
  </div>
         
        </div>
        
    </nav>
    </React.Fragment>
)
}
export default Header;