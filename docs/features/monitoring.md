# Real-time Monitoring

Monitor your security posture continuously with VaultiScan's real-time monitoring capabilities.

## Overview

VaultiScan's monitoring system provides:

- **Continuous Security Monitoring** - 24/7 security assessment
- **Real-time Alerts** - Instant notifications for security events
- **Trend Analysis** - Security posture tracking over time
- **Automated Response** - Triggered actions based on findings

## Setting Up Monitoring

### Basic Monitoring Configuration

```javascript
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

const sdk = new VaultiScanSDK({ apiKey: 'your-api-key' });

// Start continuous monitoring
const monitor = await sdk.monitoring.start({
  targets: [
    'https://api.example.com',
    'https://app.example.com'
  ],
  interval: '1h', // Check every hour
  checks: ['vulnerabilities', 'ssl', 'dns', 'headers']
});

console.log('Monitor ID:', monitor.id);
```

### Advanced Monitoring Setup

```javascript
const monitor = await sdk.monitoring.start({
  name: 'Production API Monitoring',
  targets: [
    {
      url: 'https://api.example.com',
      type: 'api',
      authentication: {
        type: 'bearer',
        token: 'api-token'
      }
    }
  ],
  schedule: {
    interval: '30m',
    timezone: 'UTC',
    businessHours: {
      enabled: true,
      start: '09:00',
      end: '17:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    }
  },
  checks: {
    vulnerabilities: {
      enabled: true,
      severity: ['critical', 'high']
    },
    performance: {
      enabled: true,
      thresholds: {
        responseTime: 2000,
        availability: 99.9
      }
    },
    ssl: {
      enabled: true,
      expiration: 30 // Alert 30 days before expiration
    }
  }
});
```

## Real-time Alerts

### Event Listeners

```javascript
// Listen for vulnerability findings
monitor.onVulnerabilityDetected((event) => {
  console.log('New vulnerability detected:', {
    severity: event.vulnerability.severity,
    title: event.vulnerability.title,
    target: event.target,
    timestamp: event.timestamp
  });
});

// Listen for SSL certificate issues
monitor.onSSLIssue((event) => {
  console.log('SSL issue detected:', {
    issue: event.issue,
    target: event.target,
    expirationDate: event.certificate.expirationDate
  });
});

// Listen for availability issues
monitor.onDowntime((event) => {
  console.log('Service unavailable:', {
    target: event.target,
    statusCode: event.statusCode,
    duration: event.duration
  });
});
```

### Alert Configuration

```javascript
const alertConfig = await sdk.monitoring.configureAlerts({
  monitorId: monitor.id,
  alerts: [
    {
      name: 'Critical Vulnerability Alert',
      trigger: {
        event: 'vulnerability_detected',
        conditions: {
          severity: ['critical'],
          cvss: { min: 9.0 }
        }
      },
      actions: [
        {
          type: 'email',
          recipients: ['security-team@company.com'],
          template: 'critical_vulnerability'
        },
        {
          type: 'slack',
          channel: '#security-alerts',
          message: 'Critical vulnerability detected: {{vulnerability.title}}'
        }
      ]
    },
    {
      name: 'SSL Expiration Warning',
      trigger: {
        event: 'ssl_expiring',
        conditions: {
          daysUntilExpiration: { max: 30 }
        }
      },
      actions: [
        {
          type: 'email',
          recipients: ['devops@company.com']
        }
      ]
    }
  ]
});
```

## Monitoring Dashboards

### Real-time Dashboard

```javascript
// Get real-time monitoring status
const status = await sdk.monitoring.getStatus(monitor.id);

console.log({
  overallHealth: status.health,
  activeTargets: status.targets.filter(t => t.status === 'active').length,
  lastCheck: status.lastCheck,
  uptime: status.uptime,
  vulnerabilityCount: status.vulnerabilities.total,
  criticalIssues: status.vulnerabilities.critical
});
```

### Historical Data

```javascript
// Get monitoring history
const history = await sdk.monitoring.getHistory({
  monitorId: monitor.id,
  timeRange: '7d',
  metrics: ['vulnerabilities', 'uptime', 'response_time']
});

// Analyze trends
const trends = sdk.analytics.analyzeTrends(history);
console.log({
  vulnerabilityTrend: trends.vulnerabilities.direction, // 'improving', 'degrading', 'stable'
  uptimeTrend: trends.uptime.percentage,
  averageResponseTime: trends.responseTime.average
});
```

## Custom Monitoring Rules

### Define Custom Checks

```javascript
const customMonitor = await sdk.monitoring.start({
  targets: ['https://api.example.com'],
  customChecks: [
    {
      name: 'API Rate Limit Check',
      frequency: '5m',
      check: async (target) => {
        const response = await fetch(`${target}/health`);
        const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
        
        return {
          status: rateLimitRemaining > 100 ? 'pass' : 'fail',
          message: `Rate limit remaining: ${rateLimitRemaining}`,
          severity: rateLimitRemaining < 50 ? 'high' : 'medium'
        };
      }
    },
    {
      name: 'Database Connection Check',
      frequency: '1m',
      check: async (target) => {
        const response = await fetch(`${target}/db-health`);
        const data = await response.json();
        
        return {
          status: data.connected ? 'pass' : 'fail',
          message: `DB response time: ${data.responseTime}ms`,
          severity: data.responseTime > 1000 ? 'medium' : 'low'
        };
      }
    }
  ]
});
```

### Conditional Monitoring

```javascript
// Monitor different aspects based on conditions
const conditionalMonitor = await sdk.monitoring.start({
  targets: ['https://api.example.com'],
  conditions: [
    {
      if: { time: 'business_hours' },
      then: {
        interval: '5m',
        checks: ['full_scan', 'performance']
      },
      else: {
        interval: '30m',
        checks: ['basic_health', 'ssl']
      }
    },
    {
      if: { day: 'weekend' },
      then: {
        interval: '1h',
        checks: ['basic_health']
      }
    }
  ]
});
```

## Monitoring Metrics

### Key Performance Indicators

```javascript
const metrics = await sdk.monitoring.getMetrics({
  monitorId: monitor.id,
  timeRange: '24h',
  granularity: '1h'
});

console.log({
  // Security metrics
  vulnerabilitiesFound: metrics.security.vulnerabilities.total,
  severityDistribution: metrics.security.vulnerabilities.bySeverity,
  newVulnerabilities: metrics.security.vulnerabilities.new,
  
  // Performance metrics
  averageResponseTime: metrics.performance.responseTime.average,
  uptime: metrics.performance.uptime.percentage,
  errorRate: metrics.performance.errors.rate,
  
  // Infrastructure metrics
  sslHealth: metrics.infrastructure.ssl.status,
  dnsHealth: metrics.infrastructure.dns.status,
  serverHealth: metrics.infrastructure.server.status
});
```

### Trend Analysis

```javascript
const trendAnalysis = await sdk.analytics.getTrends({
  monitorId: monitor.id,
  timeRange: '30d',
  metrics: ['security_score', 'vulnerability_count', 'uptime']
});

trendAnalysis.forEach(trend => {
  console.log({
    metric: trend.metric,
    direction: trend.direction, // 'improving', 'degrading', 'stable'
    change: trend.percentageChange,
    prediction: trend.prediction // Next 7 days
  });
});
```

## Integration with CI/CD

### GitHub Actions Integration

```yaml
name: Security Monitoring
on:
  schedule:
    - cron: '0 */4 * * *' # Every 4 hours
  
jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - name: Run VaultiScan Monitor
        uses: vaultiscan/github-action@v1
        with:
          api-key: ${{ secrets.VAULTISCAN_API_KEY }}
          monitor-id: ${{ secrets.MONITOR_ID }}
          fail-on-critical: true
```

### Jenkins Integration

```javascript
// Jenkins pipeline integration
const monitor = await sdk.monitoring.start({
  targets: [process.env.STAGING_URL],
  interval: '1h',
  webhook: {
    url: process.env.JENKINS_WEBHOOK_URL,
    events: ['vulnerability_detected', 'monitor_failed']
  }
});
```

## Automated Remediation

### Auto-scaling Based on Security Events

```javascript
monitor.onVulnerabilityDetected(async (event) => {
  if (event.vulnerability.severity === 'critical') {
    // Scale down affected services
    await sdk.integrations.aws.scaleService({
      serviceName: event.target,
      desiredCount: 0
    });
    
    // Notify operations team
    await sdk.notifications.send({
      type: 'pagerduty',
      severity: 'critical',
      message: `Critical vulnerability detected, service scaled down: ${event.target}`
    });
  }
});
```

### Automatic Patching

```javascript
monitor.onVulnerabilityDetected(async (event) => {
  if (event.vulnerability.hasPatch && event.vulnerability.autoFixable) {
    // Create pull request with fix
    await sdk.integrations.github.createPR({
      repository: 'company/api',
      branch: `fix/vulnerability-${event.vulnerability.id}`,
      title: `Fix: ${event.vulnerability.title}`,
      description: event.vulnerability.remediation
    });
  }
});
```

## Next Steps

- [Custom Integrations →](./integrations)
- [API Reference →](../api)
- [Vulnerability Scanning →](./vulnerability-scanning)
