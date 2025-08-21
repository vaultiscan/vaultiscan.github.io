# Angular Components

Pre-built Angular components for integrating VaultiScan into your Angular applications.

## Installation

```bash
npm install @vaultiscan/angular-components
```

## Setup

### Module Import

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { VaultiScanModule } from '@vaultiscan/angular-components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    VaultiScanModule.forRoot({
      apiKey: 'your-api-key'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Standalone Components (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { VulnerabilityScannerComponent, SecurityDashboardComponent } from '@vaultiscan/angular-components';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [VulnerabilityScannerComponent, SecurityDashboardComponent],
  template: `
    <h1>Security Dashboard</h1>
    <vs-vulnerability-scanner
      [apiKey]="apiKey"
      [target]="targetUrl"
      (scanComplete)="onScanComplete($event)">
    </vs-vulnerability-scanner>
    <vs-security-dashboard [scanId]="scanId"></vs-security-dashboard>
  `
})
export class SecurityComponent {
  apiKey = 'your-api-key';
  targetUrl = 'https://api.example.com';
  scanId: string | null = null;

  onScanComplete(results: any) {
    this.scanId = results.scanId;
    console.log('Scan completed:', results);
  }
}
```

## Components

### VulnerabilityScanner

Interactive vulnerability scanner component.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-scanner',
  template: `
    <vs-vulnerability-scanner
      [apiKey]="apiKey"
      [target]="target"
      [scanType]="scanType"
      [autoStart]="true"
      [showProgress]="true"
      (scanStart)="onScanStart($event)"
      (progress)="onProgress($event)"
      (scanComplete)="onScanComplete($event)"
      (error)="onError($event)">
    </vs-vulnerability-scanner>
  `
})
export class ScannerComponent {
  apiKey = 'your-api-key';
  target = 'https://example.com';
  scanType = 'web';

  onScanStart(scan: any) {
    console.log('Scan started:', scan.id);
  }

  onProgress(progress: any) {
    console.log('Progress:', progress.percentage);
  }

  onScanComplete(results: any) {
    console.log('Results:', results);
  }

  onError(error: any) {
    console.error('Error:', error);
  }
}
```

**Inputs:**
- `apiKey` (string, required): VaultiScan API key
- `target` (string, required): Target URL to scan
- `scanType` (string): 'web', 'api', or 'infrastructure'
- `autoStart` (boolean): Start scan automatically
- `showProgress` (boolean): Show progress indicator

**Outputs:**
- `scanStart`: Emitted when scan starts
- `progress`: Emitted for progress updates
- `scanComplete`: Emitted when scan completes
- `error`: Emitted on errors

### SecurityDashboard

Comprehensive security dashboard displaying scan results.

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <vs-security-dashboard
      [scanId]="scanId"
      [showSummary]="true"
      [showVulnerabilities]="true"
      [showRecommendations]="true"
      [theme]="theme"
      (vulnerabilityClick)="onVulnerabilityClick($event)">
    </vs-security-dashboard>
  `
})
export class DashboardComponent {
  @Input() scanId: string = 'scan_123';
  theme = 'light';

  onVulnerabilityClick(vulnerability: any) {
    this.showVulnerabilityDetails(vulnerability);
  }

  showVulnerabilityDetails(vuln: any) {
    // Handle vulnerability details
  }
}
```

**Inputs:**
- `scanId` (string, required): Scan ID to display
- `showSummary` (boolean): Show summary statistics
- `showVulnerabilities` (boolean): Show vulnerability list
- `showRecommendations` (boolean): Show remediation recommendations
- `theme` (string): 'light' or 'dark'

**Outputs:**
- `vulnerabilityClick`: Emitted when vulnerability is clicked

### VulnerabilityList

Displays a list of vulnerabilities with filtering and sorting.

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vulnerability-list',
  template: `
    <vs-vulnerability-list
      [vulnerabilities]="vulnerabilities"
      [showFilters]="true"
      [sortBy]="sortBy"
      [groupBy]="groupBy"
      [itemsPerPage]="20"
      (itemClick)="onItemClick($event)">
    </vs-vulnerability-list>
  `
})
export class VulnerabilityListComponent {
  @Input() vulnerabilities: any[] = [];
  sortBy = 'severity';
  groupBy = 'category';

  onItemClick(vulnerability: any) {
    console.log('Clicked:', vulnerability);
  }
}
```

**Inputs:**
- `vulnerabilities` (array, required): Array of vulnerability objects
- `showFilters` (boolean): Show filter controls
- `sortBy` (string): Default sort field
- `groupBy` (string): Group vulnerabilities by field
- `itemsPerPage` (number): Pagination size

**Outputs:**
- `itemClick`: Emitted when item is clicked

### VulnerabilityCard

Individual vulnerability display card.

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vulnerability-card',
  template: `
    <vs-vulnerability-card
      [vulnerability]="vulnerability"
      [showDetails]="true"
      [showEvidence]="false"
      (remediate)="onRemediate($event)">
    </vs-vulnerability-card>
  `
})
export class VulnerabilityCardComponent {
  @Input() vulnerability: any;

  onRemediate(vulnerability: any) {
    // Handle remediation
  }
}
```

**Inputs:**
- `vulnerability` (object, required): Vulnerability object
- `showDetails` (boolean): Show detailed information
- `showEvidence` (boolean): Show evidence section

**Outputs:**
- `remediate`: Emitted for remediation action

### ScanProgress

Progress indicator for ongoing scans.

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scan-progress',
  template: `
    <vs-scan-progress
      [scanId]="scanId"
      [showPercentage]="true"
      [showPhase]="true"
      [showTimeRemaining]="true"
      [animated]="true">
    </vs-scan-progress>
  `
})
export class ScanProgressComponent {
  @Input() scanId: string = 'scan_123';
}
```

**Inputs:**
- `scanId` (string, required): Scan ID to track
- `showPercentage` (boolean): Show percentage complete
- `showPhase` (boolean): Show current scan phase
- `showTimeRemaining` (boolean): Show estimated time remaining
- `animated` (boolean): Enable animations

## Services

### VaultiScanService

Injectable service for programmatic API access.

```typescript
import { Injectable } from '@angular/core';
import { VaultiScanService } from '@vaultiscan/angular-components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private vaultiScan: VaultiScanService) {}

  startScan(target: string, type: string): Observable<any> {
    return this.vaultiScan.startScan({
      target,
      type
    });
  }

  getScanResults(scanId: string): Observable<any> {
    return this.vaultiScan.getScanResults(scanId);
  }

  startMonitoring(config: any): Observable<any> {
    return this.vaultiScan.startMonitoring(config);
  }
}
```

### Usage in Component

```typescript
import { Component, OnInit } from '@angular/core';
import { VaultiScanService } from '@vaultiscan/angular-components';

@Component({
  selector: 'app-security',
  template: `
    <div>
      <button (click)="startScan()" [disabled]="scanning">
        {{ scanning ? 'Scanning...' : 'Start Scan' }}
      </button>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="results">
        Found {{ results.vulnerabilities.length }} vulnerabilities
      </div>
    </div>
  `
})
export class SecurityComponent implements OnInit {
  scanning = false;
  results: any = null;
  error: string | null = null;

  constructor(private vaultiScan: VaultiScanService) {}

  ngOnInit() {
    // Initialize if needed
  }

  startScan() {
    this.scanning = true;
    this.error = null;

    this.vaultiScan.startScan({
      target: 'https://example.com',
      type: 'web'
    }).subscribe({
      next: (results) => {
        this.results = results;
        this.scanning = false;
      },
      error: (error) => {
        this.error = error.message;
        this.scanning = false;
      }
    });
  }
}
```

## Reactive Forms Integration

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VaultiScanService } from '@vaultiscan/angular-components';

@Component({
  selector: 'app-scan-form',
  template: `
    <form [formGroup]="scanForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="target">Target URL</label>
        <input 
          id="target"
          type="url" 
          formControlName="target"
          class="form-control">
        <div *ngIf="scanForm.get('target')?.invalid && scanForm.get('target')?.touched"
             class="error">
          Valid URL is required
        </div>
      </div>
      
      <div class="form-group">
        <label for="scanType">Scan Type</label>
        <select id="scanType" formControlName="scanType" class="form-control">
          <option value="web">Web Application</option>
          <option value="api">API</option>
          <option value="infrastructure">Infrastructure</option>
        </select>
      </div>
      
      <button type="submit" 
              [disabled]="scanForm.invalid || scanning"
              class="btn btn-primary">
        {{ scanning ? 'Scanning...' : 'Start Scan' }}
      </button>
    </form>
    
    <vs-scan-progress 
      *ngIf="currentScanId"
      [scanId]="currentScanId">
    </vs-scan-progress>
  `
})
export class ScanFormComponent implements OnInit {
  scanForm: FormGroup;
  scanning = false;
  currentScanId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private vaultiScan: VaultiScanService
  ) {
    this.scanForm = this.fb.group({
      target: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      scanType: ['web', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.scanForm.valid) {
      this.scanning = true;
      const formValue = this.scanForm.value;

      this.vaultiScan.startScan(formValue).subscribe({
        next: (scan) => {
          this.currentScanId = scan.id;
          this.scanning = false;
        },
        error: (error) => {
          console.error('Scan failed:', error);
          this.scanning = false;
        }
      });
    }
  }
}
```

## Styling and Themes

### Global Styles

```scss
// Import VaultiScan styles
@import '@vaultiscan/angular-components/styles';

// Custom theme variables
:root {
  --vs-primary-color: #6366f1;
  --vs-secondary-color: #8b5cf6;
  --vs-critical-color: #dc2626;
  --vs-high-color: #ea580c;
  --vs-medium-color: #d97706;
  --vs-low-color: #65a30d;
}

// Component-specific styles
.vs-dashboard {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}

.vs-vulnerability-card {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  
  &.severity-critical {
    border-left: 4px solid var(--vs-critical-color);
  }
  
  &.severity-high {
    border-left: 4px solid var(--vs-high-color);
  }
  
  &.severity-medium {
    border-left: 4px solid var(--vs-medium-color);
  }
  
  &.severity-low {
    border-left: 4px solid var(--vs-low-color);
  }
}
```

### Custom Theme Service

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light');
  public theme$ = this.themeSubject.asObservable();

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  getCurrentTheme() {
    return this.themeSubject.value;
  }
}
```

## Guards and Resolvers

### Authentication Guard

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { VaultiScanService } from '@vaultiscan/angular-components';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private vaultiScan: VaultiScanService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.vaultiScan.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

### Scan Results Resolver

```typescript
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { VaultiScanService } from '@vaultiscan/angular-components';

@Injectable({
  providedIn: 'root'
})
export class ScanResultsResolver implements Resolve<any> {
  constructor(private vaultiScan: VaultiScanService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const scanId = route.paramMap.get('scanId');
    return this.vaultiScan.getScanResults(scanId!);
  }
}
```

## Testing

### Unit Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VaultiScanModule } from '@vaultiscan/angular-components';
import { SecurityComponent } from './security.component';

describe('SecurityComponent', () => {
  let component: SecurityComponent;
  let fixture: ComponentFixture<SecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityComponent],
      imports: [
        VaultiScanModule.forRoot({
          apiKey: 'test-api-key'
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start scan', () => {
    spyOn(component, 'onScanComplete');
    component.startScan();
    expect(component.scanning).toBe(true);
  });
});
```

### Integration Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VaultiScanService } from '@vaultiscan/angular-components';
import { of } from 'rxjs';

describe('VaultiScan Integration', () => {
  let service: VaultiScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VaultiScanModule.forRoot({ apiKey: 'test-key' })]
    });
    service = TestBed.inject(VaultiScanService);
  });

  it('should start scan and return results', (done) => {
    const mockResults = { vulnerabilities: [] };
    spyOn(service, 'startScan').and.returnValue(of(mockResults));

    service.startScan({ target: 'https://example.com', type: 'web' })
      .subscribe(results => {
        expect(results).toEqual(mockResults);
        done();
      });
  });
});
```

## Next Steps

- [JavaScript SDK →](./javascript-sdk)
- [React Components →](./react-components)
- [Vue Components →](./vue-components)
