/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Main Embedding SDK sidebar
  embeddingSidebar: [
    "intro",
    "installation",
    "configuration",
    "authentication",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/installation",
        "getting-started/quick-start",
        "getting-started/configuration",
        "getting-started/authentication",
      ],
    },
    {
      type: "category",
      label: "Embedding SDK",
      items: [
        "embedding-sdk/overview",
        "embedding-sdk/javascript-sdk",
        "embedding-sdk/react-components",
        "embedding-sdk/vue-components",
        "embedding-sdk/angular-components",
      ],
    },
    {
      type: "category",
      label: "Features",
      items: [
        "features/vulnerability-scanning",
        "features/security-reports",
        "features/monitoring",
        "features/integrations",
      ],
    },
    {
      type: "category",
      label: "API Reference",
      items: ["api", "api/overview"],
    },
    {
      type: "category",
      label: "Examples",
      items: ["examples/basic-integration"],
    },
    "changelog",
  ],

  // Google Drive Connector sidebar
  googleDriveSidebar: [
    {
      type: "doc",
      id: "connectors/google-drive/intro",
      label: "Google Drive Connector",
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        "connectors/google-drive/configuration",
        "connectors/google-drive/vaultiscan-setup",
      ],
    },
    {
      type: "doc",
      id: "connectors/google-drive/security-and-privacy",
      label: "Security and Privacy",
    },
    {
      type: "doc",
      id: "connectors/google-drive/troubleshooting",
      label: "Troubleshooting",
    },
    {
      type: "doc",
      id: "connectors/google-drive/faq",
      label: "FAQ",
    },
    {
      type: "doc",
      id: "connectors/google-drive/changelog",
      label: "Changelog",
    },
  ],

  // SharePoint Connector sidebar
  sharepointSidebar: [
    {
      type: "doc",
      id: "connectors/sharepoint/intro",
      label: "SharePoint Connector",
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        "connectors/sharepoint/configuration",
        "connectors/sharepoint/vaultiscan-setup",
      ],
    },
    {
      type: "doc",
      id: "connectors/sharepoint/security-and-privacy",
      label: "Security and Privacy",
    },
    {
      type: "doc",
      id: "connectors/sharepoint/troubleshooting",
      label: "Troubleshooting",
    },
    {
      type: "doc",
      id: "connectors/sharepoint/faq",
      label: "FAQ",
    },
    // Add more sections...
  ],

  // DropBox Connector sidebar
  dropboxSidebar: [
    {
      type: "doc",
      id: "connectors/dropbox/intro",
      label: "Introduction",
    },
    // Add sections...
  ],

  // Teams Connector sidebar
  teamsSidebar: [
    {
      type: "doc",
      id: "connectors/teams/intro",
      label: "Introduction",
    },
    // Add sections...
  ],
};

module.exports = sidebars;
