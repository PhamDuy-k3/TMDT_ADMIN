import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./ChatRealTime.scss";
import axios from "axios";
import { useCookies } from "react-cookie";

const ChatRealTime = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); // State để lưu trữ file ảnh
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [listUser, setListUser] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [id_room, setIdRoom] = useState("");

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
    data.userId = id;
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
      getMessInRoomChat(response.data.data._id);
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
        // ko tìm thấy room
        createRoomChat(id_user);
      } else {
        getMessInRoomChat(response.data.data._id);
        setIdRoom(response.data.data._id);
      }
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
    }
  };
  const createMessInRoomChat = async () => {
    let data = {};
    data.content = message;
    data.sender = "admin";
    data.chatRoomId = id_room;
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
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
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

  // GỬI
  const sendTextMessage = () => {
    if (message.trim() !== "") {
      const message_text = {
        content: message,
        sender: "admin",
      };
      socketRef.current.emit("message", message_text);
      setMessages((prevMessages) => [...prevMessages, message_text]);
      createMessInRoomChat();
      setMessage("");
    }
  };

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

  const sendImageMessage = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const messageWithTimestamp = {
          type: "image",
          data: event.target.result,
          timestamp: new Date().toISOString(),
          sender: "self",
        };
        socketRef.current.emit("message", messageWithTimestamp);
        setMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
        setImageFile(null); // Reset imageFile state after sending
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSendMessage = () => {
    if (imageFile) {
      sendImageMessage();
    } else {
      sendTextMessage();
    }
  };

  const list_user = listUser.map((user, index) => (
    <p onClick={() => getRoom(user._id)} key={user._id}>
      {user.name}
    </p>
  ));
  const messagesList = messages.map((msg, index) => (
    <div key={index} className={`message ${msg.sender}`}>
      {msg.type === "image" ? (
        <img
          style={{ width: "10rem", height: "10rem" }}
          src={msg.data}
          alt="sent"
        />
      ) : (
        <div>{msg.content}</div>
      )}
      <div className="timestamp-hidden">{formatTime(msg.timestamp)}</div>
    </div>
  ));

  return (
    <div className="d-flex col-lg-8 chat_msg">
      <div className="list-user col-lg-4">{list_user}</div>
      <div className="chat-container col-lg-8">
        <div ref={messagesEndRef} className="messages">
          {messages.length > 0 ? messagesList : <p>Bắt đầu đoạn chat mới</p>}
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
