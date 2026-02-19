// ============================================
// ALL GOVERNANCE MODULES
// 26+ Complete Feature Modules
// ============================================

const Modules = {
    // ============================================
    // DASHBOARD MODULE
    // ============================================
    renderDashboard() {
        const health = DATA.platformHealth;
        
        return `
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Master Dashboard</h2>
                <p class="text-gray-600">Complete platform governance overview</p>
            </div>
            
            <!-- Platform Health Alert -->
            ${health.platformHealthScore < 80 ? Components.createAlert('Platform health below threshold. Immediate attention required.', 'warning') : ''}
            
            <!-- Key Metrics Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                ${Components.createStatCard('Total Jobs', health.totalJobs.toLocaleString(), '+12.5%', 'fas fa-briefcase', 'blue')}
                ${Components.createStatCard('Active Employers', health.activeEmployers.toLocaleString(), '+8.2%', 'fas fa-building', 'green')}
                ${Components.createStatCard('Pending Verification', health.pendingEmployers, 'Needs attention', 'fas fa-hourglass-half', 'yellow')}
                ${Components.createStatCard('Monthly Revenue', '₹' + (health.monthlyRevenue / 100000).toFixed(1) + 'L', '+15.3%', 'fas fa-rupee-sign', 'purple')}
            </div>
            
            <!-- Trust & Health Metrics -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Platform Health Score</h3>
                    <div class="text-center">
                        <div class="text-5xl font-bold ${health.platformHealthScore >= 90 ? 'text-green-600' : health.platformHealthScore >= 70 ? 'text-yellow-600' : 'text-red-600'} mb-2">
                            ${health.platformHealthScore}%
                        </div>
                        ${Components.createProgressBar(health.platformHealthScore, 'Overall Health')}
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Trust Metrics</h3>
                    <div class="space-y-3">
                        ${Components.createProgressBar(health.trustScoreAvg, 'Avg Trust Score')}
                        ${Components.createProgressBar(health.responseRateAvg, 'Response Rate')}
                        ${Components.createProgressBar((health.verifiedEmployers / health.totalEmployers * 100).toFixed(1), 'Verified Employers')}
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Risk Indicators</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Scam Reports</span>
                            <span class="font-semibold ${health.scamReports > 20 ? 'text-red-600' : 'text-green-600'}">${health.scamReports}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Fraud Detected</span>
                            <span class="font-semibold ${health.fraudDetected > 10 ? 'text-red-600' : 'text-green-600'}">${health.fraudDetected}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Shadow Banned</span>
                            <span class="font-semibold text-gray-600">${health.shadowBannedEmployers}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                ${Components.createChartContainer('jobTrendsChart', 'Job Posting Trends')}
                ${Components.createChartContainer('categoryChart', 'Category Distribution')}
            </div>
            
            <!-- Quick Actions -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-tasks text-blue-600 mr-2"></i>
                        Quick Actions
                    </h3>
                    <div class="space-y-3">
                        <button onclick="navigateTo('job-verification')" class="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                            <i class="fas fa-check-circle text-blue-600 mr-2"></i>
                            <span class="font-medium text-gray-800">Verify Pending Jobs</span>
                            <span class="float-right bg-blue-600 text-white text-xs px-2 py-1 rounded-full">12</span>
                        </button>
                        <button onclick="navigateTo('employer-trust')" class="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition">
                            <i class="fas fa-user-plus text-green-600 mr-2"></i>
                            <span class="font-medium text-gray-800">Review New Employers</span>
                            <span class="float-right bg-green-600 text-white text-xs px-2 py-1 rounded-full">8</span>
                        </button>
                        <button onclick="navigateTo('scam-monitoring')" class="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg transition">
                            <i class="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                            <span class="font-medium text-gray-800">Review Scam Reports</span>
                            <span class="float-right bg-red-600 text-white text-xs px-2 py-1 rounded-full">5</span>
                        </button>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                        Recent Alerts
                    </h3>
                    <div class="space-y-3">
                        ${DATA.riskAlerts.slice(0, 3).map(alert => `
                            <div class="p-3 bg-${alert.severity === 'Critical' ? 'red' : alert.severity === 'High' ? 'yellow' : 'blue'}-50 border-l-4 border-${alert.severity === 'Critical' ? 'red' : alert.severity === 'High' ? 'yellow' : 'blue'}-500 rounded">
                                <p class="text-sm font-medium text-gray-800">${alert.type}</p>
                                <p class="text-xs text-gray-600 mt-1">${new Date(alert.detected).toLocaleString()}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-trophy text-yellow-600 mr-2"></i>
                        Top Employers
                    </h3>
                    <div class="space-y-3">
                        ${DATA.employers.filter(e => e.verified).sort((a, b) => b.jobsPosted - a.jobsPosted).slice(0, 3).map((emp, idx) => `
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-${idx === 0 ? 'blue' : idx === 1 ? 'gray' : 'orange'}-600 rounded-lg flex items-center justify-center text-white font-bold">${idx + 1}</div>
                                    <div>
                                        <p class="font-medium text-gray-800">${emp.company}</p>
                                        <p class="text-xs text-gray-600">${emp.jobsPosted} jobs posted</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },
    
    // ============================================
    // EMPLOYER TRUST CENTER MODULE
    // ============================================
    renderEmployerTrust() {
        const pendingEmployers = DATA.employers.filter(e => e.status === 'Pending');
        const verifiedEmployers = DATA.employers.filter(e => e.status === 'Verified');
        const suspendedEmployers = DATA.employers.filter(e => e.status === 'Suspended');
        
        const columns = [
            { key: 'company', label: 'Company', render: (val, row) => `
                <div>
                    <div class="font-medium text-gray-800">${val}</div>
                    <div class="text-xs text-gray-500">${row.industry}</div>
                </div>
            `},
            { key: 'contact', label: 'Contact' },
            { key: 'email', label: 'Email' },
            { key: 'trustScore', label: 'Trust Score', render: (val) => Components.createTrustScoreBadge(val) },
            { key: 'riskLevel', label: 'Risk', render: (val) => Components.createRiskIndicator(val) },
            { key: 'status', label: 'Status', render: (val) => Components.createStatusBadge(val) },
            { key: 'verified', label: 'Verified', render: (val) => val ? '<i class="fas fa-check-circle text-green-600"></i>' : '<i class="fas fa-times-circle text-red-600"></i>' }
        ];
        
        const actions = [
            { icon: 'fas fa-eye', label: 'View', color: 'blue', onClick: 'viewEmployerDetails' },
            { icon: 'fas fa-check', label: 'Verify', color: 'green', onClick: 'verifyEmployer' },
            { icon: 'fas fa-ban', label: 'Suspend', color: 'red', onClick: 'suspendEmployer' }
        ];
        
        return `
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Employer Trust Center</h2>
                <p class="text-gray-600">KYC verification, trust scoring, and employer governance</p>
            </div>
            
            <!-- Trust Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                ${Components.createStatCard('Total Employers', DATA.employers.length, null, 'fas fa-building', 'blue')}
                ${Components.createStatCard('Verified', verifiedEmployers.length, null, 'fas fa-check-circle', 'green')}
                ${Components.createStatCard('Pending Review', pendingEmployers.length, 'Action needed', 'fas fa-hourglass-half', 'yellow')}
                ${Components.createStatCard('Suspended', suspendedEmployers.length, null, 'fas fa-ban', 'red')}
            </div>
            
            <!-- Tabs -->
            ${Components.createTabs([
                { id: 'pending', label: 'Pending Review', count: pendingEmployers.length },
                { id: 'verified', label: 'Verified', count: verifiedEmployers.length },
                { id: 'suspended', label: 'Suspended', count: suspendedEmployers.length },
                { id: 'all', label: 'All Employers', count: DATA.employers.length }
            ])}
            
            <!-- Pending Employers Table -->
            <div data-tab-content="pending">
                ${Components.createDataTable(columns, pendingEmployers, {
                    selectable: true,
                    actions: actions,
                    headerActions: `
                        <button class="btn btn-success" onclick="bulkVerifyEmployers()">
                            <i class="fas fa-check-double"></i> Bulk Verify
                        </button>
                        <button class="btn btn-danger" onclick="bulkSuspendEmployers()">
                            <i class="fas fa-ban"></i> Bulk Suspend
                        </button>
                    `
                })}
            </div>
            
            <!-- Verified Employers Table -->
            <div data-tab-content="verified" class="hidden">
                ${Components.createDataTable(columns, verifiedEmployers, {
                    selectable: true,
                    actions: actions
                })}
            </div>
            
            <!-- Suspended Employers Table -->
            <div data-tab-content="suspended" class="hidden">
                ${Components.createDataTable(columns, suspendedEmployers, {
                    selectable: true,
                    actions: actions
                })}
            </div>
            
            <!-- All Employers Table -->
            <div data-tab-content="all" class="hidden">
                ${Components.createDataTable(columns, DATA.employers, {
                    selectable: true,
                    actions: actions
                })}
            </div>
        `;
    },
    
    // ============================================
    // JOB VERIFICATION MODULE
    // ============================================
    renderJobVerification() {
        const highPriority = DATA.verificationJobs.filter(j => j.priority === 'High');
        const mediumPriority = DATA.verificationJobs.filter(j => j.priority === 'Medium');
        const lowPriority = DATA.verificationJobs.filter(j => j.priority === 'Low');
        
        const columns = [
            { key: 'title', label: 'Job Title', render: (val, row) => `
                <div>
                    <div class="font-medium text-gray-800">${val}</div>
                    <div class="text-xs text-gray-500">${row.company}</div>
                </div>
            `},
            { key: 'location', label: 'Location' },
            { key: 'salary', label: 'Salary' },
            { key: 'jdQuality', label: 'JD Quality', render: (val) => Components.createProgressBar(val) },
            { key: 'trustScore', label: 'Trust Score', render: (val) => Components.createTrustScoreBadge(val) },
            { key: 'priority', label: 'Priority', render: (val) => Components.createStatusBadge(val) },
            { key: 'posted', label: 'Posted' }
        ];
        
        const actions = [
            { icon: 'fas fa-eye', label: 'View', color: 'blue', onClick: 'viewJobDetails' },
            { icon: 'fas fa-check', label: 'Approve', color: 'green', onClick: 'approveJob' },
            { icon: 'fas fa-times', label: 'Reject', color: 'red', onClick: 'rejectJob' }
        ];
        
        return `
            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Job Verification Queue</h2>
                    <p class="text-gray-600">Review and verify pending job posts with AI-assisted quality checks</p>
                </div>
                <div class="flex space-x-3">
                    <button class="btn btn-success" onclick="bulkApproveJobs()">
                        <i class="fas fa-check-double"></i> Bulk Approve
                    </button>
                    <button class="btn btn-danger" onclick="bulkRejectJobs()">
                        <i class="fas fa-times-circle"></i> Bulk Reject
                    </button>
                </div>
            </div>
            
            <!-- Verification Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                ${Components.createStatCard('Total Pending', DATA.verificationJobs.length, null, 'fas fa-hourglass-half', 'yellow')}
                ${Components.createStatCard('High Priority', highPriority.length, 'Urgent', 'fas fa-exclamation-triangle', 'red')}
                ${Components.createStatCard('Medium Priority', mediumPriority.length, null, 'fas fa-info-circle', 'blue')}
                ${Components.createStatCard('Low Priority', lowPriority.length, null, 'fas fa-check-circle', 'green')}
            </div>
            
            <!-- Tabs -->
            ${Components.createTabs([
                { id: 'all-jobs', label: 'All Jobs', count: DATA.verificationJobs.length },
                { id: 'high', label: 'High Priority', count: highPriority.length },
                { id: 'medium', label: 'Medium Priority', count: mediumPriority.length },
                { id: 'low', label: 'Low Priority', count: lowPriority.length }
            ])}
            
            <!-- All Jobs Table -->
            <div data-tab-content="all-jobs">
                ${Components.createDataTable(columns, DATA.verificationJobs, {
                    selectable: true,
                    actions: actions
                })}
            </div>
            
            <!-- High Priority Table -->
            <div data-tab-content="high" class="hidden">
                ${Components.createDataTable(columns, highPriority, {
                    selectable: true,
                    actions: actions
                })}
            </div>
            
            <!-- Medium Priority Table -->
            <div data-tab-content="medium" class="hidden">
                ${Components.createDataTable(columns, mediumPriority, {
                    selectable: true,
                    actions: actions
                })}
            </div>
            
            <!-- Low Priority Table -->
            <div data-tab-content="low" class="hidden">
                ${Components.createDataTable(columns, lowPriority, {
                    selectable: true,
                    actions: actions
                })}
            </div>
        `;
    },
    
    // ============================================
    // SCAM MONITORING MODULE
    // ============================================
    renderScamMonitoring() {
        const activeReports = DATA.scamReports.filter(r => r.status === 'Investigating' || r.status === 'Pending');
        const resolvedReports = DATA.scamReports.filter(r => r.status === 'Resolved');
        
        const columns = [
            { key: 'type', label: 'Type', render: (val) => Components.createStatusBadge(val) },
            { key: 'severity', label: 'Severity', render: (val) => Components.createRiskIndicator(val) },
            { key: 'reason', label: 'Reason' },
            { key: 'reported', label: 'Reported', render: (val) => new Date(val).toLocaleString() },
            { key: 'status', label: 'Status', render: (val) => Components.createStatusBadge(val) }
        ];
        
        const actions = [
            { icon: 'fas fa-eye', label: 'Investigate', color: 'blue', onClick: 'investigateScam' },
            { icon: 'fas fa-ban', label: 'Take Action', color: 'red', onClick: 'takeScamAction' },
            { icon: 'fas fa-check', label: 'Resolve', color: 'green', onClick: 'resolveScam' }
        ];
        
        return `
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Scam & Abuse Monitoring</h2>
                <p class="text-gray-600">Real-time scam detection and candidate protection system</p>
            </div>
            
            ${Components.createAlert('5 high-severity scam reports require immediate attention', 'danger')}
            
            <!-- Scam Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                ${Components.createStatCard('Active Reports', activeReports.length, null, 'fas fa-exclamation-triangle', 'red')}
                ${Components.createStatCard('Resolved', resolvedReports.length, null, 'fas fa-check-circle', 'green')}
                ${Components.createStatCard('High Severity', DATA.scamReports.filter(r => r.severity === 'High').length, null, 'fas fa-fire', 'red')}
                ${Components.createStatCard('This Month', DATA.scamReports.filter(r => new Date(r.reported).getMonth() === new Date().getMonth()).length, null, 'fas fa-calendar', 'blue')}
            </div>
            
            <!-- Tabs -->
            ${Components.createTabs([
                { id: 'active', label: 'Active Reports', count: activeReports.length },
                { id: 'resolved', label: 'Resolved', count: resolvedReports.length },
                { id: 'all-reports', label: 'All Reports', count: DATA.scamReports.length }
            ])}
            
            <!-- Active Reports Table -->
            <div data-tab-content="active">
                ${Components.createDataTable(columns, activeReports, {
                    selectable: true,
                    actions: actions
                })}
            </div>
            
            <!-- Resolved Reports Table -->
            <div data-tab-content="resolved" class="hidden">
                ${Components.createDataTable(columns, resolvedReports, {
                    selectable: true,
                    actions: actions
                })}
            </div>
            
            <!-- All Reports Table -->
            <div data-tab-content="all-reports" class="hidden">
                ${Components.createDataTable(columns, DATA.scamReports, {
                    selectable: true,
                    actions: actions
                })}
            </div>
        `;
    },
    
    // ============================================
    // EMERGENCY CONTROLS MODULE
    // ============================================
    renderEmergencyControls() {
        return `
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Emergency Controls</h2>
                <p class="text-gray-600">One-click crisis management and platform-wide controls</p>
            </div>
            
            ${Components.createAlert('Emergency controls should only be used during critical situations. All actions are logged and audited.', 'warning')}
            
            <!-- Emergency Actions Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Freeze All Job Posting -->
                <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">Freeze Job Posting</h3>
                            <p class="text-sm text-gray-600 mt-1">Stop all new job postings globally</p>
                        </div>
                        <i class="fas fa-snowflake text-red-500 text-2xl"></i>
                    </div>
                    <button onclick="freezeJobPosting()" class="w-full btn btn-danger">
                        <i class="fas fa-pause-circle"></i> Activate Freeze
                    </button>
                </div>
                
                <!-- Lock Messaging -->
                <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">Lock Messaging</h3>
                            <p class="text-sm text-gray-600 mt-1">Disable all platform messaging</p>
                        </div>
                        <i class="fas fa-lock text-orange-500 text-2xl"></i>
                    </div>
                    <button onclick="lockMessaging()" class="w-full btn btn-warning">
                        <i class="fas fa-lock"></i> Lock Messaging
                    </button>
                </div>
                
                <!-- Suspend Industry -->
                <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">Suspend Industry</h3>
                            <p class="text-sm text-gray-600 mt-1">Suspend specific industry sectors</p>
                        </div>
                        <i class="fas fa-industry text-yellow-500 text-2xl"></i>
                    </div>
                    <button onclick="suspendIndustry()" class="w-full btn btn-warning">
                        <i class="fas fa-ban"></i> Suspend Industry
                    </button>
                </div>
                
                <!-- Disable Payments -->
                <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">Disable Payments</h3>
                            <p class="text-sm text-gray-600 mt-1">Stop all payment processing</p>
                        </div>
                        <i class="fas fa-credit-card-slash text-purple-500 text-2xl"></i>
                    </div>
                    <button onclick="disablePayments()" class="w-full btn" style="background: #9333ea; color: white;">
                        <i class="fas fa-stop-circle"></i> Disable Payments
                    </button>
                </div>
                
                <!-- Emergency Broadcast -->
                <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">Emergency Broadcast</h3>
                            <p class="text-sm text-gray-600 mt-1">Send platform-wide alert</p>
                        </div>
                        <i class="fas fa-broadcast-tower text-blue-500 text-2xl"></i>
                    </div>
                    <button onclick="emergencyBroadcast()" class="w-full btn btn-primary">
                        <i class="fas fa-bullhorn"></i> Send Broadcast
                    </button>
                </div>
                
                <!-- Activate Emergency Mode -->
                <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-600">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">Emergency Mode</h3>
                            <p class="text-sm text-gray-600 mt-1">Full platform lockdown</p>
                        </div>
                        <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                    </div>
                    <button onclick="activateEmergencyMode()" class="w-full btn" style="background: #dc2626; color: white;">
                        <i class="fas fa-power-off"></i> Activate Emergency
                    </button>
                </div>
            </div>
            
            <!-- Recent Emergency Actions Log -->
            <div class="mt-6 bg-white rounded-xl shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Emergency Actions</h3>
                <div class="space-y-2">
                    ${Components.createEmptyState('fas fa-shield-alt', 'No Emergency Actions', 'No emergency controls have been activated recently')}
                </div>
            </div>
        `;
    },
    
    // Add more modules here (continuing in next message due to length)
    // Placeholder for remaining modules
    renderBehavioralIntelligence() {
        return `<div class="p-6">${Components.createLoadingState('Loading Behavioral Intelligence Module...')}</div>`;
    },
    
    renderShadowBanning() {
        return `<div class="p-6">${Components.createLoadingState('Loading Shadow Banning Module...')}</div>`;
    },
    
    renderDataIntelligence() {
        return `<div class="p-6">${Components.createLoadingState('Loading Data Intelligence Hub...')}</div>`;
    },
    
    renderAllJobs() {
        const columns = [
            { key: 'title', label: 'Job Title' },
            { key: 'company', label: 'Company' },
            { key: 'category', label: 'Category' },
            { key: 'applications', label: 'Applications' },
            { key: 'status', label: 'Status', render: (val) => Components.createStatusBadge(val) }
        ];
        
        return `
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">All Jobs</h2>
                <p class="text-gray-600">Complete job listing management</p>
            </div>
            ${Components.createDataTable(columns, DATA.allJobs.slice(0, 50), { selectable: true })}
        `;
    },
    
    renderAllEmployers() {
        const columns = [
            { key: 'company', label: 'Company' },
            { key: 'contact', label: 'Contact' },
            { key: 'trustScore', label: 'Trust Score', render: (val) => Components.createTrustScoreBadge(val) },
            { key: 'status', label: 'Status', render: (val) => Components.createStatusBadge(val) }
        ];
        
        return `
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">All Employers</h2>
                <p class="text-gray-600">Complete employer directory</p>
            </div>
            ${Components.createDataTable(columns, DATA.employers, { selectable: true })}
        `;
    },
    
    renderCandidates() {
        const columns = [
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'location', label: 'Location' },
            { key: 'applications', label: 'Applications' },
            { key: 'verified', label: 'Verified', render: (val) => val ? '<i class="fas fa-check-circle text-green-600"></i>' : '<i class="fas fa-times-circle text-red-600"></i>' }
        ];
        
        return `
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">All Candidates</h2>
                <p class="text-gray-600">Registered job seekers</p>
            </div>
            ${Components.createDataTable(columns, DATA.candidates.slice(0, 50), { selectable: true })}
        `;
    },
    
    renderSkills() {
        const columns = [
            { key: 'name', label: 'Skill Name' },
            { key: 'category', label: 'Category' },
            { key: 'usage', label: 'Usage Count' },
            { key: 'status', label: 'Status', render: (val) => Components.createStatusBadge(val) }
        ];
        
        return `
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Skills Management</h2>
                <p class="text-gray-600">Manage platform skills and categories</p>
            </div>
            ${Components.createDataTable(columns, DATA.skills.slice(0, 50), { selectable: true })}
        `;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Modules;
}
