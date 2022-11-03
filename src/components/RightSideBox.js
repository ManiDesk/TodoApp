import React from "react";
function RightSideBox({hidestskrecent}){
return(
    <React.Fragment>
        
        <div className="nir-side-box d-flex justify-content-center align-items-center flex-column nir-empty">
            
        <div className="d-flex d-lg-none d-md-none d-sm-none nir-top-fix">
<div className='d-flex w-100 '>            
<button type="submit" className="btn btn-light"  onClick={hidestskrecent}><div><i className="fal fa-times"></i></div>  </button>
 
</div>
  </div>
            
            <i className="fal fa-database xl-large-icon"></i>No data found</div>
    </React.Fragment>
)
}
export default RightSideBox;