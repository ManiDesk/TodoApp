import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import User from "../components/User";
// import { useHistory } from "react-router-dom";
// import { removeUsers } from "../store/actions/user";

const Userslist = () => {
  const users = useSelector((state) => {
    return state.users;
  });
  console.log(users)
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const handler = () => {
//     history.goBack();
//   };

//   const clearUsers = () => {
//     dispatch(removeUsers());
//   };
  return (
    <div>
      {users.length !== 0 ? (
        users.map((user, index) => {
          return (
            <div>

<ul>
      <li key={index}>
        {/* <p>{id}</p> */}
        <h3>{user.name}</h3>
        <p>{user.password}</p>
      </li>
      <hr />
    </ul>
            </div>
          
          );
        })
      ) : (
        <h3>No user found</h3>
      )}
      {/* <button onClick={handler}>Go Back</button>
      <button onClick={clearUsers}>Clear List</button> */}
    </div>
  );
};

export default Userslist;
