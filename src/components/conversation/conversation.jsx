import React from 'react'
import './conversation.css'
import {useEffect , useState} from 'react'
import axios from 'axios';


export default function Conversation({ currentUser , conversation}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
    const [user, setUser] = useState(null)
    useEffect(() => {
        const friend = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async()=>{
            try {
                const res = await axios("/api/users?userId=" + friend);
                setUser(res.data);
              } catch (err) {
                console.log(err);
              }
            }


        getUser();
    }, [conversation , currentUser])
    return (
        <div>
            <div className = "conversation">
                <img  className = "conversationImg" src= { user?.profilePicture
            ? PF + user.profilePicture
            :  PF +  "profile.jpg" } alt="" srcset="" />
                <span className = "conversationName">{user?.username}</span>
            </div>
        </div>
    )
}
