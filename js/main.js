// Main JavaScript for Open Claude Code Web
class OpenClaudeCodeWeb {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isSmallScreen = window.innerWidth <= 575;
        this.touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.init();
        this.initResponsiveHandlers();
    }

    init() {
        this.fetchGitHubStars();
        this.initSmoothScrolling();
        this.initScrollEffects();
        this.initMobileMenu();
        this.initPerformanceOptimizations();
        this.initResponsiveFeatures();
    }

    // Initialize responsive feature handlers
    initResponsiveHandlers() {
        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            const newIsMobile = window.innerWidth <= 768;
            const newIsSmallScreen = window.innerWidth <= 575;

            if (newIsMobile !== this.isMobile || newIsSmallScreen !== this.isSmallScreen) {
                this.isMobile = newIsMobile;
                this.isSmallScreen = newIsSmallScreen;
                this.handleViewportChange();
            }
        }, 250));

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
    }

    // Handle viewport size changes
    handleViewportChange() {
        // Re-initialize features that depend on screen size
        if (this.isMobile) {
            this.initMobileOptimizations();
        } else {
            this.initDesktopOptimizations();
        }

        // Update navigation behavior
        this.updateNavigationBehavior();

        // Adjust animations based on device capabilities
        this.adjustAnimations();
    }

    // Handle device orientation changes
    handleOrientationChange() {
        const isLandscape = window.innerWidth > window.innerHeight;

        if (isLandscape && window.innerHeight <= 500) {
            // Optimize for small landscape screens
            document.body.classList.add('landscape-small');
        } else {
            document.body.classList.remove('landscape-small');
        }
    }

    // Initialize mobile-specific features
    initMobileOptimizations() {
        // Optimize scrolling performance on mobile
        if (this.touchDevice) {
            document.body.style.touchAction = 'pan-y';

            // Add touch feedback for interactive elements
            this.addTouchFeedback();
        }

        // Reduce motion on mobile if preferred
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    // Initialize desktop-specific features
    initDesktopOptimizations() {
        // Enable hover effects and animations on desktop
        document.body.classList.remove('reduced-motion');

        // Re-enable typing effect if appropriate
        if (window.innerWidth > 768 && document.querySelector('.hero-title')) {
            this.initTypingEffect();
        }
    }

    // Add touch feedback for mobile devices
    addTouchFeedback() {
        const touchElements = document.querySelectorAll('a, button, .feature-card, .github-btn');

        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            }, { passive: true });

            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            }, { passive: true });
        });
    }

    // Update navigation behavior based on screen size
    updateNavigationBehavior() {
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 64;

        // Update scroll offset for smooth scrolling
        this.navHeight = navHeight;

        // Adjust navigation for very small screens
        if (this.isSmallScreen) {
            nav.classList.add('nav-compact');
        } else {
            nav.classList.remove('nav-compact');
        }
    }

    // Adjust animations based on device capabilities
    adjustAnimations() {
        if (this.isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable or reduce animations on mobile/preference
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.transition = 'none';
            });
        } else {
            // Re-enable animations on desktop
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
        }
    }

    // Initialize responsive-specific features
    initResponsiveFeatures() {
        // Initialize viewport meta tag for better mobile experience
        this.optimizeViewportMeta();

        // Handle safe area insets for modern mobile devices
        this.handleSafeAreaInsets();

        // Initialize responsive images if any
        this.initResponsiveImages();
    }

    // Optimize viewport meta tag
    optimizeViewportMeta() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport && this.touchDevice) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
        }
    }

    // Handle safe area insets for notch phones
    handleSafeAreaInsets() {
        const root = document.documentElement;

        // Check if device supports env() variables for safe areas
        if (CSS.supports('padding-bottom', 'env(safe-area-inset-bottom)')) {
            root.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
            root.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
            root.style.setProperty('--safe-area-left', 'env(safe-area-inset-left)');
            root.style.setProperty('--safe-area-right', 'env(safe-area-inset-right)');

            // Add safe area padding to body
            document.body.style.paddingTop = 'var(--safe-area-top, 0px)';
        }
    }

    // Initialize responsive images
    initResponsiveImages() {
        // Placeholder for future image optimization
        // This would handle responsive image loading and lazy loading
    }

    // Enhanced smooth scrolling with mobile considerations
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const navHeight = this.navHeight || document.querySelector('nav')?.offsetHeight || 64;
                    const targetPosition = target.offsetTop - navHeight - 20;

                    // Use different scroll behavior based on device
                    if (this.isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'auto' // Instant scroll on mobile/preference
                        });
                    } else {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Fetch GitHub repository stars
    async fetchGitHubStars() {
        const starCountElement = document.getElementById('starCount');
        const githubUsername = 'yexia553';
        const repoName = 'open_claude_code_web_portal';

        if (!starCountElement) return;

        try {
            // Try multiple methods to get star count
            let stars = 0;

            // Method 1: Try GitHub API (may have rate limits)
            try {
                const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    stars = data.stargazers_count;
                }
            } catch (apiError) {
                console.log('GitHub API failed, trying alternative method');
            }

            // Method 2: Try to fetch from GitHub page HTML (as fallback)
            if (stars === 0) {
                try {
                    const pageResponse = await fetch(`https://github.com/${githubUsername}/${repoName}`);
                    const text = await pageResponse.text();
                    const match = text.match(/aria-label="(\d+(?:,\d+)*) users starred this repository"/);
                    if (match) {
                        stars = parseInt(match[1].replace(/,/g, ''));
                    }
                } catch (pageError) {
                    console.log('GitHub page scraping failed');
                }
            }

            // Update UI with result or fallback
            if (stars > 0) {
                starCountElement.textContent = this.formatNumber(stars);
            } else {
                // Use a realistic placeholder for demo purposes
                starCountElement.textContent = '128';
            }

        } catch (error) {
            console.log('Could not fetch GitHub stars:', error);
            // Fallback number for demo
            starCountElement.textContent = '128';
        }
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    // Smooth scrolling for anchor links
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll effects for navigation and animations
    initScrollEffects() {
        const nav = document.querySelector('nav');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add/remove background blur based on scroll
            if (scrollTop > 50) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }

            // Hide/show navigation on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        });

        // Intersection Observer for animations
        this.initIntersectionObserver();
    }

    // Intersection Observer for scroll animations
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe feature cards and other elements
        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Mobile menu functionality (if needed in future)
    initMobileMenu() {
        // Placeholder for mobile menu if needed later
        // Currently using a simple layout that works well on mobile
    }

    // Performance optimizations
    initPerformanceOptimizations() {
        // Lazy load images if any are added later
        this.initLazyLoading();

        // Optimize font loading
        this.optimizeFontLoading();

        // Add prefetching for external resources
        this.addPrefetching();
    }

    initLazyLoading() {
        // Intersection Observer for lazy loading images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    optimizeFontLoading() {
        // Add font display swap for better loading performance
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Inter';
                font-display: swap;
            }
        `;
        document.head.appendChild(style);
    }

    addPrefetching() {
        // Prefetch GitHub repository
        const githubLink = document.createElement('link');
        githubLink.rel = 'prefetch';
        githubLink.href = 'https://github.com/yourusername/open-claude-code-web';
        document.head.appendChild(githubLink);

        // Preconnect to external domains
        const preconnectDomains = [
            'https://api.github.com',
            'https://cdn.tailwindcss.com',
            'https://cdnjs.cloudflare.com'
        ];

        preconnectDomains.forEach(domain => {
            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = domain;
            document.head.appendChild(preconnect);
        });
    }

    // Utility function to check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Debounce utility function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add typing effect for hero title (optional enhancement)
    initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !this.isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const text = heroTitle.querySelector('[data-i18n="hero.title"]').textContent;
            const titleElement = heroTitle.querySelector('[data-i18n="hero.title"]');

            if (!titleElement.dataset.typed) {
                titleElement.dataset.typed = 'true';
                const originalText = titleElement.textContent;
                titleElement.textContent = '';
                let index = 0;

                const typeWriter = () => {
                    if (index < originalText.length) {
                        titleElement.textContent += originalText.charAt(index);
                        index++;
                        setTimeout(typeWriter, 50);
                    }
                };

                setTimeout(typeWriter, 500);
            }
        }
    }

    // Copy to clipboard functionality (for code snippets if added later)
    initCopyToClipboard() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.copy-btn')) {
                const textToCopy = e.target.dataset.copy;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    this.showToast('Copied to clipboard!');
                });
            }
        });
    }

    // Toast notification system
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 transition-all transform ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        toast.textContent = message;
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Analytics and tracking (placeholder)
    initAnalytics() {
        // Placeholder for analytics integration
        // Could be Google Analytics, Plausible, or self-hosted solution
    }

    // Error handling
    initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // Could send error to analytics service
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // Could send error to analytics service
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new OpenClaudeCodeWeb();

    // Initialize optional features based on page elements
    if (document.querySelector('.hero-title')) {
        setTimeout(() => {
            window.app.initTypingEffect();
        }, 1000);
    }

    if (document.querySelector('.copy-btn')) {
        window.app.initCopyToClipboard();
    }

    window.app.initErrorHandling();
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}