import React, { useState, useEffect } from "react";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://35.208.222.68:80/learning-path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: inputMessage }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setMessages(
        messages.push({
          sender: "user",
          text: inputMessage,
        })
      );
      console.log(messages);
      console.log(Array.isArray(messages))  
      const data = await response.json();
      setInputMessage("");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    await fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="chat-room">
      <div className="chat-room-title">
        <h1 className="page-title s24 fontb c333">
          What do you want to learn?
        </h1>
      </div>
      <div className="messages-container">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "sent" : "received"
              }`}
            >
              {message.text}
            </div>
          );
        })}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          placeholder="Type your message..."
          className="message-input"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
