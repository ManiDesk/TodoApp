import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../FireBase";
import { useAuthState } from "react-firebase-hooks/auth";
import Signinimage from '../../images/signin.png'
import SuceessMessage from "./SuccessMessage";
import { toast } from 'react-toastify';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [eyepass, seteyepass] = useState(false)
  const [errMsg, seterrMsg] = useState({
    errsts: false,
    errmesgname: ''
  });
  const [successMsg, setsuccessMsg] = useState({
    success_sts: false,
    successgname: ''
  });
  const navigate = useNavigate();
  const signInClick = (event) => {
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
        var loginPart = await logInWithEmailAndPassword(email, password)
        if (loginPart.status == 'error') {
          //alert(loginPart.message)
          seterrMsg({
            errsts: true,
            errmesgname: loginPart.message
            
          })
          
          toast.error(loginPart.message);
        }
        if (loginPart.status == 'success') {
          //alert(loginPart.message)
          setsuccessMsg({
            success_sts: true,
            successgname: loginPart.message
          })
          toast.success(loginPart.message);
        }



      }
      form.classList.add('was-validated');



      // }, false);
    });


    //registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {

    if (loading) {

      // maybe trigger a loading screen
      return;
    }
    setTimeout(() => {
      if (user) navigate("/home");
    }, 1000);
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
            <div className="col-md-6  p-0 vh-100 " >
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
                {/* <SuceessMessage successmsg={successMsg.success_sts} successmsgname={successMsg.successgname} failuremsg={errMsg.errsts} failuremsgName={errMsg.errmesgname} /> */}
                <div className="nir-sign-title">
                  <h4>Login</h4>
                  <p>See your task at daily basis </p>
                </div>
                <div className="nir-sign-form">

                  <form action="" className="needs-validation" noValidate>
                    <div className="form-group">
                      <label htmlFor="uname">Username:</label>
                      <input type="email" className="form-control" id="uname" placeholder="Enter username" name="uname" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
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
                    <div className="form-group form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Check this checkbox to continue.</div>
                      </label>
                      <label className="float-right "><Link to="/reset" className="nir-black">Forgot Password ?</Link></label>
                    </div>
                    <button type="submit" className="btn btn-primary nir-min-w-100p" onClick={signInClick}>Submit</button>
                    <button className="ml-3 btn btn-outline-primary" onClick={signInWithGoogle}>
                      Login with Google
                    </button>
                  </form>


                </div>
                <div className="nir-sign-footer py-4">
                  <h6>Not Registered yet ? <Link to="/signup" className="text-color-primary">Create an account</Link></h6>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </React.Fragment>
  )
}
