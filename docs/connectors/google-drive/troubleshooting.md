---
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting the Google Drive Connector

This guide covers common setup and runtime issues with the Google Drive connector.

## Connector Not Appearing in Chat

- Ensure a **workspace** is selected from the workspace selector.
- Confirm the connector is **activated** in Organization settings.
- Check that configuration JSON (Client ID, Client Secret, search_limit) is valid.

## Authorization Fails

- Verify the **Redirect URI** in Google Cloud Console matches your VaultiScan URL.
- Confirm the **OAuth consent screen** is published.
- Check for typos in the **Client ID** or **Client Secret**.

## Documents Not Being Found

- Adjust the `search_limit` value (try 2–5).
- Ensure the authorized Google account has access to the files.
- Verify the files are not restricted by sharing permissions.

## Access Revoked

- If a user revokes Drive access from Google Account → Security → Third-party apps,
  VaultiScan will display “Access Revoked.”
- Reconnect by clicking **Tools → Google Drive → Connect** in chat.

## Still Stuck?

If issues persist:

- Contact your system administrator or support team for assistance.
