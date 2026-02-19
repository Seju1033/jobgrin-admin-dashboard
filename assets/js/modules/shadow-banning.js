// ============================================
// SHADOW BANNING SYSTEM
// Soft penalties without public notification
// ============================================

const ShadowBanning = {
    /**
     * Apply shadow ban to employer
     */
    applyShadowBan(employerId, banType, severity, reason) {
        const ban = {
            id: Date.now(),
            employerId,
            banType, // 'visibility', 'applicant_limit', 'search_hide', 'indexing_delay'
            severity, // 'light', 'medium', 'heavy'
            reason,
            appliedAt: new Date().toISOString(),
            appliedBy: 'system', // or admin ID
            status: 'active',
            effects: this._getBanEffects(banType, severity),
            duration: this._getBanDuration(severity),
            expiresAt: this._calculateExpiry(severity),
            metrics: {
                jobsAffected: 0,
                visibilityReduction: 0,
                applicantReduction: 0
            }
        };

        return ban;
    },

    /**
     * Get ban effects based on type and severity
     */
    _getBanEffects(banType, severity) {
        const effects = {
            visibility: {
                light: {
                    searchRankingPenalty: 20, // -20% in search ranking
                    featuredEligibility: false,
                    recommendationWeight: 0.8
                },
                medium: {
                    searchRankingPenalty: 50,
                    featuredEligibility: false,
                    recommendationWeight: 0.5,
                    categoryPageExclusion: true
                },
                heavy: {
                    searchRankingPenalty: 80,
                    featuredEligibility: false,
                    recommendationWeight: 0.2,
                    categoryPageExclusion: true,
                    homePageExclusion: true
                }
            },
            applicant_limit: {
                light: {
                    maxApplicantsPerDay: 50,
                    maxApplicantsPerJob: 100
                },
                medium: {
                    maxApplicantsPerDay: 25,
                    maxApplicantsPerJob: 50
                },
                heavy: {
                    maxApplicantsPerDay: 10,
                    maxApplicantsPerJob: 25
                }
            },
            search_hide: {
                light: {
                    hideFromGenericSearch: false,
                    hideFromLocationSearch: true,
                    showInDirectLink: true
                },
                medium: {
                    hideFromGenericSearch: true,
                    hideFromLocationSearch: true,
                    showInDirectLink: true,
                    hideFromSitemap: true
                },
                heavy: {
                    hideFromGenericSearch: true,
                    hideFromLocationSearch: true,
                    showInDirectLink: false,
                    hideFromSitemap: true,
                    noIndex: true
                }
            },
            indexing_delay: {
                light: {
                    delayHours: 6,
                    sitemapPriority: 0.3
                },
                medium: {
                    delayHours: 24,
                    sitemapPriority: 0.1,
                    robotsNoFollow: true
                },
                heavy: {
                    delayHours: 72,
                    sitemapPriority: 0.0,
                    robotsNoFollow: true,
                    robotsNoIndex: true
                }
            }
        };

        return effects[banType]?.[severity] || {};
    },

    /**
     * Get ban duration based on severity
     */
    _getBanDuration(severity) {
        const durations = {
            light: 7, // days
            medium: 14,
            heavy: 30
        };

        return durations[severity] || 7;
    },

    /**
     * Calculate expiry date
     */
    _calculateExpiry(severity) {
        const duration = this._getBanDuration(severity);
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + duration);
        return expiry.toISOString();
    },

    /**
     * Check if employer is shadow banned
     */
    isEmployerBanned(employerId, bans) {
        const activeBans = bans.filter(b => 
            b.employerId === employerId && 
            b.status === 'active' &&
            new Date(b.expiresAt) > new Date()
        );

        return {
            isBanned: activeBans.length > 0,
            activeBans,
            totalBans: activeBans.length,
            mostSevere: this._getMostSevereBan(activeBans)
        };
    },

    /**
     * Get most severe active ban
     */
    _getMostSevereBan(bans) {
        if (bans.length === 0) return null;

        const severityOrder = { heavy: 3, medium: 2, light: 1 };
        return bans.sort((a, b) => 
            severityOrder[b.severity] - severityOrder[a.severity]
        )[0];
    },

    /**
     * Apply ban effects to job visibility
     */
    applyBanToJob(job, ban) {
        if (!ban || ban.status !== 'active') return job;

        const modifiedJob = { ...job };
        const effects = ban.effects;

        // Apply visibility penalties
        if (ban.banType === 'visibility') {
            modifiedJob.searchRanking = (job.searchRanking || 100) * (1 - effects.searchRankingPenalty / 100);
            modifiedJob.isFeatured = false;
            modifiedJob.recommendationWeight = effects.recommendationWeight;
            modifiedJob.excludeFromCategory = effects.categoryPageExclusion || false;
            modifiedJob.excludeFromHome = effects.homePageExclusion || false;
        }

        // Apply applicant limits
        if (ban.banType === 'applicant_limit') {
            modifiedJob.maxApplicantsPerDay = effects.maxApplicantsPerDay;
            modifiedJob.maxApplicantsTotal = effects.maxApplicantsPerJob;
        }

        // Apply search hiding
        if (ban.banType === 'search_hide') {
            modifiedJob.hideFromSearch = effects.hideFromGenericSearch;
            modifiedJob.hideFromLocationSearch = effects.hideFromLocationSearch;
            modifiedJob.directLinkOnly = !effects.showInDirectLink;
            modifiedJob.excludeFromSitemap = effects.hideFromSitemap;
            modifiedJob.noIndex = effects.noIndex;
        }

        // Apply indexing delays
        if (ban.banType === 'indexing_delay') {
            const publishDate = new Date(job.publishedAt || Date.now());
            publishDate.setHours(publishDate.getHours() + effects.delayHours);
            modifiedJob.indexAfter = publishDate.toISOString();
            modifiedJob.sitemapPriority = effects.sitemapPriority;
            modifiedJob.robotsNoFollow = effects.robotsNoFollow;
            modifiedJob.robotsNoIndex = effects.robotsNoIndex;
        }

        modifiedJob.shadowBanned = true;
        modifiedJob.banId = ban.id;

        return modifiedJob;
    },

    /**
     * Lift shadow ban
     */
    liftShadowBan(banId, reason) {
        return {
            banId,
            status: 'lifted',
            liftedAt: new Date().toISOString(),
            liftedBy: 'admin',
            reason,
            message: 'Shadow ban lifted successfully'
        };
    },

    /**
     * Auto-lift expired bans
     */
    autoLiftExpiredBans(bans) {
        const now = new Date();
        const expiredBans = bans.filter(b => 
            b.status === 'active' && 
            new Date(b.expiresAt) <= now
        );

        expiredBans.forEach(ban => {
            ban.status = 'expired';
            ban.liftedAt = now.toISOString();
            ban.liftedBy = 'system';
            ban.reason = 'Auto-expired';
        });

        return {
            liftedCount: expiredBans.length,
            liftedBans: expiredBans
        };
    },

    /**
     * Escalate ban severity
     */
    escalateBan(banId, newSeverity, reason) {
        return {
            banId,
            previousSeverity: 'light', // would come from existing ban
            newSeverity,
            escalatedAt: new Date().toISOString(),
            escalatedBy: 'admin',
            reason,
            newEffects: this._getBanEffects('visibility', newSeverity),
            newExpiry: this._calculateExpiry(newSeverity)
        };
    },

    /**
     * Generate shadow ban report
     */
    generateBanReport(bans) {
        const activeBans = bans.filter(b => b.status === 'active');
        const expiredBans = bans.filter(b => b.status === 'expired');
        const liftedBans = bans.filter(b => b.status === 'lifted');

        const byType = this._groupByType(activeBans);
        const bySeverity = this._groupBySeverity(activeBans);

        return {
            summary: {
                totalBans: bans.length,
                activeBans: activeBans.length,
                expiredBans: expiredBans.length,
                liftedBans: liftedBans.length
            },
            byType,
            bySeverity,
            recentBans: bans.slice(0, 10),
            effectiveness: this._calculateEffectiveness(bans),
            recommendations: this._generateRecommendations(bans)
        };
    },

    _groupByType(bans) {
        const types = {};
        bans.forEach(ban => {
            types[ban.banType] = (types[ban.banType] || 0) + 1;
        });
        return types;
    },

    _groupBySeverity(bans) {
        const severities = {};
        bans.forEach(ban => {
            severities[ban.severity] = (severities[ban.severity] || 0) + 1;
        });
        return severities;
    },

    _calculateEffectiveness(bans) {
        // Simulated effectiveness metrics
        return {
            behaviorImprovement: '35%',
            repeatOffenders: '12%',
            avgBanDuration: '14 days',
            successRate: '73%'
        };
    },

    _generateRecommendations(bans) {
        const recommendations = [];

        const heavyBans = bans.filter(b => b.severity === 'heavy' && b.status === 'active');
        if (heavyBans.length > 10) {
            recommendations.push({
                type: 'review_heavy_bans',
                priority: 'high',
                message: `${heavyBans.length} heavy bans active - consider permanent suspension for repeat offenders`
            });
        }

        const oldBans = bans.filter(b => {
            const age = (Date.now() - new Date(b.appliedAt).getTime()) / (1000 * 60 * 60 * 24);
            return age > 30 && b.status === 'active';
        });
        if (oldBans.length > 0) {
            recommendations.push({
                type: 'review_old_bans',
                priority: 'medium',
                message: `${oldBans.length} bans older than 30 days - review for permanent action`
            });
        }

        return recommendations;
    },

    /**
     * Suggest shadow ban based on employer behavior
     */
    suggestBan(employer, behaviorAnalysis) {
        const anomalyScore = behaviorAnalysis.anomalyScore || 0;
        const riskFlags = behaviorAnalysis.riskFlags || [];

        if (anomalyScore < 40) {
            return { suggested: false, reason: 'No action needed' };
        }

        let banType = 'visibility';
        let severity = 'light';

        // Determine ban type based on risk flags
        if (riskFlags.some(f => f.type === 'Copy-Paste Abuse')) {
            banType = 'visibility';
        }
        if (riskFlags.some(f => f.type === 'Suspicious Activity')) {
            banType = 'applicant_limit';
        }
        if (riskFlags.some(f => f.type === 'Duplicate Content')) {
            banType = 'search_hide';
        }

        // Determine severity based on anomaly score
        if (anomalyScore >= 70) {
            severity = 'heavy';
        } else if (anomalyScore >= 55) {
            severity = 'medium';
        } else {
            severity = 'light';
        }

        return {
            suggested: true,
            banType,
            severity,
            reason: `Anomaly score: ${anomalyScore}. Flags: ${riskFlags.map(f => f.type).join(', ')}`,
            confidence: anomalyScore >= 70 ? 'High' : anomalyScore >= 55 ? 'Medium' : 'Low',
            autoApply: anomalyScore >= 80 // Auto-apply for very high scores
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShadowBanning;
}
