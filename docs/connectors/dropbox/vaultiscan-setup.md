---
title: Configuring VaultiScan
sidebar_label: VaultiScan Setup
---

# Configuring the Dropbox Connector in VaultiScan

Configure your Dropbox OAuth credentials in VaultiScan to enable seamless and secure access to Dropbox documents for AI-powered analysis.

> ⚠️ **Note:** Only Organization Admins can create or update connector configurations.

## Prerequisites

Before configuring the connector in VaultiScan, ensure that:

- You have created your Dropbox app and obtained the **App key** and **App secret**
- You have configured the correct **redirect URI** in the Dropbox App Console
- You have safely stored these credentials for admin-only access

## Step 1: Navigate to Setup

1. Log in to VaultiScan as an **Organization Admin**
2. From the sidebar, go to **Setup**
3. Under Setup, select **Organization**
4. On the Organization (or Customer) Dashboard, click **Edit**

![Navigation to Organization (Customer) Dashboard](/img/google_drive/gd_13.png)
_Navigation to Organization (Customer) Dashboard_

## Step 2: Open the Connector Tab

1. On the edit page, open the **Connector** tab
2. You’ll see a list of available connectors
3. From this list, select **Dropbox**

![Open the Connector Tab](/img/dropbox/db_8.png)
_Open the Connector Tab_

## Step 3: Edit Connector Configuration

When you select the Dropbox connector, a JSON configuration editor will appear on the right-hand side.

1. Click **Edit** (located above the JSON editor)
2. Enter your `app_key`, `app_secret`, `search_limit` and `plan_type`.

> ⚠️ **Note:** [Full-text search](https://help.dropbox.com/view-edit/search-content) is only available on Dropbox Professional, Essentials, Standard, Business, Advanced, Business Plus, and Enterprise plan.

**Example Configuration**

```json
{
  "client_id": "your-dropbox-app-key",
  "client_secret": "your-dropbox-app-secret",
  "search_limit": 2,
  "plan_type": "basic"
}
```

![Edit Connector Configuration](/img/dropbox/db_9.png)
_Edit Connector Configuration_

> 💡 **Tip:** The `search_limit` value determines how many Dropbox documents VaultiScan will analyze for each user prompt. A value between 2–5 is recommended for optimal performance and accuracy.

3. Click **Save** to apply your configuration

## Step 4: Connector Visibility and Access

Once the configuration is saved:

- The Dropbox connector becomes available to users and workspace admins in the chat interface.
- As an Organization Admin, select a workspace from the top workspace selector before using chat to access the connector.

## Step 5: Using the Connector in Chat

1. Navigate to the **Chat** page
2. In the question input box, click on the **Tools** button
3. You’ll see **Dropbox** listed as an available connector
4. Next to it, click **Connect** to authorize your Dropbox account

![Connect to Google Drive Connector](/img/dropbox/db_10.png)

## Step 6: Authorize Dropbox Access

1. A popup will appear asking to authorize access to your Dropbox account
2. Click **Authorize** — you’ll be redirected to the Dropbox login/consent page
3. Sign in with your Dropbox account (or select an existing one)
4. Grant read-style access when prompted (the app is configured to use read-only permissions)
5. Once authorization is complete, you’ll be redirected back to VaultiScan, and your connector will be active

## Step 7: Managing Connector Access

As an Organization Admin, you can:

- **Deactivate** the connector at any time (this hides it for all users within the organization)
- **Reactivate** it later, restoring access for all users
- Control when and how the connector is available across your organization

## Step 8: Revoking Access

As a user, you can revoke VaultiScan’s access to your Dropbox at any time:

1. Go to your **Dropbox account → Settings → Connected apps**
2. Find the app associated with VaultiScan
3. Click **Disconnect** or **Remove access**

**Once revoked:**

- VaultiScan will automatically detect that your Dropbox access was revoked
- You’ll see a message indicating that access has been removed
- You can choose to **Reconnect** your account or permanently **Remove** the connection

## Configuration Summary

| Step | Action             | Location                                    |
| ---- | ------------------ | ------------------------------------------- |
| 1    | Navigate to Setup  | Setup → Organization → Edit                 |
| 2    | Open Connector Tab | Connector Tab → Dropbox                     |
| 3    | Add Configuration  | Enter App key, App secret, search_limit     |
| 4    | Save Configuration | Enable connector for organization           |
| 5    | Connect in Chat    | Chat → Tools → Dropbox → Connect            |
| 6    | Authorize Account  | Dropbox OAuth flow                          |
| 7    | Manage Access      | Activate/Deactivate connector               |
| 8    | Revoke Access      | Dropbox account → Settings → Connected apps |

## Next Steps

Once configured, users can start asking questions about their Dropbox documents. VaultiScan will securely fetch, analyze, and provide AI-powered answers based on the most relevant documents in their Dropbox, while respecting organization-wide security and access controls.
