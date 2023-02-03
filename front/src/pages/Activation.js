import React from "react";
import { useState } from "react";
import { activateAccount } from "../service/auth";
import { useParams, useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";

const Activation = () => {
  const hash = useParams().hash;
  const history = useHistory();
  const cookie = getCookie("refreshToken");
  const [message, setMessage] = useState("");

  const activate = async () => {
    const response = await activateAccount(hash);
    setMessage(response.message);
    history.push("/");
  };

  if (cookie !== "") {
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
          <button onClick={activate} className="btn btn-dark">
            Activate
          </button>
          <p className="error">{message}</p>
        </div>
      </div>
    </>
  );
};

export default Activation;
