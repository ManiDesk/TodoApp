import React from 'react'
import { useDispatch, useSelector } from "react-redux";

function Favourite () {
    const state = useSelector((state) => state);
    console.log(state, "startreducer");
    const dispatch = useDispatch();
return(
    <React.Fragment>
        <div>
              {state.importantItem.map((item, i) => (
                    <div className="card" key={i}>
                        {item.name}
                    </div>
                ))}
        </div>
    </React.Fragment>
)
}
export default Favourite;