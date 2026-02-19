// ============================================
// JOBGRIN MASTER ADMIN - COMPREHENSIVE DATA
// 50+ entries per major section
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
    // BEHAVIORAL INTELLIGENCE DATA
    // ============================================
    behavioralPatterns: generateBehavioralPatterns(50),
    
    // ============================================
    // RISK RADAR ALERTS
    // ============================================
    riskAlerts: generateRiskAlerts(40),
    
    // ============================================
    // ADMIN ACTIVITY LOGS
    // ============================================
    adminLogs: generateAdminLogs(100),
    
    // ============================================
    // COMPLIANCE RECORDS
    // ============================================
    complianceRecords: generateComplianceRecords(50),
    
    // ============================================
    // MARKET INTELLIGENCE
    // ============================================
    marketIntelligence: {
        competitorData: generateCompetitorData(10),
        salaryTrends: generateSalaryTrends(20),
        skillDemand: generateSkillDemand(30)
    }
};

// ============================================
// DATA GENERATION FUNCTIONS
// ============================================

function generateEmployers(count) {
    const companies = ['TCS Limited', 'Infosys Technologies', 'Wipro Digital', 'Tech Mahindra', 'HCL Technologies', 'Accenture India', 'Cognizant Technology', 'Capgemini India', 'IBM India', 'Oracle Financial Services', 'Amazon India', 'Flipkart', 'Paytm', 'Zomato', 'Swiggy', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Reliance Industries', 'Tata Consultancy'];
    const contacts = ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh', 'Neha Gupta', 'Arjun Mehta', 'Kavya Iyer', 'Rahul Verma', 'Pooja Nair'];
    const locations = ['Mumbai', 'Bangalore', 'Delhi', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida'];
    const industries = ['IT Services', 'E-commerce', 'Fintech', 'Banking', 'Consulting', 'Technology', 'Food Tech', 'Software'];
    const statuses = ['Verified', 'Pending', 'Suspended', 'Shadow-Banned'];
    const riskLevels = ['Low', 'Medium', 'High'];
    const employerTypes = ['Enterprise', 'Startup', 'SME'];
    
    const employers = [];
    for (let i = 1; i <= count; i++) {
        const status = i <= 40 ? 'Verified' : (i <= 50 ? 'Pending' : (i <= 55 ? 'Suspended' : 'Shadow-Banned'));
        const trustScore = status === 'Verified' ? 75 + Math.floor(Math.random() * 25) : (status === 'Pending' ? 50 + Math.floor(Math.random() * 25) : 20 + Math.floor(Math.random() * 30));
        const riskLevel = trustScore >= 80 ? 'Low' : (trustScore >= 60 ? 'Medium' : 'High');
        
        employers.push({
            id: i,
            company: i <= companies.length ? companies[i-1] : `Company ${i}`,
            contact: contacts[Math.floor(Math.random() * contacts.length)],
            email: `contact${i}@company${i}.com`,
            phone: `+91-98765432${String(i).padStart(2, '0')}`,
            trustScore: trustScore,
            status: status,
            gst: status !== 'Pending' ? `GST${100000 + i}` : '',
            cin: status === 'Verified' ? `CIN${700000 + i}` : '',
            domain: `company${i}.com`,
            verified: status === 'Verified',
            jobsPosted: Math.floor(Math.random() * 300),
            registered: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
            lastActive: new Date(2024, 1, Math.floor(Math.random() * 18) + 1).toISOString().split('T')[0],
            riskLevel: riskLevel,
            employerType: employerTypes[Math.floor(Math.random() * employerTypes.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            industry: industries[Math.floor(Math.random() * industries.length)]
        });
    }
    return employers;
}

function generateVerificationJobs(count) {
    const titles = ['Senior Full Stack Developer', 'Digital Marketing Manager', 'Data Scientist', 'UI/UX Designer', 'DevOps Engineer', 'Product Manager', 'Business Analyst', 'Python Developer', 'Sales Executive', 'Content Writer'];
    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai'];
    const categories = ['IT & Software', 'Marketing', 'Sales', 'Design', 'Business', 'Product'];
    const priorities = ['High', 'Medium', 'Low'];
    
    const jobs = [];
    for (let i = 1; i <= count; i++) {
        const priority = i <= 20 ? 'High' : (i <= 45 ? 'Medium' : 'Low');
        const jdQuality = Math.floor(Math.random() * 100);
        const salaryRealistic = Math.random() > 0.3;
        
        jobs.push({
            id: i,
            title: titles[Math.floor(Math.random() * titles.length)],
            company: `Company ${Math.floor(Math.random() * 60) + 1}`,
            companyId: Math.floor(Math.random() * 60) + 1,
            location: locations[Math.floor(Math.random() * locations.length)],
            salary: `${5 + Math.floor(Math.random() * 20)}-${15 + Math.floor(Math.random() * 30)} LPA`,
            experience: `${Math.floor(Math.random() * 5)}-${3 + Math.floor(Math.random() * 8)} years`,
            posted: `${Math.floor(Math.random() * 24)} hours ago`,
            priority: priority,
            category: categories[Math.floor(Math.random() * categories.length)],
            skills: ['Skill1', 'Skill2', 'Skill3'],
            jdQuality: jdQuality,
            salaryRealistic: salaryRealistic,
            duplicateCheck: Math.random() > 0.9 ? 'Duplicate Found' : 'Clean',
            contentFlags: jdQuality < 50 ? ['Missing JD', 'Poor Quality'] : [],
            trustScore: 50 + Math.floor(Math.random() * 50)
        });
    }
    return jobs;
}

function generateAllJobs(count) {
    const titles = ['Software Engineer', 'Product Manager', 'Data Analyst', 'Marketing Manager', 'Sales Executive', 'HR Manager', 'Finance Analyst', 'Operations Manager'];
    const categories = ['IT & Software', 'Product', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
    const statuses = ['Active', 'Paused', 'Closed'];
    
    const jobs = [];
    for (let i = 1; i <= count; i++) {
        const status = i <= 60 ? 'Active' : (i <= 80 ? 'Paused' : 'Closed');
        
        jobs.push({
            id: i,
            title: titles[Math.floor(Math.random() * titles.length)],
            company: `Company ${Math.floor(Math.random() * 60) + 1}`,
            companyId: Math.floor(Math.random() * 60) + 1,
            category: categories[Math.floor(Math.random() * categories.length)],
            location: ['Bangalore', 'Mumbai', 'Delhi'][Math.floor(Math.random() * 3)],
            salary: `${8 + Math.floor(Math.random() * 15)}-${15 + Math.floor(Math.random() * 25)} LPA`,
            experience: `${Math.floor(Math.random() * 5)}-${3 + Math.floor(Math.random() * 8)} years`,
            applications: Math.floor(Math.random() * 200),
            views: Math.floor(Math.random() * 3000),
            status: status,
            posted: new Date(2024, 0, Math.floor(Math.random() * 60) + 1).toISOString().split('T')[0],
            expires: new Date(2024, 2, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
            responseRate: 50 + Math.floor(Math.random() * 50),
            qualityScore: 60 + Math.floor(Math.random() * 40)
        });
    }
    return jobs;
}

function generateCandidates(count) {
    const names = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikram Singh', 'Neha Gupta', 'Arjun Mehta', 'Kavya Iyer'];
    const roles = ['Senior Developer', 'Marketing Executive', 'Data Analyst', 'Designer', 'Product Manager'];
    
    const candidates = [];
    for (let i = 1; i <= count; i++) {
        candidates.push({
            id: i,
            name: `${names[Math.floor(Math.random() * names.length)]} ${i}`,
            email: `candidate${i}@email.com`,
            phone: `+91-98765432${String(i).padStart(2, '0')}`,
            location: ['Bangalore', 'Mumbai', 'Delhi'][Math.floor(Math.random() * 3)],
            experience: `${Math.floor(Math.random() * 10)} years`,
            currentRole: roles[Math.floor(Math.random() * roles.length)],
            skills: ['Skill1', 'Skill2', 'Skill3'],
            education: ['B.Tech CSE', 'MBA', 'M.Tech'][Math.floor(Math.random() * 3)],
            registered: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
            lastActive: new Date(2024, 1, Math.floor(Math.random() * 18) + 1).toISOString().split('T')[0],
            applications: Math.floor(Math.random() * 50),
            profileComplete: 60 + Math.floor(Math.random() * 40),
            verified: Math.random() > 0.3
        });
    }
    return candidates;
}

function generateSkills(count) {
    const categories = ['Technical', 'Soft Skills', 'Tools', 'Languages'];
    const skills = [];
    
    for (let i = 1; i <= count; i++) {
        skills.push({
            id: i,
            name: `Skill ${i}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            usage: Math.floor(Math.random() * 25000),
            status: Math.random() > 0.1 ? 'Active' : 'Inactive',
            trending: Math.random() > 0.7,
            growth: (Math.random() * 30).toFixed(1),
            duplicates: Math.floor(Math.random() * 3)
        });
    }
    return skills;
}

function generateScamReports(count) {
    const types = ['Fake Job', 'Salary Mismatch', 'Payment Request', 'Fake Company', 'Harassment'];
    const statuses = ['Investigating', 'Resolved', 'Pending', 'Escalated'];
    const severities = ['High', 'Medium', 'Low'];
    
    const reports = [];
    for (let i = 1; i <= count; i++) {
        reports.push({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            reportedBy: 'candidate',
            candidateId: Math.floor(Math.random() * 80) + 1,
            jobId: Math.floor(Math.random() * 100) + 1,
            employerId: Math.floor(Math.random() * 60) + 1,
            reason: 'Suspicious activity detected',
            status: statuses[Math.floor(Math.random() * statuses.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            reported: new Date(2024, 1, Math.floor(Math.random() * 18) + 1).toISOString(),
            evidence: ['Screenshot', 'Email'],
            action: 'Pending Review'
        });
    }
    return reports;
}

function generatePayments(count) {
    const plans = ['Premium', 'Standard', 'Basic', 'Enterprise'];
    const methods = ['Credit Card', 'Net Banking', 'UPI', 'Wallet'];
    const statuses = ['Success', 'Pending', 'Failed'];
    
    const payments = [];
    for (let i = 1; i <= count; i++) {
        payments.push({
            id: i,
            employerId: Math.floor(Math.random() * 60) + 1,
            company: `Company ${Math.floor(Math.random() * 60) + 1}`,
            amount: 5000 + Math.floor(Math.random() * 45000),
            plan: plans[Math.floor(Math.random() * plans.length)],
            type: 'Subscription',
            status: i <= 55 ? 'Success' : (i <= 58 ? 'Pending' : 'Failed'),
            date: new Date(2024, 1, Math.floor(Math.random() * 18) + 1).toISOString().split('T')[0],
            method: methods[Math.floor(Math.random() * methods.length)],
            invoice: `INV-2024-${String(i).padStart(3, '0')}`
        });
    }
    return payments;
}

function generateBehavioralPatterns(count) {
    const patterns = [];
    for (let i = 1; i <= count; i++) {
        patterns.push({
            id: i,
            employerId: Math.floor(Math.random() * 60) + 1,
            pattern: ['Copy-Paste Detected', 'Rapid Posting', 'Low Engagement', 'Suspicious Timing'][Math.floor(Math.random() * 4)],
            severity: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
            detected: new Date(2024, 1, Math.floor(Math.random() * 18) + 1).toISOString(),
            actionTaken: ['Flagged', 'Warned', 'Restricted'][Math.floor(Math.random() * 3)]
        });
    }
    return patterns;
}

function generateRiskAlerts(count) {
    const alerts = [];
    for (let i = 1; i <= count; i++) {
        alerts.push({
            id: i,
            type: ['Fraud Ring', 'Salary Inflation', 'Mass Posting', 'Duplicate Jobs'][Math.floor(Math.random() * 4)],
            severity: ['Critical', 'High', 'Medium'][Math.floor(Math.random() * 3)],
            detected: new Date(2024, 1, Math.floor(Math.random() * 18) + 1).toISOString(),
            affectedEntities: Math.floor(Math.random() * 20) + 1,
            status: ['Active', 'Investigating', 'Resolved'][Math.floor(Math.random() * 3)]
        });
    }
    return alerts;
}

function generateAdminLogs(count) {
    const actions = ['Approved Job', 'Rejected Job', 'Suspended Employer', 'Activated Employer', 'Modified Trust Score', 'Resolved Complaint'];
    const admins = ['Master Admin', 'Trust Officer', 'Moderator', 'Fraud Analyst'];
    
    const logs = [];
    for (let i = 1; i <= count; i++) {
        logs.push({
            id: i,
            admin: admins[Math.floor(Math.random() * admins.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            target: `Entity ${Math.floor(Math.random() * 100) + 1}`,
            timestamp: new Date(2024, 1, Math.floor(Math.random() * 18) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60)).toISOString(),
            details: 'Action performed successfully',
            severity: ['Normal', 'Important', 'Critical'][Math.floor(Math.random() * 3)]
        });
    }
    return logs;
}

function generateComplianceRecords(count) {
    const records = [];
    for (let i = 1; i <= count; i++) {
        records.push({
            id: i,
            type: ['Consent Log', 'Data Export', 'Legal Notice', 'Audit Trail'][Math.floor(Math.random() * 4)],
            entity: `Entity ${Math.floor(Math.random() * 100) + 1}`,
            timestamp: new Date(2024, 1, Math.floor(Math.random() * 18) + 1).toISOString(),
            status: ['Completed', 'Pending', 'Archived'][Math.floor(Math.random() * 3)],
            officer: 'Compliance Officer'
        });
    }
    return records;
}

function generateCompetitorData(count) {
    const competitors = [];
    for (let i = 1; i <= count; i++) {
        competitors.push({
            id: i,
            name: `Competitor ${i}`,
            marketShare: (Math.random() * 20).toFixed(1),
            avgSalary: 8 + Math.floor(Math.random() * 15),
            jobCount: Math.floor(Math.random() * 50000),
            trend: Math.random() > 0.5 ? 'Growing' : 'Declining'
        });
    }
    return competitors;
}

function generateSalaryTrends(count) {
    const trends = [];
    for (let i = 1; i <= count; i++) {
        trends.push({
            id: i,
            role: `Role ${i}`,
            avgSalary: 8 + Math.floor(Math.random() * 20),
            change: (Math.random() * 20 - 10).toFixed(1),
            demand: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]
        });
    }
    return trends;
}

function generateSkillDemand(count) {
    const demand = [];
    for (let i = 1; i <= count; i++) {
        demand.push({
            id: i,
            skill: `Skill ${i}`,
            demand: Math.floor(Math.random() * 10000),
            growth: (Math.random() * 50).toFixed(1),
            avgSalary: 8 + Math.floor(Math.random() * 15)
        });
    }
    return demand;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DATA;
}
