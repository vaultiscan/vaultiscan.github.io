# API Overview

Complete API reference for building custom integrations with VaultiScan.

## Getting Started

The VaultiScan API is built on REST principles and uses standard HTTP methods. All requests require authentication and return JSON responses.

### Base URL

```
https://api.vaultiscan.com/v1
```

### Authentication

Include your API key in the `Authorization` header:

```bash
curl -H "Authorization: Bearer vs_live_abc123..." \
     https://api.vaultiscan.com/v1/scans
```

## Quick Start Example

```bash
# Start a new scan
curl -X POST https://api.vaultiscan.com/v1/scans \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "target": "https://example.com",
    "type": "web"
  }'

# Response
{
  "id": "scan_abc123",
  "status": "running",
  "target": "https://example.com",
  "type": "web",
  "created_at": "2025-01-15T10:00:00Z"
}

# Check scan status
curl https://api.vaultiscan.com/v1/scans/scan_abc123 \
  -H "Authorization: Bearer your-api-key"

# Get scan results
curl https://api.vaultiscan.com/v1/scans/scan_abc123/results \
  -H "Authorization: Bearer your-api-key"
```

## Core Endpoints

### Scans

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/scans` | Start a new scan |
| GET | `/scans` | List all scans |
| GET | `/scans/{id}` | Get scan details |
| GET | `/scans/{id}/results` | Get scan results |
| DELETE | `/scans/{id}` | Cancel/delete scan |

### Vulnerabilities

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/vulnerabilities` | List vulnerabilities |
| GET | `/vulnerabilities/{id}` | Get vulnerability details |
| PATCH | `/vulnerabilities/{id}` | Update vulnerability status |

### Monitoring

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/monitors` | Start monitoring |
| GET | `/monitors` | List monitors |
| GET | `/monitors/{id}` | Get monitor details |
| DELETE | `/monitors/{id}` | Stop monitoring |

### Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reports` | Generate report |
| GET | `/reports` | List reports |
| GET | `/reports/{id}` | Get report details |
| GET | `/reports/{id}/download` | Download report |

## API Examples

### Starting a Web Application Scan

```javascript
const response = await fetch('https://api.vaultiscan.com/v1/scans', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
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
  })
});

const scan = await response.json();
console.log('Scan started:', scan.id);
```

### API Security Scan with OpenAPI Spec

```javascript
const apiScan = await fetch('https://api.vaultiscan.com/v1/scans', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    target: 'https://api.example.com',
    type: 'api',
    options: {
      swagger_url: 'https://api.example.com/swagger.json',
      authentication: {
        type: 'bearer',
        token: 'api-token'
      }
    }
  })
});
```

### Infrastructure Scan

```javascript
const infraScan = await fetch('https://api.vaultiscan.com/v1/scans', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    target: '192.168.1.0/24',
    type: 'infrastructure',
    options: {
      port_range: '1-1000',
      include_services: true,
      ssl_check: true
    }
  })
});
```

### Starting Continuous Monitoring

```javascript
const monitor = await fetch('https://api.vaultiscan.com/v1/monitors', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Production API Monitor',
    targets: [
      'https://api.example.com',
      'https://app.example.com'
    ],
    interval: '1h',
    checks: ['vulnerabilities', 'ssl', 'performance'],
    alerts: [
      {
        type: 'email',
        recipients: ['security@company.com'],
        triggers: ['critical_vulnerability', 'service_down']
      }
    ]
  })
});
```

### Generating Security Reports

```javascript
const report = await fetch('https://api.vaultiscan.com/v1/reports', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    scan_id: 'scan_abc123',
    type: 'executive',
    format: 'pdf',
    options: {
      include_summary: true,
      include_recommendations: true,
      branding: {
        company_name: 'Your Company',
        logo_url: 'https://yourcompany.com/logo.png'
      }
    }
  })
});

const reportData = await report.json();
console.log('Report download URL:', reportData.download_url);
```

## Webhook Integration

### Setting Up Webhooks

```javascript
const webhook = await fetch('https://api.vaultiscan.com/v1/webhooks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://yourapp.com/webhooks/vaultiscan',
    events: [
      'scan.completed',
      'vulnerability.found',
      'monitor.alert'
    ],
    secret: 'your-webhook-secret'
  })
});
```

### Webhook Payload Example

```json
{
  "event": "vulnerability.found",
  "timestamp": "2025-01-15T10:30:00Z",
  "data": {
    "vulnerability": {
      "id": "vuln_def456",
      "title": "SQL Injection in Login Form",
      "severity": "critical",
      "cvss": 9.8,
      "category": "injection"
    },
    "scan": {
      "id": "scan_abc123",
      "target": "https://example.com"
    }
  }
}
```

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### Error Response Format

```json
{
  "error": {
    "code": "INVALID_TARGET",
    "message": "The target URL is not valid",
    "details": {
      "field": "target",
      "value": "invalid-url"
    }
  }
}
```

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| Scan creation | 10 per minute |
| Status checks | 100 per minute |
| Report generation | 5 per minute |
| Webhook creation | 20 per hour |

### Rate Limit Headers

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 8
X-RateLimit-Reset: 1642262400
```

## Pagination

List endpoints support pagination:

```bash
curl "https://api.vaultiscan.com/v1/scans?page=2&limit=50" \
  -H "Authorization: Bearer your-api-key"
```

Response includes pagination metadata:

```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 50,
    "total": 150,
    "pages": 3,
    "has_next": true,
    "has_prev": true
  }
}
```

## Filtering and Sorting

### Filtering

```bash
# Filter by severity
curl "https://api.vaultiscan.com/v1/vulnerabilities?severity=critical,high" \
  -H "Authorization: Bearer your-api-key"

# Filter by date range
curl "https://api.vaultiscan.com/v1/scans?created_after=2025-01-01&created_before=2025-01-31" \
  -H "Authorization: Bearer your-api-key"
```

### Sorting

```bash
# Sort by creation date (descending)
curl "https://api.vaultiscan.com/v1/scans?sort=-created_at" \
  -H "Authorization: Bearer your-api-key"

# Sort by CVSS score (descending)
curl "https://api.vaultiscan.com/v1/vulnerabilities?sort=-cvss_score" \
  -H "Authorization: Bearer your-api-key"
```

## Field Selection

Request only specific fields:

```bash
curl "https://api.vaultiscan.com/v1/vulnerabilities?fields=id,title,severity,cvss_score" \
  -H "Authorization: Bearer your-api-key"
```

## Bulk Operations

### Bulk Scan Creation

```javascript
const bulkScans = await fetch('https://api.vaultiscan.com/v1/scans/bulk', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    scans: [
      { target: 'https://api1.example.com', type: 'api' },
      { target: 'https://api2.example.com', type: 'api' },
      { target: 'https://app.example.com', type: 'web' }
    ],
    options: {
      parallel: true,
      max_concurrent: 3
    }
  })
});
```

### Bulk Vulnerability Updates

```javascript
const bulkUpdate = await fetch('https://api.vaultiscan.com/v1/vulnerabilities/bulk', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    vulnerability_ids: ['vuln_1', 'vuln_2', 'vuln_3'],
    updates: {
      status: 'acknowledged',
      assignee: 'security-team@company.com'
    }
  })
});
```

## SDK Libraries

Official SDKs are available for popular languages:

- **JavaScript/Node.js**: `@vaultiscan/sdk-js`
- **Python**: `vaultiscan-python`
- **PHP**: `vaultiscan/php-sdk`
- **Ruby**: `vaultiscan-ruby`
- **Go**: `github.com/vaultiscan/go-sdk`
- **Java**: `com.vaultiscan:sdk-java`

## API Versioning

The API uses semantic versioning. Current version is `v1`.

- Breaking changes increment the major version
- New features increment the minor version
- Bug fixes increment the patch version

## Next Steps

- [Basic Integration Example →](../examples/basic-integration)
- [Authentication →](../authentication)
- [JavaScript SDK →](../embedding-sdk/javascript-sdk)
