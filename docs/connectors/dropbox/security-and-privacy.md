---
title: Security & Privacy
sidebar_label: Security & Privacy
---

# Security & Privacy for Dropbox Connector

VaultiScan’s Dropbox connector is designed with strict read-only access patterns and enterprise-grade data protection.

## Read-Only Access

- The connector uses only Dropbox's **read-only permissions**:
  - files.metadata.read
  - files.content.read
- VaultiScan **never modifies, deletes, or uploads** files in your Dropbox.

## Data Protection

- All data transferred between VaultiScan and Dropbox APIs is **encrypted in transit (HTTPS)**.
- No files are permanently stored — only temporary indexing and embeddings for AI analysis.
- Indexed data is stored securely in VaultiScan’s private environment.

## Admin Controls

- Organization Admins can **enable or disable** the connector for all users.
- Users can **revoke** Dropbox access at any time via their Dropbox Account settings.
- When access is revoked, VaultiScan automatically detects and reflects it in your dashboard.

## Best Practices

- Keep your **Client Secret** secure — share it only with authorized administrators.
- Regenerate your client secret if it’s ever exposed.
- Restrict access to connector configuration to Organization Admins only.
