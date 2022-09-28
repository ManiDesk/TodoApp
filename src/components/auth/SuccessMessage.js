import React, { useState } from "react";
function SuceessMessage({successmsg,successmsgname,failuremsg,failuremsgName}) {
   
    return (
        <React.Fragment>
            {successmsg ?  <div className="alert alert-success">
                    <strong>Success!</strong> {successmsgname}
                </div>
                :
                null
            }
            {failuremsg ?
               <div className="alert alert-danger">
               <strong>Danger!</strong> {failuremsgName}
           </div>
                :
                null
            }

        </React.Fragment>
    )
}

export default SuceessMessage;