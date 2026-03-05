import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './ChatContainer.css';

const ChatContainer = ({ messages, isLoading, onSendMessage }) => {
    return (
        <main className="chat-container">
            <header className="chat-header">
                <div className="header-info">
                    <h1>Active Session</h1>
            
                </div>
                <div className="online-status">
                    <div className="dot"></div>
                    <span>System Online</span>
                </div>
            </header>

            <MessageList messages={messages} isLoading={isLoading} />

            <ChatInput onSend={onSendMessage} isDisabled={isLoading} />
        </main>
    );
};

export default ChatContainer;
