import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";

const Activation = () => {
  const hash = useParams().hash;
  const history = useHistory();
  const xsrfToken = getCookie("refreshToken");
  const [message, setMessage] = useState("");

  const activate = async () => {
    try {
      const respose = await axios.post(
        `http://localhost:5000/activate/${hash}`
      );
      setMessage(respose.data.message);
      history.push("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  if (xsrfToken !== "") {
    history.push("/dashboard");
  }
  return (
    <>
      <div className="activ">
        <div className=" text-center">
          <div>
            <h3>Welcome to Matcha!</h3>
            <p>Click the following button for one last check!</p>
          </div>
          <button onClick={activate} className="btn btn-warning">
            Activate
          </button>
          <p className="error">{message}</p>
        </div>
      </div>
    </>
  );
};

export default Activation;
