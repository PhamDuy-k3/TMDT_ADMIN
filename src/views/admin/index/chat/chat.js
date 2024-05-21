import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./ChatRealTime.scss";

const ChatRealTime = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:5050");
    socketRef.current = socket;

    socket.on("message", (msg) => {
      console.log(msg);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, sender: "server" },
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
  const sendMessage = () => {
    if (socketRef.current) {
      const messageWithTimestamp = {
        text: message,
        timestamp: new Date().toISOString(),
        sender: "self",
      };
      socketRef.current.emit("message", messageWithTimestamp.text);
      setMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
      setMessage("");
    }
  };
  const messagesList = messages.map((msg, index) => (
    <div key={index} className={`message ${msg.sender}`}>
      <div>{msg.text}</div>
      <div className={`timestamp-hidden ${msg.sender}`}>
        {formatTime(msg.timestamp)}
      </div>
    </div>
  ));
  return (
    <div className="chat-container">
      <div className="messages">{messagesList}</div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRealTime;
