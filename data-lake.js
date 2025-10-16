/* 
====================================
FILE: data-lake.js
====================================
*/

lucide.createIcons();

function createParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particles.appendChild(particle);
    }
}

function createDataParticles() {
    const container = document.getElementById('dataFlowViz');
    if (!container) return;
    const sources = document.querySelectorAll('.data-source');
    const processor = document.querySelector('.ai-processor');
    const output = document.querySelector('.output-zone');
    if (!processor || !output) return;

    setInterval(() => {
        sources.forEach((source, index) => {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'data-particle';
                const sourceRect = source.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const processorRect = processor.getBoundingClientRect();
                particle.style.left = (sourceRect.left - containerRect.left + sourceRect.width/2) + 'px';
                particle.style.top = (sourceRect.top - containerRect.top + sourceRect.height/2) + 'px';
                const colors = ['#4daae8', '#146eb4', '#4daae8'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
                container.appendChild(particle);
                const dx = (processorRect.left - sourceRect.left) / 2;
                const dy = (processorRect.top - sourceRect.top) / 2;
                particle.style.setProperty('--dx', dx + 'px');
                particle.style.setProperty('--dy', dy + 'px');
                particle.style.animation = 'flowPath 2s ease-out forwards';
                setTimeout(() => particle.remove(), 2000);
            }, index * 200);
        });

        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.style.background = '#28a745';
            particle.style.boxShadow = '0 0 10px #28a745';
            const processorRect = processor.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const outputRect = output.getBoundingClientRect();
            particle.style.left = (processorRect.left - containerRect.left + processorRect.width/2) + 'px';
            particle.style.top = (processorRect.top - containerRect.top + processorRect.height/2) + 'px';
            container.appendChild(particle);
            const dx = (outputRect.left - processorRect.left) / 2;
            const dy = (outputRect.top - processorRect.top) / 2;
            particle.style.setProperty('--dx', dx + 'px');
            particle.style.setProperty('--dy', dy + 'px');
            particle.style.animation = 'flowPath 1.5s ease-out forwards';
            setTimeout(() => particle.remove(), 1500);
        }, 1200);
    }, 1500);
}

function createNeuralNetwork() {
    const container = document.getElementById('neuralNet');
    if (!container) return;
    const layers = [4, 6, 6, 3];
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const layerSpacing = width / (layers.length + 1);
    container.innerHTML = '';
    
    layers.forEach((nodeCount, layerIndex) => {
        const nodeSpacing = height / (nodeCount + 1);
        for (let i = 0; i < nodeCount; i++) {
            const neuron = document.createElement('div');
            neuron.className = 'neuron';
            neuron.style.left = (layerSpacing * (layerIndex + 1)) + 'px';
            neuron.style.top = (nodeSpacing * (i + 1)) + 'px';
            neuron.style.animationDelay = (layerIndex * 0.2 + i * 0.1) + 's';
            container.appendChild(neuron);
            
            if (layerIndex < layers.length - 1) {
                const nextNodeCount = layers[layerIndex + 1];
                const nextNodeSpacing = height / (nextNodeCount + 1);
                for (let j = 0; j < nextNodeCount; j++) {
                    const synapse = document.createElement('div');
                    synapse.className = 'synapse';
                    const x1 = layerSpacing * (layerIndex + 1);
                    const y1 = nodeSpacing * (i + 1);
                    const x2 = layerSpacing * (layerIndex + 2);
                    const y2 = nextNodeSpacing * (j + 1);
                    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                    synapse.style.left = x1 + 'px';
                    synapse.style.top = y1 + 'px';
                    synapse.style.width = length + 'px';
                    synapse.style.transform = `rotate(${angle}deg)`;
                    synapse.style.animationDelay = (layerIndex * 0.3 + i * 0.1 + j * 0.05) + 's';
                    container.appendChild(synapse);
                }
            }
        }
    });
}

function updateAgentActivity() {
    const activities = [
        { icon: 'database', text: 'Ingested 1,247 new product records from Sales DB', type: 'info', time: 'Just now' },
        { icon: 'filter', text: 'Data cleaning completed: 98.7% quality score', type: 'success', time: '5s ago' },
        { icon: 'cpu', text: 'AI model processing 847 predictions per second', type: 'info', time: '12s ago' },
        { icon: 'trending-up', text: 'Detected price optimization opportunity in Outerwear', type: 'warning', time: '23s ago' },
        { icon: 'check-circle', text: 'Generated 5 new high-confidence recommendations', type: 'success', time: '34s ago' },
        { icon: 'alert-circle', text: 'Anomaly detected: Competitor price spike in North region', type: 'warning', time: '45s ago' },
        { icon: 'refresh-cw', text: 'Model retraining initiated with latest data', type: 'info', time: '56s ago' },
        { icon: 'zap', text: 'Real-time elasticity analysis completed', type: 'success', time: '1m ago' }
    ];

    const feed = document.getElementById('agentActivityFeed');
    if (!feed) return;
    
    activities.slice(0, 5).forEach((activity, index) => {
        setTimeout(() => addActivityItem(activity, feed), index * 500);
    });
    
    let activityIndex = 5;
    setInterval(() => {
        const activity = activities[activityIndex % activities.length];
        activity.time = 'Just now';
        addActivityItem(activity, feed);
        activityIndex++;
        while (feed.children.length > 10) {
            feed.removeChild(feed.lastChild);
        }
    }, 4000);
}

function addActivityItem(activity, feed) {
    const item = document.createElement('div');
    item.className = 'agent-activity';
    const color = activity.type === 'success' ? '#28a745' : 
                  activity.type === 'warning' ? '#ff9900' : '#4daae8';
    item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span data-lucide="${activity.icon}" style="width: 24px; height: 24px; color: ${color}; flex-shrink: 0;"></span>
            <div style="flex: 1;">
                <div style="font-size: 0.95rem;">${activity.text}</div>
                <div style="font-size: 0.8rem; color: #666; margin-top: 0.25rem;">
                    <span data-lucide="clock" style="width: 12px; height: 12px; display: inline; vertical-align: middle;"></span>
                    ${activity.time}
                </div>
            </div>
        </div>
    `;
    feed.insertBefore(item, feed.firstChild);
    lucide.createIcons();
}

function updateLiveMetrics() {
    setInterval(() => {
        const ingestionRate = 12000 + Math.floor(Math.random() * 1000);
        const ingestionEl = document.getElementById('ingestionRate');
        if (ingestionEl) ingestionEl.textContent = ingestionRate.toLocaleString();
        
        const processingRate = (ingestionRate / 1000).toFixed(1);
        const processingEl = document.getElementById('processingRate');
        if (processingEl) processingEl.textContent = processingRate + 'K';
        
        const qualityScore = 98 + Math.random() * 2;
        const qualityEl = document.getElementById('qualityScore');
        if (qualityEl) qualityEl.textContent = qualityScore.toFixed(1) + '%';
        
        const predictionRate = 800 + Math.floor(Math.random() * 100);
        const predictionEl = document.getElementById('predictionRate');
        if (predictionEl) predictionEl.textContent = predictionRate.toLocaleString();
        
        const latency = 10 + Math.floor(Math.random() * 5);
        const latencyEl = document.getElementById('latency');
        if (latencyEl) latencyEl.textContent = latency + 'ms';
    }, 2000);
}

function updateProgressBars() {
    setInterval(() => {
        const storage = 65 + Math.random() * 5;
        const storageEl = document.getElementById('storageProgress');
        const storageTextEl = document.getElementById('storageUtil');
        if (storageEl && storageTextEl) {
            storageEl.style.width = storage + '%';
            storageTextEl.textContent = storage.toFixed(0) + '%';
        }
        
        const processing = 80 + Math.random() * 5;
        const processingEl = document.getElementById('processingProgress');
        const processingTextEl = document.getElementById('processingCap');
        if (processingEl && processingTextEl) {
            processingEl.style.width = processing + '%';
            processingTextEl.textContent = processing.toFixed(0) + '%';
        }
        
        const accuracy = 93 + Math.random() * 2;
        const accuracyEl = document.getElementById('accuracyProgress');
        const accuracyTextEl = document.getElementById('modelAccuracy');
        if (accuracyEl && accuracyTextEl) {
            accuracyEl.style.width = accuracy + '%';
            accuracyTextEl.textContent = accuracy.toFixed(1) + '%';
        }
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    createDataParticles();
    createNeuralNetwork();
    updateAgentActivity();
    updateLiveMetrics();
    updateProgressBars();
    setTimeout(() => lucide.createIcons(), 100);
});

window.addEventListener('resize', () => {
    const container = document.getElementById('neuralNet');
    if (container && container.offsetWidth > 0) createNeuralNetwork();
});