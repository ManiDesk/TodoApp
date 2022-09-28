import React, { useState} from "react";
function DeleteModal({delid,deltaskname,deltaskdesk,deltasktime,modalDelete, modalClose}) {
    // const [modalopensts,setmodalopensts] = useState(modalStatus)

 // const [modalCloseStatus,setmodalCloseStatus] = useState(modalCloseStatus)
 

 
 
  return (
    <React.Fragment>
      <div className="modal fade"  id={`modal${delid}`} data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Delete the Task</h4>
              <button type="button" className="close" onClick={modalClose} data-dismiss="modal">&times;</button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <form >
                <div className="form-group">
                  <label >Task Name</label>
                  <p><b>{deltaskname}</b></p>
                 
                </div>
              
                <div className="form-group">
                  <label >Description</label>
                  <p><b>{deltaskdesk}</b></p>
                </div>
              </form>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button type="button" className="btn btn-danger"  onClick={modalDelete}>Confirm</button>
              <button type="button" className="btn btn-light"  onClick={modalClose} data-dismiss="modal">Cancel</button>
            </div>

          </div>
        </div>
      </div>

    </React.Fragment>
  )
}
export default DeleteModal;