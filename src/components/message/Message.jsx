import React from 'react'
import './message.css'
import { format } from "timeago.js";

export default function Message({own , message}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
    return (
        <div>
            <div className = {own?"message own":"message"}>
                <div className="messageTop">
                    <img className = "messageImg" src={ PF +  "profile.jpg"} alt="" srcset="" />
                    <p className = "messageText">
                    {message.text}
                    </p>
                </div>
                <div className="messageBottom">{format(message.createdAt)}</div>
            </div>
        </div>
    )
}
