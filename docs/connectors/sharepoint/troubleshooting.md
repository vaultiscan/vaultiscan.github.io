---
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting the SharePoint Connector

This guide covers common setup and runtime issues with the SharePoint connector.

## Connector Not Appearing in Chat

- Ensure a **workspace** is selected from the workspace selector.
- Confirm the SharePoint connector is **activated** in Organization settings.
- Check that the connector configuration JSON (tenant_id, client_id, client_secret, search_limit) is valid and saved.

## Authorization Fails

- Verify the **Tenant ID**, **Client ID**, and **Client Secret** match the Azure AD app registration.
- Ensure required **Microsoft Graph application permissions** (for example, `Sites.Read.All`, `Files.Read.All`) are added.
- Confirm an admin has granted **admin consent** for the app in the Entra admin center.
- Regenerate the client secret if it has expired or been rotated and update VaultiScan’s configuration.

## Documents Not Being Found

- Adjust the `search_limit` value (for example, try 2–10).
- Confirm the app has access to the relevant SharePoint sites and document libraries.
- Make sure the target documents are in SharePoint Online (not local or on-prem) and not restricted by permissions.
- Check that your search keywords actually appear in file names or content.

## Access Revoked

- If permissions are removed or the app is deleted in Azure AD, VaultiScan will no longer be able to query SharePoint.
- Restore access by:
  - Re‑creating or re‑enabling the Azure AD app registration.
  - Re‑granting application permissions and admin consent.
  - Updating the connector configuration JSON in VaultiScan (tenant_id, client_id, client_secret).

## Still Stuck?

If issues persist:

- Contact your system administrator or VaultiScan support team for assistance.
