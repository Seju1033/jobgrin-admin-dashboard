// ============================================
// BEHAVIORAL INTELLIGENCE ENGINE
// AI-powered pattern detection and anomaly alerts
// ============================================

const BehavioralIntelligence = {
    /**
     * Analyze employer behavior patterns
     */
    analyzeEmployerBehavior(employer, jobs) {
        const patterns = {
            copyPasteDetection: this._detectCopyPaste(jobs),
            timeSpentAnalysis: this._analyzeTimeSpent(employer),
            jdSimilarity: this._calculateJDSimilarity(jobs),
            applyToViewRatio: this._calculateApplyToViewRatio(employer),
            responseLatency: this._calculateResponseLatency(employer),
            burstDetection: this._detectApplyBursts(employer),
            anomalyScore: 0,
            riskFlags: []
        };

        // Calculate overall anomaly score
        patterns.anomalyScore = this._calculateAnomalyScore(patterns);
        
        // Generate risk flags
        patterns.riskFlags = this._generateRiskFlags(patterns);

        // Auto-adjust trust score if needed
        if (patterns.anomalyScore > 70) {
            patterns.recommendedAction = 'Reduce trust score by 15 points';
        } else if (patterns.anomalyScore > 50) {
            patterns.recommendedAction = 'Monitor closely';
        } else {
            patterns.recommendedAction = 'No action needed';
        }

        return patterns;
    },

    /**
     * Detect copy-paste behavior in job descriptions
     */
    _detectCopyPaste(jobs) {
        if (!jobs || jobs.length < 2) return { detected: false, frequency: 0 };

        let copyPasteCount = 0;
        const descriptions = jobs.map(j => j.description || '');

        // Compare each job description with others
        for (let i = 0; i < descriptions.length; i++) {
            for (let j = i + 1; j < descriptions.length; j++) {
                const similarity = this._calculateStringSimilarity(descriptions[i], descriptions[j]);
                if (similarity > 0.85) copyPasteCount++;
            }
        }

        const frequency = jobs.length > 1 ? copyPasteCount / (jobs.length - 1) : 0;

        return {
            detected: frequency > 0.5,
            frequency: Math.round(frequency * 100) / 100,
            count: copyPasteCount,
            severity: frequency > 0.7 ? 'High' : frequency > 0.4 ? 'Medium' : 'Low'
        };
    },

    /**
     * Calculate string similarity (Levenshtein distance based)
     */
    _calculateStringSimilarity(str1, str2) {
        if (!str1 || !str2) return 0;
        
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this._levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    },

    /**
     * Levenshtein distance algorithm
     */
    _levenshteinDistance(str1, str2) {
        const matrix = [];

        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[str2.length][str1.length];
    },

    /**
     * Analyze time spent on job posting
     */
    _analyzeTimeSpent(employer) {
        const avgTimeSpent = employer.avgTimeSpentPosting || 180; // seconds
        
        let analysis = {
            avgTime: avgTimeSpent,
            classification: 'Normal',
            suspicion: 'None'
        };

        if (avgTimeSpent < 60) {
            analysis.classification = 'Very Fast';
            analysis.suspicion = 'Possible automation or copy-paste';
        } else if (avgTimeSpent < 120) {
            analysis.classification = 'Fast';
            analysis.suspicion = 'Minimal effort detected';
        } else if (avgTimeSpent > 600) {
            analysis.classification = 'Thorough';
            analysis.suspicion = 'None';
        }

        return analysis;
    },

    /**
     * Calculate JD similarity across all jobs
     */
    _calculateJDSimilarity(jobs) {
        if (!jobs || jobs.length < 2) return { score: 0, level: 'N/A' };

        const descriptions = jobs.map(j => j.description || '');
        let totalSimilarity = 0;
        let comparisons = 0;

        for (let i = 0; i < descriptions.length; i++) {
            for (let j = i + 1; j < descriptions.length; j++) {
                totalSimilarity += this._calculateStringSimilarity(descriptions[i], descriptions[j]);
                comparisons++;
            }
        }

        const avgSimilarity = comparisons > 0 ? totalSimilarity / comparisons : 0;

        return {
            score: Math.round(avgSimilarity * 100) / 100,
            level: avgSimilarity > 0.8 ? 'Very High' : avgSimilarity > 0.6 ? 'High' : avgSimilarity > 0.4 ? 'Medium' : 'Low',
            flag: avgSimilarity > 0.7
        };
    },

    /**
     * Calculate apply-to-view ratio
     */
    _calculateApplyToViewRatio(employer) {
        const totalApplications = employer.totalApplications || 0;
        const totalViews = employer.totalViews || 1;
        
        const ratio = totalApplications / totalViews;

        return {
            ratio: Math.round(ratio * 1000) / 1000,
            percentage: Math.round(ratio * 100),
            quality: ratio > 0.3 ? 'Excellent' : ratio > 0.15 ? 'Good' : ratio > 0.05 ? 'Average' : 'Poor',
            flag: ratio < 0.05
        };
    },

    /**
     * Calculate response latency
     */
    _calculateResponseLatency(employer) {
        const avgResponseTime = employer.avgResponseTime || 3; // days
        
        return {
            days: avgResponseTime,
            classification: avgResponseTime <= 2 ? 'Fast' : avgResponseTime <= 5 ? 'Normal' : avgResponseTime <= 10 ? 'Slow' : 'Very Slow',
            flag: avgResponseTime > 7,
            impact: avgResponseTime > 7 ? 'Negative candidate experience' : 'Acceptable'
        };
    },

    /**
     * Detect candidate apply bursts (suspicious patterns)
     */
    _detectApplyBursts(employer) {
        const recentApplications = employer.recentApplications || [];
        
        // Group applications by hour
        const hourlyBuckets = {};
        recentApplications.forEach(app => {
            const hour = new Date(app.timestamp).getHours();
            hourlyBuckets[hour] = (hourlyBuckets[hour] || 0) + 1;
        });

        const maxInHour = Math.max(...Object.values(hourlyBuckets), 0);
        const avgPerHour = recentApplications.length / 24;

        const burstDetected = maxInHour > avgPerHour * 3;

        return {
            detected: burstDetected,
            maxInHour,
            avgPerHour: Math.round(avgPerHour * 10) / 10,
            severity: burstDetected ? (maxInHour > avgPerHour * 5 ? 'High' : 'Medium') : 'None',
            possibleCause: burstDetected ? 'Possible bot activity or viral job post' : 'Normal pattern'
        };
    },

    /**
     * Calculate overall anomaly score
     */
    _calculateAnomalyScore(patterns) {
        let score = 0;

        // Copy-paste penalty
        if (patterns.copyPasteDetection.frequency > 0.7) score += 25;
        else if (patterns.copyPasteDetection.frequency > 0.4) score += 15;

        // Time spent penalty
        if (patterns.timeSpentAnalysis.avgTime < 60) score += 20;
        else if (patterns.timeSpentAnalysis.avgTime < 120) score += 10;

        // JD similarity penalty
        if (patterns.jdSimilarity.score > 0.8) score += 20;
        else if (patterns.jdSimilarity.score > 0.6) score += 10;

        // Apply-to-view ratio penalty
        if (patterns.applyToViewRatio.ratio < 0.05) score += 15;

        // Response latency penalty
        if (patterns.responseLatency.days > 10) score += 15;
        else if (patterns.responseLatency.days > 7) score += 10;

        // Burst detection penalty
        if (patterns.burstDetection.severity === 'High') score += 20;
        else if (patterns.burstDetection.severity === 'Medium') score += 10;

        return Math.min(score, 100);
    },

    /**
     * Generate risk flags based on patterns
     */
    _generateRiskFlags(patterns) {
        const flags = [];

        if (patterns.copyPasteDetection.detected) {
            flags.push({
                type: 'Copy-Paste Abuse',
                severity: patterns.copyPasteDetection.severity,
                message: `${Math.round(patterns.copyPasteDetection.frequency * 100)}% of jobs appear copy-pasted`
            });
        }

        if (patterns.timeSpentAnalysis.avgTime < 120) {
            flags.push({
                type: 'Low Effort Posting',
                severity: patterns.timeSpentAnalysis.avgTime < 60 ? 'High' : 'Medium',
                message: `Average posting time: ${patterns.timeSpentAnalysis.avgTime}s`
            });
        }

        if (patterns.jdSimilarity.flag) {
            flags.push({
                type: 'Duplicate Content',
                severity: 'High',
                message: `${Math.round(patterns.jdSimilarity.score * 100)}% similarity across jobs`
            });
        }

        if (patterns.applyToViewRatio.flag) {
            flags.push({
                type: 'Low Engagement',
                severity: 'Medium',
                message: `Only ${patterns.applyToViewRatio.percentage}% apply-to-view ratio`
            });
        }

        if (patterns.responseLatency.flag) {
            flags.push({
                type: 'Slow Response',
                severity: 'Medium',
                message: `Average response time: ${patterns.responseLatency.days} days`
            });
        }

        if (patterns.burstDetection.detected) {
            flags.push({
                type: 'Suspicious Activity',
                severity: patterns.burstDetection.severity,
                message: patterns.burstDetection.possibleCause
            });
        }

        return flags;
    },

    /**
     * Generate behavioral report for admin dashboard
     */
    generateBehavioralReport(employers, jobs) {
        const reports = employers.map(employer => {
            const employerJobs = jobs.filter(j => j.employerId === employer.id);
            const analysis = this.analyzeEmployerBehavior(employer, employerJobs);
            
            return {
                employerId: employer.id,
                companyName: employer.company,
                anomalyScore: analysis.anomalyScore,
                riskFlags: analysis.riskFlags,
                recommendedAction: analysis.recommendedAction,
                patterns: analysis
            };
        });

        // Sort by anomaly score (highest first)
        reports.sort((a, b) => b.anomalyScore - a.anomalyScore);

        return {
            totalAnalyzed: employers.length,
            highRiskCount: reports.filter(r => r.anomalyScore > 70).length,
            mediumRiskCount: reports.filter(r => r.anomalyScore > 50 && r.anomalyScore <= 70).length,
            lowRiskCount: reports.filter(r => r.anomalyScore <= 50).length,
            reports: reports
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BehavioralIntelligence;
}
