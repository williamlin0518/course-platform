import React, { useState, useEffect } from "react";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const fetchMessages = async () => {
    if (!inputMessage.trim()) return; // Avoid sending empty messages
  
    try {
      const response = await fetch("http://35.208.222.68:80/learning-path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: inputMessage }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
  
      // Process the response
      let newMessages = [{ sender: "user", text: inputMessage }];
      if (Array.isArray(data.courses_list) && data.courses_list.length > 0) {
        const coursesList = data.courses_list.map(course => ({
          sender: "bot",
          text: `${course.title} - Rating: ${course.rating}`,
          url: course.url 
        }));
        newMessages = newMessages.concat(coursesList);
      } else {
        newMessages.push({ sender: "bot", text: "No courses found." });
      }
  
      setMessages(prevMessages => [...prevMessages, ...newMessages]);
      setInputMessage(""); // Clear input field
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  
  

  const sendMessage = () => {
    fetchMessages();
  };

  // useEffect(() => {
  //   fetchMessages(); // You might want to remove or modify this if you don't want to fetch on component mount
  // }, []);
  const handleMessageClick = (url) => {
    window.open(url, "_blank"); // Open course link in a new tab
  };
  
  return (
    <div className="chat-room">
      <div className="chat-room-title">
        <h1 className="page-title s24 fontb c333">What do you want to learn?</h1>
      </div>
      <div className="messages-container">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`message ${message.sender === "user" ? "sent" : "received"}`}
              onClick={() => message.sender === "bot" && message.url ? handleMessageClick(message.url) : null}
              style={{ cursor: message.sender === "bot" && message.url ? 'pointer' : 'default' }}
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
          onChange={(e) => setInputMessage(e.target.value)}
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
