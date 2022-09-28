import React from "react";
import { Link,useLocation  } from "react-router-dom";
function LeftSideBox(){
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");
return(
    <React.Fragment>
       <div className="nir-side-box">
                        <ul className="nir-left-box-list">
                            <li className={splitLocation[1] === "home" ? "active" : ""}>
                            <Link to="/home"> <i className="far fa-lightbulb-on"></i> Home</Link>
                            </li>
                            <li className={splitLocation[1] === "important" ? "active" : ""}>
                            <Link to="/important"> <i className="far fa-star"></i> Important</Link>
                            </li>
                            <li className={splitLocation[1] === "planned" ? "active" : ""}>
                            <Link to="/planned"> <i className="far fa-star"></i> Planned</Link>
                            </li>
                            <li className="">
                                <a href="Assignedtome"><i className="far fa-user"></i> Assigned to me</a>
                            </li>
                            <li className="">
                                <a href="Tasks"><i className="far fa-home-alt"></i> Tasks</a>
                            </li>
                        </ul>
                    </div>
    </React.Fragment>
)
}
export default LeftSideBox;