import ChatOnline from "../../components/chatOnline/chatOnline";
import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import "./messanger.css";
import axios from 'axios';
import {io} from 'socket.io-client';
import { AuthContext } from "../../context/authContext";
import { useState , useEffect , useRef , useContext } from "react";

export default function Messanger() {
  const {user} =  useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState(null)
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {

    socket.current = io('https://apisocket.herokuapp.com' , , config: [.connectParams(["EIO": "3"]) , { transports: ['websocket'] });
    console.log(socket);
    socket.current.on("getMessage",(data)=>{
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    console.log(arrivalMessage);
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log("getUser",users);

      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );

    });

    console.log("onlineUsers",onlineUsers);
  },[user._id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversation/" + user._id);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);


  const handleSubmit = async(e)=>{
         e.preventDefault();
         const message = {
           senderId : user._id,
           text:newMessage ,
           conversationId: currentChat._id,
         }

         const receiverId = currentChat.members.find( (member) => member !== user._id);

        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });
        try {
            const res = await axios.post('/api/message',message);
            setMessages([...messages,res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
  }
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (

    <div>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" className = "chatMenuInput" placeholder = "Serach your conversation" />
            { conversation.map( c => (
              <div onClick={() => setCurrentChat(c)} >
              < Conversation  conversation={c} currentUser={user}  />
              </div>
            ))}
          </div>
        </div>

        <div className = "chatBox">
        <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                      <div ref={scrollRef}>
                      <Message message={m} own={m.senderId === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick = {handleSubmit} >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>

        </div>
        <div className = "chatOnline">
          <div className = "chatOnlineWrapper">
            <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
