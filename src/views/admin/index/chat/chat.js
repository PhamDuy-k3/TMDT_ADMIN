import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./ChatRealTime.scss";
import axios from "axios";
import { useCookies } from "react-cookie";
import imgChatDf from "../../../../assets/images/chat_default_img_admin.jpg";
const ChatRealTime = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); // State để lưu trữ file ảnh
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [listUser, setListUser] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [id_room, setIdRoom] = useState("");
  const [id_user, setIdUser] = useState("");

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    const socket = io("http://localhost:5050");
    socketRef.current = socket;

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, sender: "user" },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const createRoomChat = async (id) => {
    let data = {};
    data.user_id = id;
    try {
      const response = await axios.post(
        "http://localhost:5050/chats/admin/create-chat-room",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      );
      await getMessInRoomChat(response.data.data._id);
      setIdRoom(response.data.data._id);
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
    }
  };
  const getRoom = async (id_user) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/chats/admin/chat-room?user_id=${id_user}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      );
      if (response.data.status_code === 201) {
        createRoomChat(id_user);
      } else {
        await getMessInRoomChat(response.data.data._id);
        setIdRoom(response.data.data._id);
      }
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
    }
  };
  const createMessInRoomChat = async () => {
    let data = {};
    data.content = message;
    if (imageFile) {
      data.content = await convertFileToBase64(imageFile);
    }
    data.type = imageFile ? "image" : "text";
    data.sender = "admin";
    data.chatRoomId = id_room;
    socketRef.current.emit("message", data);
    try {
      const response = await axios.post(
        "http://localhost:5050/chats/send-message",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      );
      await getMessInRoomChat(id_room);
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
    } finally {
      setMessage("");
      setImageFile(null);
    }
  };

  const getMessInRoomChat = async (idRoom) => {
    try {
      if (!idRoom) return;
      const response = await axios.get(
        `http://localhost:5050/chats/chat-room/${idRoom}/messages`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
    }
  };

  useEffect(() => {
    getMessInRoomChat();
  }, []);

  //DANH SACH USER
  useEffect(() => {
    fetch(`http://localhost:5050/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.admin_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setListUser(res.data);
      });
  }, []);

  const handleSendMessage = () => {
    if (message.trim() || imageFile) {
      if (id_room !== null) {
        createMessInRoomChat();
      } else {
        getRoom(id_user);
      }
    }
  };

  const handleGetRoom = (user_id) => {
    setIdUser(user_id);
    getRoom(user_id);
  };
  const list_user = listUser.map((user, index) => (
    <p onClick={() => handleGetRoom(user._id)} key={user._id}>
      {user.name}
    </p>
  ));
  const messagesList = messages.map((msg, index) => (
    <div key={index} className={`message ${msg.sender}`}>
      {msg.type === "image" ? (
        <img
          style={{ width: "10rem", height: "10rem" }}
          src={msg.content}
          alt="sent"
        />
      ) : (
        <div>{msg.content}</div>
      )}
      <div className={`timestamp-hidden ${msg.sender}`}>
        {formatTime(msg.timestamp)}
      </div>
    </div>
  ));

  return (
    <div className="d-flex col-lg-8 chat_msg">
      <div className="list-user col-lg-4">{list_user}</div>
      <div className="chat-container col-lg-8">
        <div ref={messagesEndRef} className="messages">
          {messages.length > 0 ? (
            messagesList
          ) : (
            <img id="img-df-chat" src={imgChatDf} alt="img" />
          )}
        </div>
        <div className="input-containers">
          <input type="file" onChange={handleFileInputChange} />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRealTime;
