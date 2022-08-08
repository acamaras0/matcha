import React, { useEffect, useState } from "react";
import Redirect from "react-router-dom/Redirect";
import Axios from "axios";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [message, setMessage] = useState("");

  Axios.defaults.withCredentials = true;

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.error) {
        setMessage(response.data.error);
      } else {
        setLoginStatus(response.data[0].username);
        localStorage.setItem("authenticated", response.data[0].username);
      }
    });
  };
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  if (loginStatus) {
    return <Redirect to="/completeprofile" />;  
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={login}>
        <h1>{loginStatus}</h1>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign in</h3>
          <p className="forgot-password text-right mt-2">
            Are you new around here?
          </p>
          <a href="http://localhost:3000/registration">Create an account!</a>
          <div className="form-group mt-3">
            <input
              className="form-control mt-1"
              type="text"
              placeholder="Username..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="form-group mt-3">
            <input
              className="form-control mt-1"
              type="password"
              placeholder="Password..."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <br />
          <button className="btn btn-primary"> Login </button>
        </div>
        <br />
        <p className="error">{message}</p>
        <p className="forgot-password text-right mt-2">
          Forgot
          <a href="http://localhost:3000/forgotpassword"> password?</a>
        </p>
      </form>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import '../App.css';
// import Axios from "axios";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   //const [loginStatus, setLoginStatus] = useState("");
//   // const [message, setMessage] = useState("");

//   const login = (e) => {
//     e.preventDefault();
//     const userData = {
//       username,
//       password,
//     };
//     localStorage.setItem('token-info', JSON.stringify(userData));
//     setIsLoggedin(true);
//     setUsername('');
//     setPassword('');
//   };

//   const logout = () => {
//     localStorage.removeItem('token-info');
//     setIsLoggedin(false);
//   };

//   return (
//     <>
//       <div style={{ textAlign: 'center' }}>
//         <h1>This is React WebApp </h1>
//         {!isLoggedin ? (
//           <>
//             <form action="">
//               <input
//                 type="text"
//                 onChange={(e) => setUsername(e.target.value)}
//                 value={username}
//                 placeholder="Name"
//               />
//               <input
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 placeholder="Password"
//               />
//               <button type="submit" onClick={login}>
//                 GO
//               </button>
//             </form>
//           </>
//         ) : (
//           <>
//             <h1>User is logged in</h1>
//             <button onClickCapture={logout}>logout user</button>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
