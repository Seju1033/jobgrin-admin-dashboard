// ============================================
// JOBGRIN MASTER ADMIN - MAIN APPLICATION
// ============================================

// Global state
const AppState = {
    currentSection: 'dashboard',
    user: {
        name: 'Master Admin',
        role: 'Super Admin',
        email: 'admin@jobgrin.com'
    },
    emergencyMode: false
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Show loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        
        // Initialize navigation
        initializeNavigation();
        
        // Load dashboard
        navigateTo('dashboard');
        
        // Initialize event listeners
        initializeEventListeners();
        
        // Initialize charts
        initializeCharts();
        
        // Show welcome toast
        Components.showToast('Welcome to JobGrin Master Admin!', 'success');
        
        // Load notifications
        loadNotifications();
    }, 1500);
}

// ============================================
// NAVIGATION
// ============================================
function initializeNavigation() {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            navigateTo(section);
        });
    });
}

function navigateTo(section) {
    // Update active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${section}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update current section
    AppState.currentSection = section;
    
    // Render content
    renderSection(section);
}

function renderSection(section) {
    const mainContent = document.getElementById('mainContent');
    
    // Show loading state
    mainContent.innerHTML = Components.createLoadingState(`Loading ${section}...`);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        let content = '';
        
        switch(section) {
            case 'dashboard':
                content = Modules.renderDashboard();
                break;
            case 'employer-trust':
                content = Modules.renderEmployerTrust();
                break;
            case 'job-verification':
                content = Modules.renderJobVerification();
                break;
            case 'scam-monitoring':
                content = Modules.renderScamMonitoring();
                break;
            case 'emergency-controls':
                content = Modules.renderEmergencyControls();
                break;
            case 'behavioral-intelligence':
                content = Modules.renderBehavioralIntelligence();
                break;
            case 'shadow-banning':
                content = Modules.renderShadowBanning();
                break;
            case 'data-intelligence':
                content = Modules.renderDataIntelligence();
                break;
            case 'all-jobs':
                content = Modules.renderAllJobs();
                break;
            case 'all-employers':
                content = Modules.renderAllEmployers();
                break;
            case 'candidates':
                content = Modules.renderCandidates();
                break;
            case 'skills':
                content = Modules.renderSkills();
                break;
            default:
                content = `
                    <div class="text-center py-12">
                        <i class="fas fa-construction text-6xl text-gray-300 mb-4"></i>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">${section.replace(/-/g, ' ').toUpperCase()}</h3>
                        <p class="text-gray-600">This module is under construction</p>
                    </div>
                `;
        }
        
        mainContent.innerHTML = content;
        
        // Re-initialize charts if on dashboard
        if (section === 'dashboard') {
            setTimeout(() => initializeCharts(), 100);
        }
    }, 300);
}

// ============================================
// EVENT LISTENERS
// ============================================
function initializeEventListeners() {
    // Profile dropdown
    document.getElementById('profileBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('profileMenu').classList.toggle('active');
    });
    
    // Notification dropdown
    document.getElementById('notificationBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('notificationDropdown').classList.toggle('hidden');
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.getElementById('profileMenu').classList.remove('active');
        document.getElementById('notificationDropdown').classList.add('hidden');
    });
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });
    }
    
    // Global search
    document.getElementById('globalSearch').addEventListener('input', (e) => {
        handleGlobalSearch(e.target.value);
    });
}

// ============================================
// CHARTS INITIALIZATION
// ============================================
function initializeCharts() {
    // Job Trends Chart
    const jobTrendsCanvas = document.getElementById('jobTrendsChart');
    if (jobTrendsCanvas) {
        new Chart(jobTrendsCanvas, {
            type: 'line',
            data: {
                labels: DATA.analytics.jobTrends.labels,
                datasets: [{
                    label: 'Jobs Posted',
                    data: DATA.analytics.jobTrends.data,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Category Distribution Chart
    const categoryCanvas = document.getElementById('categoryChart');
    if (categoryCanvas) {
        new Chart(categoryCanvas, {
            type: 'doughnut',
            data: {
                labels: DATA.analytics.categoryDistribution.labels,
                datasets: [{
                    data: DATA.analytics.categoryDistribution.data,
                    backgroundColor: [
                        'rgb(59, 130, 246)',
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)',
                        'rgb(139, 92, 246)',
                        'rgb(239, 68, 68)',
                        'rgb(236, 72, 153)',
                        'rgb(14, 165, 233)',
                        'rgb(34, 197, 94)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// ============================================
// NOTIFICATIONS
// ============================================
function loadNotifications() {
    const notifications = [
        { type: 'warning', message: 'Duplicate job detected in verification queue', time: '2 min ago' },
        { type: 'danger', message: 'Scam report flagged as high severity', time: '15 min ago' },
        { type: 'success', message: 'New employer verified successfully', time: '1 hour ago' },
        { type: 'info', message: 'Monthly revenue report generated', time: '2 hours ago' },
        { type: 'warning', message: 'Trust score below threshold for 3 employers', time: '3 hours ago' }
    ];
    
    const notificationList = document.getElementById('notificationList');
    if (notificationList) {
        notificationList.innerHTML = notifications.map(notif => `
            <div class="p-4 hover:bg-gray-50 cursor-pointer">
                <div class="flex items-start space-x-3">
                    <i class="fas fa-${notif.type === 'success' ? 'check-circle text-green-600' : notif.type === 'warning' ? 'exclamation-triangle text-yellow-600' : notif.type === 'danger' ? 'exclamation-circle text-red-600' : 'info-circle text-blue-600'} mt-1"></i>
                    <div class="flex-1">
                        <p class="text-sm text-gray-800">${notif.message}</p>
                        <p class="text-xs text-gray-500 mt-1">${notif.time}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// ============================================
// GLOBAL SEARCH
// ============================================
function handleGlobalSearch(query) {
    if (query.length < 2) return;
    
    console.log('Searching for:', query);
    // Implement global search logic here
}

// ============================================
// ACTION HANDLERS
// ============================================

// Employer Actions
function viewEmployerDetails(id) {
    const employer = DATA.employers.find(e => e.id === id);
    if (!employer) return;
    
    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 class="font-semibold text-gray-800 mb-3">Company Information</h4>
                <div class="space-y-3">
                    <div><label class="text-sm text-gray-600">Company Name</label><p class="font-medium">${employer.company}</p></div>
                    <div><label class="text-sm text-gray-600">Contact Person</label><p class="font-medium">${employer.contact}</p></div>
                    <div><label class="text-sm text-gray-600">Email</label><p class="font-medium">${employer.email}</p></div>
                    <div><label class="text-sm text-gray-600">Phone</label><p class="font-medium">${employer.phone}</p></div>
                    <div><label class="text-sm text-gray-600">Location</label><p class="font-medium">${employer.location}</p></div>
                    <div><label class="text-sm text-gray-600">Industry</label><p class="font-medium">${employer.industry}</p></div>
                </div>
            </div>
            <div>
                <h4 class="font-semibold text-gray-800 mb-3">Trust & Verification</h4>
                <div class="space-y-3">
                    <div><label class="text-sm text-gray-600">Trust Score</label><div class="mt-1">${Components.createTrustScoreBadge(employer.trustScore)}</div></div>
                    <div><label class="text-sm text-gray-600">Risk Level</label><div class="mt-1">${Components.createRiskIndicator(employer.riskLevel)}</div></div>
                    <div><label class="text-sm text-gray-600">Status</label><div class="mt-1">${Components.createStatusBadge(employer.status)}</div></div>
                    <div><label class="text-sm text-gray-600">GST Number</label><p class="font-medium">${employer.gst || 'Not provided'}</p></div>
                    <div><label class="text-sm text-gray-600">CIN Number</label><p class="font-medium">${employer.cin || 'Not provided'}</p></div>
                    <div><label class="text-sm text-gray-600">Jobs Posted</label><p class="font-medium">${employer.jobsPosted}</p></div>
                </div>
            </div>
        </div>
    `;
    
    Components.showModal('Employer Details', content, [
        { label: 'Close', onClick: 'Components.closeModal("dynamicModal")', class: 'btn-primary' }
    ]);
}

function verifyEmployer(id) {
    Components.showToast(`Employer ${id} verified successfully!`, 'success');
    // Update employer status in data
    const employer = DATA.employers.find(e => e.id === id);
    if (employer) {
        employer.status = 'Verified';
        employer.verified = true;
        employer.trustScore = Math.min(employer.trustScore + 10, 100);
    }
    // Refresh current view
    renderSection(AppState.currentSection);
}

function suspendEmployer(id) {
    if (confirm('Are you sure you want to suspend this employer?')) {
        Components.showToast(`Employer ${id} suspended`, 'warning');
        const employer = DATA.employers.find(e => e.id === id);
        if (employer) {
            employer.status = 'Suspended';
            employer.verified = false;
        }
        renderSection(AppState.currentSection);
    }
}

function bulkVerifyEmployers() {
    const selected = document.querySelectorAll('.row-checkbox:checked').length;
    if (selected === 0) {
        Components.showToast('Please select employers to verify', 'warning');
        return;
    }
    Components.showToast(`${selected} employers verified successfully!`, 'success');
}

function bulkSuspendEmployers() {
    const selected = document.querySelectorAll('.row-checkbox:checked').length;
    if (selected === 0) {
        Components.showToast('Please select employers to suspend', 'warning');
        return;
    }
    if (confirm(`Are you sure you want to suspend ${selected} employers?`)) {
        Components.showToast(`${selected} employers suspended`, 'warning');
    }
}

// Job Actions
function viewJobDetails(id) {
    Components.showToast('Opening job details...', 'info');
}

function approveJob(id) {
    Components.showToast(`Job ${id} approved successfully!`, 'success');
}

function rejectJob(id) {
    if (confirm('Are you sure you want to reject this job?')) {
        Components.showToast(`Job ${id} rejected`, 'warning');
    }
}

function bulkApproveJobs() {
    const selected = document.querySelectorAll('.row-checkbox:checked').length;
    if (selected === 0) {
        Components.showToast('Please select jobs to approve', 'warning');
        return;
    }
    Components.showToast(`${selected} jobs approved successfully!`, 'success');
}

function bulkRejectJobs() {
    const selected = document.querySelectorAll('.row-checkbox:checked').length;
    if (selected === 0) {
        Components.showToast('Please select jobs to reject', 'warning');
        return;
    }
    if (confirm(`Are you sure you want to reject ${selected} jobs?`)) {
        Components.showToast(`${selected} jobs rejected`, 'warning');
    }
}

// Scam Actions
function investigateScam(id) {
    Components.showToast('Opening scam investigation...', 'info');
}

function takeScamAction(id) {
    Components.showToast('Taking action on scam report...', 'warning');
}

function resolveScam(id) {
    Components.showToast(`Scam report ${id} resolved`, 'success');
}

// Emergency Actions
function freezeJobPosting() {
    if (confirm('⚠️ WARNING: This will freeze ALL job posting on the platform. Continue?')) {
        Components.showToast('Job posting frozen globally', 'warning');
        document.getElementById('emergencyBanner').classList.remove('hidden');
        AppState.emergencyMode = true;
    }
}

function lockMessaging() {
    if (confirm('⚠️ WARNING: This will disable ALL messaging on the platform. Continue?')) {
        Components.showToast('Messaging locked globally', 'warning');
    }
}

function suspendIndustry() {
    Components.showToast('Industry suspension feature', 'info');
}

function disablePayments() {
    if (confirm('⚠️ WARNING: This will stop ALL payment processing. Continue?')) {
        Components.showToast('Payments disabled globally', 'danger');
    }
}

function emergencyBroadcast() {
    Components.showToast('Emergency broadcast feature', 'info');
}

function activateEmergencyMode() {
    if (confirm('🚨 CRITICAL: This will activate FULL PLATFORM LOCKDOWN. Continue?')) {
        Components.showToast('EMERGENCY MODE ACTIVATED', 'danger');
        document.getElementById('emergencyBanner').classList.remove('hidden');
        AppState.emergencyMode = true;
    }
}

function deactivateEmergency() {
    if (confirm('Deactivate emergency mode?')) {
        document.getElementById('emergencyBanner').classList.add('hidden');
        AppState.emergencyMode = false;
        Components.showToast('Emergency mode deactivated', 'success');
    }
}

// Export functions for global access
window.navigateTo = navigateTo;
window.viewEmployerDetails = viewEmployerDetails;
window.verifyEmployer = verifyEmployer;
window.suspendEmployer = suspendEmployer;
window.bulkVerifyEmployers = bulkVerifyEmployers;
window.bulkSuspendEmployers = bulkSuspendEmployers;
window.viewJobDetails = viewJobDetails;
window.approveJob = approveJob;
window.rejectJob = rejectJob;
window.bulkApproveJobs = bulkApproveJobs;
window.bulkRejectJobs = bulkRejectJobs;
window.investigateScam = investigateScam;
window.takeScamAction = takeScamAction;
window.resolveScam = resolveScam;
window.freezeJobPosting = freezeJobPosting;
window.lockMessaging = lockMessaging;
window.suspendIndustry = suspendIndustry;
window.disablePayments = disablePayments;
window.emergencyBroadcast = emergencyBroadcast;
window.activateEmergencyMode = activateEmergencyMode;
window.deactivateEmergency = deactivateEmergency;
