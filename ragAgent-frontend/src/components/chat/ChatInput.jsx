import React, { useState } from 'react';
import { Send } from 'lucide-react';
import './ChatInput.css';

const ChatInput = ({ onSend, isDisabled }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !isDisabled) {
            onSend(text);
            setText('');
        }
    };

    return (
        <form className="chat-input-container" onSubmit={handleSubmit}>
            <div className="input-shell">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ask something about the document..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            handleSubmit(e);
                        }
                    }}
                    disabled={isDisabled}
                />
                <button
                    type="submit"
                    className="send-button"
                    disabled={!text.trim() || isDisabled}
                >
                    <Send size={18} />
                </button>
            </div>
            <p className="input-hint">Shift + Enter for new line</p>
        </form>
    );
};

export default ChatInput;
