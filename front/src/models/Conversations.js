import React from "react";
import fire from "../assets/fire.png";

export default function Conversations() {
    return (
        <div className="conversations">
        <img src={fire} alt="" className="conversationImg" />
        <span className="conversationName">John Doe</span>
        </div>
        
    );
    }