import React, { useEffect, useState } from "react";
import Signinimage from '../../images/signin.png'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../FireBase";
import SuceessMessage from "./SuccessMessage";
export default React.memo(function Reset() {
  const [email, setEmail] = useState("");
 
  const [user, loading, error] = useAuthState(auth);
  const [errMsg, seterrMsg] = useState({
    errsts : false,
    errmesgname : ''
  });
  const [successMsg, setsuccessMsg] = useState({
    success_sts : false,
    successgname : ''
  });
  const navigate = useNavigate();
  const resetClick = (event) => {
    event.preventDefault();
      // Get the forms we want to add validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, async function(form) {
        //form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
           
          }         
          else{
          var resetpart = await sendPasswordReset(email)
          if(resetpart.status =='error' ){
            //alert(loginPart.message)
            seterrMsg({
              errsts: true,
              errmesgname : resetpart.message})
          }
          if(resetpart.status =='success' ){
           
            //alert(loginPart.message)
            setsuccessMsg({
              success_sts : true,
              successgname : resetpart.message})

              setTimeout(() => {
                alert('Go to login page')
                navigate("/")
              }, 1000);
          }
         
        
           
          }
            form.classList.add('was-validated');
            
           
         
       // }, false);
      });     
    
   
    //registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

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
              <SuceessMessage successmsg= {successMsg.success_sts} successmsgname= {successMsg.successgname} failuremsg = {errMsg.errsts} failuremsgName = {errMsg.errmesgname}  />
                <div className="nir-sign-title">
                  <h4>Reset</h4>
                  <p>Reset your password</p>
                </div>
                <div className="nir-sign-form">

                  <form action="" className="needs-validation" noValidate >
                   
                    <div className="form-group">
                      <label htmlFor="uname">Email:</label>
                      <input type="email" className="form-control" id="uemail" placeholder="Enter your email" name="uemail" required value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">Please fill out this field.</div>
                    </div>
                   
                    

                    <button type="submit" className="btn btn-primary nir-min-w-100p"  onClick={resetClick}  >Submit </button>
                 
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
)