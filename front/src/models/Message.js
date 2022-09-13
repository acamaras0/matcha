import React from "react";
import fire from "../assets/fire.png";

export default function Message() {
  return (
    <div className="messages">
      <div className="messageTop">
        <img src={fire} alt="" className="msgImg" />
        <p className="msgText">This is a message</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
