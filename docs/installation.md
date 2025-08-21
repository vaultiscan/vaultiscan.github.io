# Installation

Get started with VaultiScan Embedding SDK in minutes.

## System Requirements

- Node.js 16.x or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation Methods

### Using npm

```bash
npm install @vaultiscan/embedding-sdk
```

### Using yarn

```bash
yarn add @vaultiscan/embedding-sdk
```

### Using CDN

```html
<script src="https://cdn.vaultiscan.com/embedding-sdk/latest/vaultiscan-sdk.min.js"></script>
```

## Verify Installation

Once installed, verify the SDK is working:

```javascript
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

const sdk = new VaultiScanSDK({
  apiKey: 'your-api-key'
});

console.log('VaultiScan SDK Version:', sdk.version);
```

## Next Steps

- [Configuration →](./configuration)
- [Authentication →](./authentication)
- [Quick Start Guide →](./getting-started/quick-start)
