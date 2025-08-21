# Basic Integration Example

Learn how to integrate VaultiScan into your application with this step-by-step example.

## Overview

This example demonstrates how to:
1. Set up the VaultiScan SDK
2. Perform a basic security scan
3. Display results in your application
4. Handle errors and edge cases

## Prerequisites

- Node.js 16+ installed
- VaultiScan API key ([get one here](https://dashboard.vaultiscan.com/api-keys))
- Target application to scan

## Installation

```bash
npm install @vaultiscan/embedding-sdk
```

## Basic Setup

### 1. Initialize the SDK

```javascript
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

const sdk = new VaultiScanSDK({
  apiKey: 'your-api-key-here',
  environment: 'production' // or 'sandbox' for testing
});
```

### 2. Start Your First Scan

```javascript
async function startSecurityScan() {
  try {
    const scan = await sdk.vulnerabilities.scan({
      target: 'https://your-app.com',
      type: 'web'
    });
    
    console.log('Scan started:', scan.id);
    return scan;
  } catch (error) {
    console.error('Failed to start scan:', error);
    throw error;
  }
}
```

### 3. Monitor Scan Progress

```javascript
async function monitorScanProgress(scanId) {
  const scan = await sdk.vulnerabilities.getScan(scanId);
  
  // Set up progress monitoring
  scan.onProgress((progress) => {
    console.log(`Scan progress: ${progress.percentage}%`);
    console.log(`Current phase: ${progress.phase}`);
  });
  
  // Listen for vulnerability discoveries
  scan.onVulnerabilityFound((vulnerability) => {
    console.log(`Found ${vulnerability.severity} vulnerability: ${vulnerability.title}`);
  });
  
  // Wait for completion
  const results = await scan.waitForCompletion();
  return results;
}
```

### 4. Display Results

```javascript
function displayResults(results) {
  console.log('=== Scan Results ===');
  console.log(`Target: ${results.target}`);
  console.log(`Status: ${results.status}`);
  console.log(`Duration: ${results.duration} seconds`);
  console.log(`Vulnerabilities found: ${results.vulnerabilities.length}`);
  
  // Group by severity
  const bySeverity = results.vulnerabilities.reduce((acc, vuln) => {
    acc[vuln.severity] = (acc[vuln.severity] || 0) + 1;
    return acc;
  }, {});
  
  console.log('Severity breakdown:');
  Object.entries(bySeverity).forEach(([severity, count]) => {
    console.log(`  ${severity}: ${count}`);
  });
  
  // Display critical vulnerabilities
  const criticalVulns = results.vulnerabilities.filter(v => v.severity === 'critical');
  if (criticalVulns.length > 0) {
    console.log('\n=== Critical Vulnerabilities ===');
    criticalVulns.forEach(vuln => {
      console.log(`- ${vuln.title}`);
      console.log(`  Location: ${vuln.location.url}`);
      console.log(`  CVSS: ${vuln.cvss.score}`);
    });
  }
}
```

## Complete Example

Here's a complete working example:

```javascript
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

class SecurityScanner {
  constructor(apiKey) {
    this.sdk = new VaultiScanSDK({
      apiKey,
      environment: 'production'
    });
  }
  
  async scanWebsite(url) {
    console.log(`Starting security scan for: ${url}`);
    
    try {
      // Start the scan
      const scan = await this.sdk.vulnerabilities.scan({
        target: url,
        type: 'web',
        options: {
          depth: 'standard',
          includeSubdomains: false
        }
      });
      
      console.log(`Scan initiated with ID: ${scan.id}`);
      
      // Monitor progress
      scan.onProgress((progress) => {
        console.log(`Progress: ${progress.percentage}% - ${progress.phase}`);
      });
      
      scan.onVulnerabilityFound((vuln) => {
        console.log(`🚨 Found: ${vuln.severity.toUpperCase()} - ${vuln.title}`);
      });
      
      // Wait for completion
      console.log('Waiting for scan to complete...');
      const results = await scan.waitForCompletion();
      
      return this.processResults(results);
      
    } catch (error) {
      console.error('Scan failed:', error.message);
      throw error;
    }
  }
  
  processResults(results) {
    const summary = {
      scanId: results.id,
      target: results.target,
      status: results.status,
      duration: results.duration,
      vulnerabilityCount: results.vulnerabilities.length,
      severityBreakdown: this.calculateSeverityBreakdown(results.vulnerabilities),
      riskScore: this.calculateRiskScore(results.vulnerabilities)
    };
    
    console.log('\n=== Scan Summary ===');
    console.log(JSON.stringify(summary, null, 2));
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(results.vulnerabilities);
    console.log('\n=== Recommendations ===');
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
    
    return {
      summary,
      vulnerabilities: results.vulnerabilities,
      recommendations
    };
  }
  
  calculateSeverityBreakdown(vulnerabilities) {
    return vulnerabilities.reduce((acc, vuln) => {
      acc[vuln.severity] = (acc[vuln.severity] || 0) + 1;
      return acc;
    }, {});
  }
  
  calculateRiskScore(vulnerabilities) {
    const weights = { critical: 10, high: 7, medium: 4, low: 1 };
    const totalScore = vulnerabilities.reduce((score, vuln) => {
      return score + (weights[vuln.severity] || 0);
    }, 0);
    
    // Normalize to 0-100 scale
    return Math.min(totalScore, 100);
  }
  
  generateRecommendations(vulnerabilities) {
    const recommendations = [];
    const criticalCount = vulnerabilities.filter(v => v.severity === 'critical').length;
    const highCount = vulnerabilities.filter(v => v.severity === 'high').length;
    
    if (criticalCount > 0) {
      recommendations.push(`Immediately address ${criticalCount} critical vulnerabilities`);
    }
    
    if (highCount > 0) {
      recommendations.push(`Plan remediation for ${highCount} high-severity issues`);
    }
    
    // Check for common vulnerability types
    const categories = vulnerabilities.reduce((acc, vuln) => {
      acc[vuln.category] = (acc[vuln.category] || 0) + 1;
      return acc;
    }, {});
    
    if (categories.injection > 0) {
      recommendations.push('Implement input validation and parameterized queries');
    }
    
    if (categories.xss > 0) {
      recommendations.push('Add proper output encoding and Content Security Policy');
    }
    
    if (categories.authentication > 0) {
      recommendations.push('Review authentication mechanisms and session management');
    }
    
    return recommendations;
  }
}

// Usage
async function main() {
  const scanner = new SecurityScanner('your-api-key-here');
  
  try {
    const results = await scanner.scanWebsite('https://your-app.com');
    
    // You can now use the results in your application
    console.log('Scan completed successfully!');
    
  } catch (error) {
    console.error('Scan failed:', error);
  }
}

main();
```

## Integration with Web Applications

### Express.js API Endpoint

```javascript
import express from 'express';
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

const app = express();
const sdk = new VaultiScanSDK({ apiKey: process.env.VAULTISCAN_API_KEY });

app.use(express.json());

// Start a scan
app.post('/api/security/scan', async (req, res) => {
  try {
    const { target, type = 'web' } = req.body;
    
    const scan = await sdk.vulnerabilities.scan({
      target,
      type
    });
    
    res.json({
      success: true,
      scanId: scan.id,
      status: scan.status
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get scan status
app.get('/api/security/scan/:scanId', async (req, res) => {
  try {
    const { scanId } = req.params;
    const scan = await sdk.vulnerabilities.getScan(scanId);
    
    res.json({
      success: true,
      scan: {
        id: scan.id,
        status: scan.status,
        progress: scan.progress,
        vulnerabilityCount: scan.vulnerabilities?.length || 0
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

// Get scan results
app.get('/api/security/scan/:scanId/results', async (req, res) => {
  try {
    const { scanId } = req.params;
    const results = await sdk.vulnerabilities.getResults(scanId);
    
    res.json({
      success: true,
      results
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### React Component Integration

```jsx
import React, { useState } from 'react';
import { VaultiScanSDK } from '@vaultiscan/embedding-sdk';

const SecurityScanner = () => {
  const [target, setTarget] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const sdk = new VaultiScanSDK({
    apiKey: process.env.REACT_APP_VAULTISCAN_API_KEY
  });
  
  const startScan = async () => {
    if (!target) return;
    
    setScanning(true);
    setError(null);
    setResults(null);
    
    try {
      const scan = await sdk.vulnerabilities.scan({
        target,
        type: 'web'
      });
      
      const finalResults = await scan.waitForCompletion();
      setResults(finalResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };
  
  return (
    <div className="security-scanner">
      <h2>Security Scanner</h2>
      
      <div className="scan-form">
        <input
          type="url"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter URL to scan"
          disabled={scanning}
        />
        <button onClick={startScan} disabled={scanning || !target}>
          {scanning ? 'Scanning...' : 'Start Scan'}
        </button>
      </div>
      
      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}
      
      {results && (
        <div className="results">
          <h3>Scan Results</h3>
          <p>Found {results.vulnerabilities.length} vulnerabilities</p>
          
          <div className="severity-breakdown">
            {['critical', 'high', 'medium', 'low'].map(severity => {
              const count = results.vulnerabilities.filter(v => v.severity === severity).length;
              return count > 0 && (
                <span key={severity} className={`severity-${severity}`}>
                  {severity}: {count}
                </span>
              );
            })}
          </div>
          
          <div className="vulnerabilities">
            {results.vulnerabilities.slice(0, 5).map(vuln => (
              <div key={vuln.id} className={`vulnerability severity-${vuln.severity}`}>
                <h4>{vuln.title}</h4>
                <p>Severity: {vuln.severity.toUpperCase()}</p>
                <p>CVSS: {vuln.cvss.score}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityScanner;
```

## Error Handling Best Practices

```javascript
class RobustSecurityScanner {
  constructor(apiKey) {
    this.sdk = new VaultiScanSDK({ apiKey });
    this.maxRetries = 3;
  }
  
  async scanWithRetry(target, options = {}) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`Scan attempt ${attempt}/${this.maxRetries}`);
        
        const scan = await this.sdk.vulnerabilities.scan({
          target,
          type: 'web',
          ...options
        });
        
        return await this.waitForScanWithTimeout(scan, 300000); // 5 minute timeout
        
      } catch (error) {
        lastError = error;
        console.warn(`Attempt ${attempt} failed:`, error.message);
        
        // Don't retry on authentication errors
        if (error.status === 401 || error.status === 403) {
          throw error;
        }
        
        // Wait before retrying
        if (attempt < this.maxRetries) {
          await this.delay(attempt * 1000);
        }
      }
    }
    
    throw new Error(`Scan failed after ${this.maxRetries} attempts: ${lastError.message}`);
  }
  
  async waitForScanWithTimeout(scan, timeoutMs) {
    return Promise.race([
      scan.waitForCompletion(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Scan timeout')), timeoutMs)
      )
    ]);
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Next Steps

1. **Explore Advanced Features**: Learn about [real-time monitoring](../features/monitoring) and [automated reporting](../features/security-reports)
2. **Integrate with CI/CD**: Set up [automated security scanning](../features/integrations) in your deployment pipeline
3. **Customize for Your Needs**: Check out the [full API reference](../api) for advanced configuration options
4. **Join the Community**: Get help and share experiences in our [GitHub Discussions](https://github.com/vaultiscan/embedding-sdk/discussions)

## Resources

- [API Documentation](../api)
- [JavaScript SDK Reference](../embedding-sdk/javascript-sdk)
- [React Components](../embedding-sdk/react-components)
- [Vue Components](../embedding-sdk/vue-components)
- [Angular Components](../embedding-sdk/angular-components)
