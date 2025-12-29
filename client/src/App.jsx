import { useState, useEffect } from 'react';
import { getGeminiResponse } from "./gemini";
import ChatList from './components/ChatList'; 
import ChatInput from './components/ChatInput';
import { fetchMessages, createMessage, deleteMessage, clearMessages } from './api'; 
import './App.css';


function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleQuickReply = (text) => {
    setInput(text);
    };
    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const data = await fetchMessages();
            const formatted = data.map(msg => ({ ...msg, id: msg._id })); 
            setMessages(formatted);
        } catch (error) {
            console.error("Failed to load messages:", error);
        }
    };

    // Create
    const handleSend = async () => {
        if (!input.trim()) return;
        setIsLoading(true);

        try {
            await createMessage(input, "user");
            
            const aiText = await getGeminiResponse(input);
            
            await createMessage(aiText, "ai");

            loadMessages();
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setInput("");
            setIsLoading(false);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        await deleteMessage(id);
        loadMessages();
    };

    const handleClear = async () => {
        await clearMessages();
        setMessages([]);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setInput("");
    };

    const startEdit = (message) => {
        setEditingId(message.id);
        setInput(message.text || ""); 
    }

    const handleUpdate = async () => {
        if (!input.trim() || !editingId) return;

        const msgIndex = messages.findIndex(msg => msg.id === editingId);
        if (msgIndex === -1) return; 

        const updatedMessages = [...messages];
        updatedMessages[msgIndex] = { ...updatedMessages[msgIndex], text: input };
        setMessages(updatedMessages);

        const nextMsgIndex = msgIndex + 1;
        const nextMsg = messages[nextMsgIndex];
        const newPrompt = input;

        setEditingId(null);
        setInput("");

        if (nextMsg && nextMsg.sender === "ai") { 
            setIsLoading(true); 
            try {
                const newAiText = await getGeminiResponse(newPrompt);

                setMessages(prev => {
                    const newHistory = [...prev];
                    const aiIndex = newHistory.findIndex(m => m.id === nextMsg.id);
                    if (aiIndex !== -1) {
                        newHistory[aiIndex] = { ...newHistory[aiIndex], text: newAiText };
                    }
                    return newHistory;
                });
                
            } catch (error) {
                console.error("Failed to regenerate response:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className='app-container'>
            <header className='app-header'>
                <h1>Chat with Gemini AI</h1>
                <button onClick={handleClear} className='btn-clear'>Clear Chat</button>
            </header>
        
            <ChatList 
                messages={messages} 
                isLoading={isLoading}
                onDelete={handleDelete} 
                onEdit={startEdit} 
                onQuickReply={handleQuickReply}
            />

            <ChatInput
                input={input}
                setInput={setInput}
                onSend={handleSend}
                onUpdate={handleUpdate}
                isEditing={!!editingId}
                onCancelEdit={cancelEdit}
            />
        </div>
    )
}

export default App;