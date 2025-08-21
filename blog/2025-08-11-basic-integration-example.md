---
slug: basic-integration-example
title: Basic VaultiScan Integration Example
authors: [vaultiscan]
tags: [tutorial, javascript, basic]
---

# Basic VaultiScan Integration Example

This example shows how to integrate VaultiScan into a simple web application for document analysis and querying.

<!--truncate-->

## Overview

In this tutorial, we'll build a simple document upload and query interface using the VaultiScan Embedding SDK.

## Prerequisites

- Basic knowledge of JavaScript
- Node.js installed
- VaultiScan API key

## Step 1: Setup

First, install the VaultiScan SDK:

```bash
npm install @vaultiscan/embedding-sdk
```

## Step 2: Initialize the Client

```javascript
import { VaultiScan } from '@vaultiscan/embedding-sdk';

const client = new VaultiScan({
  apiKey: 'your-api-key-here'
});
```

## Step 3: Create Upload Interface

```html
<!DOCTYPE html>
<html>
<head>
    <title>VaultiScan Document Analyzer</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .upload-area { 
            border: 2px dashed #6366f1; 
            padding: 40px; 
            text-align: center; 
            border-radius: 8px; 
            margin: 20px 0;
        }
        .query-section { margin: 20px 0; }
        input, textarea, button { 
            margin: 10px; 
            padding: 10px; 
            border-radius: 4px; 
            border: 1px solid #ddd; 
        }
        button { 
            background: #6366f1; 
            color: white; 
            border: none; 
            cursor: pointer; 
        }
        .result { 
            background: #f9fafb; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
        }
    </style>
</head>
<body>
    <h1>VaultiScan Document Analyzer</h1>
    
    <div class="upload-area" id="uploadArea">
        <p>Drag and drop your documents here, or click to select files</p>
        <input type="file" id="fileInput" multiple accept=".pdf,.doc,.docx,.txt">
    </div>
    
    <div class="query-section">
        <h3>Ask a Question</h3>
        <textarea id="questionInput" placeholder="What would you like to know about your documents?" rows="3" cols="50"></textarea>
        <button onclick="askQuestion()">Ask Question</button>
    </div>
    
    <div class="result" id="result" style="display: none;">
        <h3>Answer:</h3>
        <div id="answer"></div>
        <h4>Sources:</h4>
        <div id="sources"></div>
    </div>

    <script>
        // Your JavaScript code here
    </script>
</body>
</html>
```

## Step 4: Implement Upload Functionality

```javascript
let uploadedDocuments = [];

// File upload handling
document.getElementById('fileInput').addEventListener('change', handleFileUpload);
document.getElementById('uploadArea').addEventListener('dragover', (e) => {
    e.preventDefault();
    e.target.style.borderColor = '#4f46e5';
});

document.getElementById('uploadArea').addEventListener('drop', (e) => {
    e.preventDefault();
    e.target.style.borderColor = '#6366f1';
    const files = e.dataTransfer.files;
    handleFiles(files);
});

async function handleFileUpload(event) {
    const files = event.target.files;
    await handleFiles(files);
}

async function handleFiles(files) {
    for (let file of files) {
        try {
            console.log(`Uploading ${file.name}...`);
            
            const result = await client.uploadDocument({
                file: file,
                metadata: {
                    name: file.name,
                    type: file.type,
                    uploadedAt: new Date().toISOString()
                }
            });
            
            uploadedDocuments.push(result);
            console.log(`Uploaded ${file.name} with ID: ${result.id}`);
            
            // Update UI
            updateUploadStatus(`✅ ${file.name} uploaded successfully`);
            
        } catch (error) {
            console.error(`Failed to upload ${file.name}:`, error);
            updateUploadStatus(`❌ Failed to upload ${file.name}`);
        }
    }
}

function updateUploadStatus(message) {
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML += `<p>${message}</p>`;
}
```

## Step 5: Implement Query Functionality

```javascript
async function askQuestion() {
    const question = document.getElementById('questionInput').value;
    const resultDiv = document.getElementById('result');
    const answerDiv = document.getElementById('answer');
    const sourcesDiv = document.getElementById('sources');
    
    if (!question.trim()) {
        alert('Please enter a question');
        return;
    }
    
    if (uploadedDocuments.length === 0) {
        alert('Please upload some documents first');
        return;
    }
    
    try {
        // Show loading state
        resultDiv.style.display = 'block';
        answerDiv.innerHTML = 'Thinking...';
        sourcesDiv.innerHTML = '';
        
        // Query the documents
        const response = await client.query({
            question: question,
            documentIds: uploadedDocuments.map(doc => doc.id),
            options: {
                model: 'gpt-4',
                temperature: 0.1,
                includeMetadata: true,
                returnSources: true
            }
        });
        
        // Display results
        answerDiv.innerHTML = `
            <p><strong>Answer:</strong> ${response.answer}</p>
            <p><strong>Confidence:</strong> ${Math.round(response.confidence * 100)}%</p>
        `;
        
        // Display sources
        if (response.sources && response.sources.length > 0) {
            const sourcesList = response.sources.map(source => `
                <li>
                    <strong>${source.document.name}</strong>
                    <br>Relevance: ${Math.round(source.relevance * 100)}%
                    <br>Text: "${source.excerpt}"
                </li>
            `).join('');
            
            sourcesDiv.innerHTML = `<ul>${sourcesList}</ul>`;
        } else {
            sourcesDiv.innerHTML = '<p>No specific sources found</p>';
        }
        
    } catch (error) {
        console.error('Query failed:', error);
        answerDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
```

## Step 6: Add Error Handling and Improvements

```javascript
// Enhanced error handling
client.on('error', (error) => {
    console.error('VaultiScan Error:', error);
    updateUploadStatus(`❌ Error: ${error.message}`);
});

// Add progress tracking for uploads
client.on('upload.progress', (event) => {
    console.log(`Upload progress: ${event.progress}%`);
    updateUploadStatus(`📤 Uploading ${event.filename}: ${event.progress}%`);
});

// Document processing completion
client.on('document.processed', (event) => {
    console.log('Document processed:', event.documentId);
    updateUploadStatus(`✅ Document ${event.documentId} is ready for queries`);
});

// Add keyboard support for queries
document.getElementById('questionInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        askQuestion();
    }
});
```

## Complete Working Example

Here's the complete HTML file you can save and run:

```html
<!DOCTYPE html>
<html>
<head>
    <title>VaultiScan Document Analyzer</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            margin: 40px; 
            background: #f9fafb;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .upload-area { 
            border: 2px dashed #6366f1; 
            padding: 40px; 
            text-align: center; 
            border-radius: 8px; 
            margin: 20px 0;
            transition: all 0.3s ease;
        }
        .upload-area:hover { 
            border-color: #4f46e5; 
            background: rgba(99, 102, 241, 0.05);
        }
        .query-section { margin: 30px 0; }
        input, textarea, button { 
            margin: 10px 0; 
            padding: 12px; 
            border-radius: 6px; 
            border: 1px solid #d1d5db; 
            width: 100%;
            box-sizing: border-box;
        }
        button { 
            background: linear-gradient(45deg, #6366f1, #8b5cf6); 
            color: white; 
            border: none; 
            cursor: pointer; 
            font-weight: 600;
            transition: all 0.3s ease;
        }
        button:hover { 
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(99, 102, 241, 0.3);
        }
        .result { 
            background: #f0f9ff; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0;
            border-left: 4px solid #6366f1;
        }
        .sources li { 
            margin: 10px 0; 
            padding: 10px; 
            background: white; 
            border-radius: 6px;
        }
        h1 { 
            color: #1f2937; 
            text-align: center;
            background: linear-gradient(45deg, #6366f1, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔒 VaultiScan Document Analyzer</h1>
        
        <div class="upload-area" id="uploadArea">
            <p>📁 Drag and drop your documents here, or click to select files</p>
            <p style="font-size: 0.9em; color: #6b7280;">Supports PDF, DOC, DOCX, TXT files</p>
            <input type="file" id="fileInput" multiple accept=".pdf,.doc,.docx,.txt">
        </div>
        
        <div class="query-section">
            <h3>🤔 Ask a Question</h3>
            <textarea id="questionInput" placeholder="What would you like to know about your documents? (Ctrl+Enter to submit)" rows="3"></textarea>
            <button onclick="askQuestion()">🔍 Ask Question</button>
        </div>
        
        <div class="result" id="result" style="display: none;">
            <h3>💬 Answer:</h3>
            <div id="answer"></div>
            <h4>📚 Sources:</h4>
            <div id="sources"></div>
        </div>
    </div>

    <script type="module">
        import { VaultiScan } from 'https://unpkg.com/@vaultiscan/embedding-sdk@latest/dist/index.js';
        
        // Initialize VaultiScan client
        const client = new VaultiScan({
            apiKey: 'your-api-key-here' // Replace with your actual API key
        });
        
        // Make functions global so they can be called from HTML
        window.askQuestion = askQuestion;
        window.uploadedDocuments = [];
        
        // All the JavaScript code from above goes here...
        // (File upload handling, query functionality, etc.)
    </script>
</body>
</html>
```

## Key Features Demonstrated

1. **Drag & Drop Upload**: Modern file upload interface
2. **Real-time Feedback**: Progress updates and status messages
3. **Natural Language Queries**: Ask questions in plain English
4. **Source Attribution**: See which documents provided the answers
5. **Error Handling**: Graceful error management
6. **Responsive Design**: Works on desktop and mobile

## Next Steps

- Add authentication for production use
- Implement document management (view, delete)
- Add more advanced query options
- Integrate with your existing UI framework
- Add file type validation and size limits

## Production Considerations

1. **Security**: Never expose API keys in client-side code
2. **Error Handling**: Implement comprehensive error handling
3. **Rate Limiting**: Handle API rate limits gracefully
4. **File Validation**: Validate file types and sizes
5. **User Feedback**: Provide clear status updates to users

This example provides a solid foundation for building more complex document analysis applications with VaultiScan!
