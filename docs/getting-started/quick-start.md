---
sidebar_position: 2
---

# Quick Start

Get up and running with VaultiScan Embedding SDK in minutes.

## Prerequisites

Before you begin, ensure you have:
- Node.js 16+ installed
- A VaultiScan account
- API credentials from your dashboard

## Basic Setup

### 1. Install the SDK

```bash
npm install @vaultiscan/embedding-sdk
```

### 2. Initialize the Client

```javascript
import { VaultiScan } from '@vaultiscan/embedding-sdk';

const client = new VaultiScan({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.vaultiscan.ai'
});
```

### 3. Upload and Scan Documents

```javascript
// Upload a document
const uploadResult = await client.uploadDocument({
  file: documentFile,
  metadata: {
    category: 'policy',
    department: 'hr'
  }
});

// Start scanning
const scanResult = await client.startScan({
  documentId: uploadResult.id,
  scanType: 'vulnerability'
});
```

## Your First Query

```javascript
// Ask questions about your documents
const response = await client.query({
  question: "What is our data retention policy?",
  documentIds: [uploadResult.id]
});

console.log(response.answer);
```

## Next Steps

- [Configuration Guide](./configuration) - Customize your setup
- [Authentication](./authentication) - Secure your integration
- [API Reference](/docs/api/overview) - Explore all features
