import React, { useState } from 'react';
import './Chat.css';

function ChatWindow({ messages, sendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message, index) => {
          const isUserMessage = message.includes('Tú:');
          return (
            <div
              key={index}
              className={`chat-message ${isUserMessage ? 'user-message' : 'server-message'}`}
            >
              {message}
            </div>
          );
        })}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

export default ChatWindow;