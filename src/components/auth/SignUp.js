import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Signinimage from '../../images/signin.png';
import { toast } from 'react-toastify';
import * as userActions from "../store/action/action";

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../FireBase';
import SuceessMessage from "./SuccessMessage";
//import { collection, addDoc, Timestamp } from "firebase/firestore"
///import { db } from '../FireBase'
//import SuceessMessage from "./SuccessMessage";

export default React.memo(function SignUp() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [eyepass, seteyepass] = useState(false)
  const [errMsg, seterrMsg] = useState({
    errsts: false,
    errmesgname: ''
  });
  const [successMsg, setsuccessMsg] = useState({
    success_sts: false,
    successgname: ''
  });
  const register = (event) => {
    event.preventDefault();
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, async function (form) {
      //form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        toast("Please fill the all details");

      }
      else {
   
        var registerpart = await registerWithEmailAndPassword(name, email, password, phone ? phone : '');
      
        if (registerpart.status == 'error') {
          //alert(registerpart.message)
          seterrMsg({
            errsts: true,
            errmesgname: registerpart.message
          })
          toast.error(registerpart.message);
        }
        if (registerpart.status == 'success') {
          // alert(registerpart.message)
          setsuccessMsg({
            success_sts: true,
            successgname: registerpart.message
          })
          toast.success(registerpart.message);
        }
      }
      form.classList.add('was-validated');



      // }, false);
    });

  };

  useEffect(() => {
    if (loading) return;
    setTimeout(() => {
      if (user) navigate("/home");
    }, 1000);
    //if (user) navigate("/dashboard");
  }, [user, loading]);
  const handlepasswordshow = (e) => {
    e.preventDefault()
    seteyepass(!eyepass)

  }
  return (
    <React.Fragment>
      <section className="nir-auth-section">

        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-md-6  p-0 vh-100">
              <div className="nir-sign-left d-flex align-items-center justify-content-center">
                <img src={Signinimage} alt="" width="100%" />
                {/* Animation  */}
                <ul className="animate">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6  bg-white p-lg-5 p-md-4 p-md-3 p-2 vh-100  align-items-center d-flex justify-content-center">
              <div className="nir-sign-right w-100 px-4">
                <SuceessMessage successmsg={successMsg.success_sts} successmsgname={successMsg.successgname} failuremsg={errMsg.errsts} failuremsgName={errMsg.errmesgname} />
                <div className="nir-sign-title">
                  <h4>Register</h4>
                  <p>See your task at daily basis</p>
                </div>
                <div className="nir-sign-form">

                  <form action="" className="needs-validation" noValidate >
                    <div className="form-group">
                      <label htmlFor="uname">Name:</label>
                      <input type="text" className="form-control" id="uname" placeholder="Enter your name" name="uname" required value={name}
                        onChange={(e) => setName(e.target.value)} />
                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="uname">Email:</label>
                      <input type="email" className="form-control" id="uemail" placeholder="Enter your email" name="uemail" required value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="uname">Phone:</label>
                      <input type="text" className="form-control" id="uphone" placeholder="Enter your phone" name="uphone" required value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="pwd">Password:</label>
                      <div className="input-group mb-3">
                        <input type={eyepass ? 'text' : 'password'} className="form-control" id="pwd" placeholder="Enter password" name="pswd" required value={password}
                          onChange={(e) => setPassword(e.target.value)} />
                        <div className="input-group-append">
                          <button className="btn btn-light shadow-none" type="submit" onClick={handlepasswordshow}><i className={`far ${eyepass ? 'fa-eye' : 'fa-eye-slash'}`}></i></button>
                        </div>
                      </div>


                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">Please fill out this field.</div>
                    </div>


                    <button type="submit" className="btn btn-primary nir-min-w-100p" onClick={register}  >Submit </button>
                    <button
                      className="ml-3 btn btn-outline-primary"
                      onClick={signInWithGoogle}
                    >
                      Register with Google
                    </button>
                  </form>

                </div>

                <div className="nir-sign-footer py-4">
                  <h6>Already have an account ? <Link to="/" className="text-color-primary">Login</Link> </h6>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </React.Fragment>
  )
}
)