# React Components

Pre-built React components for integrating VaultiScan into your React applications.

## Installation

```bash
npm install @vaultiscan/react-components
```

## Quick Start

```jsx
import React from 'react';
import { VulnerabilityScanner, SecurityDashboard } from '@vaultiscan/react-components';

function App() {
  return (
    <div>
      <h1>Security Dashboard</h1>
      <VulnerabilityScanner
        apiKey="your-api-key"
        target="https://api.example.com"
        onScanComplete={(results) => console.log(results)}
      />
      <SecurityDashboard scanId="scan_123" />
    </div>
  );
}

export default App;
```

## Components

### VulnerabilityScanner

Interactive vulnerability scanner component.

```jsx
import { VulnerabilityScanner } from '@vaultiscan/react-components';

<VulnerabilityScanner
  apiKey="your-api-key"
  target="https://example.com"
  scanType="web"
  autoStart={true}
  showProgress={true}
  onScanStart={(scan) => console.log('Scan started:', scan.id)}
  onProgress={(progress) => console.log('Progress:', progress.percentage)}
  onScanComplete={(results) => console.log('Results:', results)}
  onError={(error) => console.error('Error:', error)}
/>
```

**Props:**
- `apiKey` (string, required): VaultiScan API key
- `target` (string, required): Target URL to scan
- `scanType` (string): 'web', 'api', or 'infrastructure'
- `autoStart` (boolean): Start scan automatically
- `showProgress` (boolean): Show progress indicator
- `onScanStart` (function): Callback when scan starts
- `onProgress` (function): Callback for progress updates
- `onScanComplete` (function): Callback when scan completes
- `onError` (function): Callback for errors

### SecurityDashboard

Comprehensive security dashboard displaying scan results.

```jsx
import { SecurityDashboard } from '@vaultiscan/react-components';

<SecurityDashboard
  scanId="scan_123"
  showSummary={true}
  showVulnerabilities={true}
  showRecommendations={true}
  theme="light"
  onVulnerabilityClick={(vuln) => showDetails(vuln)}
/>
```

**Props:**
- `scanId` (string, required): Scan ID to display
- `showSummary` (boolean): Show summary statistics
- `showVulnerabilities` (boolean): Show vulnerability list
- `showRecommendations` (boolean): Show remediation recommendations
- `theme` (string): 'light' or 'dark'
- `onVulnerabilityClick` (function): Callback when vulnerability is clicked

### VulnerabilityList

Displays a list of vulnerabilities with filtering and sorting.

```jsx
import { VulnerabilityList } from '@vaultiscan/react-components';

<VulnerabilityList
  vulnerabilities={vulnerabilities}
  showFilters={true}
  sortBy="severity"
  groupBy="category"
  itemsPerPage={20}
  onItemClick={(vuln) => showDetails(vuln)}
/>
```

**Props:**
- `vulnerabilities` (array, required): Array of vulnerability objects
- `showFilters` (boolean): Show filter controls
- `sortBy` (string): Default sort field
- `groupBy` (string): Group vulnerabilities by field
- `itemsPerPage` (number): Pagination size
- `onItemClick` (function): Callback when item is clicked

### VulnerabilityCard

Individual vulnerability display card.

```jsx
import { VulnerabilityCard } from '@vaultiscan/react-components';

<VulnerabilityCard
  vulnerability={vulnerability}
  showDetails={true}
  showEvidence={false}
  onRemediate={(vuln) => handleRemediation(vuln)}
/>
```

**Props:**
- `vulnerability` (object, required): Vulnerability object
- `showDetails` (boolean): Show detailed information
- `showEvidence` (boolean): Show evidence section
- `onRemediate` (function): Callback for remediation action

### ScanProgress

Progress indicator for ongoing scans.

```jsx
import { ScanProgress } from '@vaultiscan/react-components';

<ScanProgress
  scanId="scan_123"
  showPercentage={true}
  showPhase={true}
  showTimeRemaining={true}
  animated={true}
/>
```

**Props:**
- `scanId` (string, required): Scan ID to track
- `showPercentage` (boolean): Show percentage complete
- `showPhase` (boolean): Show current scan phase
- `showTimeRemaining` (boolean): Show estimated time remaining
- `animated` (boolean): Enable animations

### SecurityMetrics

Display security metrics and KPIs.

```jsx
import { SecurityMetrics } from '@vaultiscan/react-components';

<SecurityMetrics
  scanId="scan_123"
  metrics={['vulnerability_count', 'security_score', 'risk_level']}
  layout="grid"
  showTrends={true}
/>
```

**Props:**
- `scanId` (string, required): Scan ID for metrics
- `metrics` (array): Metrics to display
- `layout` (string): 'grid', 'list', or 'compact'
- `showTrends` (boolean): Show trend indicators

## Hooks

### useVulnerabilityScanner

Hook for programmatic scan control.

```jsx
import { useVulnerabilityScanner } from '@vaultiscan/react-components';

function CustomScanner() {
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

  return (
    <div>
      <button onClick={handleStartScan} disabled={scanState === 'running'}>
        {scanState === 'running' ? 'Scanning...' : 'Start Scan'}
      </button>
      {error && <div className="error">{error.message}</div>}
      {results && <div>Found {results.vulnerabilities.length} vulnerabilities</div>}
    </div>
  );
}
```

### useScanResults

Hook for fetching and managing scan results.

```jsx
import { useScanResults } from '@vaultiscan/react-components';

function ResultsViewer({ scanId }) {
  const {
    results,
    loading,
    error,
    refresh
  } = useScanResults(scanId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refresh}>Refresh</button>
      <VulnerabilityList vulnerabilities={results.vulnerabilities} />
    </div>
  );
}
```

### useMonitoring

Hook for real-time monitoring.

```jsx
import { useMonitoring } from '@vaultiscan/react-components';

function MonitoringDashboard() {
  const {
    monitors,
    startMonitoring,
    stopMonitoring,
    status
  } = useMonitoring({
    apiKey: 'your-api-key'
  });

  return (
    <div>
      {monitors.map(monitor => (
        <div key={monitor.id}>
          <h3>{monitor.name}</h3>
          <span>Status: {monitor.status}</span>
          <button onClick={() => stopMonitoring(monitor.id)}>
            Stop
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Styling and Themes

### CSS Classes

The components use CSS classes that you can customize:

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

```jsx
import { ThemeProvider } from '@vaultiscan/react-components';

const customTheme = {
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
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <SecurityDashboard scanId="scan_123" />
    </ThemeProvider>
  );
}
```

## Advanced Usage

### Custom Vulnerability Renderer

```jsx
import { VulnerabilityList } from '@vaultiscan/react-components';

function CustomVulnerabilityItem({ vulnerability, onClick }) {
  return (
    <div 
      className={`custom-vuln severity-${vulnerability.severity}`}
      onClick={() => onClick(vulnerability)}
    >
      <h4>{vulnerability.title}</h4>
      <p>CVSS: {vulnerability.cvss.score}</p>
      <span className="category">{vulnerability.category}</span>
    </div>
  );
}

<VulnerabilityList
  vulnerabilities={vulnerabilities}
  renderItem={CustomVulnerabilityItem}
/>
```

### Integration with State Management

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { VulnerabilityScanner } from '@vaultiscan/react-components';
import { setScanResults, setScanError } from './store/securitySlice';

function ConnectedScanner() {
  const dispatch = useDispatch();
  const { apiKey, targetUrl } = useSelector(state => state.security);

  return (
    <VulnerabilityScanner
      apiKey={apiKey}
      target={targetUrl}
      onScanComplete={(results) => dispatch(setScanResults(results))}
      onError={(error) => dispatch(setScanError(error))}
    />
  );
}
```

## TypeScript Support

All components include TypeScript definitions:

```tsx
import React from 'react';
import { VulnerabilityScanner, ScanResults } from '@vaultiscan/react-components';

interface Props {
  apiKey: string;
  target: string;
}

const SecurityApp: React.FC<Props> = ({ apiKey, target }) => {
  const handleScanComplete = (results: ScanResults) => {
    console.log(`Found ${results.vulnerabilities.length} vulnerabilities`);
  };

  return (
    <VulnerabilityScanner
      apiKey={apiKey}
      target={target}
      onScanComplete={handleScanComplete}
    />
  );
};
```

## Next Steps

- [Vue Components →](./vue-components)
- [Angular Components →](./angular-components)
- [JavaScript SDK →](./javascript-sdk)
