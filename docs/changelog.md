# Changelog

All notable changes to the VaultiScan Embedding SDK will be documented here.

## [3.2.0] - 2025-01-15

### Added
- **Real-time Monitoring**: Continuous security monitoring with customizable intervals
- **Advanced Reporting**: New executive and compliance report templates
- **Webhook Integration**: Real-time event notifications via webhooks
- **Custom Checks**: Support for user-defined security checks
- **Performance Metrics**: Response time and availability monitoring

### Enhanced
- **Vulnerability Detection**: Improved accuracy for SQL injection and XSS detection
- **API Coverage**: Enhanced API security scanning with OpenAPI 3.0 support
- **Documentation**: Comprehensive examples and integration guides

### Fixed
- **Memory Optimization**: Reduced memory usage during large scans
- **Rate Limiting**: Better handling of API rate limits
- **SSL Validation**: Fixed certificate chain validation issues

## [3.1.2] - 2025-01-08

### Fixed
- **Authentication**: Fixed JWT token refresh mechanism
- **Scanning**: Resolved timeout issues with large applications
- **Reporting**: Fixed PDF generation for reports with many vulnerabilities

### Security
- **CVE-2024-12345**: Patched vulnerability in dependency parsing
- **Authentication**: Enhanced API key validation

## [3.1.1] - 2025-01-02

### Enhanced
- **Performance**: 30% faster scan completion for web applications
- **Accuracy**: Reduced false positives in CSRF detection
- **UI Components**: Improved React component accessibility

### Fixed
- **Integration**: Fixed Slack notification formatting
- **Export**: Resolved CSV export encoding issues

## [3.1.0] - 2024-12-20

### Added
- **JIRA Integration**: Automatic ticket creation for vulnerabilities
- **GitHub Security**: Integration with GitHub Security Advisories
- **Custom Headers**: Support for custom HTTP headers in scans
- **Batch Scanning**: Ability to scan multiple targets simultaneously

### Enhanced
- **CLI Tool**: Improved command-line interface with better error messages
- **Logging**: Enhanced debug logging for troubleshooting
- **Documentation**: Added interactive API explorer

### Deprecated
- **Legacy Auth**: OAuth 1.0 support (use OAuth 2.0 instead)

## [3.0.0] - 2024-12-01

### 🚨 Breaking Changes
- **Node.js**: Minimum version now 16.x (was 14.x)
- **API**: Renamed `startScan()` to `scan()` for consistency
- **Configuration**: Restructured config object format

### Added
- **TypeScript**: Full TypeScript support with type definitions
- **React Components**: Pre-built React components for vulnerability display
- **Vue.js Support**: Official Vue.js component library
- **Angular Support**: Angular service and components
- **SDK Analytics**: Built-in usage analytics and metrics

### Enhanced
- **Security**: OWASP Top 10 2023 coverage
- **Performance**: 50% faster scan initialization
- **Error Handling**: Improved error messages and debugging

### Migration Guide
```javascript
// Before (v2.x)
const scan = await sdk.startScan('https://example.com');

// After (v3.x)
const scan = await sdk.vulnerabilities.scan({
  target: 'https://example.com',
  type: 'web'
});
```

## [2.5.3] - 2024-11-15

### Fixed
- **Network**: Fixed timeout handling for slow responses
- **Parsing**: Improved HTML parsing for JavaScript-heavy applications
- **Memory**: Fixed memory leak in continuous monitoring

### Security
- **Dependencies**: Updated all dependencies to latest secure versions

## [2.5.2] - 2024-11-08

### Enhanced
- **Infrastructure Scanning**: Added support for container security assessment
- **API Security**: Enhanced GraphQL vulnerability detection
- **Reporting**: New vulnerability trend analysis in reports

### Fixed
- **CORS**: Fixed cross-origin issues in browser environments
- **Authentication**: Improved OAuth token handling

## [2.5.1] - 2024-11-01

### Added
- **Kubernetes**: Support for Kubernetes security scanning
- **Docker**: Container image vulnerability assessment
- **Terraform**: Infrastructure-as-Code security analysis

### Enhanced
- **Speed**: 25% improvement in scan performance
- **Coverage**: Enhanced JavaScript framework detection

## [2.5.0] - 2024-10-15

### Added
- **Machine Learning**: AI-powered vulnerability prioritization
- **False Positive Reduction**: Smart filtering based on context
- **Custom Rules**: User-defined security rules engine
- **Integration Hub**: Centralized integration management

### Enhanced
- **Mobile Security**: Enhanced mobile application scanning
- **Cloud Security**: AWS, Azure, GCP security assessment
- **DevSecOps**: Enhanced CI/CD pipeline integration

## [2.4.0] - 2024-09-30

### Added
- **Compliance**: GDPR, HIPAA, SOX compliance checking
- **Risk Assessment**: CVSS 3.1 scoring and risk calculation
- **Trend Analysis**: Historical vulnerability tracking
- **Team Management**: Multi-user support with role-based access

### Enhanced
- **API Security**: Enhanced REST and GraphQL scanning
- **Performance**: Optimized for large enterprise applications
- **Scalability**: Support for concurrent scanning

## [2.3.0] - 2024-09-15

### Added
- **Multi-language**: Support for Python, Java, .NET applications
- **SAST Integration**: Static Application Security Testing
- **Dependency Scanning**: Third-party library vulnerability detection
- **License Compliance**: Open source license checking

### Enhanced
- **Accuracy**: Machine learning-improved detection algorithms
- **Speed**: Parallel processing for faster scans
- **Reporting**: Interactive HTML reports with filtering

## [2.2.0] - 2024-09-01

### Added
- **Browser Extension**: Chrome extension for manual testing
- **Postman Integration**: Import Postman collections for API testing
- **Swagger Support**: OpenAPI specification-based scanning
- **Environment Management**: Multiple environment configurations

### Enhanced
- **Authentication**: Support for OAuth 2.0, SAML, custom auth
- **Session Management**: Improved session handling and persistence
- **Error Recovery**: Better handling of network failures

## [2.1.0] - 2024-08-15

### Added
- **Scheduled Scanning**: Automated recurring scans
- **Email Notifications**: Alert system for critical findings
- **Dashboard Integration**: Embeddable security dashboard widgets
- **Export Options**: JSON, XML, CSV export formats

### Enhanced
- **OWASP Coverage**: Full OWASP Top 10 2021 compliance
- **Performance**: Reduced scan time by 40%
- **User Experience**: Improved SDK initialization and error handling

## [2.0.0] - 2024-08-01

### 🚨 Breaking Changes
- **Architecture**: Complete rewrite for better performance
- **API**: New REST API with improved endpoints
- **Authentication**: Enhanced security with API key rotation

### Added
- **Real-time Results**: Live vulnerability detection during scans
- **Advanced Filtering**: Custom filters for vulnerability types
- **Integration APIs**: Slack, Teams, email integrations
- **Custom Policies**: User-defined security policies

### Enhanced
- **Detection Engine**: Improved accuracy and reduced false positives
- **Scalability**: Support for enterprise-scale applications
- **Documentation**: Comprehensive API documentation and examples

## [1.5.0] - 2024-07-15

### Added
- **Mobile Support**: iOS and Android application scanning
- **API Gateway**: Support for API gateway security assessment
- **Microservices**: Enhanced microservice architecture scanning
- **Container Security**: Docker and container vulnerability detection

### Enhanced
- **Cloud Native**: Better support for cloud-native applications
- **DevOps Integration**: Jenkins, GitLab CI/CD integration
- **Reporting**: PDF and HTML report generation

## [1.4.0] - 2024-07-01

### Added
- **Infrastructure Scanning**: Network and system security assessment
- **SSL/TLS Analysis**: Certificate and configuration validation
- **DNS Security**: DNS configuration and security checks
- **Load Balancer**: Support for scanning behind load balancers

### Enhanced
- **Web Application**: Improved JavaScript framework support
- **Authentication**: Enhanced multi-factor authentication testing
- **Session Security**: Better session management vulnerability detection

## [1.3.0] - 2024-06-15

### Added
- **GraphQL Support**: Native GraphQL API security scanning
- **WebSocket Testing**: Real-time communication security assessment
- **Single Page Apps**: Enhanced SPA security testing
- **Progressive Web Apps**: PWA-specific security checks

### Enhanced
- **Performance**: 35% faster scan completion
- **Accuracy**: Reduced false positive rate by 20%
- **Coverage**: Enhanced vulnerability detection patterns

## [1.2.0] - 2024-06-01

### Added
- **REST API Scanning**: Comprehensive API security testing
- **Authentication Testing**: Multi-factor auth vulnerability detection
- **File Upload Security**: Upload functionality security assessment
- **Business Logic**: Custom business logic vulnerability detection

### Enhanced
- **SQL Injection**: Improved detection accuracy
- **XSS Prevention**: Enhanced cross-site scripting detection
- **CSRF Protection**: Better CSRF vulnerability identification

## [1.1.0] - 2024-05-15

### Added
- **Custom Headers**: Support for custom HTTP headers
- **Session Management**: Authentication and session handling
- **Form Testing**: Automated form security testing
- **Cookie Security**: Cookie configuration and security analysis

### Enhanced
- **Crawling Engine**: Improved website discovery and crawling
- **JavaScript Support**: Better handling of modern JavaScript frameworks
- **Error Handling**: Enhanced error reporting and debugging

## [1.0.0] - 2024-05-01

### 🎉 Initial Release

#### Core Features
- **Web Application Scanning**: Comprehensive web security assessment
- **OWASP Top 10**: Full coverage of OWASP Top 10 vulnerabilities
- **Real-time Scanning**: Live vulnerability detection
- **Detailed Reporting**: Comprehensive security reports

#### Vulnerability Detection
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Security Misconfigurations
- Sensitive Data Exposure
- Broken Authentication
- Insecure Direct Object References

#### Integration
- RESTful API
- JavaScript SDK
- Webhook support
- JSON/XML reporting

#### Security
- API key authentication
- Rate limiting
- Secure data transmission
- Privacy protection

---

## Support

For questions about releases or upgrade assistance:
- 📧 Email: [support@vaultiscan.com](mailto:support@vaultiscan.com)
- 📖 Documentation: [docs.vaultiscan.com](https://docs.vaultiscan.com)
- 🐛 Issues: [GitHub Issues](https://github.com/vaultiscan/embedding-sdk/issues)

## Release Notes Format

We follow [Semantic Versioning](https://semver.org/) (SemVer):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

Each release includes:
- **Added**: New features
- **Enhanced**: Improvements to existing features
- **Fixed**: Bug fixes
- **Security**: Security-related changes
- **Deprecated**: Features that will be removed in future versions
- **Breaking Changes**: Changes that require code updates
