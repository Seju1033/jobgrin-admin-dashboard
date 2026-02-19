// ============================================
// TRUST SCORING ENGINE
// Real mathematical formulas for trust calculation
// ============================================

const TrustScoring = {
    /**
     * Calculate Employer Trust Score (0-100)
     * Formula: Weighted average of multiple factors
     */
    calculateEmployerTrustScore(employer) {
        const weights = {
            kycVerification: 0.25,      // 25% - KYC completion
            behavioralScore: 0.20,      // 20% - Behavioral patterns
            responseRate: 0.15,         // 15% - Candidate response rate
            scamHistory: 0.15,          // 15% - Scam/complaint history
            accountAge: 0.10,           // 10% - Account longevity
            jobQuality: 0.10,           // 10% - Average job quality
            paymentHistory: 0.05        // 5% - Payment reliability
        };

        // 1. KYC Verification Score (0-100)
        const kycScore = this._calculateKYCScore(employer);

        // 2. Behavioral Score (0-100)
        const behavioralScore = this._calculateBehavioralScore(employer);

        // 3. Response Rate Score (0-100)
        const responseScore = employer.responseRate || 0;

        // 4. Scam History Score (0-100, inverted)
        const scamScore = this._calculateScamScore(employer);

        // 5. Account Age Score (0-100)
        const ageScore = this._calculateAccountAgeScore(employer);

        // 6. Job Quality Score (0-100)
        const jobQualityScore = employer.avgJobQuality || 70;

        // 7. Payment History Score (0-100)
        const paymentScore = this._calculatePaymentScore(employer);

        // Calculate weighted average
        const trustScore = (
            kycScore * weights.kycVerification +
            behavioralScore * weights.behavioralScore +
            responseScore * weights.responseRate +
            scamScore * weights.scamHistory +
            ageScore * weights.accountAge +
            jobQualityScore * weights.jobQuality +
            paymentScore * weights.paymentHistory
        );

        return Math.round(trustScore);
    },

    /**
     * Calculate KYC Verification Score
     */
    _calculateKYCScore(employer) {
        let score = 0;
        const verifications = employer.verifications || {};

        // GST verified: +30 points
        if (verifications.gst) score += 30;

        // CIN verified: +25 points
        if (verifications.cin) score += 25;

        // Domain email verified: +20 points
        if (verifications.domainEmail) score += 20;

        // Phone verified: +15 points
        if (verifications.phone) score += 15;

        // Address verified: +10 points
        if (verifications.address) score += 10;

        return Math.min(score, 100);
    },

    /**
     * Calculate Behavioral Score
     */
    _calculateBehavioralScore(employer) {
        const behavior = employer.behavior || {};
        let score = 100; // Start with perfect score

        // Penalties for bad behavior
        if (behavior.copyPasteFrequency > 0.7) score -= 20; // High copy-paste
        if (behavior.jdSimilarity > 0.8) score -= 15; // Duplicate JDs
        if (behavior.applyToViewRatio < 0.1) score -= 25; // Low engagement
        if (behavior.responseLatency > 7) score -= 15; // Slow response (>7 days)
        if (behavior.massPosting) score -= 20; // Spam posting

        return Math.max(score, 0);
    },

    /**
     * Calculate Scam Score (inverted - fewer scams = higher score)
     */
    _calculateScamScore(employer) {
        const scamReports = employer.scamReports || 0;
        const resolvedScams = employer.resolvedScams || 0;

        if (scamReports === 0) return 100;

        // Penalty based on unresolved scams
        const unresolvedScams = scamReports - resolvedScams;
        const penalty = unresolvedScams * 25; // -25 points per unresolved scam

        return Math.max(100 - penalty, 0);
    },

    /**
     * Calculate Account Age Score
     */
    _calculateAccountAgeScore(employer) {
        const createdDate = new Date(employer.createdAt || Date.now());
        const now = new Date();
        const ageInDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));

        // Score increases with age (max at 365 days)
        if (ageInDays >= 365) return 100;
        if (ageInDays >= 180) return 80;
        if (ageInDays >= 90) return 60;
        if (ageInDays >= 30) return 40;
        return 20;
    },

    /**
     * Calculate Payment History Score
     */
    _calculatePaymentScore(employer) {
        const payments = employer.payments || {};
        const totalPayments = payments.total || 0;
        const failedPayments = payments.failed || 0;

        if (totalPayments === 0) return 50; // Neutral for new accounts

        const successRate = ((totalPayments - failedPayments) / totalPayments) * 100;
        return Math.round(successRate);
    },

    /**
     * Calculate Risk Level based on Trust Score
     */
    calculateRiskLevel(trustScore) {
        if (trustScore >= 80) return 'Low';
        if (trustScore >= 60) return 'Medium';
        if (trustScore >= 40) return 'High';
        return 'Critical';
    },

    /**
     * Calculate Job Quality Score (0-100)
     */
    calculateJobQualityScore(job) {
        const weights = {
            completeness: 0.30,     // 30% - All fields filled
            clarity: 0.25,          // 25% - Clear description
            salaryRealism: 0.20,    // 20% - Realistic salary
            skillMatch: 0.15,       // 15% - Skills match role
            formatting: 0.10        // 10% - Proper formatting
        };

        // 1. Completeness Score
        const completenessScore = this._calculateCompletenessScore(job);

        // 2. Clarity Score
        const clarityScore = this._calculateClarityScore(job);

        // 3. Salary Realism Score
        const salaryScore = this._calculateSalaryRealismScore(job);

        // 4. Skill Match Score
        const skillScore = this._calculateSkillMatchScore(job);

        // 5. Formatting Score
        const formattingScore = this._calculateFormattingScore(job);

        const qualityScore = (
            completenessScore * weights.completeness +
            clarityScore * weights.clarity +
            salaryScore * weights.salaryRealism +
            skillScore * weights.skillMatch +
            formattingScore * weights.formatting
        );

        return Math.round(qualityScore);
    },

    /**
     * Calculate Completeness Score
     */
    _calculateCompletenessScore(job) {
        const requiredFields = [
            'title', 'description', 'location', 'salary',
            'experience', 'skills', 'company', 'category'
        ];

        const filledFields = requiredFields.filter(field => {
            const value = job[field];
            return value && value.toString().trim().length > 0;
        });

        return (filledFields.length / requiredFields.length) * 100;
    },

    /**
     * Calculate Clarity Score
     */
    _calculateClarityScore(job) {
        const description = job.description || '';
        let score = 100;

        // Penalties
        if (description.length < 100) score -= 30; // Too short
        if (description.length > 5000) score -= 20; // Too long
        if (!description.includes('responsibilities')) score -= 15; // Missing key sections
        if (!description.includes('requirements')) score -= 15;
        if (description.split(' ').length < 50) score -= 20; // Too few words

        return Math.max(score, 0);
    },

    /**
     * Calculate Salary Realism Score
     */
    _calculateSalaryRealismScore(job) {
        const salary = job.salary || '';
        const experience = job.experience || '';

        // Extract salary range
        const salaryMatch = salary.match(/(\d+)/g);
        if (!salaryMatch) return 50; // No salary info

        const minSalary = parseInt(salaryMatch[0]) * (salary.includes('L') ? 100000 : 1000);

        // Check against experience level
        const expYears = parseInt(experience.match(/(\d+)/)?.[0] || 0);

        // Realistic salary ranges (in INR per year)
        const expectedMin = expYears * 300000; // 3L per year of experience
        const expectedMax = expYears * 1000000; // 10L per year of experience

        if (minSalary >= expectedMin && minSalary <= expectedMax) return 100;
        if (minSalary < expectedMin * 0.5) return 30; // Too low
        if (minSalary > expectedMax * 2) return 40; // Suspiciously high

        return 70; // Borderline acceptable
    },

    /**
     * Calculate Skill Match Score
     */
    _calculateSkillMatchScore(job) {
        const title = (job.title || '').toLowerCase();
        const skills = (job.skills || '').toLowerCase();

        // Common role-skill mappings
        const roleSkillMap = {
            'developer': ['javascript', 'python', 'java', 'react', 'node'],
            'designer': ['figma', 'photoshop', 'illustrator', 'ui', 'ux'],
            'manager': ['leadership', 'management', 'strategy', 'planning'],
            'analyst': ['excel', 'sql', 'python', 'data', 'analytics'],
            'marketing': ['seo', 'content', 'social media', 'campaigns']
        };

        let matchScore = 50; // Default neutral

        for (const [role, expectedSkills] of Object.entries(roleSkillMap)) {
            if (title.includes(role)) {
                const matchedSkills = expectedSkills.filter(skill => skills.includes(skill));
                matchScore = (matchedSkills.length / expectedSkills.length) * 100;
                break;
            }
        }

        return matchScore;
    },

    /**
     * Calculate Formatting Score
     */
    _calculateFormattingScore(job) {
        const description = job.description || '';
        let score = 100;

        // Check for proper formatting
        if (!description.includes('\n')) score -= 20; // No line breaks
        if (description === description.toUpperCase()) score -= 30; // All caps
        if (description === description.toLowerCase()) score -= 20; // All lowercase
        if (description.split('.').length < 3) score -= 15; // Too few sentences

        return Math.max(score, 0);
    },

    /**
     * Calculate Recruiter Intent Score (0-100)
     * Classifies: Hiring Now, Pipeline, Brand, Resume Harvesting, Suspicious
     */
    calculateRecruiterIntentScore(recruiter) {
        const metrics = recruiter.metrics || {};
        
        const repostFrequency = metrics.repostFrequency || 0; // Jobs reposted
        const resumeViews = metrics.resumeViews || 0;
        const resumeReplies = metrics.resumeReplies || 0;
        const shortlistRate = metrics.shortlistRate || 0;
        const salaryChanges = metrics.salaryChanges || 0;

        let intentScore = 100;
        let intentType = 'Hiring Now';

        // Resume harvesting detection
        const viewToReplyRatio = resumeViews > 0 ? resumeReplies / resumeViews : 0;
        if (viewToReplyRatio < 0.05 && resumeViews > 100) {
            intentScore = 20;
            intentType = 'Resume Harvesting';
        }

        // Suspicious intent
        if (repostFrequency > 5 || salaryChanges > 3) {
            intentScore = 30;
            intentType = 'Suspicious';
        }

        // Brand hiring (low urgency)
        if (shortlistRate < 0.1 && resumeViews > 50) {
            intentScore = 60;
            intentType = 'Brand Hiring';
        }

        // Pipeline hiring
        if (shortlistRate >= 0.1 && shortlistRate < 0.3) {
            intentScore = 75;
            intentType = 'Pipeline Hiring';
        }

        // Active hiring
        if (shortlistRate >= 0.3 && viewToReplyRatio >= 0.2) {
            intentScore = 95;
            intentType = 'Hiring Now';
        }

        return {
            score: intentScore,
            type: intentType,
            confidence: this._calculateConfidence(metrics)
        };
    },

    /**
     * Calculate confidence level for intent classification
     */
    _calculateConfidence(metrics) {
        const dataPoints = Object.keys(metrics).length;
        if (dataPoints >= 5) return 'High';
        if (dataPoints >= 3) return 'Medium';
        return 'Low';
    },

    /**
     * Calculate Candidate Harm Index (0-100)
     * Higher score = more harm to candidates
     */
    calculateCandidateHarmIndex(employer) {
        const metrics = employer.candidateMetrics || {};
        
        const zeroResponseJobs = metrics.zeroResponseJobs || 0;
        const totalJobs = metrics.totalJobs || 1;
        const removedAfterApply = metrics.removedAfterApply || 0;
        const excessiveRejections = metrics.excessiveRejections || 0;
        const candidateBlocks = metrics.candidateBlocks || 0;

        // Calculate harm score (0-100, higher = worse)
        const zeroResponseRate = (zeroResponseJobs / totalJobs) * 100;
        const removalRate = (removedAfterApply / totalJobs) * 100;
        const rejectionPenalty = Math.min(excessiveRejections * 5, 30);
        const blockPenalty = Math.min(candidateBlocks * 10, 20);

        const harmIndex = Math.min(
            zeroResponseRate * 0.4 +
            removalRate * 0.3 +
            rejectionPenalty +
            blockPenalty,
            100
        );

        return {
            score: Math.round(harmIndex),
            level: this._getHarmLevel(harmIndex),
            recommendation: this._getHarmRecommendation(harmIndex)
        };
    },

    _getHarmLevel(score) {
        if (score >= 70) return 'Critical';
        if (score >= 50) return 'High';
        if (score >= 30) return 'Medium';
        return 'Low';
    },

    _getHarmRecommendation(score) {
        if (score >= 70) return 'Immediate suspension recommended';
        if (score >= 50) return 'Force response requirement';
        if (score >= 30) return 'Monitor closely';
        return 'No action needed';
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrustScoring;
}
