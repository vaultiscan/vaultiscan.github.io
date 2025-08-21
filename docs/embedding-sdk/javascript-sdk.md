---
sidebar_position: 2
---

# JavaScript SDK

The core VaultiScan JavaScript SDK provides a flexible foundation for integrating document analysis into any JavaScript application.

## Installation

```bash
npm install @vaultiscan/embedding-sdk
```

## Basic Usage

### Initialize the Client

```javascript
import { VaultiScan } from '@vaultiscan/embedding-sdk';

const client = new VaultiScan({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.vaultiscan.ai'
});
```

### Upload Documents

```javascript
// Upload a single document
const uploadFile = async (file) => {
  try {
    const result = await client.uploadDocument({
      file: file,
      metadata: {
        category: 'policy',
        department: 'hr',
        tags: ['employee', 'handbook']
      }
    });
    
    console.log('Document uploaded:', result.id);
    return result;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

// Upload multiple documents
const uploadMultiple = async (files) => {
  const uploads = files.map(file => client.uploadDocument({ file }));
  const results = await Promise.all(uploads);
  return results;
};
```

### Query Documents

```javascript
// Ask questions about your documents
const queryDocuments = async (question, documentIds = []) => {
  try {
    const response = await client.query({
      question: question,
      documentIds: documentIds, // Optional: specific documents
      options: {
        model: 'gpt-4',
        temperature: 0.1,
        maxTokens: 1000
      }
    });
    
    return {
      answer: response.answer,
      sources: response.sources,
      confidence: response.confidence
    };
  } catch (error) {
    console.error('Query failed:', error);
  }
};

// Example usage
const answer = await queryDocuments(
  "What is our remote work policy?",
  ['doc_123', 'doc_456']
);
```

## Advanced Features

### Document Analysis

```javascript
// Get document insights
const analyzeDocument = async (documentId) => {
  const analysis = await client.analyzeDocument(documentId, {
    extractEntities: true,
    generateSummary: true,
    detectSentiment: true,
    extractKeywords: true
  });
  
  return {
    summary: analysis.summary,
    entities: analysis.entities, // People, organizations, dates
    keywords: analysis.keywords,
    sentiment: analysis.sentiment,
    topics: analysis.topics
  };
};
```

### Batch Processing

```javascript
// Process multiple documents in batch
const batchProcess = async (documentIds, operation) => {
  const batch = await client.createBatch({
    documentIds: documentIds,
    operation: operation, // 'analyze', 'summarize', 'extract'
    options: {
      parallel: true,
      maxConcurrency: 5
    }
  });
  
  // Monitor batch status
  const checkStatus = async () => {
    const status = await client.getBatchStatus(batch.id);
    if (status.completed) {
      return status.results;
    }
    setTimeout(checkStatus, 1000);
  };
  
  return checkStatus();
};
```

### Real-time Updates

```javascript
// Listen for document processing events
client.on('document.processed', (event) => {
  console.log('Document processed:', event.documentId);
  console.log('Status:', event.status);
});

client.on('query.completed', (event) => {
  console.log('Query completed:', event.queryId);
  console.log('Answer:', event.answer);
});

// Error handling
client.on('error', (error) => {
  console.error('SDK Error:', error);
});
```

## Configuration Options

### Client Configuration

```javascript
const client = new VaultiScan({
  // Authentication
  apiKey: 'your-api-key',
  
  // API Settings
  baseUrl: 'https://api.vaultiscan.ai',
  timeout: 30000,
  retryAttempts: 3,
  
  // Upload Settings
  maxFileSize: '50MB',
  allowedTypes: ['.pdf', '.docx', '.txt'],
  chunkSize: '5MB',
  
  // Processing Settings
  defaultModel: 'gpt-4',
  defaultTemperature: 0.1,
  
  // Security Settings
  encryption: true,
  auditLogs: true,
  
  // Debug Settings
  debug: process.env.NODE_ENV === 'development',
  logLevel: 'info'
});
```

### Request Options

```javascript
// Customize individual requests
const customQuery = await client.query({
  question: "Summarize the key points",
  documentIds: ['doc_123'],
  
  // Model settings
  model: 'claude-3-opus',
  temperature: 0.2,
  maxTokens: 2000,
  
  // Processing options
  includeMetadata: true,
  returnSources: true,
  confidenceThreshold: 0.8,
  
  // Response format
  format: 'markdown',
  language: 'en'
});
```

## Error Handling

### Try-Catch Pattern

```javascript
const safeUpload = async (file) => {
  try {
    const result = await client.uploadDocument({ file });
    return { success: true, data: result };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      code: error.code 
    };
  }
};
```

### Error Types

```javascript
client.query("What is our policy?")
  .catch(error => {
    switch (error.code) {
      case 'INVALID_API_KEY':
        console.error('Authentication failed');
        break;
      case 'DOCUMENT_NOT_FOUND':
        console.error('Document does not exist');
        break;
      case 'RATE_LIMITED':
        console.error('Too many requests');
        break;
      case 'FILE_TOO_LARGE':
        console.error('File exceeds size limit');
        break;
      default:
        console.error('Unknown error:', error.message);
    }
  });
```

## Utility Functions

### Document Management

```javascript
// List all documents
const documents = await client.listDocuments({
  limit: 50,
  offset: 0,
  filter: {
    category: 'policy',
    uploadedAfter: '2024-01-01'
  }
});

// Get document details
const document = await client.getDocument('doc_123');

// Delete document
await client.deleteDocument('doc_123');

// Update document metadata
await client.updateDocument('doc_123', {
  metadata: {
    category: 'updated-policy',
    reviewed: true
  }
});
```

### Search and Filtering

```javascript
// Search documents by content
const searchResults = await client.searchDocuments({
  query: 'remote work policy',
  filters: {
    department: 'hr',
    type: 'policy'
  },
  limit: 10
});

// Advanced search with vector similarity
const similarDocs = await client.findSimilar('doc_123', {
  threshold: 0.8,
  limit: 5
});
```

## TypeScript Support

```typescript
import { VaultiScan, UploadOptions, QueryOptions, QueryResponse } from '@vaultiscan/embedding-sdk';

interface DocumentMetadata {
  category: string;
  department: string;
  tags: string[];
}

const client = new VaultiScan({
  apiKey: process.env.VAULTISCAN_API_KEY!
});

const uploadWithTypes = async (file: File): Promise<string> => {
  const options: UploadOptions = {
    file,
    metadata: {
      category: 'policy',
      department: 'hr',
      tags: ['handbook']
    } as DocumentMetadata
  };
  
  const result = await client.uploadDocument(options);
  return result.id;
};

const queryWithTypes = async (question: string): Promise<QueryResponse> => {
  const options: QueryOptions = {
    question,
    model: 'gpt-4',
    temperature: 0.1
  };
  
  return client.query(options);
};
```

## Performance Optimization

### Connection Pooling

```javascript
// Configure connection pooling
const client = new VaultiScan({
  apiKey: 'your-key',
  connectionPool: {
    maxConnections: 10,
    keepAlive: true,
    timeout: 5000
  }
});
```

### Caching

```javascript
// Enable response caching
const client = new VaultiScan({
  apiKey: 'your-key',
  cache: {
    enabled: true,
    ttl: 300, // 5 minutes
    maxSize: 100 // Cache 100 responses
  }
});

// Cache queries for faster repeated access
const cachedQuery = await client.query({
  question: "What is our vacation policy?",
  useCache: true,
  cacheKey: 'vacation-policy'
});
```

## Next Steps

- [React Components](./react-components) - Pre-built React components
- [Vue.js Components](./vue-components) - Vue.js integration
- [Angular Components](./angular-components) - Angular directives
- [API Reference](/docs/api/overview) - Complete API documentation
