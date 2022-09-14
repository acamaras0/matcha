import React from "react";
import fire from "../assets/fire.png";

export default function Message({ own }) {
  return (
    <div className={own ?"messages own": "messages"}>
      <div className="messageTop">
        <img src={fire} alt="" className="msgImg" />
        <p className="msgText">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
