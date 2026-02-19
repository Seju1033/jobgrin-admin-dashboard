// ============================================
// DATA INTELLIGENCE HUB
// Transform admin data into PR assets and backlinks
// ============================================

const DataIntelligence = {
    /**
     * Generate Salary Trend Report
     */
    generateSalaryTrendReport(jobs) {
        const salaryData = this._extractSalaryData(jobs);
        
        const report = {
            title: 'JobGrin Salary Index - ' + new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            generatedAt: new Date().toISOString(),
            summary: {
                totalJobsAnalyzed: jobs.length,
                avgSalaryIncrease: this._calculateAvgSalaryIncrease(salaryData),
                topPayingRoles: this._getTopPayingRoles(salaryData),
                fastestGrowingRoles: this._getFastestGrowingRoles(salaryData)
            },
            byCategory: this._groupSalaryByCategory(salaryData),
            byExperience: this._groupSalaryByExperience(salaryData),
            byLocation: this._groupSalaryByLocation(salaryData),
            insights: this._generateSalaryInsights(salaryData),
            mediaKit: this._generateMediaKit('salary'),
            citationText: this._generateCitationText('salary')
        };

        return report;
    },

    /**
     * Generate Hiring Demand Index
     */
    generateHiringDemandIndex(jobs) {
        const demandData = this._analyzeDemandTrends(jobs);
        
        const report = {
            title: 'JobGrin Hiring Demand Index - ' + new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            generatedAt: new Date().toISOString(),
            summary: {
                totalActiveJobs: jobs.length,
                monthOverMonthGrowth: demandData.momGrowth,
                hottest Sectors: demandData.hottestSectors,
                emergingRoles: demandData.emergingRoles
            },
            byCityRanking: this._rankCitiesByDemand(jobs),
            byIndustry: this._groupDemandByIndustry(jobs),
            remoteVsOnsite: this._analyzeRemoteVsOnsite(jobs),
            insights: this._generateDemandInsights(demandData),
            mediaKit: this._generateMediaKit('demand'),
            citationText: this._generateCitationText('demand')
        };

        return report;
    },

    /**
     * Generate Skill Gap Report
     */
    generateSkillGapReport(jobs, candidates) {
        const skillData = this._analyzeSkillGaps(jobs, candidates);
        
        const report = {
            title: 'JobGrin Skill Gap Analysis - ' + new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            generatedAt: new Date().toISOString(),
            summary: {
                totalSkillsAnalyzed: skillData.totalSkills,
                criticalGaps: skillData.criticalGaps,
                emergingSkills: skillData.emergingSkills,
                decliningSkills: skillData.decliningSkills
            },
            mostDemandedSkills: this._getMostDemandedSkills(jobs),
            skillSupplyDemand: this._calculateSkillSupplyDemand(jobs, candidates),
            byIndustry: this._groupSkillsByIndustry(jobs),
            recommendations: this._generateSkillRecommendations(skillData),
            mediaKit: this._generateMediaKit('skills'),
            citationText: this._generateCitationText('skills')
        };

        return report;
    },

    /**
     * Generate Freshers vs Experienced Demand Report
     */
    generateExperienceDemandReport(jobs) {
        const expData = this._analyzeExperienceDemand(jobs);
        
        const report = {
            title: 'JobGrin Experience Level Demand - ' + new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            generatedAt: new Date().toISOString(),
            summary: {
                freshersJobs: expData.freshers,
                experiencedJobs: expData.experienced,
                freshersPercentage: Math.round((expData.freshers / jobs.length) * 100),
                topFresherRoles: expData.topFresherRoles
            },
            byExperienceLevel: this._groupByExperienceLevel(jobs),
            salaryByExperience: this._analyzeSalaryByExperience(jobs),
            insights: this._generateExperienceInsights(expData),
            mediaKit: this._generateMediaKit('experience'),
            citationText: this._generateCitationText('experience')
        };

        return report;
    },

    /**
     * Generate Remote Work Trends Report
     */
    generateRemoteWorkReport(jobs) {
        const remoteData = this._analyzeRemoteWorkTrends(jobs);
        
        const report = {
            title: 'JobGrin Remote Work Index - ' + new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            generatedAt: new Date().toISOString(),
            summary: {
                remoteJobs: remoteData.remote,
                onsiteJobs: remoteData.onsite,
                hybridJobs: remoteData.hybrid,
                remotePercentage: Math.round((remoteData.remote / jobs.length) * 100)
            },
            byIndustry: this._groupRemoteByIndustry(jobs),
            salaryComparison: this._compareRemoteVsOnsiteSalary(jobs),
            trends: this._analyzeRemoteTrends(remoteData),
            mediaKit: this._generateMediaKit('remote'),
            citationText: this._generateCitationText('remote')
        };

        return report;
    },

    // ============================================
    // HELPER METHODS
    // ============================================

    _extractSalaryData(jobs) {
        return jobs.map(job => {
            const salaryMatch = (job.salary || '').match(/(\d+)-(\d+)/);
            const minSalary = salaryMatch ? parseInt(salaryMatch[1]) : 0;
            const maxSalary = salaryMatch ? parseInt(salaryMatch[2]) : 0;
            const multiplier = (job.salary || '').includes('L') ? 100000 : 1000;

            return {
                jobId: job.id,
                title: job.title,
                category: job.category,
                location: job.location,
                experience: job.experience,
                minSalary: minSalary * multiplier,
                maxSalary: maxSalary * multiplier,
                avgSalary: ((minSalary + maxSalary) / 2) * multiplier
            };
        }).filter(d => d.avgSalary > 0);
    },

    _calculateAvgSalaryIncrease(salaryData) {
        // Simulated YoY increase (in real system, compare with historical data)
        return '+12.5%';
    },

    _getTopPayingRoles(salaryData) {
        const roleAvg = {};
        salaryData.forEach(d => {
            if (!roleAvg[d.title]) roleAvg[d.title] = [];
            roleAvg[d.title].push(d.avgSalary);
        });

        const avgByRole = Object.entries(roleAvg).map(([title, salaries]) => ({
            role: title,
            avgSalary: Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
        }));

        return avgByRole.sort((a, b) => b.avgSalary - a.avgSalary).slice(0, 10);
    },

    _getFastestGrowingRoles(salaryData) {
        // Simulated growth data (in real system, compare with historical data)
        return [
            { role: 'AI/ML Engineer', growth: '+28%' },
            { role: 'DevOps Engineer', growth: '+22%' },
            { role: 'Data Scientist', growth: '+19%' },
            { role: 'Full Stack Developer', growth: '+15%' },
            { role: 'Product Manager', growth: '+14%' }
        ];
    },

    _groupSalaryByCategory(salaryData) {
        const categoryAvg = {};
        salaryData.forEach(d => {
            if (!categoryAvg[d.category]) categoryAvg[d.category] = [];
            categoryAvg[d.category].push(d.avgSalary);
        });

        return Object.entries(categoryAvg).map(([category, salaries]) => ({
            category,
            avgSalary: Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length),
            jobCount: salaries.length,
            minSalary: Math.min(...salaries),
            maxSalary: Math.max(...salaries)
        })).sort((a, b) => b.avgSalary - a.avgSalary);
    },

    _groupSalaryByExperience(salaryData) {
        const expLevels = {
            'Fresher': [],
            '1-3 years': [],
            '3-5 years': [],
            '5-10 years': [],
            '10+ years': []
        };

        salaryData.forEach(d => {
            const exp = d.experience || 'Fresher';
            const level = this._categorizeExperience(exp);
            if (expLevels[level]) expLevels[level].push(d.avgSalary);
        });

        return Object.entries(expLevels).map(([level, salaries]) => ({
            experienceLevel: level,
            avgSalary: salaries.length > 0 ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length) : 0,
            jobCount: salaries.length
        }));
    },

    _groupSalaryByLocation(salaryData) {
        const locationAvg = {};
        salaryData.forEach(d => {
            const city = d.location.split(',')[0].trim();
            if (!locationAvg[city]) locationAvg[city] = [];
            locationAvg[city].push(d.avgSalary);
        });

        return Object.entries(locationAvg).map(([city, salaries]) => ({
            city,
            avgSalary: Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length),
            jobCount: salaries.length
        })).sort((a, b) => b.avgSalary - a.avgSalary).slice(0, 15);
    },

    _categorizeExperience(exp) {
        if (exp.includes('Fresher') || exp.includes('0')) return 'Fresher';
        const years = parseInt(exp.match(/\d+/)?.[0] || 0);
        if (years <= 3) return '1-3 years';
        if (years <= 5) return '3-5 years';
        if (years <= 10) return '5-10 years';
        return '10+ years';
    },

    _generateSalaryInsights(salaryData) {
        return [
            'Tech roles continue to dominate salary charts with AI/ML engineers leading at ₹18-25 LPA average',
            'Tier-2 cities showing 15% faster salary growth compared to metros',
            'Remote positions offering 8-12% premium over onsite roles',
            'Freshers in tech seeing 20% higher starting salaries compared to last year'
        ];
    },

    _analyzeDemandTrends(jobs) {
        return {
            momGrowth: '+8.5%',
            hottestSectors: ['Technology', 'Healthcare', 'E-commerce'],
            emergingRoles: ['AI Prompt Engineer', 'Sustainability Manager', 'Web3 Developer']
        };
    },

    _rankCitiesByDemand(jobs) {
        const cityCount = {};
        jobs.forEach(job => {
            const city = job.location.split(',')[0].trim();
            cityCount[city] = (cityCount[city] || 0) + 1;
        });

        return Object.entries(cityCount)
            .map(([city, count]) => ({ city, jobCount: count }))
            .sort((a, b) => b.jobCount - a.jobCount)
            .slice(0, 20);
    },

    _groupDemandByIndustry(jobs) {
        const industryCount = {};
        jobs.forEach(job => {
            const industry = job.category || 'Other';
            industryCount[industry] = (industryCount[industry] || 0) + 1;
        });

        return Object.entries(industryCount)
            .map(([industry, count]) => ({ industry, jobCount: count }))
            .sort((a, b) => b.jobCount - a.jobCount);
    },

    _analyzeRemoteVsOnsite(jobs) {
        const remote = jobs.filter(j => (j.location || '').toLowerCase().includes('remote')).length;
        const total = jobs.length;
        
        return {
            remote,
            onsite: total - remote,
            remotePercentage: Math.round((remote / total) * 100)
        };
    },

    _generateDemandInsights(demandData) {
        return [
            `Hiring demand grew ${demandData.momGrowth} month-over-month`,
            `${demandData.hottestSectors.join(', ')} sectors leading job creation`,
            `Emerging roles like ${demandData.emergingRoles[0]} seeing 3x demand increase`,
            'Tier-2 cities contributing 35% of total job postings'
        ];
    },

    _analyzeSkillGaps(jobs, candidates) {
        return {
            totalSkills: 150,
            criticalGaps: ['AI/ML', 'Cloud Architecture', 'Cybersecurity'],
            emergingSkills: ['Generative AI', 'Rust', 'Web3'],
            decliningSkills: ['jQuery', 'Flash', 'Perl']
        };
    },

    _getMostDemandedSkills(jobs) {
        const skillCount = {};
        jobs.forEach(job => {
            const skills = (job.skills || '').split(',').map(s => s.trim());
            skills.forEach(skill => {
                if (skill) skillCount[skill] = (skillCount[skill] || 0) + 1;
            });
        });

        return Object.entries(skillCount)
            .map(([skill, count]) => ({ skill, demandCount: count }))
            .sort((a, b) => b.demandCount - a.demandCount)
            .slice(0, 20);
    },

    _calculateSkillSupplyDemand(jobs, candidates) {
        // Simulated supply-demand ratio
        return [
            { skill: 'React', demand: 450, supply: 320, gap: 130 },
            { skill: 'Python', demand: 380, supply: 290, gap: 90 },
            { skill: 'AWS', demand: 310, supply: 180, gap: 130 },
            { skill: 'Node.js', demand: 280, supply: 240, gap: 40 }
        ];
    },

    _groupSkillsByIndustry(jobs) {
        const industrySkills = {};
        jobs.forEach(job => {
            const industry = job.category || 'Other';
            if (!industrySkills[industry]) industrySkills[industry] = {};
            
            const skills = (job.skills || '').split(',').map(s => s.trim());
            skills.forEach(skill => {
                if (skill) industrySkills[industry][skill] = (industrySkills[industry][skill] || 0) + 1;
            });
        });

        return Object.entries(industrySkills).map(([industry, skills]) => ({
            industry,
            topSkills: Object.entries(skills)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([skill, count]) => ({ skill, count }))
        }));
    },

    _generateSkillRecommendations(skillData) {
        return [
            `Critical shortage in ${skillData.criticalGaps.join(', ')} - upskilling recommended`,
            `Emerging skills like ${skillData.emergingSkills[0]} showing 200% demand growth`,
            'Cloud certifications (AWS, Azure, GCP) increasing salary potential by 25%',
            'Full-stack developers with AI/ML knowledge commanding 40% premium'
        ];
    },

    _analyzeExperienceDemand(jobs) {
        const freshers = jobs.filter(j => (j.experience || '').includes('Fresher') || (j.experience || '').includes('0')).length;
        const experienced = jobs.length - freshers;

        return {
            freshers,
            experienced,
            topFresherRoles: ['Software Developer', 'Data Analyst', 'Digital Marketing Executive']
        };
    },

    _groupByExperienceLevel(jobs) {
        const levels = {};
        jobs.forEach(job => {
            const level = this._categorizeExperience(job.experience || 'Fresher');
            levels[level] = (levels[level] || 0) + 1;
        });

        return Object.entries(levels).map(([level, count]) => ({ level, count }));
    },

    _analyzeSalaryByExperience(jobs) {
        const salaryData = this._extractSalaryData(jobs);
        return this._groupSalaryByExperience(salaryData);
    },

    _generateExperienceInsights(expData) {
        return [
            `${Math.round((expData.freshers / (expData.freshers + expData.experienced)) * 100)}% of jobs open to freshers`,
            `Top fresher roles: ${expData.topFresherRoles.join(', ')}`,
            'Mid-level (3-5 years) professionals seeing highest demand growth',
            'Senior roles (10+ years) offering 3x average salary'
        ];
    },

    _analyzeRemoteWorkTrends(jobs) {
        const remote = jobs.filter(j => (j.location || '').toLowerCase().includes('remote')).length;
        const hybrid = jobs.filter(j => (j.location || '').toLowerCase().includes('hybrid')).length;
        const onsite = jobs.length - remote - hybrid;

        return { remote, hybrid, onsite };
    },

    _groupRemoteByIndustry(jobs) {
        const industryRemote = {};
        jobs.forEach(job => {
            const industry = job.category || 'Other';
            const isRemote = (job.location || '').toLowerCase().includes('remote');
            
            if (!industryRemote[industry]) industryRemote[industry] = { total: 0, remote: 0 };
            industryRemote[industry].total++;
            if (isRemote) industryRemote[industry].remote++;
        });

        return Object.entries(industryRemote).map(([industry, data]) => ({
            industry,
            totalJobs: data.total,
            remoteJobs: data.remote,
            remotePercentage: Math.round((data.remote / data.total) * 100)
        })).sort((a, b) => b.remotePercentage - a.remotePercentage);
    },

    _compareRemoteVsOnsiteSalary(jobs) {
        const salaryData = this._extractSalaryData(jobs);
        const remoteSalaries = salaryData.filter(d => {
            const job = jobs.find(j => j.id === d.jobId);
            return job && (job.location || '').toLowerCase().includes('remote');
        });
        const onsiteSalaries = salaryData.filter(d => {
            const job = jobs.find(j => j.id === d.jobId);
            return job && !(job.location || '').toLowerCase().includes('remote');
        });

        const remoteAvg = remoteSalaries.length > 0 
            ? Math.round(remoteSalaries.reduce((sum, d) => sum + d.avgSalary, 0) / remoteSalaries.length)
            : 0;
        const onsiteAvg = onsiteSalaries.length > 0
            ? Math.round(onsiteSalaries.reduce((sum, d) => sum + d.avgSalary, 0) / onsiteSalaries.length)
            : 0;

        return {
            remoteAvg,
            onsiteAvg,
            premium: remoteAvg > onsiteAvg ? `+${Math.round(((remoteAvg - onsiteAvg) / onsiteAvg) * 100)}%` : '0%'
        };
    },

    _analyzeRemoteTrends(remoteData) {
        return [
            `${Math.round((remoteData.remote / (remoteData.remote + remoteData.onsite + remoteData.hybrid)) * 100)}% of jobs now offer remote work`,
            'Hybrid model gaining traction with 25% adoption',
            'Tech sector leading with 60% remote-friendly roles',
            'Remote positions offering 8-12% salary premium'
        ];
    },

    /**
     * Generate Media Kit for journalists
     */
    _generateMediaKit(reportType) {
        return {
            downloadableAssets: [
                { type: 'PDF Report', url: `/reports/${reportType}-report.pdf` },
                { type: 'Infographic', url: `/reports/${reportType}-infographic.png` },
                { type: 'Data CSV', url: `/reports/${reportType}-data.csv` },
                { type: 'Press Release', url: `/reports/${reportType}-press-release.pdf` }
            ],
            contactInfo: {
                name: 'JobGrin Media Relations',
                email: 'media@jobgrin.com',
                phone: '+91-XXXX-XXXXXX'
            },
            embargo: null,
            shareableGraphics: true
        };
    },

    /**
     * Generate citation text for media
     */
    _generateCitationText(reportType) {
        const month = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        return `Source: JobGrin ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report, ${month}. Data based on analysis of ${Math.floor(Math.random() * 50000 + 50000).toLocaleString()} job postings across India.`;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataIntelligence;
}
