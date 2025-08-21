# Security Reports

Generate comprehensive security reports from your VaultiScan assessments.

## Overview

VaultiScan provides multiple report formats to meet different stakeholder needs:

- **Executive Summary** - High-level overview for management
- **Technical Report** - Detailed findings for security teams
- **Compliance Report** - Regulatory compliance status
- **Trend Analysis** - Security posture over time

## Generating Reports

### Basic Report Generation

```javascript
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

const sdk = new VaultiScanSDK({ apiKey: 'your-api-key' });

// Generate report from scan results
const report = await sdk.reports.generate({
  scanId: 'scan_123456',
  format: 'pdf',
  type: 'technical'
});

console.log('Report URL:', report.downloadUrl);
```

### Custom Report Configuration

```javascript
const report = await sdk.reports.generate({
  scanId: 'scan_123456',
  format: 'pdf',
  type: 'executive',
  options: {
    includeSummary: true,
    includeRecommendations: true,
    includeEvidence: false,
    branding: {
      logo: 'https://yourcompany.com/logo.png',
      colors: {
        primary: '#1f2937',
        secondary: '#6366f1'
      }
    }
  }
});
```

## Report Types

### Executive Summary

High-level security overview for management:

```javascript
const executiveReport = await sdk.reports.generate({
  scanId: 'scan_123456',
  type: 'executive',
  format: 'pdf',
  sections: [
    'risk_overview',
    'vulnerability_summary',
    'compliance_status',
    'recommendations',
    'risk_trends'
  ]
});
```

### Technical Report

Detailed technical findings:

```javascript
const technicalReport = await sdk.reports.generate({
  scanId: 'scan_123456',
  type: 'technical',
  format: 'pdf',
  sections: [
    'methodology',
    'vulnerability_details',
    'evidence',
    'remediation_steps',
    'technical_appendix'
  ]
});
```

### Compliance Report

Regulatory compliance assessment:

```javascript
const complianceReport = await sdk.reports.generate({
  scanId: 'scan_123456',
  type: 'compliance',
  format: 'pdf',
  framework: 'OWASP_TOP_10', // NIST, ISO27001, PCI_DSS, etc.
  sections: [
    'compliance_summary',
    'framework_mapping',
    'control_assessment',
    'remediation_plan'
  ]
});
```

## Report Formats

### PDF Reports

```javascript
const pdfReport = await sdk.reports.generate({
  scanId: 'scan_123456',
  format: 'pdf',
  options: {
    pageSize: 'A4',
    orientation: 'portrait',
    includeCharts: true,
    includeScreenshots: true
  }
});
```

### HTML Reports

```javascript
const htmlReport = await sdk.reports.generate({
  scanId: 'scan_123456',
  format: 'html',
  options: {
    interactive: true,
    responsive: true,
    theme: 'dark'
  }
});
```

### JSON/CSV Data Export

```javascript
// Export raw data
const jsonData = await sdk.reports.export({
  scanId: 'scan_123456',
  format: 'json',
  includeMetadata: true
});

// Export for spreadsheet analysis
const csvData = await sdk.reports.export({
  scanId: 'scan_123456',
  format: 'csv',
  fields: ['id', 'title', 'severity', 'category', 'cvss']
});
```

## Report Customization

### Branding and Styling

```javascript
const brandedReport = await sdk.reports.generate({
  scanId: 'scan_123456',
  format: 'pdf',
  branding: {
    companyName: 'Your Company',
    logo: 'https://yourcompany.com/logo.png',
    colors: {
      primary: '#1f2937',
      secondary: '#6366f1',
      accent: '#f59e0b'
    },
    fonts: {
      heading: 'Inter',
      body: 'system-ui'
    }
  }
});
```

### Custom Templates

```javascript
const customReport = await sdk.reports.generate({
  scanId: 'scan_123456',
  format: 'pdf',
  template: 'custom_template_id',
  variables: {
    projectName: 'Web Application Security Assessment',
    assessmentDate: '2025-01-15',
    clientName: 'Example Corp'
  }
});
```

## Automated Reporting

### Scheduled Reports

```javascript
// Schedule weekly executive reports
const schedule = await sdk.reports.schedule({
  name: 'Weekly Executive Summary',
  frequency: 'weekly',
  dayOfWeek: 'monday',
  time: '09:00',
  config: {
    type: 'executive',
    format: 'pdf',
    recipients: ['ceo@company.com', 'ciso@company.com']
  }
});
```

### Event-triggered Reports

```javascript
// Generate report when critical vulnerabilities are found
sdk.vulnerabilities.onCriticalFound(async (scan) => {
  const report = await sdk.reports.generate({
    scanId: scan.id,
    type: 'incident',
    format: 'pdf',
    priority: 'urgent'
  });
  
  await sdk.notifications.send({
    type: 'email',
    recipients: ['security-team@company.com'],
    subject: 'Critical Vulnerability Detected',
    attachments: [report.downloadUrl]
  });
});
```

## Report Analytics

### Report Metrics

```javascript
const metrics = await sdk.reports.getMetrics({
  timeRange: '30d',
  groupBy: 'type'
});

console.log({
  totalReports: metrics.total,
  averageGenerationTime: metrics.avgGenerationTime,
  popularFormats: metrics.formatBreakdown,
  downloadStats: metrics.downloads
});
```

### Report History

```javascript
const history = await sdk.reports.getHistory({
  limit: 50,
  sortBy: 'createdAt',
  order: 'desc'
});

history.forEach(report => {
  console.log({
    id: report.id,
    type: report.type,
    format: report.format,
    size: report.size,
    downloadCount: report.downloads,
    createdAt: report.createdAt
  });
});
```

## Integration Examples

### Slack Integration

```javascript
// Send report to Slack channel
const report = await sdk.reports.generate({
  scanId: 'scan_123456',
  type: 'summary',
  format: 'html'
});

await sdk.integrations.slack.sendMessage({
  channel: '#security',
  message: 'Security scan completed',
  attachments: [report.downloadUrl]
});
```

### JIRA Integration

```javascript
// Create JIRA tickets from vulnerabilities
const report = await sdk.reports.generate({
  scanId: 'scan_123456',
  type: 'jira_tickets',
  format: 'json'
});

for (const vuln of report.vulnerabilities) {
  if (vuln.severity === 'critical' || vuln.severity === 'high') {
    await sdk.integrations.jira.createTicket({
      project: 'SEC',
      issueType: 'Bug',
      summary: vuln.title,
      description: vuln.description,
      priority: vuln.severity === 'critical' ? 'Highest' : 'High'
    });
  }
}
```

## Next Steps

- [Real-time Monitoring →](./monitoring)
- [Custom Integrations →](./integrations)
- [API Reference →](../api)
