/* 
====================================
FILE: ai-animations.js
====================================
*/

class AIAssistant {
    constructor() {
        this.assistant = null;
        this.popup = null;
        this.isPopupVisible = false;
        this.insights = [
            "💡 15 products show high price increase potential based on recent market analysis",
            "📊 Outerwear category has the highest revenue optimization opportunity (+18.2%)",
            "⚡ AI confidence score improved to 94.3% with latest model update",
            "🎯 18 recommendations are ready for auto-approval with high confidence",
            "📈 Demand elasticity analysis suggests pricing power in premium segments",
            "🔍 Competitor analysis reveals 12 underpriced products in your catalog",
            "💰 Expected revenue impact: +$847K in the next 90 days",
            "🌐 Regional pricing optimization identified for North and West markets"
        ];
        this.currentInsightIndex = 0;
    }

    create() {
        this.assistant = document.createElement('div');
        this.assistant.className = 'ai-assistant';
        this.assistant.innerHTML = '<span data-lucide="brain-circuit" style="width: 40px; height: 40px; color: white;"></span>';
        document.body.appendChild(this.assistant);

        this.popup = document.createElement('div');
        this.popup.className = 'insight-popup';
        this.popup.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <span data-lucide="sparkles" style="width: 24px; height: 24px; color: #4daae8; flex-shrink: 0;"></span>
                <div style="flex: 1;">
                    <div style="font-weight: bold; color: #146eb4; margin-bottom: 0.5rem;">AI Insight</div>
                    <div id="insightText" style="font-size: 0.95rem; line-height: 1.5;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(this.popup);

        this.assistant.addEventListener('click', () => this.togglePopup());
        this.startAutoInsights();

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    togglePopup() {
        this.isPopupVisible = !this.isPopupVisible;
        if (this.isPopupVisible) {
            this.showInsight();
            this.popup.classList.add('show');
        } else {
            this.popup.classList.remove('show');
        }
    }

    showInsight() {
        const insightText = document.getElementById('insightText');
        if (insightText) {
            insightText.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
            setTimeout(() => {
                insightText.textContent = this.insights[this.currentInsightIndex];
                this.currentInsightIndex = (this.currentInsightIndex + 1) % this.insights.length;
            }, 1000);
        }
    }

    startAutoInsights() {
        setInterval(() => {
            if (!this.isPopupVisible && Math.random() > 0.7) {
                this.isPopupVisible = true;
                this.showInsight();
                this.popup.classList.add('show');
                setTimeout(() => {
                    this.popup.classList.remove('show');
                    this.isPopupVisible = false;
                }, 8000);
            }
        }, 20000);
    }
}

class ParticleSystem {
    constructor(containerId = 'particles') {
        this.container = document.getElementById(containerId);
        this.particleCount = 50;
    }

    create() {
        if (!this.container) return;
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            const size = 3 + Math.random() * 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            const colors = ['#4daae8', '#146eb4', '#ff9900'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            this.container.appendChild(particle);
        }
    }
}

class AnimatedCounter {
    static animateValue(element, start, end, duration) {
        if (!element) return;
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current).toLocaleString();
        }, 16);
    }

    static animatePercentage(element, start, end, duration) {
        if (!element) return;
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(1) + '%';
        }, 16);
    }
}

class GlitchText {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    }

    glitch(duration = 300) {
        if (!this.element) return;
        const text = this.originalText;
        const length = text.length;
        let iteration = 0;
        const maxIterations = 10;

        const interval = setInterval(() => {
            this.element.textContent = text
                .split('')
                .map((char, index) => {
                    if (index < iteration) return text[index];
                    return this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
                })
                .join('');
            iteration += 1;
            if (iteration > length || iteration > maxIterations) {
                clearInterval(interval);
                this.element.textContent = this.originalText;
            }
        }, duration / length);
    }
}

class NotificationSystem {
    static show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        const icons = { info: 'info', success: 'check-circle', warning: 'alert-triangle', error: 'x-circle' };
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span data-lucide="${icons[type]}" style="width: 24px; height: 24px;"></span>
                <div>${message}</div>
            </div>
        `;
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem;
            background: white; color: #333; border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            border-left: 4px solid ${type === 'success' ? '#28a745' : type === 'warning' ? '#ff9900' : type === 'error' ? '#dc3545' : '#4daae8'};
        `;
        document.body.appendChild(notification);
        if (typeof lucide !== 'undefined') lucide.createIcons();
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const assistant = new AIAssistant();
    assistant.create();

    const particles = new ParticleSystem();
    particles.create();

    document.querySelectorAll('.page-title').forEach(title => {
        const glitch = new GlitchText(title);
        title.addEventListener('mouseenter', () => glitch.glitch());
    });

    setTimeout(() => {
        document.querySelectorAll('.stat-value').forEach((element, index) => {
            const value = parseInt(element.textContent.replace(/[^0-9]/g, ''));
            if (!isNaN(value) && value > 0) {
                setTimeout(() => {
                    AnimatedCounter.animateValue(element, 0, value, 2000);
                }, index * 200);
            }
        });
    }, 500);
});

if (typeof window !== 'undefined') {
    window.AIAssistant = AIAssistant;
    window.ParticleSystem = ParticleSystem;
    window.AnimatedCounter = AnimatedCounter;
    window.GlitchText = GlitchText;
    window.NotificationSystem = NotificationSystem;
}