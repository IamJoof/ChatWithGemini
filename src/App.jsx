// src/App.jsx
import { useState, useEffect } from 'react';
import { getGeminiResponse } from "./gemini";
import ChatList from './components/ChatList'; 
import ChatInput from './components/ChatInput';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Read
    useEffect(() => {
        const saved = localStorage.getItem("chatHistory");
        if (saved) {
            setMessages(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(messages));
    }, [messages]);

    // Create
    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { 
            id: Date.now(),
            text: input,
            sender: "user"
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const geminiReply = await getGeminiResponse(input);
            setMessages(prev => [...prev, { 
                id: Date.now() + 1,
                text: geminiReply,
                sender: "Gemini AI"
            }]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete
    const handleDelete = (id) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    }

    const cancelEdit = () => {
        setEditingId(null);
        setInput("");
    };

    // Update
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

    if (nextMsg && nextMsg.sender === "Gemini AI") {
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
                <button onClick={() => setMessages([])} className='btn-clear'>Clear Chat</button>
            </header>
        
            <ChatList 
                messages={messages} 
                isLoading={isLoading}
                onDelete={handleDelete} 
                onEdit={startEdit} 
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