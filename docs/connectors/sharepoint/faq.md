---
title: FAQ
sidebar_label: FAQ
---

# Frequently Asked Questions

### Can I connect multiple SharePoint accounts?

No. Each user can connect **only one SharePoint site or tenant** at a time.  
If you want to connect a different account, you’ll need to first disconnect the existing one and then reconnect using the new account.

---

### If I update my document in SharePoint, will VaultiScan use the latest version?

Yes. When a document in SharePoint is updated, VaultiScan automatically re-indexes it the next time the document is referenced in a query.  
This ensures answers are always based on the most recent version.

---

### Is VaultiScan storing my files?

No. VaultiScan never stores or modifies your SharePoint files.  
It only stores **encrypted embeddings** (mathematical representations) of your document content for AI-based search.  
These embeddings cannot be converted back into the original text or file.

---

### Does VaultiScan have write access to my SharePoint sites?

No. VaultiScan uses **read-only API scopes** via Microsoft Graph, which means it can read files and metadata but cannot modify, delete, or upload any content.

---

### Can I revoke VaultiScan’s access to my SharePoint?

You can revoke VaultiScan’s access by removing the Azure AD app permissions in your tenant or revoking the consent given during connection.  
Once revoked, VaultiScan will detect the lack of permissions and prevent further access until reconnection.  
Once revoked, VaultiScan will detect that your access was removed and display a message allowing you to either **Reconnect** or **Remove** the connection.

---

### What happens if I delete a document from SharePoint?

Currently, deleted documents are **not automatically removed** from VaultiScan’s search index.  
This feature will be added in a future update to ensure deleted Drive files are excluded from results.

---

### How many documents can VaultiScan fetch per question?

The number of SharePoint documents VaultiScan analyzes per question is determined by the `search_limit`  
in the connector configuration. The recommended range is **2–5** for balanced accuracy and performance.

---

### Can multiple users under the same organization use the SharePoint connector?

Yes. Once your organization’s admin sets up the SharePoint connector, each user can connect their authorized SharePoint tenant or site independently. All data access respects user-specific permissions and privacy.

---

### Does VaultiScan support SharePoint Team Sites or Document Libraries?

Yes. VaultiScan fully supports Microsoft SharePoint Team Sites and Document Libraries.
If the connected SharePoint user has access permissions to Team Sites or shared Document Libraries,
VaultiScan can read and analyze those files as part of its search results.

---

### Is my SharePoint data shared with anyone?

No. VaultiScan does not share, transmit, or sell any data.  
All data is encrypted and processed securely within your organization’s VaultiScan environment.

---

### Can I disable the SharePoint connector for all users?

Yes. Organization Admins can deactivate the connector from the **Organization → Connectors** tab.  
Once deactivated, the connector is hidden for all users until it is reactivated.

---

### Are queries from VaultiScan visible in my SharePoint account activity?

Yes. VaultiScan’s Microsoft Graph API activity related to SharePoint may appear in your **Microsoft 365 account’s activity logs**.
This is part of Google’s standard security monitoring and transparency.

---
