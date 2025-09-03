/*!
* Modern Portfolio JS - Amon Kikuchi
* Enhanced with modern interactions and animations
*/

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeNavbar();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeFloatingCards();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeTypingEffect();
    initializeParallaxEffect();
    initializeChatbot();
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 50
        });
    }
});

// ===== NAVBAR FUNCTIONALITY =====
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.querySelector('#navbarMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
    
    // Mobile menu toggle
    if (navbarToggler && navbarMenu) {
        navbarToggler.addEventListener('click', function() {
            navbarMenu.classList.toggle('show');
            const [line1, line2, line3] = navbarToggler.querySelectorAll('span');
            const opened = navbarMenu.classList.contains('show');
            if (line1 && line2 && line3) {
                line1.style.transform = opened ? 'translateY(7px) rotate(45deg)' : 'none';
                line2.style.opacity = opened ? '0' : '1';
                line3.style.transform = opened ? 'translateY(-7px) rotate(-45deg)' : 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu) {
                navbarMenu.classList.remove('show');
                const [line1, line2, line3] = navbarToggler.querySelectorAll('span');
                if (line1 && line2 && line3) {
                    line1.style.transform = 'none';
                    line2.style.opacity = '1';
                    line3.style.transform = 'none';
                }
            }
        });
    });
    
    // Active nav link highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        updateActiveNav();
    });
    
    // Initial call
    handleScroll();
    updateActiveNav();
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.info-card, .skill-category, .project-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                
                // Animate skill bar
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, 200);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        skillObserver.observe(bar);
    });
}

// ===== FLOATING CARDS ANIMATION =====
function initializeFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = `translateY(-10px) rotate(${Math.random() * 10 - 5}deg)`;
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    if (form) {
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Input animations
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('.hero-subtitle');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 1000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== PARALLAX EFFECT =====
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== THEME SWITCHING (Optional Future Enhancement) =====
function initializeThemeSwitch() {
    const themeSwitch = document.querySelector('.theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    konamiCode.splice(0, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = 'none';
        }, 5000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===== CHATBOT FUNCTIONALITY =====
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const messagesContainer = document.getElementById('chatbotMessages');
    const quickButtons = document.querySelectorAll('.quick-btn');
    
    // 個人情報データベース
    const personalData = {
        basic: {
            name: "菊地亜紋",
            nameEn: "Amon Kikuchi",
            age: 22,
            university: "東京国際工科専門職大学 工科学部 情報工学科 AI戦略コース",
            year: "大学4年生",
            location: "静岡県沼津市",
            research: "強化学習トレーディングシステム"
        },
        research: {
            field: "強化学習トレーディングシステム",
            description: "金融市場における自動売買アルゴリズムの開発を通じて、深層強化学習（Deep Q-Network、Actor-Critic手法）を応用した投資戦略の最適化を行っています。リスク管理とポートフォリオ最適化を組み合わせた実用的なトレーディングボットの構築を目指しています。",
            keywords: ["強化学習", "金融工学", "アルゴリズム取引", "深層学習", "DQN", "Actor-Critic", "リスク管理", "ポートフォリオ最適化"]
        },
        skills: {
            languages: ["Python", "TypeScript", "JavaScript", "HTML5", "CSS3", "C", "Node.js"],
            tools: ["React", "Docker", "Git", "Slack", "Notion", "機械学習", "深層学習", "データ分析"],
            certifications: ["基本情報技術者", "情報技術者検定2級", "計算技術検定2級", "TOEIC 805"]
        },
        experience: [
            {
                period: "2025年1月～現在",
                company: "株式会社AVILEN - DS-Hub",
                role: "AI・機械学習エンジニア インターン",
                description: "クライアント案件におけるAIモデル開発やアノテーション業務を担当",
                tech: ["Python", "機械学習", "データアノテーション"]
            },
            {
                period: "2024年1月～8月",
                company: "株式会社AndGo",
                role: "フロントエンドエンジニア インターン",
                description: "暗号資産(Bitcoin)の積み立てアプリ開発",
                tech: ["TypeScript", "Node.js", "React"]
            },
            {
                period: "2023年12月～2024年12月",
                company: "株式会社セガサミーホールディングス",
                role: "データエンジニア インターン",
                description: "データ運用の効率化・自動化",
                tech: ["Python", "Docker"]
            }
        ],
        projects: [
            {
                name: "ポートフォリオサイト",
                description: "個人ポートフォリオサイトの設計・開発。レスポンシブデザインでモダンなUI/UXを実現",
                tech: ["HTML5", "CSS3", "JavaScript"]
            },
            {
                name: "暗号資産投資アプリ",
                description: "Bitcoin自動積み立てアプリのフロントエンド開発。ユーザーフレンドリーなUIで投資体験を最適化",
                tech: ["TypeScript", "React", "Node.js"]
            },
            {
                name: "株式レポートチャットボット",
                description: "株式レポート分析チャットボット。AIを活用した金融情報の自動分析とレポート生成",
                tech: ["Python", "Dify", "AI/ML"]
            }
        ],
        achievements: [
            {
                event: "株式会社サイバーエージェント ハッカソン",
                name: "1DAY DATA HACKATHON",
                description: "航空業界におけるデータコンサルティング",
                result: "2位入賞"
            }
        ]
    };
    
    // AIレスポンス生成関数
    function generateResponse(question) {
        const q = question.toLowerCase();
        
        // 専門分野について
        if (q.includes('専門') || q.includes('分野') || q.includes('得意')) {
            return `私の専門分野はAI・機械学習です！🤖\n\n主に以下の分野に取り組んでいます：\n• データ分析・データサイエンス\n• 機械学習・深層学習\n• フロントエンド開発\n• データエンジニアリング\n\n**研究分野：**\n${personalData.research.field}の研究に特に力を入れています。${personalData.research.description}\n\nPythonを中心に、TypeScript/React、Dockerなども使って開発しています。現在は${personalData.basic.university}でAI戦略コースを専攻中です！`;
        }
        
        // 研究について
        if (q.includes('研究') || q.includes('強化学習') || q.includes('トレーディング') || q.includes('金融')) {
            return `研究分野についてご紹介します！🔬\n\n**${personalData.research.field}**\n\n${personalData.research.description}\n\n**キーワード：**\n${personalData.research.keywords.join(', ')}\n\nこの研究を通じて、AIと金融の融合領域で実用的なソリューションの開発を目指しています！`;
        }
        
        // プロジェクトについて
        if (q.includes('プロジェクト') || q.includes('作品') || q.includes('開発')) {
            let response = "これまでに手がけたプロジェクトをご紹介します！🚀\n\n";
            personalData.projects.forEach((project, index) => {
                response += `${index + 1}. **${project.name}**\n${project.description}\n技術: ${project.tech.join(', ')}\n\n`;
            });
            return response;
        }
        
        // インターンシップ経験
        if (q.includes('インターン') || q.includes('経験') || q.includes('職歴') || q.includes('仕事')) {
            let response = "インターンシップ経験をご紹介します！💼\n\n";
            personalData.experience.forEach((exp, index) => {
                response += `${index + 1}. **${exp.company}** (${exp.period})\n役職: ${exp.role}\n内容: ${exp.description}\n技術: ${exp.tech.join(', ')}\n\n`;
            });
            return response;
        }
        
        // 技術スキル
        if (q.includes('技術') || q.includes('スキル') || q.includes('言語') || q.includes('ツール')) {
            return `技術スキルをご紹介します！⚡\n\n**プログラミング言語:**\n${personalData.skills.languages.join(', ')}\n\n**ツール・フレームワーク:**\n${personalData.skills.tools.join(', ')}\n\n**保有資格:**\n${personalData.skills.certifications.join(', ')}\n\n特にPythonでの機械学習とTypeScript/Reactでのフロントエンド開発が得意です！`;
        }
        
        // 基本情報
        if (q.includes('名前') || q.includes('年齢') || q.includes('大学') || q.includes('プロフィール')) {
            return `プロフィールをご紹介します！👨‍💻\n\n**名前:** ${personalData.basic.name} (${personalData.basic.nameEn})\n**年齢:** ${personalData.basic.age}歳\n**学年:** ${personalData.basic.year}\n**大学:** ${personalData.basic.university}\n**研究分野:** ${personalData.basic.research}\n**居住地:** ${personalData.basic.location}\n\nAI・データサイエンス分野に情熱を注ぐ学生エンジニアです！特に強化学習を用いた金融システムの研究に取り組んでいます。`;
        }
        
        // 実績・成果
        if (q.includes('実績') || q.includes('成果') || q.includes('受賞') || q.includes('ハッカソン')) {
            let response = "主な実績をご紹介します！🏆\n\n";
            personalData.achievements.forEach((achievement, index) => {
                response += `${index + 1}. **${achievement.event}**\nイベント: ${achievement.name}\n内容: ${achievement.description}\n結果: ${achievement.result}\n\n`;
            });
            return response;
        }
        
        // 連絡先
        if (q.includes('連絡') || q.includes('メール') || q.includes('電話') || q.includes('コンタクト')) {
            return `お気軽にご連絡ください！📧\n\n**メール:** amon20021121@gmail.com\n**電話:** 090-4110-0442\n**GitHub:** https://github.com/honekiti\n**所在地:** ${personalData.basic.location}\n\nお問い合わせお待ちしております！`;
        }
        
        // デフォルトレスポンス
        const responses = [
            `すみません、その質問についてはよくわからないです😅\n\n以下のような質問にお答えできます：\n• 専門分野について\n• プロジェクトについて\n• インターンシップ経験\n• 技術スキル\n• プロフィール情報\n• 実績・成果\n\nお気軽にお聞きください！`,
            `もう少し具体的に教えていただけますか？🤔\n\n私について以下のようなことをお答えできます：\n• 経歴・学歴\n• 技術的なスキル\n• 開発プロジェクト\n• インターンシップ体験\n\nどんなことが知りたいですか？`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // メッセージ送信関数
    function sendMessage(message) {
        if (!message.trim()) return;
        
        // ユーザーメッセージを追加
        addMessage(message, 'user');
        
        // 送信ボタンを無効化
        sendButton.disabled = true;
        sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // タイピングインジケーターを表示
        showTypingIndicator();
        
        // AIレスポンスを生成（少し遅延を追加してリアルな感じに）
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateResponse(message);
            addMessage(response, 'bot');
            
            // 送信ボタンを再有効化
            sendButton.disabled = false;
            sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }, 1000 + Math.random() * 1500);
        
        // 入力をクリア
        chatInput.value = '';
    }
    
    // メッセージ追加関数
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        
        const time = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        const avatar = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${text.replace(/\n/g, '<br>')}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // タイピングインジケーター
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function hideTypingIndicator() {
        const typingMessage = messagesContainer.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
    
    // イベントリスナー
    sendButton?.addEventListener('click', () => {
        sendMessage(chatInput.value);
    });
    
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(chatInput.value);
        }
    });
    
    // クイック質問ボタン
    quickButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            sendMessage(question);
        });
    });
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Trigger initial animations
    document.body.classList.add('loaded');
});