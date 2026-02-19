// ============================================
// CANDIDATE HARM INDEX
// Monitor and prevent candidate experience damage
// ============================================

const CandidateHarmIndex = {
    /**
     * Calculate Candidate Harm Index for an employer
     */
    calculateHarmIndex(employer, jobs, applications) {
        const metrics = this._gatherMetrics(employer, jobs, applications);
        const harmScore = this._calculateHarmScore(metrics);
        const harmLevel = this._getHarmLevel(harmScore);
        const recommendation = this._getRecommendation(harmScore, metrics);

        return {
            employerId: employer.id,
            companyName: employer.company,
            harmScore, // 0-100, higher = worse
            harmLevel, // 'Low', 'Medium', 'High', 'Critical'
            metrics,
            recommendation,
            actions: this._suggestActions(harmScore, metrics),
            calculatedAt: new Date().toISOString()
        };
    },

    /**
     * Gather candidate experience metrics
     */
    _gatherMetrics(employer, jobs, applications) {
        const employerJobs = jobs.filter(j => j.employerId === employer.id);
        const employerApps = applications.filter(a => 
            employerJobs.some(j => j.id === a.jobId)
        );

        // Zero response jobs
        const zeroResponseJobs = employerJobs.filter(job => {
            const jobApps = employerApps.filter(a => a.jobId === job.id);
            const responded = jobApps.filter(a => a.status !== 'pending');
            return jobApps.length > 0 && responded.length === 0;
        }).length;

        // Jobs removed after applications
        const removedAfterApply = employerJobs.filter(job => {
            const jobApps = employerApps.filter(a => a.jobId === job.id);
            return job.status === 'removed' && jobApps.length > 0;
        }).length;

        // Excessive rejections (>90% rejection rate)
        const highRejectionJobs = employerJobs.filter(job => {
            const jobApps = employerApps.filter(a => a.jobId === job.id);
            const rejected = jobApps.filter(a => a.status === 'rejected');
            return jobApps.length > 10 && (rejected.length / jobApps.length) > 0.9;
        }).length;

        // Candidate blocks/reports
        const candidateComplaints = employer.candidateComplaints || 0;

        // Average response time
        const responseTimes = employerApps
            .filter(a => a.respondedAt)
            .map(a => {
                const applied = new Date(a.appliedAt);
                const responded = new Date(a.respondedAt);
                return (responded - applied) / (1000 * 60 * 60 * 24); // days
            });
        const avgResponseTime = responseTimes.length > 0
            ? responseTimes.reduce((sum, t) => sum + t, 0) / responseTimes.length
            : 0;

        // Response rate
        const totalApps = employerApps.length;
        const respondedApps = employerApps.filter(a => a.status !== 'pending').length;
        const responseRate = totalApps > 0 ? (respondedApps / totalApps) * 100 : 0;

        // Interview-to-hire ratio
        const interviewed = employerApps.filter(a => a.status === 'interviewed').length;
        const hired = employerApps.filter(a => a.status === 'hired').length;
        const interviewToHireRatio = interviewed > 0 ? (hired / interviewed) * 100 : 0;

        return {
            totalJobs: employerJobs.length,
            totalApplications: totalApps,
            zeroResponseJobs,
            zeroResponseRate: employerJobs.length > 0 ? (zeroResponseJobs / employerJobs.length) * 100 : 0,
            removedAfterApply,
            removalRate: employerJobs.length > 0 ? (removedAfterApply / employerJobs.length) * 100 : 0,
            highRejectionJobs,
            rejectionRate: employerJobs.length > 0 ? (highRejectionJobs / employerJobs.length) * 100 : 0,
            candidateComplaints,
            avgResponseTime: Math.round(avgResponseTime * 10) / 10,
            responseRate: Math.round(responseRate),
            interviewToHireRatio: Math.round(interviewToHireRatio)
        };
    },

    /**
     * Calculate overall harm score (0-100)
     */
    _calculateHarmScore(metrics) {
        let score = 0;

        // Zero response penalty (0-30 points)
        score += Math.min(metrics.zeroResponseRate * 0.3, 30);

        // Removal after apply penalty (0-25 points)
        score += Math.min(metrics.removalRate * 0.25, 25);

        // High rejection penalty (0-20 points)
        score += Math.min(metrics.rejectionRate * 0.2, 20);

        // Complaint penalty (0-15 points)
        score += Math.min(metrics.candidateComplaints * 3, 15);

        // Response time penalty (0-10 points)
        if (metrics.avgResponseTime > 14) score += 10;
        else if (metrics.avgResponseTime > 7) score += 5;

        return Math.min(Math.round(score), 100);
    },

    /**
     * Get harm level classification
     */
    _getHarmLevel(score) {
        if (score >= 70) return 'Critical';
        if (score >= 50) return 'High';
        if (score >= 30) return 'Medium';
        return 'Low';
    },

    /**
     * Get recommendation based on harm score
     */
    _getRecommendation(score, metrics) {
        if (score >= 70) {
            return {
                action: 'Immediate suspension recommended',
                reason: 'Critical harm to candidate experience',
                urgency: 'immediate'
            };
        }
        
        if (score >= 50) {
            return {
                action: 'Force response requirement',
                reason: 'High harm level - mandate employer responses',
                urgency: 'high'
            };
        }
        
        if (score >= 30) {
            return {
                action: 'Monitor closely and warn employer',
                reason: 'Medium harm level - improvement needed',
                urgency: 'medium'
            };
        }
        
        return {
            action: 'No action needed',
            reason: 'Acceptable candidate experience',
            urgency: 'low'
        };
    },

    /**
     * Suggest specific actions
     */
    _suggestActions(score, metrics) {
        const actions = [];

        if (metrics.zeroResponseRate > 50) {
            actions.push({
                type: 'mandate_response',
                priority: 'high',
                description: 'Require employer to respond to all applications within 7 days',
                impact: 'Reduces zero-response rate'
            });
        }

        if (metrics.removalRate > 30) {
            actions.push({
                type: 'prevent_removal',
                priority: 'high',
                description: 'Lock job removal if applications exist, require reason',
                impact: 'Prevents candidate frustration'
            });
        }

        if (metrics.avgResponseTime > 10) {
            actions.push({
                type: 'response_deadline',
                priority: 'medium',
                description: 'Set 5-day response deadline with auto-reminders',
                impact: 'Improves response time'
            });
        }

        if (metrics.candidateComplaints > 5) {
            actions.push({
                type: 'investigation',
                priority: 'high',
                description: 'Investigate complaints and contact employer',
                impact: 'Addresses root cause'
            });
        }

        if (metrics.responseRate < 30) {
            actions.push({
                type: 'visibility_penalty',
                priority: 'medium',
                description: 'Reduce job visibility until response rate improves',
                impact: 'Incentivizes better behavior'
            });
        }

        if (score >= 70) {
            actions.push({
                type: 'suspend_posting',
                priority: 'critical',
                description: 'Suspend new job posting privileges',
                impact: 'Protects candidates immediately'
            });
        }

        return actions;
    },

    /**
     * Generate quality badge for employer
     */
    generateQualityBadge(harmScore, metrics) {
        if (harmScore <= 15 && metrics.responseRate >= 80) {
            return {
                badge: 'Excellent Employer',
                color: 'green',
                icon: '⭐⭐⭐',
                description: 'High response rate, great candidate experience',
                displayPublicly: true
            };
        }

        if (harmScore <= 30 && metrics.responseRate >= 60) {
            return {
                badge: 'Good Employer',
                color: 'blue',
                icon: '⭐⭐',
                description: 'Good response rate, positive candidate experience',
                displayPublicly: true
            };
        }

        if (harmScore <= 50) {
            return {
                badge: 'Average Employer',
                color: 'yellow',
                icon: '⭐',
                description: 'Acceptable response rate, room for improvement',
                displayPublicly: false
            };
        }

        return {
            badge: 'Needs Improvement',
            color: 'red',
            icon: '⚠️',
            description: 'Low response rate, poor candidate experience',
            displayPublicly: false
        };
    },

    /**
     * Track harm index over time
     */
    trackHarmTrend(employer, historicalData) {
        const currentScore = this.calculateHarmIndex(employer, [], []).harmScore;
        const previousScores = historicalData.map(h => h.harmScore);

        const trend = previousScores.length > 0
            ? currentScore - previousScores[previousScores.length - 1]
            : 0;

        return {
            currentScore,
            previousScore: previousScores[previousScores.length - 1] || 0,
            trend: trend > 0 ? 'worsening' : trend < 0 ? 'improving' : 'stable',
            trendValue: Math.abs(trend),
            history: previousScores.slice(-10) // Last 10 scores
        };
    },

    /**
     * Generate platform-wide harm report
     */
    generatePlatformHarmReport(employers, jobs, applications) {
        const harmIndexes = employers.map(employer => 
            this.calculateHarmIndex(employer, jobs, applications)
        );

        const criticalEmployers = harmIndexes.filter(h => h.harmLevel === 'Critical');
        const highHarmEmployers = harmIndexes.filter(h => h.harmLevel === 'High');
        const mediumHarmEmployers = harmIndexes.filter(h => h.harmLevel === 'Medium');
        const lowHarmEmployers = harmIndexes.filter(h => h.harmLevel === 'Low');

        const avgHarmScore = harmIndexes.length > 0
            ? Math.round(harmIndexes.reduce((sum, h) => sum + h.harmScore, 0) / harmIndexes.length)
            : 0;

        return {
            summary: {
                totalEmployers: employers.length,
                avgHarmScore,
                criticalCount: criticalEmployers.length,
                highCount: highHarmEmployers.length,
                mediumCount: mediumHarmEmployers.length,
                lowCount: lowHarmEmployers.length
            },
            distribution: {
                critical: Math.round((criticalEmployers.length / employers.length) * 100),
                high: Math.round((highHarmEmployers.length / employers.length) * 100),
                medium: Math.round((mediumHarmEmployers.length / employers.length) * 100),
                low: Math.round((lowHarmEmployers.length / employers.length) * 100)
            },
            worstOffenders: harmIndexes
                .sort((a, b) => b.harmScore - a.harmScore)
                .slice(0, 10),
            bestPerformers: harmIndexes
                .sort((a, b) => a.harmScore - b.harmScore)
                .slice(0, 10),
            platformHealth: this._assessPlatformHealth(harmIndexes),
            recommendations: this._generatePlatformRecommendations(harmIndexes)
        };
    },

    _assessPlatformHealth(harmIndexes) {
        const avgScore = harmIndexes.reduce((sum, h) => sum + h.harmScore, 0) / harmIndexes.length;
        const criticalRate = harmIndexes.filter(h => h.harmLevel === 'Critical').length / harmIndexes.length;

        if (avgScore <= 25 && criticalRate <= 0.05) {
            return {
                status: 'Excellent',
                color: 'green',
                message: 'Platform provides excellent candidate experience'
            };
        }

        if (avgScore <= 40 && criticalRate <= 0.10) {
            return {
                status: 'Good',
                color: 'blue',
                message: 'Platform provides good candidate experience'
            };
        }

        if (avgScore <= 55 && criticalRate <= 0.20) {
            return {
                status: 'Fair',
                color: 'yellow',
                message: 'Platform candidate experience needs improvement'
            };
        }

        return {
            status: 'Poor',
            color: 'red',
            message: 'Platform candidate experience requires immediate attention'
        };
    },

    _generatePlatformRecommendations(harmIndexes) {
        const recommendations = [];
        const criticalCount = harmIndexes.filter(h => h.harmLevel === 'Critical').length;
        const avgResponseRate = harmIndexes.reduce((sum, h) => sum + h.metrics.responseRate, 0) / harmIndexes.length;

        if (criticalCount > harmIndexes.length * 0.1) {
            recommendations.push({
                priority: 'critical',
                action: 'Suspend critical harm employers',
                impact: `${criticalCount} employers causing critical harm`,
                timeline: 'Immediate'
            });
        }

        if (avgResponseRate < 50) {
            recommendations.push({
                priority: 'high',
                action: 'Implement mandatory response policy',
                impact: 'Platform-wide response rate below 50%',
                timeline: '1 week'
            });
        }

        const zeroResponseEmployers = harmIndexes.filter(h => h.metrics.zeroResponseRate > 50).length;
        if (zeroResponseEmployers > harmIndexes.length * 0.2) {
            recommendations.push({
                priority: 'high',
                action: 'Auto-hide jobs from non-responsive employers',
                impact: `${zeroResponseEmployers} employers not responding to candidates`,
                timeline: '2 weeks'
            });
        }

        return recommendations;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CandidateHarmIndex;
}
