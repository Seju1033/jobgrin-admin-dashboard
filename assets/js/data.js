// ============================================
// JOBGRIN MASTER ADMIN - COMPREHENSIVE DATA
// All missing features data added
// ============================================

const DATA = {
    // ============================================
    // EMPLOYER TRUST CENTER (60 entries)
    // ============================================
    employers: generateEmployers(60),
    
    // ============================================
    // JOB VERIFICATION QUEUE (60 entries)
    // ============================================
    verificationJobs: generateVerificationJobs(60),
    
    // ============================================
    // ALL JOBS (100 entries)
    // ============================================
    allJobs: generateAllJobs(100),
    
    // ============================================
    // CANDIDATES (80 entries)
    // ============================================
    candidates: generateCandidates(80),
    
    // ============================================
    // SKILLS (100 entries)
    // ============================================
    skills: generateSkills(100),
    
    // ============================================
    // SCAM & ABUSE REPORTS (50 entries)
    // ============================================
    scamReports: generateScamReports(50),
    
    // ============================================
    // PAYMENT TRANSACTIONS (60 entries)
    // ============================================
    payments: generatePayments(60),
    
    // ============================================
    // XML FEED MANAGEMENT (30 entries)
    // ============================================
    xmlFeeds: generateXMLFeeds(30),
    
    // ============================================
    // COURSES & SPECIALIZATIONS (50 entries)
    // ============================================
    courses: generateCourses(50),
    
    // ============================================
    // RESUME SEARCH LOGS (100 entries)
    // ============================================
    resumeSearches: generateResumeSearches(100),
    
    // ============================================
    // COMMUNICATION CENTER (80 entries)
    // ============================================
    communications: generateCommunications(80),
    emailTemplates: generateEmailTemplates(20),
    
    // ============================================
    // AUDIT & COMPLIANCE (150 entries)
    // ============================================
    auditLogs: generateAuditLogs(150),
    gdprRequests: generateGDPRRequests(30),
    
    // ============================================
    // EMPLOYER VERIFICATION RECORDS (60 entries)
    // ============================================
    verificationRecords: generateVerificationRecords(60),
    
    // ============================================
    // WORKFLOW AUTOMATION RULES (40 entries)
    // ============================================
    automationRules: generateAutomationRules(40),
    scheduledReports: generateScheduledReports(20),
    
    // ============================================
    // PERFORMANCE MONITORING (Real-time)
    // ============================================
    performanceMetrics: generatePerformanceMetrics(),
    
    // ============================================
    // JOB QUALITY SCORES (100 entries)
    // ============================================
    jobQualityScores: generateJobQualityScores(100),
    
    // ============================================
    // CANDIDATE QUALITY SCORES (80 entries)
    // ============================================
    candidateQualityScores: generateCandidateQualityScores(80),
    
    // ============================================
    // PLATFORM HEALTH METRICS
    // ============================================
    platformHealth: {
        totalJobs: 90234,
        activeJobs: 45234,
        pausedJobs: 12456,
        closedJobs: 32544,
        totalEmployers: 4567,
        activeEmployers: 3456,
        verifiedEmployers: 2987,
        pendingEmployers: 234,
        suspendedEmployers: 123,
        shadowBannedEmployers: 45,
        totalCandidates: 234567,
        activeCandidates: 156789,
        totalApplications: 1234567,
        monthlyRevenue: 2400000,
        trustScoreAvg: 82.5,
        responseRateAvg: 67.3,
        scamReports: 23,
        fraudDetected: 12,
        platformHealthScore: 94,
        uptime: 99.8
    },
    
    // ============================================
    // ANALYTICS DATA
    // ============================================
    analytics: {
        jobTrends: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [1200, 1900, 1500, 2100, 1800, 2400, 2200, 2600, 2300, 2800, 2500, 3000]
        },
        categoryDistribution: {
            labels: ['IT & Software', 'Marketing', 'Sales', 'Design', 'Business', 'Finance', 'HR', 'Operations'],
            data: [45, 12, 10, 8, 7, 6, 5, 7]
        },
        revenue: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [1800000, 2200000, 1950000, 2400000, 2100000, 2600000]
        },
        userGrowth: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            employers: [320, 410, 380, 520, 450, 610],
            candidates: [12000, 15000, 14000, 18000, 16500, 21000]
        },
        topCities: [
            { city: 'Bangalore', jobs: 12456, applications: 45678, employers: 1234, growth: 15.3 },
            { city: 'Mumbai', jobs: 10234, applications: 38456, employers: 987, growth: 12.8 },
            { city: 'Delhi', jobs: 9876, applications: 35234, employers: 876, growth: 10.5 },
            { city: 'Pune', jobs: 7654, applications: 28765, employers: 654, growth: 9.2 },
            { city: 'Hyderabad', jobs: 6543, applications: 24567, employers: 543, growth: 8.7 },
            { city: 'Chennai', jobs: 5432, applications: 20456, employers: 432, growth: 7.5 },
            { city: 'Kolkata', jobs: 4321, applications: 16345, employers: 321, growth: 6.3 },
            { city: 'Ahmedabad', jobs: 3210, applications: 12234, employers: 210, growth: 5.8 }
        ]
    },
    
    // ============================================
    // BEHAVIORAL PATTERNS (50 entries)
    // ============================================
    behavioralPatterns: generateBehavioralPatterns(50),
    
    // ============================================
    // RISK ALERTS (40 entries)
    // ============================================
    riskAlerts: generateRiskAlerts(40),
    
    // ============================================
    // ADMIN ACTIVITY LOGS (100 entries)
    // ============================================
    adminLogs: generateAdminLogs(100),
    
    // ============================================
    // COMPLIANCE RECORDS (50 entries)
    // ============================================
    complianceRecords: generateComplianceRecords(50),
    
    // ============================================
    // COMPETITIVE INTELLIGENCE (10 entries)
    // ============================================
    competitors: generateCompetitors(10),
    
    // ============================================
    // SALARY TRENDS (20 entries)
    // ============================================
    salaryTrends: generateSalaryTrends(20),
    
    // ============================================
    // SKILL DEMAND (30 entries)
    // ============================================
    skillDemand: generateSkillDemand(30)
};

// ============================================
// DATA GENERATION FUNCTIONS
// ============================================

// XML FEEDS
function generateXMLFeeds(count) {
    const feeds = [];
    const sources = ['Naukri', 'Indeed', 'Monster', 'LinkedIn', 'Shine', 'TimesJobs', 'Glassdoor', 'Internshala'];
    const statuses = ['Active', 'Paused', 'Error', 'Pending'];
    
    for (let i = 1; i <= count; i++) {
        feeds.push({
            id: i,
            source: sources[Math.floor(Math.random() * sources.length)],
            url: `https://feed.example.com/jobs/feed${i}.xml`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            lastSync: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            jobsImported: Math.floor(Math.random() * 5000) + 100,
            successRate: Math.floor(Math.random() * 30) + 70,
            errors: Math.floor(Math.random() * 50),
            avgResponseTime: Math.floor(Math.random() * 3000) + 500,
            nextSync: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    return feeds;
}

// COURSES & SPECIALIZATIONS
function generateCourses(count) {
    const courses = [];
    const categories = ['Engineering', 'Management', 'Medical', 'Arts', 'Science', 'Commerce', 'Law', 'Design'];
    const levels = ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate'];
    
    for (let i = 1; i <= count; i++) {
        courses.push({
            id: i,
            name: `Course ${i}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            level: levels[Math.floor(Math.random() * levels.length)],
            duration: `${Math.floor(Math.random() * 4) + 1} Years`,
            candidates: Math.floor(Math.random() * 10000) + 100,
            jobs: Math.floor(Math.random() * 5000) + 50,
            avgSalary: Math.floor(Math.random() * 500000) + 300000,
            status: Math.random() > 0.1 ? 'Active' : 'Inactive'
        });
    }
    return courses;
}

// RESUME SEARCHES
function generateResumeSearches(count) {
    const searches = [];
    const employers = ['TechCorp', 'InnoSoft', 'DataSys', 'CloudNet', 'WebPro'];
    
    for (let i = 1; i <= count; i++) {
        searches.push({
            id: i,
            employer: employers[Math.floor(Math.random() * employers.length)],
            searchQuery: `Skills: ${['Java', 'Python', 'React', 'Node.js', 'AWS'][Math.floor(Math.random() * 5)]}`,
            resultsFound: Math.floor(Math.random() * 500) + 10,
            resumesViewed: Math.floor(Math.random() * 50) + 1,
            resumesDownloaded: Math.floor(Math.random() * 20),
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            creditsUsed: Math.floor(Math.random() * 10) + 1
        });
    }
    return searches;
}

// COMMUNICATIONS
function generateCommunications(count) {
    const comms = [];
    const types = ['Email', 'SMS', 'In-App', 'WhatsApp'];
    const statuses = ['Sent', 'Delivered', 'Read', 'Failed', 'Pending'];
    
    for (let i = 1; i <= count; i++) {
        comms.push({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            recipient: `user${i}@example.com`,
            subject: `Communication ${i}`,
            message: `This is message content for communication ${i}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            sentAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            readAt: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000).toISOString() : null
        });
    }
    return comms;
}

// EMAIL TEMPLATES
function generateEmailTemplates(count) {
    const templates = [];
    const categories = ['Welcome', 'Verification', 'Rejection', 'Approval', 'Reminder', 'Notification'];
    
    for (let i = 1; i <= count; i++) {
        templates.push({
            id: i,
            name: `Template ${i}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            subject: `Subject for Template ${i}`,
            body: `Email body content for template ${i}`,
            usageCount: Math.floor(Math.random() * 1000),
            lastUsed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Active'
        });
    }
    return templates;
}

// AUDIT LOGS
function generateAuditLogs(count) {
    const logs = [];
    const actions = ['Job Approved', 'Job Rejected', 'Employer Verified', 'Employer Suspended', 'Payment Processed', 'Data Exported', 'Settings Changed'];
    const admins = ['Admin1', 'Admin2', 'Admin3', 'SuperAdmin'];
    
    for (let i = 1; i <= count; i++) {
        logs.push({
            id: i,
            admin: admins[Math.floor(Math.random() * admins.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            target: `Target ${i}`,
            details: `Action details for log ${i}`,
            ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Success'
        });
    }
    return logs;
}

// GDPR REQUESTS
function generateGDPRRequests(count) {
    const requests = [];
    const types = ['Data Export', 'Data Deletion', 'Access Request', 'Rectification'];
    const statuses = ['Pending', 'In Progress', 'Completed', 'Rejected'];
    
    for (let i = 1; i <= count; i++) {
        requests.push({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            requester: `user${i}@example.com`,
            requestDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            completedDate: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString() : null,
            assignedTo: `Admin${Math.floor(Math.random() * 3) + 1}`
        });
    }
    return requests;
}

// VERIFICATION RECORDS
function generateVerificationRecords(count) {
    const records = [];
    const methods = ['GST', 'CIN', 'LinkedIn', 'Domain', 'Phone', 'Document'];
    const statuses = ['Verified', 'Failed', 'Pending', 'Expired'];
    
    for (let i = 1; i <= count; i++) {
        records.push({
            id: i,
            employerId: i,
            method: methods[Math.floor(Math.random() * methods.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            verifiedBy: `Admin${Math.floor(Math.random() * 3) + 1}`,
            verificationDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
            expiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            documentUrl: `https://docs.example.com/verify${i}.pdf`,
            notes: `Verification notes for record ${i}`
        });
    }
    return records;
}

// AUTOMATION RULES
function generateAutomationRules(count) {
    const rules = [];
    const triggers = ['Job Posted', 'Employer Registered', 'Payment Received', 'Application Submitted'];
    const actions = ['Auto-Approve', 'Auto-Reject', 'Send Email', 'Assign Tag', 'Update Status'];
    
    for (let i = 1; i <= count; i++) {
        rules.push({
            id: i,
            name: `Rule ${i}`,
            trigger: triggers[Math.floor(Math.random() * triggers.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            conditions: `Condition set ${i}`,
            status: Math.random() > 0.2 ? 'Active' : 'Inactive',
            executionCount: Math.floor(Math.random() * 1000),
            lastExecuted: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            createdBy: `Admin${Math.floor(Math.random() * 3) + 1}`
        });
    }
    return rules;
}

// SCHEDULED REPORTS
function generateScheduledReports(count) {
    const reports = [];
    const types = ['Daily Summary', 'Weekly Analytics', 'Monthly Revenue', 'Quarterly Review'];
    const frequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly'];
    
    for (let i = 1; i <= count; i++) {
        reports.push({
            id: i,
            name: `Report ${i}`,
            type: types[Math.floor(Math.random() * types.length)],
            frequency: frequencies[Math.floor(Math.random() * frequencies.length)],
            recipients: [`admin${i}@jobgrin.com`],
            lastSent: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            nextScheduled: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Active'
        });
    }
    return reports;
}

// PERFORMANCE METRICS
function generatePerformanceMetrics() {
    return {
        pageLoadTime: Math.floor(Math.random() * 2000) + 500,
        apiResponseTime: Math.floor(Math.random() * 500) + 100,
        databaseQueryTime: Math.floor(Math.random() * 300) + 50,
        errorRate: (Math.random() * 2).toFixed(2),
        uptime: 99.8,
        activeUsers: Math.floor(Math.random() * 100) + 20,
        cpuUsage: Math.floor(Math.random() * 60) + 20,
        memoryUsage: Math.floor(Math.random() * 70) + 30,
        diskUsage: Math.floor(Math.random() * 50) + 30,
        networkLatency: Math.floor(Math.random() * 100) + 20
    };
}

// JOB QUALITY SCORES
function generateJobQualityScores(count) {
    const scores = [];
    for (let i = 1; i <= count; i++) {
        scores.push({
            jobId: i,
            overallScore: Math.floor(Math.random() * 40) + 60,
            completenessScore: Math.floor(Math.random() * 40) + 60,
            clarityScore: Math.floor(Math.random() * 40) + 60,
            formattingScore: Math.floor(Math.random() * 40) + 60,
            salaryRealism: Math.random() > 0.3,
            duplicateCheck: Math.random() > 0.1 ? 'Clean' : 'Duplicate',
            spamScore: Math.floor(Math.random() * 30),
            recommendations: ['Add more details', 'Improve formatting', 'Clarify requirements']
        });
    }
    return scores;
}

// CANDIDATE QUALITY SCORES
function generateCandidateQualityScores(count) {
    const scores = [];
    for (let i = 1; i <= count; i++) {
        scores.push({
            candidateId: i,
            profileCompleteness: Math.floor(Math.random() * 40) + 60,
            resumeQuality: Math.floor(Math.random() * 40) + 60,
            emailVerified: Math.random() > 0.2,
            phoneVerified: Math.random() > 0.3,
            duplicateCheck: Math.random() > 0.1 ? 'Clean' : 'Duplicate',
            fakeResumeScore: Math.floor(Math.random() * 20),
            engagementScore: Math.floor(Math.random() * 40) + 60,
            lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    return scores;
}

// Continue with existing generator functions...
// (Keep all the original generator functions from the previous data.js)

function generateEmployers(count) {
    const employers = [];
    const companies = ['TechCorp', 'InnoSoft', 'DataSys', 'CloudNet', 'WebPro', 'CodeHub', 'DevOps Inc', 'AI Solutions'];
    const industries = ['IT Services', 'Software', 'E-commerce', 'FinTech', 'HealthTech', 'EdTech'];
    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai'];
    const statuses = ['Verified', 'Pending', 'Suspended', 'Shadow-Banned'];
    const types = ['Enterprise', 'Startup', 'SME'];
    
    for (let i = 1; i <= count; i++) {
        const trustScore = Math.floor(Math.random() * 50) + 50;
        employers.push({
            id: i,
            company: `${companies[Math.floor(Math.random() * companies.length)]} ${i}`,
            contact: `Contact Person ${i}`,
            email: `employer${i}@company.com`,
            phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            trustScore: trustScore,
            riskLevel: trustScore >= 80 ? 'Low' : (trustScore >= 60 ? 'Medium' : 'High'),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            gst: Math.random() > 0.3 ? `GST${Math.floor(Math.random() * 1000000)}` : null,
            cin: Math.random() > 0.4 ? `CIN${Math.floor(Math.random() * 1000000)}` : null,
            domain: `company${i}.com`,
            verified: Math.random() > 0.3,
            jobsPosted: Math.floor(Math.random() * 100) + 1,
            registered: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            employerType: types[Math.floor(Math.random() * types.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            industry: industries[Math.floor(Math.random() * industries.length)]
        });
    }
    return employers;
}

function generateVerificationJobs(count) {
    const jobs = [];
    const titles = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UI/UX Designer', 'DevOps Engineer'];
    const companies = ['TechCorp', 'InnoSoft', 'DataSys', 'CloudNet', 'WebPro'];
    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'];
    const categories = ['IT & Software', 'Marketing', 'Sales', 'Design', 'Operations'];
    const priorities = ['High', 'Medium', 'Low'];
    
    for (let i = 1; i <= count; i++) {
        const jdQuality = Math.floor(Math.random() * 40) + 60;
        jobs.push({
            id: i,
            title: `${titles[Math.floor(Math.random() * titles.length)]} ${i}`,
            company: companies[Math.floor(Math.random() * companies.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            salary: `₹${Math.floor(Math.random() * 10) + 5}L - ₹${Math.floor(Math.random() * 10) + 15}L`,
            experience: `${Math.floor(Math.random() * 5)}-${Math.floor(Math.random() * 5) + 5} years`,
            category: categories[Math.floor(Math.random() * categories.length)],
            jdQuality: jdQuality,
            trustScore: Math.floor(Math.random() * 40) + 60,
            salaryRealistic: Math.random() > 0.2,
            duplicateCheck: Math.random() > 0.1 ? 'Clean' : 'Duplicate Found',
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            contentFlags: Math.random() > 0.7 ? ['Missing Skills', 'Vague Description'] : [],
            postedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
    }
    return jobs;
}

function generateAllJobs(count) {
    const jobs = [];
    const titles = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UI/UX Designer', 'DevOps Engineer', 'Marketing Manager', 'Sales Executive'];
    const companies = ['TechCorp', 'InnoSoft', 'DataSys', 'CloudNet', 'WebPro', 'CodeHub', 'DevOps Inc'];
    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];
    const statuses = ['Active', 'Paused', 'Closed', 'Expired'];
    const categories = ['IT & Software', 'Marketing', 'Sales', 'Design', 'Operations', 'Finance', 'HR'];
    
    for (let i = 1; i <= count; i++) {
        jobs.push({
            id: i,
            title: `${titles[Math.floor(Math.random() * titles.length)]} ${i}`,
            company: companies[Math.floor(Math.random() * companies.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            salary: `₹${Math.floor(Math.random() * 10) + 5}L - ₹${Math.floor(Math.random() * 10) + 15}L`,
            experience: `${Math.floor(Math.random() * 5)}-${Math.floor(Math.random() * 5) + 5} years`,
            category: categories[Math.floor(Math.random() * categories.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            applications: Math.floor(Math.random() * 500) + 10,
            views: Math.floor(Math.random() * 2000) + 100,
            postedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            expiryDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
    }
    return jobs;
}

function generateCandidates(count) {
    const candidates = [];
    const names = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Rohan', 'Kavya'];
    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai'];
    const skills = ['Java', 'Python', 'React', 'Node.js', 'AWS', 'SQL', 'JavaScript'];
    
    for (let i = 1; i <= count; i++) {
        candidates.push({
            id: i,
            name: `${names[Math.floor(Math.random() * names.length)]} ${i}`,
            email: `candidate${i}@email.com`,
            phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            location: locations[Math.floor(Math.random() * locations.length)],
            experience: `${Math.floor(Math.random() * 10)} years`,
            currentRole: `${['Software Engineer', 'Data Analyst', 'Product Manager'][Math.floor(Math.random() * 3)]}`,
            skills: [skills[Math.floor(Math.random() * skills.length)], skills[Math.floor(Math.random() * skills.length)]],
            applications: Math.floor(Math.random() * 50) + 1,
            profileViews: Math.floor(Math.random() * 200) + 10,
            registered: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
    }
    return candidates;
}

function generateSkills(count) {
    const skills = [];
    const categories = ['Programming', 'Design', 'Marketing', 'Management', 'Data Science', 'DevOps'];
    
    for (let i = 1; i <= count; i++) {
        skills.push({
            id: i,
            name: `Skill ${i}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            jobs: Math.floor(Math.random() * 1000) + 10,
            candidates: Math.floor(Math.random() * 5000) + 100,
            trending: Math.random() > 0.7,
            growth: `${Math.floor(Math.random() * 50)}%`,
            avgSalary: `₹${Math.floor(Math.random() * 10) + 5}L`
        });
    }
    return skills;
}

function generateScamReports(count) {
    const reports = [];
    const types = ['Payment Request', 'Fake Job', 'Inappropriate Content', 'Spam', 'Phishing'];
    const severities = ['Low', 'Medium', 'High'];
    const statuses = ['Pending', 'Investigating', 'Resolved', 'Escalated'];
    
    for (let i = 1; i <= count; i++) {
        reports.push({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            reason: `Scam report reason ${i}`,
            evidence: ['Screenshot', 'Email', 'Chat Log'],
            reported: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            reportedBy: `Candidate ${i}`
        });
    }
    return reports;
}

function generatePayments(count) {
    const payments = [];
    const types = ['Sponsored Job', 'Resume Credits', 'Subscription', 'Featured Listing'];
    const statuses = ['Success', 'Pending', 'Failed', 'Refunded'];
    const methods = ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'];
    
    for (let i = 1; i <= count; i++) {
        payments.push({
            id: i,
            transactionId: `TXN${Math.floor(Math.random() * 1000000)}`,
            employer: `Company ${i}`,
            type: types[Math.floor(Math.random() * types.length)],
            amount: Math.floor(Math.random() * 50000) + 1000,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            method: methods[Math.floor(Math.random() * methods.length)],
            date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            invoiceUrl: `https://invoice.example.com/${i}.pdf`
        });
    }
    return payments;
}

function generateBehavioralPatterns(count) {
    const patterns = [];
    const types = ['Copy-Paste JD', 'Rapid Posting', 'Low Response Rate', 'Suspicious Login', 'Mass Application'];
    
    for (let i = 1; i <= count; i++) {
        patterns.push({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            entity: `Entity ${i}`,
            severity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
            occurrences: Math.floor(Math.random() * 50) + 1,
            firstDetected: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            lastDetected: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            actionTaken: Math.random() > 0.5 ? 'Shadow Ban' : 'Warning Sent'
        });
    }
    return patterns;
}

function generateRiskAlerts(count) {
    const alerts = [];
    const types = ['Fraud Ring', 'Salary Spike', 'Apply Burst', 'Domain Clustering', 'Unusual Activity'];
    
    for (let i = 1; i <= count; i++) {
        alerts.push({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
            description: `Risk alert description ${i}`,
            affectedEntities: Math.floor(Math.random() * 20) + 1,
            detected: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: ['Active', 'Investigating', 'Resolved'][Math.floor(Math.random() * 3)]
        });
    }
    return alerts;
}

function generateAdminLogs(count) {
    const logs = [];
    const actions = ['Approved Job', 'Rejected Job', 'Verified Employer', 'Suspended Account', 'Updated Settings'];
    const admins = ['Admin1', 'Admin2', 'Admin3', 'SuperAdmin'];
    
    for (let i = 1; i <= count; i++) {
        logs.push({
            id: i,
            admin: admins[Math.floor(Math.random() * admins.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            target: `Target ${i}`,
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
        });
    }
    return logs;
}

function generateComplianceRecords(count) {
    const records = [];
    const types = ['GDPR', 'Data Retention', 'Privacy Policy', 'Terms Update'];
    
    for (let i = 1; i <= count; i++) {
        records.push({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            description: `Compliance record ${i}`,
            date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'Compliant',
            nextReview: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
    }
    return records;
}

function generateCompetitors(count) {
    const competitors = [];
    const names = ['Naukri', 'Indeed', 'Monster', 'LinkedIn', 'Shine', 'TimesJobs', 'Glassdoor', 'Internshala', 'Foundit', 'Apna'];
    
    for (let i = 0; i < count; i++) {
        competitors.push({
            id: i + 1,
            name: names[i],
            activeJobs: Math.floor(Math.random() * 100000) + 10000,
            marketShare: Math.floor(Math.random() * 30) + 5,
            avgSalary: Math.floor(Math.random() * 500000) + 500000,
            userBase: Math.floor(Math.random() * 10000000) + 1000000
        });
    }
    return competitors;
}

function generateSalaryTrends(count) {
    const trends = [];
    const roles = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UI/UX Designer', 'DevOps Engineer'];
    
    for (let i = 0; i < count; i++) {
        trends.push({
            id: i + 1,
            role: roles[Math.floor(Math.random() * roles.length)],
            avgSalary: Math.floor(Math.random() * 1000000) + 500000,
            growth: `${Math.floor(Math.random() * 20)}%`,
            demand: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]
        });
    }
    return trends;
}

function generateSkillDemand(count) {
    const demand = [];
    const skills = ['Java', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'SQL'];
    
    for (let i = 0; i < count; i++) {
        demand.push({
            id: i + 1,
            skill: skills[Math.floor(Math.random() * skills.length)],
            jobs: Math.floor(Math.random() * 5000) + 100,
            growth: `${Math.floor(Math.random() * 50)}%`,
            avgSalary: Math.floor(Math.random() * 500000) + 400000
        });
    }
    return demand;
}
