import React from "react";
import { format } from "timeago.js";

export default function Message({ message, own}) {
  return (
    <div className={own ? "messages own" : "messages"}>
      <div className="messageTop">
        <p className="msgText">{message && message.text}</p>
      </div>
      <div className="messageBottom">{message && format(message.time)}</div>
    </div>
  );
}
