// ============================================
// JOBGRIN MASTER ADMIN - MAIN APPLICATION
// Complete Action Handlers & Logic
// ============================================

// Global state
const AppState = {
    currentSection: 'dashboard',
    user: {
        name: 'Master Admin',
        role: 'Super Admin',
        email: 'admin@jobgrin.com'
    },
    emergencyMode: false,
    selectedItems: []
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        initializeNavigation();
        navigateTo('dashboard');
        initializeEventListeners();
        initializeCharts();
        Components.showToast('Welcome to JobGrin Master Admin!', 'success');
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
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-section="${section}"]`);
    if (activeLink) activeLink.classList.add('active');
    
    AppState.currentSection = section;
    renderSection(section);
}

function renderSection(section) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = Components.createLoadingState(`Loading ${section}...`);
    
    setTimeout(() => {
        let content = '';
        
        switch(section) {
            case 'dashboard': content = Modules.renderDashboard(); break;
            case 'employer-trust': content = Modules.renderEmployerTrust(); break;
            case 'job-verification': content = Modules.renderJobVerification(); break;
            case 'scam-monitoring': content = Modules.renderScamMonitoring(); break;
            case 'emergency-controls': content = Modules.renderEmergencyControls(); break;
            case 'behavioral-intelligence': content = Modules.renderBehavioralIntelligence(); break;
            case 'shadow-banning': content = Modules.renderShadowBanning(); break;
            case 'data-intelligence': content = Modules.renderDataIntelligence(); break;
            case 'all-jobs': content = Modules.renderAllJobs(); break;
            case 'all-employers': content = Modules.renderAllEmployers(); break;
            case 'candidates': content = Modules.renderCandidates(); break;
            case 'skills': content = Modules.renderSkills(); break;
            default: content = Modules.renderUnderConstruction(section.replace(/-/g, ' ').toUpperCase(), 'Feature module');
        }
        
        mainContent.innerHTML = content;
        if (section === 'dashboard') setTimeout(() => initializeCharts(), 100);
    }, 300);
}

// ============================================
// EVENT LISTENERS
// ============================================
function initializeEventListeners() {
    document.getElementById('profileBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('profileMenu').classList.toggle('active');
    });
    
    document.getElementById('notificationBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('notificationDropdown').classList.toggle('hidden');
    });
    
    document.addEventListener('click', () => {
        document.getElementById('profileMenu').classList.remove('active');
        document.getElementById('notificationDropdown').classList.add('hidden');
    });
    
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });
    }
    
    document.getElementById('globalSearch').addEventListener('input', (e) => {
        handleGlobalSearch(e.target.value);
    });
}

// ============================================
// CHARTS
// ============================================
function initializeCharts() {
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
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }
    
    const categoryCanvas = document.getElementById('categoryChart');
    if (categoryCanvas) {
        new Chart(categoryCanvas, {
            type: 'doughnut',
            data: {
                labels: DATA.analytics.categoryDistribution.labels,
                datasets: [{
                    data: DATA.analytics.categoryDistribution.data,
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899', '#0ea5e9', '#22c55e']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
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
        { type: 'danger', message: 'High severity scam report flagged', time: '15 min ago' },
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
}

// ============================================
// EMPLOYER ACTIONS
// ============================================
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
                    <div><label class="text-sm text-gray-600">Registered</label><p class="font-medium">${employer.registered}</p></div>
                    <div><label class="text-sm text-gray-600">Last Active</label><p class="font-medium">${employer.lastActive}</p></div>
                </div>
            </div>
        </div>
    `;
    
    Components.showModal('Employer Details - ' + employer.company, content, [
        { label: 'Close', onClick: 'Components.closeModal("dynamicModal")', class: 'btn-primary' }
    ]);
}

function verifyEmployer(id) {
    Components.showToast(`Employer ${id} verified successfully!`, 'success');
    const employer = DATA.employers.find(e => e.id === id);
    if (employer) {
        employer.status = 'Verified';
        employer.verified = true;
        employer.trustScore = Math.min(employer.trustScore + 10, 100);
        employer.riskLevel = employer.trustScore >= 80 ? 'Low' : (employer.trustScore >= 60 ? 'Medium' : 'High');
    }
    renderSection(AppState.currentSection);
}

function suspendEmployer(id) {
    if (confirm('⚠️ Are you sure you want to suspend this employer? This will pause all their active jobs.')) {
        Components.showToast(`Employer ${id} suspended`, 'warning');
        const employer = DATA.employers.find(e => e.id === id);
        if (employer) {
            employer.status = 'Suspended';
            employer.verified = false;
            employer.riskLevel = 'High';
        }
        renderSection(AppState.currentSection);
    }
}

function shadowBanEmployer(id) {
    if (confirm('Shadow ban this employer? They will not be notified but their visibility will be reduced.')) {
        Components.showToast(`Employer ${id} shadow banned`, 'info');
        const employer = DATA.employers.find(e => e.id === id);
        if (employer) {
            employer.status = 'Shadow-Banned';
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
    setTimeout(() => renderSection(AppState.currentSection), 1000);
}

function bulkSuspendEmployers() {
    const selected = document.querySelectorAll('.row-checkbox:checked').length;
    if (selected === 0) {
        Components.showToast('Please select employers to suspend', 'warning');
        return;
    }
    if (confirm(`⚠️ Are you sure you want to suspend ${selected} employers?`)) {
        Components.showToast(`${selected} employers suspended`, 'warning');
        setTimeout(() => renderSection(AppState.currentSection), 1000);
    }
}

// ============================================
// JOB ACTIONS
// ============================================
function viewJobDetails(id) {
    const job = DATA.verificationJobs.find(j => j.id === id);
    if (!job) return;
    
    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 class="font-semibold text-gray-800 mb-3">Job Information</h4>
                <div class="space-y-3">
                    <div><label class="text-sm text-gray-600">Job Title</label><p class="font-medium">${job.title}</p></div>
                    <div><label class="text-sm text-gray-600">Company</label><p class="font-medium">${job.company}</p></div>
                    <div><label class="text-sm text-gray-600">Location</label><p class="font-medium">${job.location}</p></div>
                    <div><label class="text-sm text-gray-600">Salary</label><p class="font-medium">${job.salary}</p></div>
                    <div><label class="text-sm text-gray-600">Experience</label><p class="font-medium">${job.experience}</p></div>
                    <div><label class="text-sm text-gray-600">Category</label><p class="font-medium">${job.category}</p></div>
                </div>
            </div>
            <div>
                <h4 class="font-semibold text-gray-800 mb-3">Quality Metrics</h4>
                <div class="space-y-3">
                    <div><label class="text-sm text-gray-600">JD Quality Score</label>${Components.createProgressBar(job.jdQuality, 'Quality')}</div>
                    <div><label class="text-sm text-gray-600">Trust Score</label><div class="mt-1">${Components.createTrustScoreBadge(job.trustScore)}</div></div>
                    <div><label class="text-sm text-gray-600">Salary Check</label><p class="font-medium ${job.salaryRealistic ? 'text-green-600' : 'text-red-600'}">${job.salaryRealistic ? '✓ Realistic' : '⚠️ Unrealistic'}</p></div>
                    <div><label class="text-sm text-gray-600">Duplicate Check</label><p class="font-medium ${job.duplicateCheck === 'Clean' ? 'text-green-600' : 'text-red-600'}">${job.duplicateCheck}</p></div>
                    <div><label class="text-sm text-gray-600">Priority</label><div class="mt-1">${Components.createStatusBadge(job.priority)}</div></div>
                </div>
            </div>
        </div>
        ${job.contentFlags.length > 0 ? `
            <div class="mt-4">
                <h4 class="font-semibold text-gray-800 mb-2">Content Flags</h4>
                <div class="flex flex-wrap gap-2">
                    ${job.contentFlags.map(flag => `<span class="badge badge-warning">${flag}</span>`).join('')}
                </div>
            </div>
        ` : ''}
    `;
    
    Components.showModal('Job Verification Details', content, [
        { label: 'Reject', onClick: `rejectJob(${id}); Components.closeModal("dynamicModal")`, class: 'btn-danger', icon: 'fas fa-times' },
        { label: 'Approve', onClick: `approveJob(${id}); Components.closeModal("dynamicModal")`, class: 'btn-success', icon: 'fas fa-check' }
    ]);
}

function approveJob(id) {
    Components.showToast(`Job ${id} approved successfully!`, 'success');
    DATA.verificationJobs = DATA.verificationJobs.filter(j => j.id !== id);
    setTimeout(() => renderSection(AppState.currentSection), 500);
}

function rejectJob(id) {
    if (confirm('Are you sure you want to reject this job?')) {
        Components.showToast(`Job ${id} rejected`, 'warning');
        DATA.verificationJobs = DATA.verificationJobs.filter(j => j.id !== id);
        setTimeout(() => renderSection(AppState.currentSection), 500);
    }
}

function editJob(id) {
    Components.showToast('Opening job editor...', 'info');
}

function bulkApproveJobs() {
    const selected = document.querySelectorAll('.row-checkbox:checked').length;
    if (selected === 0) {
        Components.showToast('Please select jobs to approve', 'warning');
        return;
    }
    Components.showToast(`${selected} jobs approved successfully!`, 'success');
    setTimeout(() => renderSection(AppState.currentSection), 1000);
}

function bulkRejectJobs() {
    const selected = document.querySelectorAll('.row-checkbox:checked').length;
    if (selected === 0) {
        Components.showToast('Please select jobs to reject', 'warning');
        return;
    }
    if (confirm(`⚠️ Are you sure you want to reject ${selected} jobs?`)) {
        Components.showToast(`${selected} jobs rejected`, 'warning');
        setTimeout(() => renderSection(AppState.currentSection), 1000);
    }
}

function runAIQualityCheck() {
    Components.showToast('Running AI quality check on all pending jobs...', 'info');
    setTimeout(() => {
        Components.showToast('AI quality check completed! 8 jobs flagged for review.', 'success');
    }, 2000);
}

// ============================================
// SCAM ACTIONS
// ============================================
function investigateScam(id) {
    const report = DATA.scamReports.find(r => r.id === id);
    if (!report) return;
    
    const content = `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div><label class="text-sm text-gray-600">Report Type</label><p class="font-medium">${report.type}</p></div>
                <div><label class="text-sm text-gray-600">Severity</label>${Components.createRiskIndicator(report.severity)}</div>
                <div><label class="text-sm text-gray-600">Status</label>${Components.createStatusBadge(report.status)}</div>
                <div><label class="text-sm text-gray-600">Reported</label><p class="font-medium">${new Date(report.reported).toLocaleString()}</p></div>
            </div>
            <div>
                <label class="text-sm text-gray-600">Reason</label>
                <p class="font-medium mt-1">${report.reason}</p>
            </div>
            <div>
                <label class="text-sm text-gray-600">Evidence</label>
                <div class="flex gap-2 mt-1">
                    ${report.evidence.map(e => `<span class="badge badge-info">${e}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    Components.showModal('Scam Investigation - Report #' + id, content, [
        { label: 'Close', onClick: 'Components.closeModal("dynamicModal")' },
        { label: 'Take Action', onClick: `takeScamAction(${id}); Components.closeModal("dynamicModal")`, class: 'btn-danger' }
    ]);
}

function takeScamAction(id) {
    Components.showToast('Taking action on scam report...', 'warning');
}

function resolveScam(id) {
    Components.showToast(`Scam report ${id} resolved`, 'success');
    const report = DATA.scamReports.find(r => r.id === id);
    if (report) report.status = 'Resolved';
    setTimeout(() => renderSection(AppState.currentSection), 500);
}

// ============================================
// EMERGENCY ACTIONS
// ============================================
function freezeJobPosting() {
    if (confirm('⚠️ WARNING: This will freeze ALL job posting on the platform. Continue?')) {
        Components.showToast('🚨 Job posting frozen globally', 'danger');
        document.getElementById('emergencyBanner').classList.remove('hidden');
        AppState.emergencyMode = true;
    }
}

function lockMessaging() {
    if (confirm('⚠️ WARNING: This will disable ALL messaging on the platform. Continue?')) {
        Components.showToast('🔒 Messaging locked globally', 'warning');
    }
}

function suspendIndustry() {
    Components.showToast('Industry suspension interface', 'info');
}

function disablePayments() {
    if (confirm('⚠️ WARNING: This will stop ALL payment processing. Continue?')) {
        Components.showToast('💳 Payments disabled globally', 'danger');
    }
}

function emergencyBroadcast() {
    Components.showToast('📢 Emergency broadcast system', 'info');
}

function activateEmergencyMode() {
    if (confirm('🚨 CRITICAL: This will activate FULL PLATFORM LOCKDOWN. All features will be restricted. Continue?')) {
        Components.showToast('🚨 EMERGENCY MODE ACTIVATED', 'danger');
        document.getElementById('emergencyBanner').classList.remove('hidden');
        AppState.emergencyMode = true;
    }
}

function deactivateEmergency() {
    if (confirm('Deactivate emergency mode and restore normal operations?')) {
        document.getElementById('emergencyBanner').classList.add('hidden');
        AppState.emergencyMode = false;
        Components.showToast('✅ Emergency mode deactivated', 'success');
    }
}

// Export functions for global access
window.navigateTo = navigateTo;
window.viewEmployerDetails = viewEmployerDetails;
window.verifyEmployer = verifyEmployer;
window.suspendEmployer = suspendEmployer;
window.shadowBanEmployer = shadowBanEmployer;
window.bulkVerifyEmployers = bulkVerifyEmployers;
window.bulkSuspendEmployers = bulkSuspendEmployers;
window.viewJobDetails = viewJobDetails;
window.approveJob = approveJob;
window.rejectJob = rejectJob;
window.editJob = editJob;
window.bulkApproveJobs = bulkApproveJobs;
window.bulkRejectJobs = bulkRejectJobs;
window.runAIQualityCheck = runAIQualityCheck;
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
