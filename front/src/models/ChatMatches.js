import React from "react";
import fire from "../assets/fire.png";

export default function ChatMatches() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatImgContainer">
          <img className ="chatImg" src={fire} alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Doe</span>
      </div>
    </div>
  );
}
