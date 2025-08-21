---
sidebar_position: 3
---

# Configuration

Configure VaultiScan Embedding SDK for your specific needs.

## Environment Variables

Set up your environment variables for secure configuration:

```bash
# .env
VAULTISCAN_API_KEY=your_api_key_here
VAULTISCAN_BASE_URL=https://api.vaultiscan.ai
VAULTISCAN_ENVIRONMENT=production
VAULTISCAN_MAX_FILE_SIZE=50MB
VAULTISCAN_TIMEOUT=30000
```

## SDK Configuration Options

```javascript
const config = {
  apiKey: process.env.VAULTISCAN_API_KEY,
  baseUrl: process.env.VAULTISCAN_BASE_URL || 'https://api.vaultiscan.ai',
  
  // Upload settings
  maxFileSize: '50MB',
  allowedFileTypes: ['.pdf', '.docx', '.txt', '.md'],
  
  // Security settings
  encryption: true,
  auditLogs: true,
  
  // Performance settings
  timeout: 30000,
  retryAttempts: 3,
  
  // AI Model settings
  defaultModel: 'gpt-4',
  temperature: 0.1,
  maxTokens: 4000
};
```

## Document Processing Settings

```javascript
const processingConfig = {
  // OCR settings for scanned documents
  ocr: {
    enabled: true,
    language: 'en',
    confidence: 0.8
  },
  
  // Text extraction
  extraction: {
    preserveFormatting: true,
    extractMetadata: true,
    detectLanguage: true
  },
  
  // Classification
  classification: {
    autoClassify: true,
    confidenceThreshold: 0.7
  }
};
```

## Advanced Configuration

### Custom Endpoints

```javascript
const client = new VaultiScan({
  apiKey: 'your-key',
  endpoints: {
    upload: '/custom/upload',
    query: '/custom/query',
    scan: '/custom/scan'
  }
});
```

### Webhook Configuration

```javascript
const webhookConfig = {
  url: 'https://your-domain.com/webhooks/vaultiscan',
  events: ['scan.completed', 'document.processed'],
  secret: 'your-webhook-secret'
};
```

## Framework-Specific Configurations

### React Configuration

```jsx
// vaultiscan.config.js
export default {
  provider: {
    apiKey: process.env.REACT_APP_VAULTISCAN_API_KEY,
    theme: {
      primaryColor: '#6366f1',
      borderRadius: '8px'
    }
  }
};
```

### Vue.js Configuration

```javascript
// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@vaultiscan': '@vaultiscan/vue-sdk'
      }
    }
  }
};
```

## Security Best Practices

1. **Never expose API keys** in client-side code
2. **Use environment variables** for sensitive configuration
3. **Enable audit logging** for compliance
4. **Configure proper CORS** settings
5. **Use HTTPS** for all API calls

## Troubleshooting

### Common Configuration Issues

**Issue**: Authentication failed
```javascript
// Solution: Verify API key format
const client = new VaultiScan({
  apiKey: 'vs_live_...' // Must start with vs_live_ or vs_test_
});
```

**Issue**: Large file uploads failing
```javascript
// Solution: Adjust timeout and chunk size
const config = {
  timeout: 60000, // 60 seconds
  chunkSize: '5MB'
};
```
