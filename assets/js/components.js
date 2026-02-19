// ============================================
// REUSABLE UI COMPONENTS - JOBGRIN AESTHETIC
// ============================================

const Components = {
    // Toast Notification System
    showToast(message, type = 'success', duration = 3000) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        const styles = {
            success: { bg: '#4caf50', icon: 'fa-check-circle' },
            error: { bg: '#f44336', icon: 'fa-exclamation-circle' },
            danger: { bg: '#f44336', icon: 'fa-exclamation-circle' },
            warning: { bg: '#ff9800', icon: 'fa-exclamation-triangle' },
            info: { bg: '#9c27b0', icon: 'fa-info-circle' }
        };
        
        const style = styles[type] || styles.success;
        
        toast.className = 'toast ' + type;
        toast.innerHTML = `
            <i class="fas ${style.icon}" style="color: ${style.bg}; font-size: 1.25rem;"></i>
            <span style="flex: 1; color: #424242; font-weight: 500;">${message}</span>
            <button onclick="this.parentElement.remove()" style="color: #9e9e9e; background: none; border: none; cursor: pointer; padding: 4px;">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    // Modal System
    showModal(title, content, actions = []) {
        const modalHTML = `
            <div class="modal-overlay" id="dynamicModal" onclick="if(event.target === this) Components.closeModal('dynamicModal')">
                <div class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                        <button onclick="Components.closeModal('dynamicModal')" style="background: none; border: none; color: #757575; cursor: pointer; font-size: 1.5rem; padding: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; transition: all 0.3s ease;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${actions.length > 0 ? `
                        <div class="modal-footer">
                            ${actions.map(action => `
                                <button onclick="${action.onClick}" class="btn ${action.class || 'btn-primary'}">
                                    ${action.icon ? `<i class="${action.icon}"></i>` : ''}
                                    ${action.label}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },
    
    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    },
    
    // Trust Score Badge
    createTrustScoreBadge(score) {
        let color, label;
        if (score >= 80) {
            color = '#4caf50';
            label = 'Excellent';
        } else if (score >= 60) {
            color = '#ff9800';
            label = 'Good';
        } else if (score >= 40) {
            color = '#fdd835';
            label = 'Fair';
        } else {
            color = '#f44336';
            label = 'Poor';
        }
        
        return `
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; background: ${color}15; border-radius: 10px; border: 2px solid ${color}30;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, ${color}, ${color}dd); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.9rem;">
                    ${score}
                </div>
                <div>
                    <div style="font-size: 0.75rem; color: #757575; text-transform: uppercase; letter-spacing: 0.5px;">Trust Score</div>
                    <div style="font-weight: 600; color: ${color}; font-size: 0.9rem;">${label}</div>
                </div>
            </div>
        `;
    },
    
    // Risk Indicator
    createRiskIndicator(level) {
        const styles = {
            'Low': { color: '#4caf50', bg: '#c8e6c9', icon: 'fa-shield-alt' },
            'Medium': { color: '#ff9800', bg: '#ffe0b2', icon: 'fa-exclamation-triangle' },
            'High': { color: '#f44336', bg: '#ffcdd2', icon: 'fa-exclamation-circle' },
            'Critical': { color: '#b71c1c', bg: '#ffebee', icon: 'fa-skull-crossbones' }
        };
        
        const style = styles[level] || styles.Medium;
        
        return `
            <span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: ${style.bg}; color: ${style.color}; border-radius: 8px; font-weight: 600; font-size: 0.85rem;">
                <i class="fas ${style.icon}"></i>
                ${level} Risk
            </span>
        `;
    },
    
    // Status Badge
    createStatusBadge(status) {
        const styles = {
            'Active': { color: '#4caf50', bg: '#c8e6c9' },
            'Verified': { color: '#2196f3', bg: '#bbdefb' },
            'Pending': { color: '#ff9800', bg: '#ffe0b2' },
            'Suspended': { color: '#f44336', bg: '#ffcdd2' },
            'Shadow-Banned': { color: '#9c27b0', bg: '#e1bee7' },
            'Rejected': { color: '#d32f2f', bg: '#ffcdd2' },
            'Paused': { color: '#757575', bg: '#eeeeee' },
            'Closed': { color: '#616161', bg: '#e0e0e0' },
            'Expired': { color: '#9e9e9e', bg: '#f5f5f5' },
            'High': { color: '#f44336', bg: '#ffcdd2' },
            'Medium': { color: '#ff9800', bg: '#ffe0b2' },
            'Low': { color: '#4caf50', bg: '#c8e6c9' },
            'Resolved': { color: '#4caf50', bg: '#c8e6c9' },
            'Under Investigation': { color: '#ff9800', bg: '#ffe0b2' },
            'Escalated': { color: '#f44336', bg: '#ffcdd2' }
        };
        
        const style = styles[status] || { color: '#757575', bg: '#eeeeee' };
        
        return `
            <span class="badge" style="background: ${style.bg}; color: ${style.color};">
                ${status}
            </span>
        `;
    },
    
    // Progress Bar
    createProgressBar(value, label = '') {
        let color;
        if (value >= 80) color = '#4caf50';
        else if (value >= 60) color = '#ff9800';
        else color = '#f44336';
        
        return `
            <div style="margin-top: 8px;">
                ${label ? `<div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
                    <span style="color: #757575;">${label}</span>
                    <span style="font-weight: 600; color: ${color};">${value}%</span>
                </div>` : ''}
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${value}%; background: linear-gradient(135deg, ${color}, ${color}dd);"></div>
                </div>
            </div>
        `;
    },
    
    // Alert Box
    createAlert(message, type = 'info') {
        const styles = {
            success: { bg: '#c8e6c9', border: '#4caf50', icon: 'fa-check-circle', color: '#1b5e20' },
            warning: { bg: '#ffe0b2', border: '#ff9800', icon: 'fa-exclamation-triangle', color: '#e65100' },
            danger: { bg: '#ffcdd2', border: '#f44336', icon: 'fa-exclamation-circle', color: '#b71c1c' },
            info: { bg: '#e1bee7', border: '#9c27b0', icon: 'fa-info-circle', color: '#4a148c' }
        };
        
        const style = styles[type] || styles.info;
        
        return `
            <div style="padding: 1rem 1.25rem; background: ${style.bg}; border-left: 4px solid ${style.border}; border-radius: 10px; display: flex; align-items: start; gap: 12px; margin: 1rem 0;">
                <i class="fas ${style.icon}" style="color: ${style.border}; font-size: 1.25rem; margin-top: 2px;"></i>
                <div style="flex: 1; color: ${style.color}; font-size: 0.95rem; line-height: 1.6;">
                    ${message}
                </div>
            </div>
        `;
    },
    
    // Empty State
    createEmptyState(icon, title, description, actionLabel = null, actionOnClick = null) {
        return `
            <div style="text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, #e8f9e8 0%, #ffffff 100%); border-radius: 16px; border: 2px dashed #aef5af;">
                <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem; background: linear-gradient(135deg, #4daf4f, #43a047); border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 40px rgba(77, 175, 79, 0.2);">
                    <i class="fas ${icon}" style="font-size: 2.5rem; color: white;"></i>
                </div>
                <h3 style="font-size: 1.5rem; font-weight: 700; color: #212121; margin-bottom: 0.5rem;">${title}</h3>
                <p style="color: #757575; font-size: 1rem; margin-bottom: 1.5rem; max-width: 400px; margin-left: auto; margin-right: auto;">${description}</p>
                ${actionLabel && actionOnClick ? `
                    <button onclick="${actionOnClick}" class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        ${actionLabel}
                    </button>
                ` : ''}
            </div>
        `;
    },
    
    // Loading State
    createLoadingState(message = 'Loading...') {
        return `
            <div style="text-align: center; padding: 4rem 2rem;">
                <div style="width: 60px; height: 60px; margin: 0 auto 1.5rem; border: 4px solid #aef5af; border-top-color: #4daf4f; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="color: #757575; font-size: 1rem;">${message}</p>
            </div>
        `;
    },
    
    // Data Table with Search
    createDataTable(headers, rows, options = {}) {
        const tableId = options.id || 'dataTable' + Date.now();
        const searchable = options.searchable !== false;
        const sortable = options.sortable !== false;
        
        return `
            ${searchable ? `
                <div style="padding: 1rem 1.5rem; background: linear-gradient(135deg, #e8f9e8 0%, #ffffff 100%); border-bottom: 2px solid #f5f5f5;">
                    <div style="position: relative; max-width: 400px;">
                        <i class="fas fa-search" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #9e9e9e;"></i>
                        <input type="text" placeholder="Search..." onkeyup="Components.filterTable('${tableId}', this.value)" style="width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 0.95rem; transition: all 0.3s ease; background: white;">
                    </div>
                </div>
            ` : ''}
            <div class="table-container">
                <table id="${tableId}">
                    <thead>
                        <tr>
                            ${headers.map(h => `<th>${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                ${row.map(cell => `<td>${cell}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    
    filterTable(tableId, query) {
        const table = document.getElementById(tableId);
        const rows = table.getElementsByTagName('tr');
        const searchQuery = query.toLowerCase();
        
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchQuery) ? '' : 'none';
        }
    },
    
    // Stat Card
    createStatCard(icon, value, label, change = null, type = 'primary') {
        const iconColors = {
            primary: { bg: '#d9fad9', color: '#4daf4f' },
            secondary: { bg: '#e3f2fd', color: '#0d47a1' },
            accent: { bg: '#fff3e0', color: '#e65100' },
            success: { bg: '#c8e6c9', color: '#1b5e20' },
            danger: { bg: '#ffcdd2', color: '#b71c1c' }
        };
        
        const colors = iconColors[type] || iconColors.primary;
        
        return `
            <div class="stat-card ${type}">
                <div class="stat-header">
                    <div>
                        <div class="stat-value">${value}</div>
                        <div class="stat-label">${label}</div>
                        ${change ? `
                            <div class="stat-change ${change >= 0 ? 'positive' : 'negative'}">
                                <i class="fas fa-arrow-${change >= 0 ? 'up' : 'down'}"></i>
                                ${Math.abs(change)}%
                            </div>
                        ` : ''}
                    </div>
                    <div class="stat-icon ${type}">
                        <i class="fas ${icon}"></i>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Tab System
    createTabs(tabs, defaultTab = 0) {
        const tabId = 'tabs' + Date.now();
        
        return `
            <div class="tabs-container" id="${tabId}">
                <div style="display: flex; gap: 4px; border-bottom: 2px solid #f5f5f5; padding: 0 1.5rem; background: linear-gradient(135deg, #e8f9e8 0%, #ffffff 100%);">
                    ${tabs.map((tab, index) => `
                        <button onclick="Components.switchTab('${tabId}', ${index})" class="tab-btn ${index === defaultTab ? 'active' : ''}" data-tab="${index}" style="padding: 1rem 1.5rem; border: none; background: ${index === defaultTab ? 'white' : 'transparent'}; color: ${index === defaultTab ? '#4daf4f' : '#757575'}; font-weight: ${index === defaultTab ? '600' : '500'}; cursor: pointer; border-radius: 10px 10px 0 0; transition: all 0.3s ease; border-bottom: 3px solid ${index === defaultTab ? '#4daf4f' : 'transparent'};">
                            ${tab.icon ? `<i class="fas ${tab.icon}" style="margin-right: 8px;"></i>` : ''}
                            ${tab.label}
                        </button>
                    `).join('')}
                </div>
                <div class="tab-content-container">
                    ${tabs.map((tab, index) => `
                        <div class="tab-content ${index === defaultTab ? 'active' : ''}" data-tab="${index}" style="display: ${index === defaultTab ? 'block' : 'none'}; padding: 1.5rem;">
                            ${tab.content}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    switchTab(containerId, tabIndex) {
        const container = document.getElementById(containerId);
        const buttons = container.querySelectorAll('.tab-btn');
        const contents = container.querySelectorAll('.tab-content');
        
        buttons.forEach((btn, index) => {
            if (index === tabIndex) {
                btn.classList.add('active');
                btn.style.background = 'white';
                btn.style.color = '#4daf4f';
                btn.style.fontWeight = '600';
                btn.style.borderBottom = '3px solid #4daf4f';
            } else {
                btn.classList.remove('active');
                btn.style.background = 'transparent';
                btn.style.color = '#757575';
                btn.style.fontWeight = '500';
                btn.style.borderBottom = '3px solid transparent';
            }
        });
        
        contents.forEach((content, index) => {
            content.style.display = index === tabIndex ? 'block' : 'none';
            if (index === tabIndex) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
};

// Export for global access
window.Components = Components;
