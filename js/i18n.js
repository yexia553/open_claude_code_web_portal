// Internationalization support for Open Claude Code Web
const translations = {
    en: {
        hero: {
            title: "Open-Source AI Coding Assistant",
            subtitle: "Run Claude Code on your server with cost-effective AI models like GLM-4.6, Kimi K2 and more. Take control of your development environment.",
            github: "View on GitHub",
            learnMore: "Learn More"
        },
        features: {
            title: "Why Choose Open Claude Code Web?",
            subtitle: "Experience the power of AI-assisted coding with complete control and cost efficiency",
            modelFreedom: {
                title: "Model Freedom",
                description: "Choose from multiple AI models including GLM-4.6, Kimi K2, Qwen, and more. No vendor lock-in, use what works best for you."
            },
            privacy: {
                title: "Complete Privacy",
                description: "Your code never leaves your server. Complete data privacy and security for sensitive projects and enterprise use."
            },
            costEffective: {
                title: "Cost Effective",
                description: "Reduce AI coding assistant costs by 80%+ compared to commercial alternatives. Pay only for what you use."
            },
            opensource: {
                title: "Open Source",
                description: "Completely free and open source. MIT license allows for commercial use and complete customization."
            },
            deployment: {
                title: "Easy Deployment",
                description: "One-click deployment to any cloud server. Compatible with Cloudflare Pages for frontend hosting."
            },
            extensible: {
                title: "Highly Extensible",
                description: "Plugin system allows for custom functionality. Integrates with your existing development tools."
            }
        },
        tech: {
            title: "Technical Architecture",
            subtitle: "Built with modern web technologies for optimal performance",
            frontend: {
                title: "Frontend"
            },
            backend: {
                title: "Backend"
            },
            supportedModels: {
                title: "Supported AI Models"
            }
        },
        cta: {
            title: "Ready to Take Control of Your AI Coding Assistant?",
            subtitle: "Join the community and start building with affordable, private, and powerful AI assistance.",
            github: "Get Started on GitHub",
            contact: "Contact Us"
        },
        footer: {
            links: {
                title: "Quick Links",
                features: "Features",
                documentation: "Documentation",
                support: "Support"
            },
            community: {
                title: "Community"
            },
            copyright: "© 2024 Open Claude Code Web. Licensed under MIT. Built with ❤️ by the open source community."
        }
    },
    zh: {
        hero: {
            title: "开源AI编程助手",
            subtitle: "在你的服务器上运行Claude Code，支持GLM-4.6、Kimi K2等多种高性价比AI模型。掌控你的开发环境。",
            github: "在GitHub上查看",
            learnMore: "了解更多"
        },
        features: {
            title: "为什么选择Open Claude Code Web？",
            subtitle: "体验AI辅助编程的强大功能，同时拥有完全的控制权和成本效益",
            modelFreedom: {
                title: "模型自由选择",
                description: "支持多种AI模型，包括GLM-4.6、Kimi K2、通义千问等。无供应商锁定，使用最适合你的模型。"
            },
            privacy: {
                title: "完全隐私保护",
                description: "你的代码永远不会离开你的服务器。为敏感项目和企业使用提供完整的数据隐私和安全保障。"
            },
            costEffective: {
                title: "经济高效",
                description: "相比商业替代品，AI编程助手成本降低80%以上。只为实际使用量付费。"
            },
            opensource: {
                title: "开源免费",
                description: "完全免费且开源。MIT许可证允许商业使用和完全定制。"
            },
            deployment: {
                title: "轻松部署",
                description: "一键部署到任何云服务器。兼容Cloudflare Pages进行前端托管。"
            },
            extensible: {
                title: "高度可扩展",
                description: "插件系统支持自定义功能。与你现有的开发工具集成。"
            }
        },
        tech: {
            title: "技术架构",
            subtitle: "采用现代Web技术构建，确保最佳性能",
            frontend: {
                title: "前端"
            },
            backend: {
                title: "后端"
            },
            supportedModels: {
                title: "支持的AI模型"
            }
        },
        cta: {
            title: "准备好掌控你的AI编程助手了吗？",
            subtitle: "加入社区，开始使用经济实惠、私密安全、功能强大的AI辅助开发。",
            github: "在GitHub上开始",
            contact: "联系我们"
        },
        footer: {
            links: {
                title: "快速链接",
                features: "功能特性",
                documentation: "文档",
                support: "支持"
            },
            community: {
                title: "社区"
            },
            copyright: "© 2024 Open Claude Code Web。基于MIT许可证。由开源社区用❤️构建。"
        }
    }
};

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = translations;
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);

        // Add language switcher event listener
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.currentLang;
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.updateDOM();

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update page title
        this.updatePageTitle();
    }

    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return value || key;
    }

    updateDOM() {
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else {
                element.textContent = translation;
            }
        });
    }

    updatePageTitle() {
        const titleKey = this.currentLang === 'zh' ?
            'Open Claude Code Web - 开源AI编程助手' :
            'Open Claude Code Web - Open-Source AI Coding Assistant';
        document.title = titleKey;
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}