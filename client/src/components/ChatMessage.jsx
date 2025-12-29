import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MdDeleteOutline, MdEdit } from "react-icons/md";

function ChatMessage({ message, onDelete, onEdit }) {
    const isUser = message.sender === "user";

    return (
        <div className={`message-row ${isUser ? 'message-right' : 'message-left'}`}>
            <div className={`message-bubble ${isUser ? 'bubble-user' : 'bubble-ai'}`}>
                
                <div className="markdown-content">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
                
                <div className="message-actions">
                    <button 
                        onClick={() => onDelete(message.id)} 
                        className="btn-icon btn-delete"
                        title="Delete"
                    >
                        <MdDeleteOutline size={16} />
                    </button>
                    
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