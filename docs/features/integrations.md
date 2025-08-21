# Custom Integrations

Integrate VaultiScan with your existing tools and workflows seamlessly.

## Overview

VaultiScan provides extensive integration capabilities:

- **Pre-built Integrations** - Popular tools and platforms
- **Webhook Support** - Real-time event notifications
- **REST API** - Custom integration development
- **SDK Extensions** - Platform-specific functionality

## Pre-built Integrations

### Slack Integration

```javascript
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

const sdk = new VaultiScanSDK({ apiKey: 'your-api-key' });

// Configure Slack integration
await sdk.integrations.slack.configure({
  webhookUrl: 'https://hooks.slack.com/services/...',
  channel: '#security',
  events: ['vulnerability_found', 'scan_completed']
});

// Send custom message
await sdk.integrations.slack.sendMessage({
  channel: '#security',
  message: 'Security scan completed for production API',
  attachments: [
    {
      title: 'Scan Results',
      color: 'danger',
      fields: [
        { title: 'Critical', value: '2', short: true },
        { title: 'High', value: '5', short: true }
      ]
    }
  ]
});
```

### JIRA Integration

```javascript
// Configure JIRA integration
await sdk.integrations.jira.configure({
  baseUrl: 'https://yourcompany.atlassian.net',
  username: 'security@company.com',
  apiToken: 'your-jira-api-token',
  project: 'SEC'
});

// Create ticket from vulnerability
const vulnerability = await sdk.vulnerabilities.getById('vuln_123');
const ticket = await sdk.integrations.jira.createTicket({
  summary: vulnerability.title,
  description: vulnerability.description,
  issueType: 'Security Issue',
  priority: vulnerability.severity === 'critical' ? 'Highest' : 'High',
  labels: ['security', 'vaultiscan', vulnerability.category]
});
```

### GitHub Integration

```javascript
// Configure GitHub integration
await sdk.integrations.github.configure({
  token: 'github_pat_...',
  repository: 'company/api'
});

// Create security advisory
const advisory = await sdk.integrations.github.createAdvisory({
  title: 'SQL Injection in User Authentication',
  severity: 'critical',
  cve: 'CVE-2024-12345',
  description: 'Detailed vulnerability description...',
  credit: 'VaultiScan Security Team'
});

// Create pull request with fix
const pr = await sdk.integrations.github.createPR({
  title: 'Fix: SQL injection in auth endpoint',
  branch: 'fix/sql-injection-auth',
  base: 'main',
  body: 'Fixes SQL injection vulnerability found by VaultiScan'
});
```

### Microsoft Teams

```javascript
// Configure Teams integration
await sdk.integrations.teams.configure({
  webhookUrl: 'https://outlook.office.com/webhook/...'
});

// Send adaptive card
await sdk.integrations.teams.sendCard({
  title: 'Security Alert',
  subtitle: 'Critical vulnerability detected',
  facts: [
    { name: 'Severity', value: 'Critical' },
    { name: 'Target', value: 'api.example.com' },
    { name: 'Type', value: 'SQL Injection' }
  ],
  actions: [
    {
      type: 'Action.OpenUrl',
      title: 'View Details',
      url: 'https://dashboard.vaultiscan.com/vulns/123'
    }
  ]
});
```

## Webhook Integration

### Setting Up Webhooks

```javascript
// Configure webhook endpoint
const webhook = await sdk.webhooks.create({
  url: 'https://yourapp.com/webhooks/vaultiscan',
  events: [
    'scan.started',
    'scan.completed',
    'vulnerability.found',
    'vulnerability.fixed'
  ],
  secret: 'your-webhook-secret'
});

console.log('Webhook ID:', webhook.id);
```

### Webhook Event Types

```javascript
// Available webhook events
const eventTypes = [
  // Scan events
  'scan.started',
  'scan.progress',
  'scan.completed',
  'scan.failed',
  
  // Vulnerability events
  'vulnerability.found',
  'vulnerability.updated',
  'vulnerability.fixed',
  'vulnerability.ignored',
  
  // Monitor events
  'monitor.started',
  'monitor.stopped',
  'monitor.alert',
  
  // Report events
  'report.generated',
  'report.scheduled'
];
```

### Webhook Payload Examples

```javascript
// Vulnerability found webhook payload
{
  "event": "vulnerability.found",
  "timestamp": "2025-01-15T10:30:00Z",
  "data": {
    "vulnerability": {
      "id": "vuln_abc123",
      "title": "SQL Injection in Login Form",
      "severity": "critical",
      "cvss": 9.8,
      "category": "injection",
      "url": "https://example.com/login",
      "method": "POST",
      "parameter": "username"
    },
    "scan": {
      "id": "scan_def456",
      "target": "https://example.com",
      "type": "web"
    }
  }
}

// Scan completed webhook payload
{
  "event": "scan.completed",
  "timestamp": "2025-01-15T10:35:00Z",
  "data": {
    "scan": {
      "id": "scan_def456",
      "target": "https://example.com",
      "status": "completed",
      "duration": 300,
      "vulnerabilities": {
        "critical": 2,
        "high": 5,
        "medium": 12,
        "low": 8
      }
    }
  }
}
```

## Custom API Integration

### REST API Client

```javascript
// Custom API integration example
class CustomSecurityTool {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.yourtool.com';
  }
  
  async importVulnerabilities(scanResults) {
    for (const vuln of scanResults.vulnerabilities) {
      await fetch(`${this.baseUrl}/vulnerabilities`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: vuln.title,
          severity: vuln.severity,
          description: vuln.description,
          source: 'VaultiScan'
        })
      });
    }
  }
}

// Use with VaultiScan
const tool = new CustomSecurityTool('your-tool-api-key');
const scanResults = await sdk.scans.getResults('scan_123');
await tool.importVulnerabilities(scanResults);
```

### Database Integration

```javascript
// Store scan results in custom database
import { Client } from 'pg'; // PostgreSQL example

class VulnerabilityDatabase {
  constructor(connectionString) {
    this.client = new Client({ connectionString });
  }
  
  async storeScanResults(scan) {
    await this.client.connect();
    
    // Store scan metadata
    await this.client.query(`
      INSERT INTO scans (id, target, status, created_at)
      VALUES ($1, $2, $3, $4)
    `, [scan.id, scan.target, scan.status, scan.createdAt]);
    
    // Store vulnerabilities
    for (const vuln of scan.vulnerabilities) {
      await this.client.query(`
        INSERT INTO vulnerabilities (id, scan_id, title, severity, cvss)
        VALUES ($1, $2, $3, $4, $5)
      `, [vuln.id, scan.id, vuln.title, vuln.severity, vuln.cvss]);
    }
    
    await this.client.end();
  }
}
```

## CI/CD Pipeline Integration

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    stages {
        stage('Security Scan') {
            steps {
                script {
                    // Run VaultiScan
                    sh '''
                        npm install @vaultiscan/cli
                        npx vaultiscan scan --target ${DEPLOY_URL} --api-key ${VAULTISCAN_API_KEY}
                    '''
                    
                    // Parse results
                    def scanResults = readJSON file: 'vaultiscan-results.json'
                    
                    // Fail build if critical vulnerabilities found
                    if (scanResults.vulnerabilities.critical > 0) {
                        error("Critical vulnerabilities found: ${scanResults.vulnerabilities.critical}")
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Archive scan results
            archiveArtifacts 'vaultiscan-results.json'
            
            // Send notifications
            script {
                if (currentBuild.result == 'FAILURE') {
                    slackSend(
                        channel: '#security',
                        color: 'danger',
                        message: "Security scan failed for ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
                    )
                }
            }
        }
    }
}
```

### GitHub Actions

```yaml
name: Security Scan
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install VaultiScan CLI
        run: npm install -g @vaultiscan/cli
        
      - name: Run Security Scan
        run: |
          vaultiscan scan \
            --target ${{ secrets.STAGING_URL }} \
            --api-key ${{ secrets.VAULTISCAN_API_KEY }} \
            --format json \
            --output scan-results.json
            
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: security-scan-results
          path: scan-results.json
          
      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('scan-results.json'));
            
            const comment = `## Security Scan Results
            
            - **Critical**: ${results.vulnerabilities.critical}
            - **High**: ${results.vulnerabilities.high}
            - **Medium**: ${results.vulnerabilities.medium}
            - **Low**: ${results.vulnerabilities.low}
            
            ${results.vulnerabilities.critical > 0 ? '⚠️ Critical vulnerabilities found!' : '✅ No critical vulnerabilities'}`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

## Custom SDK Extensions

### Creating Custom Plugins

```javascript
// Custom plugin example
class CompliancePlugin {
  constructor(sdk) {
    this.sdk = sdk;
    this.frameworks = ['OWASP', 'NIST', 'ISO27001'];
  }
  
  async assessCompliance(scanResults, framework) {
    const mappings = await this.getFrameworkMappings(framework);
    const compliance = {};
    
    for (const control of mappings.controls) {
      compliance[control.id] = this.evaluateControl(
        control,
        scanResults.vulnerabilities
      );
    }
    
    return {
      framework,
      overallScore: this.calculateScore(compliance),
      controls: compliance,
      recommendations: this.generateRecommendations(compliance)
    };
  }
  
  evaluateControl(control, vulnerabilities) {
    const relevantVulns = vulnerabilities.filter(v => 
      control.categories.includes(v.category)
    );
    
    return {
      status: relevantVulns.length === 0 ? 'compliant' : 'non-compliant',
      violations: relevantVulns.length,
      severity: this.getHighestSeverity(relevantVulns)
    };
  }
}

// Register plugin
sdk.plugins.register('compliance', CompliancePlugin);

// Use plugin
const compliance = await sdk.plugins.compliance.assessCompliance(
  scanResults,
  'OWASP'
);
```

### Event-driven Architecture

```javascript
// Custom event handlers
sdk.events.on('vulnerability.found', async (event) => {
  // Custom logic for vulnerability handling
  if (event.vulnerability.severity === 'critical') {
    await customIncidentResponse(event);
  }
});

sdk.events.on('scan.completed', async (event) => {
  // Custom post-scan processing
  await generateCustomReports(event.scan);
  await updateSecurityDashboard(event.scan);
});

async function customIncidentResponse(event) {
  // Notify security team
  await notifySecurityTeam(event);
  
  // Create incident ticket
  await createIncidentTicket(event);
  
  // Isolate affected systems
  await isolateAffectedSystems(event);
}
```

## Next Steps

- [API Reference →](../api)
- [Authentication →](../authentication)
- [Vulnerability Scanning →](./vulnerability-scanning)
