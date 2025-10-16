// Agentic Pricing Demo - Utility Functions

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Format percentage
function formatPercentage(value, decimals = 2) {
    return value.toFixed(decimals) + '%';
}

// Format number
function formatNumber(value, decimals = 0) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}

// Get confidence badge class
function getConfidenceBadge(score) {
    if (score >= 0.8) return 'badge-high';
    if (score >= 0.6) return 'badge-medium';
    return 'badge-low';
}

// Get confidence label
function getConfidenceLabel(score) {
    if (score >= 0.8) return 'High';
    if (score >= 0.6) return 'Medium';
    return 'Low';
}

// Get recommendation badge class
function getRecommendationBadge(type) {
    const badges = {
        'Increase': 'badge-increase',
        'Decrease': 'badge-decrease',
        'Hold': 'badge-hold'
    };
    return badges[type] || 'badge-hold';
}

// Calculate statistics
function calculateStats(data) {
    const total = data.length;
    
    const increase = data.filter(d => d.Recommendation_Type === 'Increase').length;
    const decrease = data.filter(d => d.Recommendation_Type === 'Decrease').length;
    const hold = data.filter(d => d.Recommendation_Type === 'Hold').length;
    
    const avgConfidence = data.reduce((sum, d) => sum + d.Confidence_Score, 0) / total;
    
    const avgRevImpact = data.reduce((sum, d) => sum + d['Expected_Revenue_Impact_%'], 0) / total;
    
    const totalRevImpact = data.reduce((sum, d) => {
        if (d.Recommendation_Type !== 'Hold') {
            return sum + d['Expected_Revenue_Impact_%'];
        }
        return sum;
    }, 0);
    
    const highConfidence = data.filter(d => d.Confidence_Score >= 0.8).length;
    
    return {
        total,
        increase,
        decrease,
        hold,
        avgConfidence,
        avgRevImpact,
        totalRevImpact,
        highConfidence,
        highConfidencePercent: (highConfidence / total) * 100
    };
}

// Filter data
function filterData(data, filters) {
    let filtered = [...data];
    
    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(d => d.Category === filters.category);
    }
    
    if (filters.region && filters.region !== 'all') {
        filtered = filtered.filter(d => d.Region === filters.region);
    }
    
    if (filters.recommendation && filters.recommendation !== 'all') {
        filtered = filtered.filter(d => d.Recommendation_Type === filters.recommendation);
    }
    
    if (filters.confidence && filters.confidence !== 'all') {
        if (filters.confidence === 'high') {
            filtered = filtered.filter(d => d.Confidence_Score >= 0.8);
        } else if (filters.confidence === 'medium') {
            filtered = filtered.filter(d => d.Confidence_Score >= 0.6 && d.Confidence_Score < 0.8);
        } else if (filters.confidence === 'low') {
            filtered = filtered.filter(d => d.Confidence_Score < 0.6);
        }
    }
    
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(d => 
            d.Product_Name.toLowerCase().includes(searchLower) ||
            d.SKU_ID.toLowerCase().includes(searchLower) ||
            d.Agent_Rationale.toLowerCase().includes(searchLower)
        );
    }
    
    return filtered;
}

// Sort data
function sortData(data, sortKey, sortOrder) {
    const sorted = [...data];
    
    sorted.sort((a, b) => {
        let aVal = a[sortKey];
        let bVal = b[sortKey];
        
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (sortOrder === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    return sorted;
}

// Get unique values from array
function getUniqueValues(data, key) {
    return [...new Set(data.map(d => d[key]))].sort();
}

// Set active navigation
function setActiveNav(pageId) {
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(pageId)) {
            link.classList.add('active');
        }
    });
}

// Store product in session for detail view
function storeProduct(product) {
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
}

// Get stored product
function getStoredProduct() {
    const stored = sessionStorage.getItem('selectedProduct');
    return stored ? JSON.parse(stored) : null;
}

// Calculate price change percentage
function calculatePriceChange(current, suggested) {
    return ((suggested - current) / current) * 100;
}

// Get arrow icon based on change
function getArrowIcon(change) {
    if (change > 0) return '↑';
    if (change < 0) return '↓';
    return '→';
}

// Get arrow class based on change
function getArrowClass(change) {
    if (change > 0) return 'up';
    if (change < 0) return 'down';
    return '';
}

// Generate chart color based on type
function getChartColor(type) {
    const colors = {
        'Increase': '#28a745',
        'Decrease': '#dc3545',
        'Hold': '#ffc107'
    };
    return colors[type] || '#4daae8';
}

// Debounce function for search
function debounce(func, wait) {
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

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        formatPercentage,
        formatNumber,
        getConfidenceBadge,
        getConfidenceLabel,
        getRecommendationBadge,
        calculateStats,
        filterData,
        sortData,
        getUniqueValues,
        setActiveNav,
        storeProduct,
        getStoredProduct,
        calculatePriceChange,
        getArrowIcon,
        getArrowClass,
        getChartColor,
        debounce,
        showToast
    };
}