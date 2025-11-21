---
title: Google OAuth Configuration
sidebar_label: Google OAuth Configuration
---

# Google OAuth Configuration

Configure Google OAuth credentials to securely connect your Google Drive for document reading and analysis.

## Basic Setup

To enable secure, read-only access to Google Drive, configure OAuth 2.0 credentials in the Google Cloud Console.

### Steps Overview

1. Create a new project
2. Enable the Google Drive API
3. Configure the OAuth consent screen
4. Add read-only scopes
5. Create OAuth client credentials
6. Add authorized redirect URIs
7. Download the credentials JSON securely
8. Publish the app

## Step 1: Create a Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Click `Project Selector → New Project`.
3. Enter a project name (e.g., **VaultiScan Google Connector**).
4. (Optional) Select your organization or folder.
5. Click **Create**.

![Open Project Picker](/img/google_drive/gd_1.png)
_Open Project Picker_

![Google Cloud Project Creation Page](/img/google_drive/gd_2.png)
_Creating a new project in Google Cloud Console_

> 💡 Make sure the new project is selected before continuing.

## Step 2: Enable Google Drive API

1. Navigate to `APIs & Services → Library`.
2. Search for **Google Drive API**.
3. Click **Enable**.

![Search Google Drive API](/img/google_drive/gd_3.png)
_Search and Select Google Drive API_

![Enable Google Drive API](/img/google_drive/gd_4.png)  
_Enable Google Drive API_

## Step 3: Add Required Scopes

1. Click **Add or Remove Scopes**.
2. Include the following read-only scopes:

| Scope                                                     | Description                                             |
| --------------------------------------------------------- | ------------------------------------------------------- |
| `https://www.googleapis.com/auth/drive.readonly`          | Read content of Drive files                             |
| `https://www.googleapis.com/auth/drive.metadata.readonly` | Access file metadata such as name and modification time |

![Add scopes](/img/google_drive/gd_12.png)
_Add scopes for Google Drive API_

> ⚠️ These scopes provide read-only access. The connector never modifies, deletes, or uploads files.

## Step 4: Go to OAuth Consent Screen

1. Go to `APIs & Services → OAuth consent screen`.

![Select APIs & Services](/img/google_drive/gd_5.png)
_Select APIs & Services on the sidebar_

![Select OAuth Consent Screen](/img/google_drive/gd_6.png)
_Select OAuth Consent Screen_

## Step 5: Create OAuth Client ID and Client Secret

1. Go to `APIs & Services → Credentials`.
2. Click **+ Create Credentials → OAuth Client ID**.
3. Set **Application Type** to **Web Application**.

![Set Application Type](/img/google_drive/gd_8.png)
_Set Application Type_

4. Name it (e.g., **VaultiScan Google Drive Connector**).
5. Under **Authorized redirect URIs**, add:
   - `https://vaultiscan-frontend-app-dev-ababc5edamavexeg.uksouth-01.azurewebsites.net/oauth-callback.html`

![Add authorized redirect URI](/img/google_drive/gd_9.png)
_Add authorized redirect URI_

6. Click **Create** and note the **Client ID** and **Client Secret**.

## Step 6: Download Credentials JSON

1. Click **Download JSON** to save your credentials file.

![Download Credentials JSON](/img/google_drive/gd_10.png)
_Download Credentials JSON_

2. This file contains the Client ID, Client Secret, and redirect URIs.

> ⚠️ The client secret is visible only once. Store the JSON securely and limit access to administrators. If it’s lost or compromised, generate a new OAuth client.

**Example JSON**

```json
{
  "web": {
    "client_id": "1234567890-example.apps.googleusercontent.com",
    "client_secret": "GOCSPX-exampleSecretKey",
    "redirect_uris": [
      "https://vaultiscan-frontend-app-dev-ababc5edamavexeg.uksouth-01.azurewebsites.net/oauth-callback.html"
    ]
  }
}
```

## Step 7: Publish the App

1. Navigate back to `APIs & Services → OAuth consent screen`.
2. Click **Publish App** and confirm.

![Publish App](/img/google_drive/gd_11.png)
_Publish App_

## Configuration Summary

| Step | Action                   | Location                      |
| ---- | ------------------------ | ----------------------------- |
| 1    | Create project           | Project Selector              |
| 2    | Enable Drive API         | APIs & Services → Library     |
| 3    | Configure consent screen | OAuth consent screen          |
| 4    | Add scopes               | OAuth consent screen → Scopes |
| 5    | Create credentials       | APIs & Services → Credentials |
| 6    | Download JSON            | Credentials screen            |
| 7    | Publish                  | OAuth consent screen          |

## Security Best Practices

- Keep your client secret and JSON file confidential.
- Limit access to authorized administrators.
- Revoke and regenerate the secret immediately if compromised.

## Next Steps

Use the Client ID, Client Secret, and Redirect URI from the JSON file to configure VaultiScan. Once configured, the connector can authenticate securely and start indexing Google Drive content. Use the connector dashboard to verify access and test queries.
