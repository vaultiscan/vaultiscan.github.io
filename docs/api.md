# API Reference

Complete reference for the VaultiScan Embedding SDK API.

## Overview

The VaultiScan API provides programmatic access to all security scanning and monitoring capabilities. The SDK wraps these APIs in an easy-to-use JavaScript interface.

## Base URL

```
https://api.vaultiscan.com/v1
```

## Authentication

All API requests require authentication using your API key:

```javascript
const sdk = new VaultiScanSDK({
  apiKey: 'vs_live_abc123...'
});
```

## Core API Classes

### VaultiScanSDK

Main SDK instance for accessing all functionality.

```javascript
const sdk = new VaultiScanSDK(config);
```

**Parameters:**
- `config` (object): Configuration options
  - `apiKey` (string, required): Your VaultiScan API key
  - `environment` (string): 'production' or 'sandbox'
  - `timeout` (number): Request timeout in milliseconds

### Vulnerabilities API

#### scan(options)

Start a new vulnerability scan.

```javascript
const scan = await sdk.vulnerabilities.scan({
  target: 'https://example.com',
  type: 'web',
  options: {
    depth: 'deep',
    authentication: {
      type: 'basic',
      username: 'user',
      password: 'pass'
    }
  }
});
```

**Parameters:**
- `target` (string, required): URL to scan
- `type` (string, required): Scan type ('web', 'api', 'infrastructure')
- `options` (object): Scan configuration
  - `depth` (string): 'quick', 'standard', 'deep'
  - `authentication` (object): Authentication details
  - `userAgent` (string): Custom user agent
  - `headers` (object): Custom headers

**Returns:** `Promise<Scan>`

#### getResults(scanId)

Get results from a completed scan.

```javascript
const results = await sdk.vulnerabilities.getResults('scan_123');
```

**Parameters:**
- `scanId` (string, required): Scan ID

**Returns:** `Promise<ScanResults>`

#### getById(vulnerabilityId)

Get details for a specific vulnerability.

```javascript
const vulnerability = await sdk.vulnerabilities.getById('vuln_123');
```

**Parameters:**
- `vulnerabilityId` (string, required): Vulnerability ID

**Returns:** `Promise<Vulnerability>`

### Monitoring API

#### start(config)

Start continuous monitoring.

```javascript
const monitor = await sdk.monitoring.start({
  targets: ['https://api.example.com'],
  interval: '1h',
  checks: ['vulnerabilities', 'ssl', 'performance']
});
```

**Parameters:**
- `targets` (array, required): URLs to monitor
- `interval` (string, required): Check interval ('5m', '1h', '1d')
- `checks` (array, required): Types of checks to perform

**Returns:** `Promise<Monitor>`

#### stop(monitorId)

Stop monitoring.

```javascript
await sdk.monitoring.stop('monitor_123');
```

**Parameters:**
- `monitorId` (string, required): Monitor ID

**Returns:** `Promise<void>`

#### getStatus(monitorId)

Get current monitoring status.

```javascript
const status = await sdk.monitoring.getStatus('monitor_123');
```

**Parameters:**
- `monitorId` (string, required): Monitor ID

**Returns:** `Promise<MonitorStatus>`

### Reports API

#### generate(config)

Generate a security report.

```javascript
const report = await sdk.reports.generate({
  scanId: 'scan_123',
  format: 'pdf',
  type: 'executive'
});
```

**Parameters:**
- `scanId` (string, required): Scan ID
- `format` (string, required): Report format ('pdf', 'html', 'json')
- `type` (string, required): Report type ('executive', 'technical', 'compliance')

**Returns:** `Promise<Report>`

#### schedule(config)

Schedule recurring reports.

```javascript
const schedule = await sdk.reports.schedule({
  name: 'Weekly Security Report',
  frequency: 'weekly',
  config: { type: 'executive', format: 'pdf' }
});
```

**Parameters:**
- `name` (string, required): Schedule name
- `frequency` (string, required): Schedule frequency
- `config` (object, required): Report configuration

**Returns:** `Promise<ReportSchedule>`

### Integrations API

#### slack.configure(config)

Configure Slack integration.

```javascript
await sdk.integrations.slack.configure({
  webhookUrl: 'https://hooks.slack.com/services/...',
  channel: '#security'
});
```

#### jira.createTicket(ticket)

Create a JIRA ticket.

```javascript
const ticket = await sdk.integrations.jira.createTicket({
  summary: 'Security vulnerability found',
  description: 'Detailed description',
  priority: 'High'
});
```

### Webhooks API

#### create(config)

Create a webhook endpoint.

```javascript
const webhook = await sdk.webhooks.create({
  url: 'https://yourapp.com/webhooks',
  events: ['vulnerability.found'],
  secret: 'webhook-secret'
});
```

**Parameters:**
- `url` (string, required): Webhook endpoint URL
- `events` (array, required): Events to subscribe to
- `secret` (string): Webhook secret for signature verification

**Returns:** `Promise<Webhook>`

## Data Models

### Scan

```javascript
{
  id: 'scan_abc123',
  target: 'https://example.com',
  type: 'web',
  status: 'completed', // 'pending', 'running', 'completed', 'failed'
  createdAt: '2025-01-15T10:00:00Z',
  completedAt: '2025-01-15T10:05:00Z',
  duration: 300, // seconds
  vulnerabilities: {
    total: 25,
    critical: 2,
    high: 5,
    medium: 12,
    low: 6
  }
}
```

### Vulnerability

```javascript
{
  id: 'vuln_def456',
  title: 'SQL Injection in Login Form',
  description: 'Detailed vulnerability description...',
  severity: 'critical', // 'critical', 'high', 'medium', 'low'
  category: 'injection',
  cvss: {
    score: 9.8,
    vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H'
  },
  cve: 'CVE-2024-12345',
  location: {
    url: 'https://example.com/login',
    method: 'POST',
    parameter: 'username'
  },
  evidence: 'SQL error message...',
  remediation: 'Use parameterized queries...',
  references: [
    'https://owasp.org/www-project-top-ten/2017/A1_2017-Injection'
  ]
}
```

### Monitor

```javascript
{
  id: 'monitor_ghi789',
  name: 'Production API Monitor',
  targets: ['https://api.example.com'],
  status: 'active', // 'active', 'paused', 'stopped'
  interval: '1h',
  lastCheck: '2025-01-15T10:00:00Z',
  nextCheck: '2025-01-15T11:00:00Z',
  health: 'healthy', // 'healthy', 'warning', 'critical'
  uptime: 99.9
}
```

### Report

```javascript
{
  id: 'report_jkl012',
  scanId: 'scan_abc123',
  type: 'executive',
  format: 'pdf',
  status: 'generated', // 'generating', 'generated', 'failed'
  downloadUrl: 'https://reports.vaultiscan.com/report_jkl012.pdf',
  size: 2048576, // bytes
  createdAt: '2025-01-15T10:00:00Z'
}
```

## Error Handling

The SDK uses standard HTTP status codes and returns detailed error information:

```javascript
try {
  const scan = await sdk.vulnerabilities.scan({ target: 'invalid-url' });
} catch (error) {
  console.log({
    status: error.status, // HTTP status code
    code: error.code, // VaultiScan error code
    message: error.message, // Human-readable message
    details: error.details // Additional error details
  });
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `INVALID_API_KEY` | API key is invalid or expired |
| `RATE_LIMIT_EXCEEDED` | Request rate limit exceeded |
| `INVALID_TARGET` | Target URL is invalid |
| `SCAN_NOT_FOUND` | Scan ID not found |
| `INSUFFICIENT_CREDITS` | Not enough scan credits |

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| Scan creation | 10 per minute |
| Status checks | 100 per minute |
| Report generation | 5 per minute |
| Webhook creation | 20 per hour |

## Pagination

List endpoints support pagination:

```javascript
const scans = await sdk.vulnerabilities.list({
  page: 1,
  limit: 50,
  sortBy: 'createdAt',
  order: 'desc'
});

console.log({
  data: scans.data,
  total: scans.total,
  page: scans.page,
  totalPages: scans.totalPages
});
```

## SDK Configuration

### Environment Variables

```bash
VAULTISCAN_API_KEY=your-api-key
VAULTISCAN_ENVIRONMENT=production
VAULTISCAN_BASE_URL=https://api.vaultiscan.com/v1
VAULTISCAN_TIMEOUT=30000
```

### Logging

```javascript
const sdk = new VaultiScanSDK({
  apiKey: 'your-api-key',
  logging: {
    level: 'debug', // 'error', 'warn', 'info', 'debug'
    console: true,
    file: './vaultiscan.log'
  }
});
```

### Retry Configuration

```javascript
const sdk = new VaultiScanSDK({
  apiKey: 'your-api-key',
  retry: {
    attempts: 3,
    delay: 1000, // milliseconds
    backoff: 'exponential' // 'linear', 'exponential'
  }
});
```

## Next Steps

- [Vulnerability Scanning →](./features/vulnerability-scanning)
- [Real-time Monitoring →](./features/monitoring)
- [Security Reports →](./features/security-reports)
