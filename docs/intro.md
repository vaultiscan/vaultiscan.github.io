---
sidebar_position: 1
---

# VaultiScan Embedding SDK

Welcome to the **VaultiScan Embedding SDK Documentation**! Transform your applications with AI-powered document analysis and secure instant answers from your own data.

## What is VaultiScan Embedding SDK?

The VaultiScan Embedding SDK brings the power of [VaultiScan](https://vaultiscan.ai) directly into your applications. Built for developers who need secure, intelligent document processing, our SDK enables you to:

**🔍 Get instant answers** from your documents without manual searching  
**📊 Process large volumes** of files across departments efficiently  
**🔒 Maintain enterprise-grade security** with encrypted, private data handling  
**⚡ Scale effortlessly** across teams and use cases  

## Core Capabilities

### 🤖 **AI-Powered Document Analysis**
Upload documents and ask natural language questions to get instant, accurate answers. Powered by leading AI models including GPT-4, Claude 3, Gemini, and more.

### � **Smart Document Management**
- **Drag & drop upload** with automatic processing
- **Multi-format support**: PDF, DOCX, TXT, images with OCR
- **Intelligent categorization** and metadata extraction
- **Version control** and audit trails

### 🔐 **Enterprise Security**
- **Zero-knowledge architecture** - your data stays private
- **End-to-end encryption** in transit and at rest
- **SOC 2 Type II compliant** with GDPR support
- **Role-based access control** and audit logging

### ⚡ **Real-Time Processing**
- **Instant upload** and processing
- **Sub-second query responses** 
- **Concurrent processing** for high-volume operations
- **WebSocket support** for real-time updates

## Getting Started

Choose your preferred integration method:

### Quick Start Options

```bash
# Install via npm
npm install @vaultiscan/embedding-sdk

# Install via yarn
yarn add @vaultiscan/embedding-sdk
```

### Framework-Specific Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="react" label="React" default>

```jsx
import { VaultiScanProvider, SecurityScanner } from '@vaultiscan/react-sdk';

function App() {
  return (
    <VaultiScanProvider apiKey="your-api-key">
      <SecurityScanner projectId="your-project-id" />
    </VaultiScanProvider>
  );
}
```

  </TabItem>
  <TabItem value="vue" label="Vue.js">

```vue
<template>
  <VaultiScanScanner :project-id="projectId" />
</template>

<script>
import { VaultiScanScanner } from '@vaultiscan/vue-sdk';

export default {
  components: { VaultiScanScanner },
  data() {
    return {
      projectId: 'your-project-id'
    };
  }
};
</script>
```

  </TabItem>
  <TabItem value="angular" label="Angular">

```typescript
import { Component } from '@angular/core';
import { VaultiScanModule } from '@vaultiscan/angular-sdk';

@Component({
  selector: 'app-security',
  template: '<vaultiscan-scanner [projectId]="projectId"></vaultiscan-scanner>'
})
export class SecurityComponent {
  projectId = 'your-project-id';
}
```

  </TabItem>
</Tabs>

## Next Steps

1. **[Installation Guide](./getting-started/installation)** - Set up the SDK in your environment
2. **[Quick Start](./getting-started/quick-start)** - Get your first scan running in minutes
3. **[Configuration](./getting-started/configuration)** - Customize the SDK for your needs
4. **[API Reference](./api/overview)** - Explore all available methods and components

## Need Help?

- 📖 **Documentation**: Browse our comprehensive guides
- 🐛 **Issues**: Report bugs on [GitHub](https://github.com/vaultiscan/embedding-sdk-docs/issues)
- 💬 **Support**: Contact our support team at support@vaultiscan.com
- 🚀 **Examples**: Check out our [example applications](./examples/basic-integration)

---

Ready to secure your applications? Let's get started with the [Installation Guide](./getting-started/installation)!
