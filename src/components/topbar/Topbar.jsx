import "./topbar.css";
import axios from 'axios';
import { useHistory } from "react-router";
import {
  FaSearch,
  FaUser,
  FaComment,
  FaFacebookMessenger,
} from "react-icons/fa";
import React, { useContext, useRef , useEffect} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";


const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const username = useRef();
  const history = useHistory();

  const handleLogout = ()=>{
    localStorage.removeItem('user');
    window.location = '/';
  }



  const searchFriend = async(e)=>{

    try {
         const res = await axios.get(`/api/users?username=${username.current.value}`);
         if(res){
           history.push('/profile/' +username.current.value);
         }


    } catch (error) {

    }
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social-Fly</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">

          <FaSearch className="searchIcon"  onClick={searchFriend}/>

          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            ref = {username}


          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink" onClick={handleLogout}>Log-Out</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <FaUser  className = "icon" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <FaComment  className = "icon"/>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
          <Link to="/messenger" style={{ textDecoration: "none" }} >
            <FaFacebookMessenger className = "icon" />
            <span className="topbarIconBadge">1</span>
          </Link>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "profile.jpg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
