import React from 'react';
import Sidebar from './components/layout/Sidebar';
import ChatContainer from './components/chat/ChatContainer';
import { useChat } from './hooks/useChat';
import './App.css';

function App() {
  const {
    messages,
    isLoading,
    sessionId,
    sendMessage,
    resetSession,
    clearHistory
  } = useChat();

  return (
    <div className="app-container">
      <Sidebar
        sessionId={sessionId}
        onNewSession={resetSession}
        onClearHistory={clearHistory}
      />
      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
      />
    </div>
  );
}

export default App;
