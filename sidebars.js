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
  // Main documentation sidebar
  tutorialSidebar: [
    'intro',
    'installation',
    'configuration',
    'authentication',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
        'getting-started/authentication',
      ],
    },
    {
      type: 'category',
      label: 'Embedding SDK',
      items: [
        'embedding-sdk/overview',
        'embedding-sdk/javascript-sdk',
        'embedding-sdk/react-components',
        'embedding-sdk/vue-components',
        'embedding-sdk/angular-components',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/vulnerability-scanning',
        'features/security-reports',
        'features/monitoring',
        'features/integrations',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api',
        'api/overview',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/basic-integration',
      ],
    },
    'changelog',
  ],
};

module.exports = sidebars;
