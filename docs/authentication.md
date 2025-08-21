# Authentication

Learn how to authenticate with VaultiScan Embedding SDK.

## API Key Authentication

The simplest way to authenticate is using your API key:

```javascript
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

const sdk = new VaultiScanSDK({
  apiKey: 'vs_live_abc123...'
});
```

## Getting Your API Key

1. Log in to your [VaultiScan Dashboard](https://dashboard.vaultiscan.com)
2. Navigate to **Settings** → **API Keys**
3. Click **Generate New Key**
4. Copy the key and store it securely

## JWT Token Authentication

For enhanced security, use JWT tokens:

```javascript
const sdk = new VaultiScanSDK({
  auth: {
    type: 'jwt',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
});
```

## OAuth 2.0 Authentication

For user-based authentication:

```javascript
const sdk = new VaultiScanSDK({
  auth: {
    type: 'oauth',
    clientId: 'your-client-id',
    redirectUri: 'https://yourapp.com/callback'
  }
});

// Initiate OAuth flow
await sdk.auth.login();
```

## Environment-based Authentication

Use different authentication methods per environment:

```javascript
const config = {
  development: {
    apiKey: 'vs_test_123...'
  },
  production: {
    auth: {
      type: 'jwt',
      token: process.env.VAULTISCAN_JWT_TOKEN
    }
  }
};

const sdk = new VaultiScanSDK(config[process.env.NODE_ENV]);
```

## Security Best Practices

- **Never expose API keys** in client-side code
- **Use environment variables** for sensitive data
- **Implement token refresh** for long-running applications
- **Use HTTPS** for all API communications

## Troubleshooting

### Common Authentication Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid API key | Check your API key |
| `403 Forbidden` | Insufficient permissions | Contact support |
| `429 Rate Limited` | Too many requests | Implement retry logic |

## Next Steps

- [Quick Start Guide →](./getting-started/quick-start)
- [API Reference →](./api)
