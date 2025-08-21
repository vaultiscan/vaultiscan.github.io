---
sidebar_position: 1
---

# Installation

Get started with the VaultiScan Embedding SDK by installing it in your project.

## Prerequisites

Before installing the VaultiScan Embedding SDK, ensure you have:

- **Node.js** 16.0 or higher
- **npm** 7.0 or higher (or **yarn** 1.22+)
- A VaultiScan account with API access
- A valid API key from your VaultiScan dashboard

## Installation Methods

### NPM Installation

```bash
npm install @vaultiscan/embedding-sdk
```

### Yarn Installation

```bash
yarn add @vaultiscan/embedding-sdk
```

### CDN Installation

For quick prototyping or simple integrations, you can include the SDK directly from our CDN:

```html
<script src="https://cdn.vaultiscan.com/sdk/v2/vaultiscan-sdk.min.js"></script>
```

## Framework-Specific Packages

### React

```bash
npm install @vaultiscan/react-sdk
```

### Vue.js

```bash
npm install @vaultiscan/vue-sdk
```

### Angular

```bash
npm install @vaultiscan/angular-sdk
```

## Environment Setup

### 1. API Key Configuration

Create a `.env` file in your project root:

```bash
# .env
VAULTISCAN_API_KEY=your_api_key_here
VAULTISCAN_PROJECT_ID=your_project_id_here
VAULTISCAN_ENVIRONMENT=production # or 'development'
```

### 2. TypeScript Support

If you're using TypeScript, install the type definitions:

```bash
npm install --save-dev @types/vaultiscan-sdk
```

### 3. Webpack Configuration (if needed)

For custom webpack setups, you may need to configure module resolution:

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@vaultiscan/sdk': require.resolve('@vaultiscan/embedding-sdk')
    }
  }
};
```

## Verification

Verify your installation by creating a simple test file:

```javascript
// test-installation.js
import { VaultiScan } from '@vaultiscan/embedding-sdk';

const scanner = new VaultiScan({
  apiKey: process.env.VAULTISCAN_API_KEY,
  projectId: process.env.VAULTISCAN_PROJECT_ID
});

scanner.initialize()
  .then(() => {
    console.log('✅ VaultiScan SDK installed successfully!');
  })
  .catch((error) => {
    console.error('❌ Installation verification failed:', error);
  });
```

Run the test:

```bash
node test-installation.js
```

## Common Issues

### Module Not Found Error

If you encounter module resolution issues:

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Compilation Errors

Ensure your `tsconfig.json` includes the necessary module resolution:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### CORS Issues

For browser-based applications, ensure your domain is whitelisted in your VaultiScan dashboard settings.

## Next Steps

Now that you have the SDK installed, continue with:

- **[Quick Start Guide](./quick-start)** - Get your first scan running
- **[Configuration](./configuration)** - Customize the SDK settings
- **[Authentication](./authentication)** - Set up secure API authentication
