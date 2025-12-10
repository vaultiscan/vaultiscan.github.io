---
title: Dropbox OAuth Configuration
sidebar_label: Dropbox OAuth Configuration
---

# Dropbox OAuth Configuration

Configure Dropbox credentials to securely connect your Dropbox for document reading and analysis.

## Basic Setup

To enable secure, read-only access to Dropbox, configure an OAuth 2.0 app in the Dropbox App Console.

### Steps Overview

1. Create a new Dropbox app
2. Configure app settings and scopes
3. Add read-only permissions
4. Set redirect URIs
5. Generate and save app credentials
6. Configure rate limits (optional)

## Step 1: Create a Dropbox App

1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps).
2. Click **Create app**.

![Open Project Picker](/img/dropbox/db_1.png)

3. Choose an API:
   - Select **Scoped access** (recommended for granular permissions).

![Open Project Picker](/img/dropbox/db_2.png)

4.  Choose the type of access:

- Select **Full Dropbox** to access all files and folders.
- Or select **App folder** for restricted access to a dedicated folder.

![Open Project Picker](/img/dropbox/db_3.png)

5. Name your app (e.g., **Expanse Organisor plus**).
6. Click **Create app**.

![Open Project Picker](/img/dropbox/db_4.png)

## Step 2: Configure App Settings

1. After creating the app, you'll be redirected to the app's **Settings** page.
2. Note the **App key** and **App secret** displayed at the top.
3. Go back to the **Settings** tab.
4. Displays the level of access your app will have to any linked Dropbox account. For non-Business API apps this can be either App folder or Full Dropbox. Business API permissions are described in the [Access types section](https://www.dropbox.com/developers/documentation/http/teams) of the Business API reference documentation.

![Open Project Picker](/img/dropbox/db_7.png)

5. Scroll to the **OAuth 2** section.
6. Under **Redirect URIs**, click **Add**.
7. Enter your VaultiScan redirect URI:

- Example: `https://your-vaultiscan-domain.com/oauth-callback`
- For local development: `http://localhost:3000/oauth-callback`

> ⚠️ Keep your App secret confidential. It will be used to authenticate API requests.

![Open Project Picker](/img/dropbox/db_5.png)

## Step 3: Add Required Permissions

1. Navigate to the **Permissions** tab.
2. Select the following read-only scopes:

| Scope                 | Description                             |
| --------------------- | --------------------------------------- |
| `files.metadata.read` | View metadata for files and folders     |
| `files.content.read`  | View content of files                   |
| `account_info.read`   | View basic account information          |
| `sharing.read`        | View shared folder and file information |

![Open Project Picker](/img/dropbox/db_6.png)

3. Click **Submit** at the bottom of the page.

> ⚠️ These scopes provide read-only access. The connector never modifies, deletes, or uploads files.

## Step 4: Generate Access Token (Optional for Testing)

1. Scroll to the **OAuth 2** section on the Settings tab.
2. Click **Generate access token**.
3. Copy and securely store the token.

> ⚠️ This token is for testing only. In production, use the OAuth flow with App key and App secret.

## Step 6: Enable Additional Features (Optional)

### Enable Token Access Type

1. In the **Settings** tab under **OAuth 2**, find **Access token expiration**.
2. Select **Short-lived** or **No expiration** based on your security requirements.
3. For refresh token support, ensure `token_access_type=offline` is included in your authorization URL.

### Rate Limits

Dropbox automatically enforces rate limits based on your app's usage. Monitor usage in the **Analytics** section if available.

## Configuration Summary

| Step | Action                    | Location                 |
| ---- | ------------------------- | ------------------------ |
| 1    | Create Dropbox app        | App Console → Create app |
| 2    | Note App key and secret   | Settings tab             |
| 3    | Add read-only permissions | Permissions tab          |
| 4    | Set redirect URIs         | Settings → OAuth 2       |
| 5    | (Optional) Generate token | Settings → OAuth 2       |
| 6    | Configure token settings  | Settings → OAuth 2       |

## Next Steps

Use the Client ID, Client Secret, and Redirect URI from the JSON file to configure VaultiScan. Once configured, the connector can authenticate securely and start indexing Dropbox content. Use the connector dashboard to verify access and test queries.
