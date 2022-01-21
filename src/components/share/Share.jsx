import "./share.css";
import axios from "axios";
import { FaPhotoVideo, FaTag, FaIntercom, FaSmileBeam } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";
import { useContext, useRef, useState } from "react";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Share() {
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file, SetFile] = useState(null);
  const handleChange = (e)=>{
       SetFile( e.target.files[0])
  }
  console.log("share,user",user);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log("share,newpost",newPost);
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
          console.log(err);
      }
    }
    try {
      await axios.post("/api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "profile.jpg"
            }

            alt=""
          />
          <input
            placeholder={`What's in your mind ${user.username} ?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit = {handleSubmit}>
          <div className="shareOptions">
            <div className="shareOption">
              <FaPhotoVideo htmlColor="tomato" className="shareIcon" />
              <label htmlFor = "file" className="shareOptionText">Photo or Video</label>
              <input type="file" id = "file" accept=".png , .jpeg , .jpg" onChange = {handleChange} style = {{display :" none "}}/>
            </div>
            <div className="shareOption">
              <FaTag htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <FaIntercom htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <FaSmileBeam htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type = "submit" className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
}
