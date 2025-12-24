// src/components/ChatMessage.jsx
import React from 'react';
import { MdDeleteOutline, MdEdit } from "react-icons/md"; // Import icons

function ChatMessage({ message, onDelete, onEdit }) {
    const isUser = message.sender === "user";

    return (
        <div className={`message-row ${isUser ? 'message-right' : 'message-left'}`}>
            <div className={`message-bubble ${isUser ? 'bubble-user' : 'bubble-ai'}`}>
                
                <p style={{ margin: 0 }}>{message.text}</p>
                
                <div className="message-actions">
                    {/* Delete Icon */}
                    <button 
                        onClick={() => onDelete(message.id)} 
                        className="btn-icon btn-delete"
                        title="Delete"
                    >
                        <MdDeleteOutline size={16} />
                    </button>
                    
                    {/* Edit Icon */}
                    {isUser && (
                        <button 
                            onClick={() => onEdit(message)} 
                            className="btn-icon btn-edit"
                            title="Edit"
                        >
                            <MdEdit size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;