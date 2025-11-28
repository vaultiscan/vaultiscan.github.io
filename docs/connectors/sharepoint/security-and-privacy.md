---
title: Security & Privacy
sidebar_label: Security & Privacy
---

# Security & Privacy for Google Drive Connector

VaultiScan’s SharePoint connector is designed with strict least‑privilege access and enterprise‑grade data protection.

## Read-Only Access

- All traffic between VaultiScan and Microsoft Graph / SharePoint Online is **encrypted in transit (HTTPS/TLS)**.
- Original SharePoint files are **not permanently stored** in VaultiScan.
- VaultiScan stores only **secure, encrypted embeddings and indexes** needed for AI search and retrieval.
- Indexed data is kept within your organization’s **isolated VaultiScan environment** under strict access controls.

## Data Protection

- All traffic between VaultiScan and Microsoft Graph / SharePoint Online is **encrypted in transit (HTTPS/TLS)**.
- Original SharePoint files are **not permanently stored** in VaultiScan.
- VaultiScan stores only **secure, encrypted embeddings and indexes** needed for AI search and retrieval.
- Indexed data is kept within your organization’s **isolated VaultiScan environment** under strict access controls.

## Admin Controls

- Organization Admins can **enable or disable** the SharePoint connector for all users from the VaultiScan admin console.
- Admins manage **app registration, permissions, and client secrets** in Azure AD, retaining full governance.
- Changes to permissions or app deletion in Azure AD immediately restrict VaultiScan’s access to SharePoint.

## Best Practices

- Protect your **client secret / certificate** and rotate it regularly.
- Grant only the **minimum Microsoft Graph permissions** required (principle of least privilege).
- Restrict connector configuration in VaultiScan to trusted **Organization Admins**.
- Periodically review Azure AD **audit logs and app permissions** to ensure continued compliance and security.
