# Vue Components

Pre-built Vue.js components for integrating VaultiScan into your Vue applications.

## Installation

```bash
npm install @vaultiscan/vue-components
```

## Setup

### Vue 3

```javascript
import { createApp } from 'vue';
import VaultiScanVue from '@vaultiscan/vue-components';
import App from './App.vue';

const app = createApp(App);
app.use(VaultiScanVue);
app.mount('#app');
```

### Vue 2

```javascript
import Vue from 'vue';
import VaultiScanVue from '@vaultiscan/vue-components/vue2';
import App from './App.vue';

Vue.use(VaultiScanVue);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

## Quick Start

```vue
<template>
  <div>
    <h1>Security Dashboard</h1>
    <VulnerabilityScanner
      :api-key="apiKey"
      :target="targetUrl"
      @scan-complete="onScanComplete"
    />
    <SecurityDashboard :scan-id="scanId" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiKey: 'your-api-key',
      targetUrl: 'https://api.example.com',
      scanId: null
    };
  },
  methods: {
    onScanComplete(results) {
      this.scanId = results.scanId;
      console.log('Scan completed:', results);
    }
  }
};
</script>
```

## Components

### VulnerabilityScanner

Interactive vulnerability scanner component.

```vue
<template>
  <VulnerabilityScanner
    :api-key="apiKey"
    :target="target"
    :scan-type="scanType"
    :auto-start="true"
    :show-progress="true"
    @scan-start="onScanStart"
    @progress="onProgress"
    @scan-complete="onScanComplete"
    @error="onError"
  />
</template>

<script>
export default {
  data() {
    return {
      apiKey: 'your-api-key',
      target: 'https://example.com',
      scanType: 'web'
    };
  },
  methods: {
    onScanStart(scan) {
      console.log('Scan started:', scan.id);
    },
    onProgress(progress) {
      console.log('Progress:', progress.percentage);
    },
    onScanComplete(results) {
      console.log('Results:', results);
    },
    onError(error) {
      console.error('Error:', error);
    }
  }
};
</script>
```

**Props:**
- `api-key` (String, required): VaultiScan API key
- `target` (String, required): Target URL to scan
- `scan-type` (String): 'web', 'api', or 'infrastructure'
- `auto-start` (Boolean): Start scan automatically
- `show-progress` (Boolean): Show progress indicator

**Events:**
- `scan-start`: Emitted when scan starts
- `progress`: Emitted for progress updates
- `scan-complete`: Emitted when scan completes
- `error`: Emitted on errors

### SecurityDashboard

Comprehensive security dashboard displaying scan results.

```vue
<template>
  <SecurityDashboard
    :scan-id="scanId"
    :show-summary="true"
    :show-vulnerabilities="true"
    :show-recommendations="true"
    :theme="theme"
    @vulnerability-click="onVulnerabilityClick"
  />
</template>

<script>
export default {
  data() {
    return {
      scanId: 'scan_123',
      theme: 'light'
    };
  },
  methods: {
    onVulnerabilityClick(vulnerability) {
      this.showVulnerabilityDetails(vulnerability);
    },
    showVulnerabilityDetails(vuln) {
      // Handle vulnerability details
    }
  }
};
</script>
```

**Props:**
- `scan-id` (String, required): Scan ID to display
- `show-summary` (Boolean): Show summary statistics
- `show-vulnerabilities` (Boolean): Show vulnerability list
- `show-recommendations` (Boolean): Show remediation recommendations
- `theme` (String): 'light' or 'dark'

**Events:**
- `vulnerability-click`: Emitted when vulnerability is clicked

### VulnerabilityList

Displays a list of vulnerabilities with filtering and sorting.

```vue
<template>
  <VulnerabilityList
    :vulnerabilities="vulnerabilities"
    :show-filters="true"
    :sort-by="sortBy"
    :group-by="groupBy"
    :items-per-page="20"
    @item-click="onItemClick"
  />
</template>

<script>
export default {
  data() {
    return {
      vulnerabilities: [],
      sortBy: 'severity',
      groupBy: 'category'
    };
  },
  methods: {
    onItemClick(vulnerability) {
      console.log('Clicked:', vulnerability);
    }
  }
};
</script>
```

**Props:**
- `vulnerabilities` (Array, required): Array of vulnerability objects
- `show-filters` (Boolean): Show filter controls
- `sort-by` (String): Default sort field
- `group-by` (String): Group vulnerabilities by field
- `items-per-page` (Number): Pagination size

**Events:**
- `item-click`: Emitted when item is clicked

### VulnerabilityCard

Individual vulnerability display card.

```vue
<template>
  <VulnerabilityCard
    :vulnerability="vulnerability"
    :show-details="true"
    :show-evidence="false"
    @remediate="onRemediate"
  />
</template>

<script>
export default {
  props: {
    vulnerability: {
      type: Object,
      required: true
    }
  },
  methods: {
    onRemediate(vulnerability) {
      // Handle remediation
    }
  }
};
</script>
```

**Props:**
- `vulnerability` (Object, required): Vulnerability object
- `show-details` (Boolean): Show detailed information
- `show-evidence` (Boolean): Show evidence section

**Events:**
- `remediate`: Emitted for remediation action

### ScanProgress

Progress indicator for ongoing scans.

```vue
<template>
  <ScanProgress
    :scan-id="scanId"
    :show-percentage="true"
    :show-phase="true"
    :show-time-remaining="true"
    :animated="true"
  />
</template>

<script>
export default {
  data() {
    return {
      scanId: 'scan_123'
    };
  }
};
</script>
```

**Props:**
- `scan-id` (String, required): Scan ID to track
- `show-percentage` (Boolean): Show percentage complete
- `show-phase` (Boolean): Show current scan phase
- `show-time-remaining` (Boolean): Show estimated time remaining
- `animated` (Boolean): Enable animations

## Composition API (Vue 3)

### useVulnerabilityScanner

Composable for programmatic scan control.

```vue
<template>
  <div>
    <button @click="handleStartScan" :disabled="scanState === 'running'">
      {{ scanState === 'running' ? 'Scanning...' : 'Start Scan' }}
    </button>
    <div v-if="error" class="error">{{ error.message }}</div>
    <div v-if="results">
      Found {{ results.vulnerabilities.length }} vulnerabilities
    </div>
  </div>
</template>

<script>
import { useVulnerabilityScanner } from '@vaultiscan/vue-components';

export default {
  setup() {
    const {
      startScan,
      stopScan,
      scanState,
      results,
      error
    } = useVulnerabilityScanner({
      apiKey: 'your-api-key'
    });

    const handleStartScan = async () => {
      await startScan({
        target: 'https://example.com',
        type: 'web'
      });
    };

    return {
      handleStartScan,
      scanState,
      results,
      error
    };
  }
};
</script>
```

### useScanResults

Composable for fetching and managing scan results.

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <button @click="refresh">Refresh</button>
      <VulnerabilityList :vulnerabilities="results.vulnerabilities" />
    </div>
  </div>
</template>

<script>
import { useScanResults } from '@vaultiscan/vue-components';

export default {
  props: {
    scanId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {
      results,
      loading,
      error,
      refresh
    } = useScanResults(props.scanId);

    return {
      results,
      loading,
      error,
      refresh
    };
  }
};
</script>
```

### useMonitoring

Composable for real-time monitoring.

```vue
<template>
  <div>
    <div v-for="monitor in monitors" :key="monitor.id">
      <h3>{{ monitor.name }}</h3>
      <span>Status: {{ monitor.status }}</span>
      <button @click="stopMonitoring(monitor.id)">Stop</button>
    </div>
  </div>
</template>

<script>
import { useMonitoring } from '@vaultiscan/vue-components';

export default {
  setup() {
    const {
      monitors,
      startMonitoring,
      stopMonitoring,
      status
    } = useMonitoring({
      apiKey: 'your-api-key'
    });

    return {
      monitors,
      startMonitoring,
      stopMonitoring,
      status
    };
  }
};
</script>
```

## Styling and Themes

### CSS Classes

```css
/* Vulnerability severity styles */
.vaultiscan-severity-critical {
  color: #dc2626;
  background: #fef2f2;
}

.vaultiscan-severity-high {
  color: #ea580c;
  background: #fff7ed;
}

.vaultiscan-severity-medium {
  color: #d97706;
  background: #fffbeb;
}

.vaultiscan-severity-low {
  color: #65a30d;
  background: #f7fee7;
}

/* Component styles */
.vaultiscan-dashboard {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}

.vaultiscan-vulnerability-card {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.5rem;
}
```

### Custom Themes

```vue
<template>
  <VaultiScanProvider :theme="customTheme">
    <SecurityDashboard :scan-id="scanId" />
  </VaultiScanProvider>
</template>

<script>
export default {
  data() {
    return {
      scanId: 'scan_123',
      customTheme: {
        colors: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          critical: '#dc2626',
          high: '#ea580c',
          medium: '#d97706',
          low: '#65a30d'
        },
        spacing: {
          small: '0.5rem',
          medium: '1rem',
          large: '1.5rem'
        },
        fonts: {
          body: 'Inter, system-ui, sans-serif',
          mono: 'Monaco, Consolas, monospace'
        }
      }
    };
  }
};
</script>
```

## Advanced Usage

### Custom Vulnerability Renderer

```vue
<template>
  <VulnerabilityList
    :vulnerabilities="vulnerabilities"
    #default="{ vulnerability, onClick }"
  >
    <div 
      :class="`custom-vuln severity-${vulnerability.severity}`"
      @click="onClick(vulnerability)"
    >
      <h4>{{ vulnerability.title }}</h4>
      <p>CVSS: {{ vulnerability.cvss.score }}</p>
      <span class="category">{{ vulnerability.category }}</span>
    </div>
  </VulnerabilityList>
</template>
```

### Integration with Vuex

```vue
<template>
  <VulnerabilityScanner
    :api-key="apiKey"
    :target="targetUrl"
    @scan-complete="setScanResults"
    @error="setScanError"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('security', ['apiKey', 'targetUrl'])
  },
  methods: {
    ...mapMutations('security', ['setScanResults', 'setScanError'])
  }
};
</script>
```

### Integration with Pinia (Vue 3)

```vue
<template>
  <VulnerabilityScanner
    :api-key="securityStore.apiKey"
    :target="securityStore.targetUrl"
    @scan-complete="securityStore.setScanResults"
    @error="securityStore.setScanError"
  />
</template>

<script>
import { useSecurityStore } from '@/stores/security';

export default {
  setup() {
    const securityStore = useSecurityStore();

    return {
      securityStore
    };
  }
};
</script>
```

## TypeScript Support

All components include TypeScript definitions for Vue 3:

```vue
<template>
  <VulnerabilityScanner
    :api-key="apiKey"
    :target="target"
    @scan-complete="handleScanComplete"
  />
</template>

<script setup lang="ts">
import type { ScanResults } from '@vaultiscan/vue-components';

interface Props {
  apiKey: string;
  target: string;
}

const props = defineProps<Props>();

const handleScanComplete = (results: ScanResults) => {
  console.log(`Found ${results.vulnerabilities.length} vulnerabilities`);
};
</script>
```

## Nuxt.js Integration

### Plugin Setup

Create `plugins/vaultiscan.client.js`:

```javascript
import VaultiScanVue from '@vaultiscan/vue-components';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VaultiScanVue);
});
```

### Component Usage

```vue
<template>
  <div>
    <ClientOnly>
      <VulnerabilityScanner
        :api-key="$config.vaultiscanApiKey"
        :target="targetUrl"
        @scan-complete="onScanComplete"
      />
    </ClientOnly>
  </div>
</template>

<script>
export default {
  data() {
    return {
      targetUrl: 'https://example.com'
    };
  },
  methods: {
    onScanComplete(results) {
      console.log('Scan completed:', results);
    }
  }
};
</script>
```

## Next Steps

- [Angular Components →](./angular-components)
- [React Components →](./react-components)
- [JavaScript SDK →](./javascript-sdk)
