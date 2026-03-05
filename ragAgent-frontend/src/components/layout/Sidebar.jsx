import React from 'react';
import { Layout, FileText, Database, Settings, Trash2 } from 'lucide-react';
import UploadZone from '../ui/UploadZone';
import './Sidebar.css';

const Sidebar = ({ sessionId, onNewSession, onClearHistory }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <Layout className="logo-icon" />
                    <span>RAG Agent</span>
                </div>
            </div>

            <div className="sidebar-content">
                <div className="sidebar-section">
                    <label className="section-label">Document Management</label>
                    <UploadZone />
                </div>

                <div className="sidebar-section">
                    <label className="section-label">Chat Settings</label>
                    <div className="session-card">
                        <span className="info-label">Current Session</span>
                        <code className="session-id">{sessionId}</code>
                        <button className="btn-secondary" onClick={onNewSession}>
                            New Session
                        </button>
                    </div>
                </div>

                <div className="sidebar-section">
                    <label className="section-label">System Info</label>
                    <div className="system-stack">
                        <div className="stack-item">
                            <FileText size={16} />
                            <span>Groq Llama 3</span>
                        </div>
                        <div className="stack-item">
                            <Database size={16} />
                            <span>MongoDB Vector</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar-footer">
                <button className="btn-danger" onClick={onClearHistory}>
                    <Trash2 size={16} />
                    Clear Chat
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
