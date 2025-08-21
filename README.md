# VaultiScan Embedding SDK Documentation

This repository contains the documentation website for the VaultiScan Embedding SDK, built with [Docusaurus](https://docusaurus.io/).

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```bash
npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## 📁 Project Structure

```
vaultiscan.github.io/
├── docs/                          # Documentation files
│   ├── intro.md                   # Homepage content
│   ├── getting-started/           # Getting started guides
│   │   ├── installation.md
│   │   ├── quick-start.md
│   │   ├── configuration.md
│   │   └── authentication.md
│   ├── embedding-sdk/             # SDK documentation
│   │   ├── overview.md
│   │   ├── javascript-sdk.md
│   │   ├── react-components.md
│   │   └── features/
│   ├── api/                       # API reference
│   │   ├── overview.md
│   │   ├── rest/
│   │   ├── js-sdk/
│   │   └── webhooks/
│   └── examples/                  # Code examples
├── blog/                          # Blog posts/examples
├── src/                           # Custom components and pages
│   ├── components/
│   ├── css/
│   └── pages/
├── static/                        # Static assets
│   └── img/
├── docusaurus.config.js           # Docusaurus configuration
├── sidebars.js                    # Sidebar configuration
└── package.json
```

## 📝 Adding New Documentation

### Adding a New Page

1. Create a new Markdown file in the appropriate folder under `docs/`
2. Add frontmatter with sidebar position:
   ```markdown
   ---
   sidebar_position: 1
   ---
   
   # Your Page Title
   
   Your content here...
   ```

3. Update `sidebars.js` if needed to include the new page in navigation

### Adding a New Section

1. Create a new folder under `docs/`
2. Add an `_category_.json` file to configure the section:
   ```json
   {
     "label": "Your Section Name",
     "position": 3,
     "link": {
       "type": "generated-index",
       "description": "Description of your section"
     }
   }
   ```

3. Add Markdown files to the folder
4. Update `sidebars.js` to include the new section

### Examples of New Content You Can Add

- **New SDK Features**: Add to `docs/embedding-sdk/features/`
- **Framework Guides**: Add to `docs/embedding-sdk/` (e.g., `svelte-components.md`)
- **API Endpoints**: Add to `docs/api/rest/`
- **Code Examples**: Add to `docs/examples/`
- **Tutorials**: Add to `blog/` for step-by-step guides

## 🎨 Customization

- **Styling**: Edit `src/css/custom.css` for custom styles
- **Components**: Add React components in `src/components/`
- **Pages**: Create custom pages in `src/pages/`
- **Configuration**: Modify `docusaurus.config.js` for site-wide settings

## 🔧 Configuration

The main configuration is in `docusaurus.config.js`. Key sections:

- **Site metadata**: Title, tagline, URL
- **Navigation**: Navbar and footer links
- **Search**: Algolia search configuration
- **Deployment**: GitHub Pages settings

## 📖 Writing Guidelines

- Use clear, concise language
- Include code examples where applicable
- Add screenshots or diagrams for complex concepts
- Follow the existing file naming conventions
- Test all code examples before publishing

## 🚀 Deployment

The site is automatically deployed to GitHub Pages when you push to the main branch. The deployment URL will be:

- **Production**: https://vaultiscan.github.io

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm start`
5. Submit a pull request

## 📞 Support

For questions about the documentation:
- Open an issue in this repository
- Contact the VaultiScan team
- Check the [Docusaurus documentation](https://docusaurus.io/docs) for platform-specific questions
