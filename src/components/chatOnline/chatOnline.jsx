import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  console.log("chat online",onlineUsers);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/api/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {

      const res = await axios.get(
        `/api/conversation/find/${currentId}/${user._id}`
      );

      if(res.data)
      { console.log("online - if - res.data" , res.data);
        setCurrentChat(res.data);}
      else{
        const conversation = {
          senderId : currentId,
          receiverId :  user._id
        }
        try {
          const res =  await axios.post( `/api/conversation`,conversation);
          console.log("online - else - res.data" , res.data);
          // setCurrentChat(res.data);
        } catch (error) {
           console.log(error);
        }
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture ? PF + o.profilePicture : PF +  "profile.jpg"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
