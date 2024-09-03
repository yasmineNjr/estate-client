import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import apiRequest from "../../lib/apiRequest";
import { format } from 'timeago.js';
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chats }) {
  console.log(chats);
  const [chat, setChat] = useState(null);
  const [users, setUsers] = useState([ { id: 1, username: 'xxx', avatar: ''}, { id: 2, username: 'yyy', avatar: ''}, { id: 3, username: 'zzz', avatar: ''}, { id: 4, username: 'nnn', avatar: ''}, { id: 5, username: 'mmm', avatar: ''}, { id: 6, username: 'www', avatar: ''}]);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  const handleGetUsers = async () => {
    try {
      const res = await apiRequest("/users/");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetUsers();
  }, []);
  useEffect(() => {//to scroll to the last message
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get('text');
    if(!text) return;

    try{
      const res = await apiRequest.post('/messages/'+ chat.id , { text });
      setChat(prev => ({...prev, messages:[...prev.messages, res.data]}));
      e.target.reset();
     
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {/* <div className= 'contacts'>
          {
            users.map((user) => (
              <div  key={user.id} 
                    className="contact"
                    // onClick={() => handleOpenChat(c.id, c.receiver)}
              >
                <img
                  style={{width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',}}
                  src={ user.avatar ||"/noavatar.jpg"} 
                  alt=""
                />
                <span>{user.username}</span>
              </div>
            ))
          }
        </div> */}
        {
          chats?.map(c => (
            <div className="message" key={c.id} 
                  style={{ backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id === c.id ? 
                    'white' : '#fecd514e' }}
                  onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img
                // src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                src={c.receiver.avatar || '/noavatar.jpg'}
                alt=""
              />
              <span>{c.receiver.username}</span>
              <p>{c.lastMessage}</p>
            </div>
          ))
        }
       
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver.avatar || '/noavatar.jpg'}
                alt=""
              />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={()=>setChat(null)}>X</span>
          </div>
          <div className="center">
            {
              chat.messages.map(message => (
                <div key={message.id}
                      style={{
                        alignSelf: message.userId === currentUser.id ? 'flex-end' : 'flex-start',
                        textAlign: message.userId === currentUser.id ? 'right' : 'left'
                      }}
                >
                  <p style={{fontSize: '16px'}}>{message.text}</p>
                  <span style={{
                          fontSize: '12px',
                          backgroundColor: '#f7c14b39',
                          padding: '2px',
                          borderRadius: '5px',
                        }}>{format(message.createdAt)}</span>
                </div>
              ))
            }
            <div ref={messageEndRef}></div>
          </div>
          <form className="bottom" onSubmit={handleSubmit}>
            <textarea name='text'></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
