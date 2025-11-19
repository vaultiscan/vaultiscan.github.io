---
title: FAQ
sidebar_label: FAQ
---

# Frequently Asked Questions

### Can I connect multiple Google accounts?

No. Each user can connect **only one Google Drive account** at a time.  
If you want to connect a different account, you’ll need to first disconnect the existing one and then reconnect using the new account.

---

### If I update my document in Google Drive, will VaultiScan use the latest version?

Yes. When a document in Google Drive is updated, VaultiScan automatically re-indexes it the next time the document is referenced in a query.  
This ensures answers are always based on the most recent version.

---

### Is VaultiScan storing my files?

No. VaultiScan never stores or modifies your Google Drive files.  
It only stores **encrypted embeddings** (mathematical representations) of your document content for AI-based search.  
These embeddings cannot be converted back into the original text or file.

---

### Does VaultiScan have write access to my Google Drive?

No. VaultiScan uses **read-only OAuth scopes**, meaning it can read file contents and metadata but cannot modify, delete, or upload any files.

---

### Can I revoke VaultiScan’s access to my Google Drive?

Yes. You can revoke access at any time by going to:  
**Google Account → Security → Third-party apps with account access → VaultiScan → Remove Access**  
Once revoked, VaultiScan will detect that your access was removed and display a message allowing you to either **Reconnect** or **Remove** the connection.

---

### What happens if I delete a document from Google Drive?

Currently, deleted documents are **not automatically removed** from VaultiScan’s search index.  
This feature will be added in a future update to ensure deleted Drive files are excluded from results.

---

### How many documents can VaultiScan fetch per question?

The number of Drive documents VaultiScan analyzes per question is determined by the `search_limit`  
in the connector configuration. The recommended range is **2–5** for balanced accuracy and performance.

---

### Can multiple users under the same organization use the Google Drive connector?

Yes. Once the Organization Admin sets up the Google Drive connector,  
each user can independently connect their own Google Drive account.  
All Drive data remains private and isolated per user.

---

### Does VaultiScan support Shared Drives (Team Drives)?

Yes. If the connected Google account has access to Shared Drive files,  
VaultiScan can read and analyze those files as part of its search results.

---

### Is my Google Drive data shared with anyone?

No. VaultiScan does not share, transmit, or sell any Drive data.  
All data is encrypted and processed securely within your organization’s VaultiScan environment.

---

### Can I disable the Google Drive connector for all users?

Yes. Organization Admins can deactivate the connector from the **Organization → Connectors** tab.  
Once deactivated, the connector is hidden for all users until it is reactivated.

---

### Are queries from VaultiScan visible in my Google account activity?

Yes, VaultiScan’s authorized API activity may appear in your Google Account activity log under **Connected Apps**.  
This is part of Google’s standard security monitoring and transparency.

---
