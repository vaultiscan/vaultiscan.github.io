---
title: FAQ
sidebar_label: FAQ
---

# Frequently Asked Questions

### Can I connect multiple Dropbox accounts?

No. Each user can connect **only one Dropbox account** at a time.  
If you want to connect a different account, you’ll need to first disconnect the existing one and then reconnect using the new account.

---

### If I update my document in Dropbox, will VaultiScan use the latest version?

Yes. When a document in Dropbox is updated, VaultiScan automatically re-indexes it the next time the document is referenced in a query.  
This ensures answers are always based on the most recent version of the file.

---

### Is VaultiScan storing my files?

No. VaultiScan never stores or modifies your Dropbox files.  
It only stores **encrypted embeddings** (mathematical representations) of your document content for AI-based search.  
These embeddings cannot be converted back into the original text or file.

---

### Does VaultiScan have write access to my Dropbox?

No. The Dropbox connector is designed for **read-only style access**, meaning VaultiScan reads file contents and metadata but does not modify, delete, or upload any files.

---

### Can I revoke VaultiScan’s access to my Dropbox?

Yes. You can revoke access at any time from your Dropbox account’s **Connected apps** settings.  
Once revoked, VaultiScan will detect that access was removed and display a message allowing you to either **Reconnect** or **Remove** the connection.

---

### What happens if I delete a document from Dropbox?

Currently, deleted documents are **not automatically removed** from VaultiScan’s search index.  
This capability is planned for a future update so that deleted Dropbox files are excluded from search results.

---

### How many documents can VaultiScan fetch per question?

The number of Dropbox documents VaultiScan analyzes per question is determined by the `search_limit`  
in the connector configuration. The recommended range is **2–5** for balanced accuracy and performance.

---

### Can multiple users under the same organization use the Dropbox connector?

Yes. Once the Organization Admin sets up the Dropbox connector,  
each user can independently connect their own Dropbox account.  
All Dropbox data remains private and isolated per user.

---

### Does VaultiScan support shared folders and team spaces?

Yes. If the connected Dropbox account has access to shared folders or team spaces (depending on your Dropbox plan and permissions),  
VaultiScan can read and analyze those files as part of its search results.

---

### Is my Dropbox data shared with anyone?

No. VaultiScan does not share, transmit, or sell any Dropbox data.  
All data is encrypted and processed securely within your organization’s VaultiScan environment.

---

### Can I disable the Dropbox connector for all users?

Yes. Organization Admins can deactivate the connector from the **Organization → Connectors** tab.  
Once deactivated, the connector is hidden for all users until it is reactivated.

---

### Are VaultiScan’s Dropbox API calls visible in my Dropbox account activity?

Yes. Dropbox may show VaultiScan’s authorized API usage in your account’s security or connected-apps activity views.  
This is part of Dropbox’s standard security monitoring and transparency.

---
