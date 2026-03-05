import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';
import './MessageList.css';

const MessageList = ({ messages, isLoading }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div className="message-list" ref={scrollRef}>
            {messages.length === 0 && (
                <div className="empty-state">
                    <Sparkles className="sparkle-icon" size={48} />
                    <h2>Ready to help</h2>
                    <p>Upload a PDF and ask questions to start the RAG session.</p>
                </div>
            )}

            <AnimatePresence>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`message-wrapper ${msg.role}`}
                    >
                        <div className="avatar">
                            {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                        </div>
                        <div className={`bubble ${msg.isError ? 'error' : ''}`}>
                            {msg.content}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {isLoading && (
                <div className="message-wrapper assistant">
                    <div className="avatar">
                        <Bot size={18} />
                    </div>
                    <div className="bubble typing">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageList;
