import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useState , useEffect , useContext } from "react";
import axios from 'axios'
import { AuthContext } from "../../context/authContext";

export default function Feed({username}) {
  const {user} =  useContext(AuthContext)
  const [post,setPost] = useState([]);
  useEffect(() => {
    async function fetchPost(){
    const res =  username ? await axios.get('/api/posts/profile/' + username )  : await axios.get('/api/posts/timeline/' + user._id)
    setPost(res.data.sort((a, b) => {return  new Date (b.createdAt) -  new Date (a.createdAt) }));
    }
    fetchPost();
  }, [  username , user ])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {post.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}