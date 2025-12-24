import React from 'react';
import { IoArrowUp, IoCheckmark, IoClose } from "react-icons/io5";

function ChatInput ({
    input,
    setInput,
    onSend,
    onUpdate,
    isEditing,
    onCancelEdit
}) {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            isEditing ? onUpdate() : onSend();
        }
    };

    return (
        <div className='input-container'>
            <input 
                type="text"
                value={input || ""} 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isEditing ? "Update your message..." : "Ask Gemini AI..."}
                className='chat-input'
            />

            {isEditing ? (
                <>
                    {/* Update Button (Checkmark) */}
                    <button onClick={onUpdate} className='btn-update'>
                        <IoCheckmark size={20} />
                    </button>
                    {/* Cancel Button (X) */}
                    <button onClick={onCancelEdit} className='btn-cancel'>
                        <IoClose size={20} />
                    </button>
                </>
            ) : (
                /* Send Button (Up Arrow) */
                <button onClick={onSend} className='btn-send'>
                    <IoArrowUp size={60} />
                </button>
            )}
        </div>
    );
}

export default ChatInput;