---
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting the Dropbox Connector

This guide covers common setup and runtime issues with the Dropbox connector.

## Connector Not Appearing in Chat

- Ensure a **workspace** is selected from the workspace selector.
- Confirm the connector is **activated** in Organization settings.
- Check that configuration JSON (Client ID, Client Secret, search_limit and plan_type) is valid.

## Authorization Fails

- Verify the **Redirect URI** in the Dropbox App Console exactly matches your VaultiScan callback URL.
- Confirm the **OAuth consent screen** is published.
- Check for typos in the **Client ID** or **Client Secret**.

## Documents Not Being Found

- Adjust the `search_limit` value (try 2–5).
- Ensure the authorized Dropbox account has access to the files.
- Verify the files are not restricted by sharing permissions.

## Access Revoked

- If a user revokes Dropbox access from **Dropbox → Settings → Connected apps**, VaultiScan will show the connector as disconnected or “Access Revoked.”
- Reconnect by clicking **Tools → Dropbox → Connect** in chat and completing the OAuth flow again.

## Still Stuck?

If issues persist:

- Contact your system administrator or support team for assistance.
