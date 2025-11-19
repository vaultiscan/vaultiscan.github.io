---
title: Security & Privacy
sidebar_label: Security & Privacy
---

# Security & Privacy for Google Drive Connector

VaultiScan’s Google Drive connector is designed with strict read-only permissions and enterprise-grade data protection.

## Read-Only Access

- The connector uses only Google’s **read-only OAuth scopes**:
  - `https://www.googleapis.com/auth/drive.readonly`
  - `https://www.googleapis.com/auth/drive.metadata.readonly`
- VaultiScan **never modifies, deletes, or uploads** files in your Drive.

## Data Protection

- All data transferred between VaultiScan and Google APIs is **encrypted in transit (HTTPS)**.
- No files are permanently stored — only temporary indexing and embeddings for AI analysis.
- Indexed data is stored securely in VaultiScan’s private environment.

## Admin Controls

- Organization Admins can **enable or disable** the connector for all users.
- Users can **revoke** Google Drive access at any time via their Google Account settings.
- When access is revoked, VaultiScan automatically detects and reflects it in your dashboard.

## Best Practices

- Keep your **Client Secret** secure — share it only with authorized administrators.
- Regenerate your client secret if it’s ever exposed.
- Restrict access to connector configuration to Organization Admins only.
