import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

function ChatList({ messages, isLoading, onDelete, onEdit, onQuickReply }) { 
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const suggestions = [
    { label: "Plan a trip", text: "Plan a 3-day itinerary for a trip to Japan." },
    { label: "Debug Code", text: "Find the bug in this React useEffect code." },
    { label: "Write an Email", text: "Write a professional email asking for a deadline extension." },
    { label: "Explain a concept", text: "Explain how Blockchain works to a 5-year-old." }
  ];

  return (
    <div className="chat-list-container">
      
      {/* 1. Enhanced Empty State with Suggestions */}
      {messages.length === 0 && !isLoading && (
        <div className="empty-state">
          <h2>What can I help with?</h2>
          
          <div className="suggestion-grid">
            {suggestions.map((suggestion, index) => (
              <button 
                key={index} 
                className="suggestion-card"
                onClick={() => onQuickReply(suggestion.text)}
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Message List */}
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      {/* 3. Loading Indicator */}
      {isLoading && (
        <div className="message-row message-left">
          <div className="message-bubble bubble-ai typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatList;