import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState , useEffect} from "react";
import {useParams} from 'react-router-dom'
import axios from "axios";


export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users?username=${username}`);
     
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src=  {user.profileCoverImg ? PF + user.profileCoverImg : PF +  "images.jpg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src= {user.profilePicture ? PF + user.profilePicture : PF +  "profile.jpg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username = {user.username}/>
            <Rightbar user ={user}/>
          </div>
        </div>
      </div>
      </div>
  );
}