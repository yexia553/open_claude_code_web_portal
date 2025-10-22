# Open Claude Code Web

An open-source AI coding assistant platform that allows you to run Claude Code on your own server with cost-effective AI models like GLM-4.6, Kimi K2, and more.

## 🌟 Features

- **Model Freedom**: Choose from multiple AI models including GLM-4.6, Kimi K2, Qwen, and more
- **Complete Privacy**: Your code never leaves your server
- **Cost Effective**: Reduce AI coding assistant costs by 80%+ compared to commercial alternatives
- **Open Source**: Completely free and open source (MIT license)
- **Easy Deployment**: One-click deployment to any cloud server
- **Highly Extensible**: Plugin system allows for custom functionality

## 🚀 Quick Start

### Deploy on Cloudflare Pages

1. Fork this repository
2. Go to Cloudflare Pages dashboard
3. Click "Create a project"
4. Connect your GitHub account and select the forked repository
5. Use the default build settings (no build required)
6. Deploy!

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yexia553/open_claude_code_web_portal.git
   cd open-claude-code-web
   ```

2. Serve the files locally:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (if you have http-server installed)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

## 🌍 Internationalization

The website supports multiple languages:
- English (default)
- Chinese (简体中文)

Language preference is automatically saved in localStorage.

## 🛠️ Customization

### Changing GitHub Repository

Update the GitHub repository URL in the following files:
- `index.html` (multiple locations)
- `js/main.js` (in the `fetchGitHubStars` method)

Replace `yourusername` with your actual GitHub username.

### Adding New Languages

1. Add translations to `js/i18n.js` in the `translations` object
2. Update the language selector in `index.html`

### Custom Styling

The website uses Tailwind CSS. You can customize the theme by:
1. Modifying the Tailwind configuration
2. Adding custom CSS classes
3. Updating the color scheme in the `<style>` section

## 📱 Mobile Optimization

The website is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)

## 🔧 Configuration

### GitHub Star Count

The star count is automatically fetched from the GitHub API. Make sure to:
1. Update the repository URL in `js/main.js`
2. Check that the repository is public
3. Handle rate limiting if necessary

### SEO Optimization

The website includes:
- Meta tags for search engines
- Open Graph tags for social media
- Structured data (JSON-LD)
- Semantic HTML5 structure

## 🌐 Deployment Options

### Cloudflare Pages (Recommended)
- Free hosting
- Global CDN
- SSL certificates
- Custom domains

### Other Static Hosting
The website works with any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) for icons
- [Inter Font](https://rsms.me/inter/) for typography
- Cloudflare Pages for hosting

## 📞 Support

- Create an issue on GitHub
- Check the [Wiki](https://github.com/yexia553/open_claude_code_web_portal/wiki)
- Join our community discussions

---

Built with ❤️ by the open source community