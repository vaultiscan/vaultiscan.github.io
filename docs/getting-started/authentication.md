---
sidebar_position: 4
---

# Authentication

Secure your VaultiScan Embedding SDK integration with proper authentication.

## API Key Authentication

VaultiScan uses API keys for authentication. Get your API key from the [VaultiScan Dashboard](https://dashboard.vaultiscan.ai).

### API Key Format

```
vs_live_sk_1234567890abcdef  # Production key
vs_test_sk_1234567890abcdef  # Test key
```

## Basic Authentication Setup

```javascript
import { VaultiScan } from '@vaultiscan/embedding-sdk';

const client = new VaultiScan({
  apiKey: 'vs_live_sk_your_api_key_here'
});
```

## Environment-Based Authentication

### Development Environment

```bash
# .env.development
VAULTISCAN_API_KEY=vs_test_sk_development_key
VAULTISCAN_ENVIRONMENT=development
```

### Production Environment

```bash
# .env.production
VAULTISCAN_API_KEY=vs_live_sk_production_key
VAULTISCAN_ENVIRONMENT=production
```

## Server-Side Authentication

For server-side applications, use the full API key:

```javascript
// Node.js/Express example
const express = require('express');
const { VaultiScan } = require('@vaultiscan/embedding-sdk');

const app = express();
const vaultiscan = new VaultiScan({
  apiKey: process.env.VAULTISCAN_API_KEY
});

app.post('/api/upload', async (req, res) => {
  try {
    const result = await vaultiscan.uploadDocument(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
});
```

## Client-Side Authentication

For client-side applications, use a proxy endpoint:

```javascript
// Frontend (React/Vue/Angular)
const client = new VaultiScan({
  baseUrl: '/api/vaultiscan', // Your backend proxy
  // No API key exposed to client
});

// Backend proxy endpoint
app.use('/api/vaultiscan', (req, res) => {
  // Add authentication header
  req.headers.authorization = `Bearer ${process.env.VAULTISCAN_API_KEY}`;
  
  // Proxy to VaultiScan API
  proxy('https://api.vaultiscan.ai')(req, res);
});
```

## JWT Token Authentication

For enhanced security, VaultiScan supports JWT tokens:

```javascript
const jwt = require('jsonwebtoken');

// Generate JWT token
const token = jwt.sign(
  {
    userId: 'user123',
    permissions: ['read', 'write'],
    exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour
  },
  process.env.VAULTISCAN_JWT_SECRET
);

// Use JWT token
const client = new VaultiScan({
  token: token,
  tokenType: 'jwt'
});
```

## OAuth 2.0 Integration

For enterprise applications:

```javascript
// OAuth 2.0 flow
const oauth = new VaultiScanOAuth({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  redirectUri: 'https://yourapp.com/callback'
});

// Get authorization URL
const authUrl = oauth.getAuthorizationUrl();

// Exchange code for token
const token = await oauth.exchangeCodeForToken(authCode);

// Use OAuth token
const client = new VaultiScan({
  token: token.access_token,
  tokenType: 'oauth'
});
```

## Authentication Middleware

### Express.js Middleware

```javascript
const vaultiscanAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const validated = await vaultiscan.validateToken(token);
    req.user = validated.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply middleware
app.use('/api/protected', vaultiscanAuth);
```

## Security Best Practices

### 1. Secure Storage
```javascript
// ✅ Good: Use environment variables
const apiKey = process.env.VAULTISCAN_API_KEY;

// ❌ Bad: Hardcoded in source
const apiKey = 'vs_live_sk_1234567890abcdef';
```

### 2. Token Rotation
```javascript
// Implement automatic token rotation
const rotateApiKey = async () => {
  const newKey = await vaultiscan.rotateApiKey();
  process.env.VAULTISCAN_API_KEY = newKey;
};

// Rotate every 30 days
setInterval(rotateApiKey, 30 * 24 * 60 * 60 * 1000);
```

### 3. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api', limiter);
```

## Error Handling

```javascript
try {
  const result = await client.query('What is our policy?');
} catch (error) {
  switch (error.code) {
    case 'INVALID_API_KEY':
      console.error('API key is invalid or expired');
      break;
    case 'INSUFFICIENT_PERMISSIONS':
      console.error('API key lacks required permissions');
      break;
    case 'RATE_LIMITED':
      console.error('Rate limit exceeded');
      break;
    default:
      console.error('Authentication error:', error.message);
  }
}
```

## Testing Authentication

```javascript
// Test API key validity
const testAuth = async () => {
  try {
    const status = await client.healthCheck();
    console.log('Authentication successful:', status);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

testAuth();
```
