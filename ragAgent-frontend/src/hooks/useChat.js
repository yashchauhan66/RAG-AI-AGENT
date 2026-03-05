import { useState, useCallback } from 'react';
import { chatService } from '../services/api';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(`sess_${Date.now()}`);

    const sendMessage = useCallback(async (question) => {
        if (!question.trim()) return;

        
        const userMessage = { role: 'user', content: question, id: Date.now() };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await chatService.sendMessage(sessionId, question);
            const aiMessage = {
                role: 'assistant',
                content: response.answer || response,
                id: Date.now() + 1
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please check if the document is uploaded.',
                id: Date.now() + 1,
                isError: true
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [sessionId]);

    const resetSession = () => {
        setSessionId(`sess_${Date.now()}`);
        setMessages([]);
    };

    const clearHistory = () => {
        setMessages([]);
    };

    return {
        messages,
        isLoading,
        sessionId,
        sendMessage,
        resetSession,
        clearHistory
    };
};
