import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ingestService } from '../../services/api';
import './UploadZone.css';

const UploadZone = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); 
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setStatus('idle');
            setError('');
        } else {
            setError('Please select a valid PDF file.');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('uploading');
        try {
            await ingestService.uploadPDF(file);
            setStatus('success');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            setStatus('error');
            setError(err.message || 'Failed to upload document.');
        }
    };

    return (
        <div className="upload-container">
            <div
                className={`drop-zone ${status === 'uploading' ? 'loading' : ''}`}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    hidden
                />
                <Upload className="upload-icon" size={24} />
                <p className="upload-text">
                    {file ? file.name : 'Upload PDF to start RAG'}
                </p>
            </div>

            {file && status !== 'uploading' && (
                <button className="btn-upload" onClick={handleUpload}>
                    Process Document
                </button>
            )}

            {status === 'uploading' && (
                <div className="status-msg info">
                    <Loader2 className="animate-spin" size={16} />
                    <span>Embedding document...</span>
                </div>
            )}

            {status === 'success' && (
                <div className="status-msg success">
                    <CheckCircle size={16} />
                    <span>Ingested successfully!</span>
                </div>
            )}

            {error && (
                <div className="status-msg error">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default UploadZone;
