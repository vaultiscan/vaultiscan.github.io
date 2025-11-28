---
title: SharePoint OAuth Configuration
sidebar_label: SharePoint OAuth Configuration
---

# SharePoint OAuth Configuration

Configure Azure AD OAuth credentials to securely connect your SharePoint site for document access and AI-powered analysis.

## Basic Setup

To enable secure access to SharePoint Online via Microsoft Graph API, configure OAuth 2.0 client credentials in the Azure portal following the client credentials grant flow (app-only).

### Steps Overview

1. Register your application in Microsoft Entra ID (Azure AD)
2. Configure API permissions for Microsoft Graph (Application permissions)
3. Grant administrator consent for permissions
4. Create client secret or certificate
5. Configure redirect URIs (if applicable)
6. Obtain tenant ID, client ID, client secret
7. Use client credentials flow to request access tokens
8. Connect VaultiScan SharePoint Connector using these credentials

## Step 1: Register an App in Azure AD

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/) as at least an [Application Developer](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-developer).
2. If you have access to multiple tenants, use the Settings icon in the top menu to switch to the tenant in which you want to register the application
3. Browse to Entra ID > App registrations and select New registration.
4. Enter a meaningful Name for your app, for example identity-client-app. App users can see this name, and it can be changed at any time. You can have multiple app registrations with the same name.
5. Under Supported account types, specify who can use the application. We recommend you select Accounts in this organizational directory only for most applications.
6. Select Register to complete the app registration.

   <img src="/img/sharepoint/sp_1.png" alt="Open Project Picker" width="1200" />

7. The application's Overview page is displayed. Record the Application (client) ID, which uniquely identifies your application and is used in your application's code as part of validating the security tokens it receives from the Microsoft identity platform.

   <img src="/img/sharepoint/sp_2.png" alt="Open Project Picker" width="1200" />

> 💡 Make sure the new project is selected before continuing.

## Step 2: Configure Microsoft Graph API Permissions

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Expand **Identity > Applications >** select **App registrations**.
3. In the **App registrations** window, under the All applications tab, select the app that you want to add Azure AD Graph permissions to.
4. From the left pane of the window, under the Manage menu group, select API permissions. In the Configured permissions window, select Add a permission.
5. Select Microsoft Graph > select Application permissions.
6. In the Select Permissions dialog, choose the permissions to configure to the app.

   <img src="/img/sharepoint/sp_3.png" alt="Open Project Picker" width="1200" />

## Step 3: Request administrator consent

1. With requests to the /adminconsent endpoint, Microsoft Entra ID enforces that only an authorized administrator can sign in to complete the request. The administrator is asked to approve all the application permissions that you requested for your app in the app registration portal.

   <img src="/img/sharepoint/sp_4.png" alt="Open Project Picker" width="500" />

## Step 4: Add Client Secret or Certificate

1. Under **Certificates & secrets**, click **New client secret**.
2. Add description and expiry, then **Add**.
3. Copy the secret value immediately (you’ll need it in VaultiScan).

---

## Step 5: Obtain Tenant ID and Client ID

- Tenant ID is found under **Azure Active Directory → Overview**.
- Client ID is shown in the app registration **Overview** page.

---

## Step 6: Request an access token

1. In the OAuth 2.0 client credentials grant flow, use the application ID and client secret values that you saved when you registered your app to request an access token directly from the Microsoft identity platform /token endpoint.

2. Specify the preconfigured permissions by passing https://graph.microsoft.com/.default as the value for the scope parameter in the token request.

   **Request**
   // Line breaks are for legibility only.

   POST https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token HTTP/1.1
   Host: login.microsoftonline.com
   Content-Type: application/x-www-form-urlencoded

   client_id=535fb089-9ff3-47b6-9bfb-4f1264799865
   &scope=https%3A%2F%2Fgraph.microsoft.com%2F.default
   &client_secret=qWgdYA....L1qKv5bPX
   &grant_type=client_credentials

   **Response**

   ```json
   {
     "token_type": "Bearer",
     "expires_in": 3599,
     "ext_expires_in": 3599,
     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1uQ19WWmNBVGZNNXBP..."
   }
   ```

## Step 7: Use the access token to call Microsoft Graph

1.  After you get an access token, the app uses it to call Microsoft Graph by attaching the access token as a Bearer token to the Authorization header in an HTTP request. The following request gets all users in the tenant. The app must have the User.Read.All permission to call this API.

    **Request**

    GET https://graph.microsoft.com/v1.0/users HTTP/1.1
    Authorization: Bearer eyJ0eXAiO ... 0X2tnSQLEANnSPHY0gKcgw
    Host: graph.microsoft.com

    **Response**

    HTTP/1.1 200 OK
    Content-Type: application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false;charset=utf-8
    request-id: f45d08c0-6901-473a-90f5-7867287de97f
    client-request-id: f45d08c0-6901-473a-90f5-7867287de97f
    OData-Version: 4.0
    Date: Wed, 26 Apr 2017 19:53:49 GMT
    Content-Length: 407

        ```json

        {
        "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
        "value": [
        {
        "businessPhones": [],
        "displayName": "Conf Room Adams",
        "givenName": null,
        "jobTitle": null,
        "mail": "Adams@Contoso.com",
        "mobilePhone": null,
        "officeLocation": null,
        "preferredLanguage": null,
        "surname": null,
        "userPrincipalName": "Adams@Contoso.com",
        "id": "8afc02cb-4d62-4dba-b536-9f6d73e9be26"
        },
        {
        "businessPhones": [
        "+1 425 555 0109"
        ],
        "displayName": "Adele Vance",
        "givenName": "Adele",
        "jobTitle": "Retail Manager",
        "mail": "AdeleV@Contoso.com",
        "mobilePhone": null,
        "officeLocation": "18/2111",
        "preferredLanguage": null,
        "surname": "Vance",
        "userPrincipalName": "AdeleV@Contoso.com",
        "id": "59bb3898-0621-4414-ac61-74f9d7201355"
        }
        ]
        }

        ```
