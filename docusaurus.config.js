// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VaultiScan Embedding SDK',
  tagline: 'Secure answers from your own data - AI-powered document intelligence for developers',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://vaultiscan.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vaultiscan', // Usually your GitHub org/user name.
  projectName: 'vaultiscan.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/vaultiscan/vaultiscan.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/vaultiscan/vaultiscan.github.io/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/vaultiscan-social-card.jpg',
      navbar: {
        title: 'VaultiScan Embedding SDK',
        logo: {
          alt: 'VaultiScan Logo',
          src: 'img/logo.svg',
          href: '/docs/intro',
          target: '_self',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/blog',
            label: 'Examples',
            position: 'left'
          },
          {
            href: 'https://github.com/vaultiscan/vaultiscan.github.io',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Getting Started',
            items: [
              {
                label: 'Quick Start',
                to: '/docs/intro',
              },
              {
                label: 'Installation',
                to: '/docs/installation',
              },
              {
                label: 'Configuration',
                to: '/docs/configuration',
              },
              {
                label: 'Authentication',
                to: '/docs/authentication',
              },
            ],
          },
          {
            title: 'SDK Features',
            items: [
              {
                label: 'Vulnerability Scanning',
                to: '/docs/features/vulnerability-scanning',
              },
              {
                label: 'Security Reports',
                to: '/docs/features/security-reports',
              },
              {
                label: 'Real-time Monitoring',
                to: '/docs/features/monitoring',
              },
              {
                label: 'Custom Integrations',
                to: '/docs/features/integrations',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'API Reference',
                to: '/docs/api',
              },
              {
                label: 'Examples',
                to: '/blog',
              },
              {
                label: 'Changelog',
                to: '/docs/changelog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/vaultiscan/embedding-sdk-docs',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Contact Support',
                href: 'mailto:support@vaultiscan.com',
              },
              {
                label: 'GitHub Issues',
                href: 'https://github.com/vaultiscan/embedding-sdk-docs/issues',
              },
              {
                label: 'Documentation Issues',
                href: 'https://github.com/vaultiscan/embedding-sdk-docs/issues/new?template=documentation.md',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} VaultiScan Embedding SDK. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'yaml', 'docker', 'powershell', 'python', 'javascript', 'typescript'],
      },
      // Algolia search configuration
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',
        
        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',
        
        indexName: 'vaultiscan-embedding-sdk',
        
        // Optional: see doc section below
        contextualSearch: true,
        
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push
        externalUrlRegex: 'external\\.com|domain\\.com',
        
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },
        
        // Optional: Algolia search parameters
        searchParameters: {},
        
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
      // Announcement bar for important updates
      announcementBar: {
        id: 'vaultiscan_launch',
        content:
          '🚀 New VaultiScan Embedding SDK is now available! <a target="_blank" rel="noopener noreferrer" href="https://vaultiscan.ai">Try VaultiScan Live</a> | <a target="_blank" rel="noopener noreferrer" href="/docs/getting-started/quick-start">Quick Start Guide</a>',
        backgroundColor: '#6366f1',
        textColor: '#fff',
        isCloseable: true,
      },
      // Color mode configuration
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // Metadata for SEO and social cards
      metadata: [
        {name: 'keywords', content: 'embedding sdk, security scanning, vulnerability assessment, api integration, javascript sdk, react components, security automation'},
        {name: 'description', content: 'VaultiScan Embedding SDK allows developers to integrate powerful security scanning capabilities directly into their applications with minimal code.'},
        {property: 'og:title', content: 'VaultiScan Embedding SDK Documentation'},
        {property: 'og:description', content: 'Embed VaultiScan security scanning into your applications with our comprehensive SDK'},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: 'https://vaultiscan.github.io/embedding-sdk-docs/'},
        {property: 'og:image', content: 'https://vaultiscan.github.io/embedding-sdk-docs/img/vaultiscan-sdk-social-card.jpg'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:title', content: 'VaultiScan Embedding SDK'},
        {name: 'twitter:description', content: 'Integrate security scanning into your applications'},
        {name: 'twitter:image', content: 'https://vaultiscan.github.io/embedding-sdk-docs/img/vaultiscan-sdk-social-card.jpg'},
        {name: 'twitter:site', content: '@vaultiscan'},
      ],
    }),

  // Plugins configuration
  plugins: [
    // Add additional plugins here if needed
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
        ],
      },
    ],
  ],

  // GitHub Pages deployment configuration
  scripts: [
    // Add any additional scripts here
  ],

  stylesheets: [
    // Add any additional stylesheets here
  ],
};

module.exports = config;
