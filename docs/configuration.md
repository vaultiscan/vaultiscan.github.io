# Configuration

Configure VaultiScan Embedding SDK for your application.

## Basic Configuration

The SDK requires minimal configuration to get started:

```javascript
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

const config = {
  apiKey: 'your-api-key',
  environment: 'production', // or 'sandbox'
  region: 'us-east-1'
};

const sdk = new VaultiScanSDK(config);
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | required | Your VaultiScan API key |
| `environment` | string | 'production' | Environment to use |
| `region` | string | 'us-east-1' | AWS region for API calls |
| `timeout` | number | 30000 | Request timeout in milliseconds |
| `retries` | number | 3 | Number of retry attempts |

## Environment Variables

You can also configure the SDK using environment variables:

```bash
VAULTISCAN_API_KEY=your-api-key
VAULTISCAN_ENVIRONMENT=production
VAULTISCAN_REGION=us-east-1
```

## Advanced Configuration

### Custom Endpoints

```javascript
const config = {
  apiKey: 'your-api-key',
  endpoints: {
    api: 'https://api.vaultiscan.com',
    auth: 'https://auth.vaultiscan.com'
  }
};
```

### Logging Configuration

```javascript
const config = {
  apiKey: 'your-api-key',
  logging: {
    level: 'debug', // 'error', 'warn', 'info', 'debug'
    console: true,
    remote: false
  }
};
```

## Next Steps

- [Authentication →](./authentication)
- [Quick Start Guide →](./getting-started/quick-start)
