import "./post.css";
import { FaMarsStrokeV ,FaThumbsUp , FaHeart}  from "react-icons/fa";
import axios from "axios";
import {format} from 'timeago.js'
import { useState , useEffect , useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Post({ post }) {
  
  const {user : currentUser} =  useContext(AuthContext)

  const [user,setUser] = useState([]);
  useEffect(() => {
    async function fetchUser(){
    const res = await axios.get(`/api/users?userId=${post.userId}`)
    setUser(res.data);
    }
    fetchUser();
  },[user])

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  },[])


  const likeHandler =async ()=>{
    await axios.put('/api/posts/' + post._id + '/like' , {userId : currentUser._id})
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={user.profilePicture ? PF + user.profilePicture : PF +  "profile.jpg"}
              alt=""
            />
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.updatedAt)}</span>
          </div>
          <div className="postTopRight">
            <FaMarsStrokeV/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={ PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <FaThumbsUp className="likeIcon"  onClick={likeHandler} alt="" />
            <FaHeart className="heartIcon"  onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

