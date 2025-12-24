import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

function ChatList({ messages, isLoading, onDelete, onEdit }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-list-container">
      {messages.length === 0 && !isLoading && (
        <div className="empty-state">
          <h2>What can I help with?</h2>
        </div>
      )}

      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      {isLoading && (
        <div className="message-row message-left">
          <div className="message-bubble bubble-ai">
            <span className="thinking-text">Thinking . . .</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatList;