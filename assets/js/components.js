// ============================================
// REUSABLE UI COMPONENTS
// ============================================

const Components = {
    // Toast Notification System
    showToast(message, type = 'success', duration = 3000) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        toast.className = `${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slideInRight`;
        toast.innerHTML = `
            <i class="fas ${icons[type]} text-xl"></i>
            <span class="font-medium">${message}</span>
            <button onclick="this.parentElement.remove()" class="ml-4 hover:bg-white hover:bg-opacity-20 rounded p-1">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    // Modal System
    showModal(title, content, actions = []) {
        const modalHTML = `
            <div class="modal active" id="dynamicModal">
                <div class="modal-content bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div class="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                        <h3 class="text-xl font-bold text-gray-800">${title}</h3>
                        <button onclick="Components.closeModal('dynamicModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        ${content}
                    </div>
                    ${actions.length > 0 ? `
                        <div class="p-6 border-t flex items-center justify-end space-x-3 sticky bottom-0 bg-white">
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
        
        document.getElementById('modalsContainer').innerHTML = modalHTML;
    },
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },
    
    // Data Table Component
    createDataTable(columns, data, options = {}) {
        const {
            selectable = false,
            actions = [],
            pagination = true,
            itemsPerPage = 20,
            searchable = true
        } = options;
        
        let html = `
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                ${searchable ? `
                    <div class="p-4 border-b flex items-center justify-between">
                        <input type="text" placeholder="Search..." class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onkeyup="Components.filterTable(this)">
                        <div class="flex space-x-2">
                            ${options.headerActions || ''}
                        </div>
                    </div>
                ` : ''}
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                ${selectable ? '<th class="px-6 py-3 text-left"><input type="checkbox" class="rounded" onclick="Components.toggleAllCheckboxes(this)"></th>' : ''}
                                ${columns.map(col => `
                                    <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ${col.label}
                                    </th>
                                `).join('')}
                                ${actions.length > 0 ? '<th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>' : ''}
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${data.map(row => `
                                <tr class="table-row">
                                    ${selectable ? '<td class="px-6 py-4"><input type="checkbox" class="rounded row-checkbox"></td>' : ''}
                                    ${columns.map(col => `
                                        <td class="px-6 py-4 ${col.className || ''}">
                                            ${col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    `).join('')}
                                    ${actions.length > 0 ? `
                                        <td class="px-6 py-4">
                                            <div class="flex space-x-2">
                                                ${actions.map(action => `
                                                    <button onclick="${action.onClick}(${row.id})" class="text-${action.color || 'blue'}-600 hover:text-${action.color || 'blue'}-800" title="${action.label}">
                                                        <i class="${action.icon}"></i>
                                                    </button>
                                                `).join('')}
                                            </div>
                                        </td>
                                    ` : ''}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                ${pagination ? `
                    <div class="p-4 border-t flex items-center justify-between">
                        <p class="text-sm text-gray-600">Showing 1 to ${Math.min(itemsPerPage, data.length)} of ${data.length} entries</p>
                        <div class="flex space-x-2">
                            <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
                            <button class="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                            <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
                            <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
        
        return html;
    },
    
    // Filter Table
    filterTable(input) {
        const filter = input.value.toUpperCase();
        const table = input.closest('.bg-white').querySelector('table');
        const rows = table.getElementsByTagName('tr');
        
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const text = row.textContent || row.innerText;
            row.style.display = text.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
        }
    },
    
    // Toggle All Checkboxes
    toggleAllCheckboxes(checkbox) {
        const checkboxes = document.querySelectorAll('.row-checkbox');
        checkboxes.forEach(cb => cb.checked = checkbox.checked);
    },
    
    // Stat Card Component
    createStatCard(title, value, change, icon, color = 'blue') {
        return `
            <div class="stat-card bg-white rounded-xl shadow-sm p-6 border-l-4 border-${color}-500">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 font-medium">${title}</p>
                        <h3 class="text-3xl font-bold text-gray-800 mt-2">${value}</h3>
                        ${change ? `
                            <p class="text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-2">
                                <i class="fas fa-arrow-${change.startsWith('+') ? 'up' : 'down'}"></i> ${change}
                            </p>
                        ` : ''}
                    </div>
                    <div class="w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center">
                        <i class="${icon} text-${color}-600 text-xl"></i>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Trust Score Badge
    createTrustScoreBadge(score) {
        const level = score >= 80 ? 'high' : (score >= 60 ? 'medium' : 'low');
        const color = score >= 80 ? 'green' : (score >= 60 ? 'yellow' : 'red');
        
        return `
            <div class="trust-score trust-score-${level}">
                <i class="fas fa-shield-alt"></i>
                <span>${score}</span>
            </div>
        `;
    },
    
    // Status Badge
    createStatusBadge(status) {
        const badges = {
            'Active': 'badge-success',
            'Verified': 'badge-success',
            'Pending': 'badge-warning',
            'Suspended': 'badge-danger',
            'Shadow-Banned': 'badge-gray',
            'Paused': 'badge-warning',
            'Closed': 'badge-gray'
        };
        
        return `<span class="badge ${badges[status] || 'badge-info'}">${status}</span>`;
    },
    
    // Risk Level Indicator
    createRiskIndicator(level) {
        const colors = {
            'Low': 'green',
            'Medium': 'yellow',
            'High': 'red'
        };
        
        return `
            <div class="flex items-center space-x-2">
                <div class="status-dot ${colors[level]} pulse"></div>
                <span class="text-sm font-medium risk-${level.toLowerCase()}">${level} Risk</span>
            </div>
        `;
    },
    
    // Progress Bar
    createProgressBar(percentage, label = '') {
        return `
            <div>
                ${label ? `<div class="flex justify-between text-sm mb-1"><span>${label}</span><span>${percentage}%</span></div>` : ''}
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    },
    
    // Alert Component
    createAlert(message, type = 'info') {
        return `
            <div class="alert alert-${type}">
                <div class="flex items-start space-x-3">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'danger' ? 'exclamation-circle' : 'info-circle'} text-xl"></i>
                    <div class="flex-1">${message}</div>
                    <button onclick="this.closest('.alert').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    },
    
    // Empty State
    createEmptyState(icon, title, description, action = null) {
        return `
            <div class="empty-state">
                <i class="${icon}"></i>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${title}</h3>
                <p class="text-gray-600 mb-4">${description}</p>
                ${action ? `<button onclick="${action.onClick}" class="btn btn-primary">${action.label}</button>` : ''}
            </div>
        `;
    },
    
    // Loading State
    createLoadingState(message = 'Loading...') {
        return `
            <div class="flex flex-col items-center justify-center py-12">
                <div class="loading-spinner mb-4"></div>
                <p class="text-gray-600">${message}</p>
            </div>
        `;
    },
    
    // Chart Container
    createChartContainer(id, title) {
        return `
            <div class="bg-white rounded-xl shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">${title}</h3>
                <div class="chart-container">
                    <canvas id="${id}"></canvas>
                </div>
            </div>
        `;
    },
    
    // Tab System
    createTabs(tabs, activeTab = 0) {
        return `
            <div class="tab-list">
                ${tabs.map((tab, index) => `
                    <div class="tab ${index === activeTab ? 'active' : ''}" onclick="Components.switchTab(this, '${tab.id}')">
                        ${tab.icon ? `<i class="${tab.icon} mr-2"></i>` : ''}
                        ${tab.label}
                        ${tab.count ? `<span class="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">${tab.count}</span>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    switchTab(element, tabId) {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        element.classList.add('active');
        
        // Hide all tab contents
        document.querySelectorAll('[data-tab-content]').forEach(content => content.classList.add('hidden'));
        
        // Show selected tab content
        const content = document.querySelector(`[data-tab-content="${tabId}"]`);
        if (content) content.classList.remove('hidden');
    },
    
    // Action Log Item
    createActionLogItem(log) {
        const severityClass = log.severity === 'Critical' ? 'critical' : (log.severity === 'Important' ? 'warning' : '');
        
        return `
            <div class="action-log-item ${severityClass}">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <span class="font-semibold text-gray-800">${log.admin}</span>
                            <span class="text-gray-400">•</span>
                            <span class="text-sm text-gray-600">${log.action}</span>
                        </div>
                        <p class="text-sm text-gray-600">${log.details}</p>
                        <p class="text-xs text-gray-400 mt-1">${new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                    ${log.severity === 'Critical' ? '<i class="fas fa-exclamation-triangle text-red-500"></i>' : ''}
                </div>
            </div>
        `;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Components;
}
