---
title: Configuring VaultiScan for SharePoint
sidebar_label: VaultiScan Setup (SharePoint)
---

# Configuring the SharePoint Connector in VaultiScan

Configure your Microsoft Entra (Azure AD) app credentials in VaultiScan to enable secure, app-only access to SharePoint documents via Microsoft Graph for AI-powered analysis.

> ⚠️ **Note:** Only Organization Admins can create or update connector configurations.

## Prerequisites

Before configuring the connector in VaultiScan, ensure that:

- You have **registered an app** in Microsoft Entra ID (Azure AD).
- You have:
  - **Tenant ID**
  - **Client ID** (Application ID)
  - **Client Secret** (or certificate) for the app.
- You have granted **application permissions** (for example, `Sites.Read.All`, `Files.Read.All`) and **admin consent** for the app in the Entra admin center.

## Step 1: Navigate to Setup

1. Log in to VaultiScan as an **Organization Admin**.
2. From the sidebar, go to **Setup**.
3. Under Setup, select **Organization**.
4. On the Organization (or Customer) Dashboard, click **Edit**.

![Navigation to Organization (Customer) Dashboard](/img/google_drive/gd_13.png)
_Navigation to Organization (Customer) Dashboard_

## Step 2: Open the Connector Tab

1. On the edit page, open the **Connector** tab
2. You'll see a list of available connectors
3. From this list, select **Google Drive**

![Open the Connector Tab](/img/google_drive/gd_14.png)
_Open the Connector Tab_

## Step 3: Edit Connector Configuration

When you select the Google Drive connector, a JSON configuration editor will appear on the right-hand side.

1. Click **Edit** (located above the JSON editor)
2. Enter your `client_id`, `client_secret`, and `search_limit`

**Example Configuration**

```json
{
  "client_id": "your-google-client-id",
  "client_secret": "your-google-client-secret",
  "search_limit": 2
}
```

![Edit Connector Configuration](/img/google_drive/gd_15.png)
_Edit Connector Configuration_

> 💡 **Tip:** The `search_limit` value determines how many Drive documents VaultiScan will analyze for each user prompt. A value between 2–5 is recommended for optimal performance and accuracy.

3. Click **Save** to apply your configuration

## Step 4: Connector Visibility and Access

Once the configuration is saved:

- The Google Drive connector becomes available to users and workspace admins in the chat interface
- As an Organization Admin, select a workspace from the top workspace selector before using chat to access the connector

## Step 5: Using the Connector in Chat

1. Navigate to the **Chat** page
2. In the question input box, click on the **Tools** button
3. You'll see Google Drive listed as an available connector
4. Next to it, click **Connect** to authorize your Google Drive account

![Connect to Google Drive Connector](/img/google_drive/gd_16.png)
_Connect to Google Drive Connector_

## Step 6: Authorize Google Drive Access

1. A popup will appear asking to authorize access to your Google Drive account
2. Click **Authorize** — you'll be redirected to the Google login page
3. Sign in with your Google account (or select an existing one)
4. Grant read-only access when prompted
5. Once authorization is complete, you'll be redirected back to VaultiScan, and your connector will be active

## Step 7: Managing Connector Access

As an Organization Admin, you can:

- **Deactivate** the connector at any time (this hides it for all users within the organization)
- **Reactivate** it later, restoring access for all users
- Control when and how the connector is available across your organization

## Step 8: Revoking Access

As a user, you can revoke VaultiScan's access to your Google Drive at any time:

1. Go to your **Google Account → Security → Third-party apps with account access**
2. Find **VaultiScan** in the list
3. Click **Remove Access**

**Once revoked:**

- VaultiScan will automatically detect that your Google Drive access was revoked
- You'll see a message indicating that access has been removed
- You can choose to **Reconnect** your account or permanently **Remove** the connection

## Configuration Summary

| Step | Action             | Location                                     |
| ---- | ------------------ | -------------------------------------------- |
| 1    | Navigate to Setup  | Setup → Organization → Edit                  |
| 2    | Open Connector Tab | Connector Tab → Google Drive                 |
| 3    | Add Configuration  | Enter Client ID, Client Secret, search_limit |
| 4    | Save Configuration | Enable connector for organization            |
| 5    | Connect in Chat    | Chat → Tools → Google Drive → Connect        |
| 6    | Authorize Account  | Google OAuth flow                            |
| 7    | Manage Access      | Activate/Deactivate connector                |
| 8    | Revoke Access      | Google Account settings                      |

## Next Steps

Once configured, users can start asking questions about their Google Drive documents. VaultiScan will securely fetch, analyze, and provide AI-powered answers based on the most relevant documents in their Drive.
