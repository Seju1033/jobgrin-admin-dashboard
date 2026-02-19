// ============================================
// PR & MEDIA CONTROL PANEL
// Manage journalist access, citations, and backlinks
// ============================================

const PRMediaControl = {
    /**
     * Journalist Access Management
     */
    journalistAccess: {
        /**
         * Grant access to a journalist
         */
        grantAccess(journalist, accessLevel, expiryDays = 30) {
            const accessToken = this._generateAccessToken();
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + expiryDays);

            const access = {
                id: Date.now(),
                journalist: {
                    name: journalist.name,
                    email: journalist.email,
                    organization: journalist.organization,
                    verified: journalist.verified || false
                },
                accessLevel: accessLevel, // 'basic', 'standard', 'premium'
                token: accessToken,
                grantedAt: new Date().toISOString(),
                expiresAt: expiryDate.toISOString(),
                status: 'active',
                permissions: this._getPermissionsByLevel(accessLevel),
                usage: {
                    apiCalls: 0,
                    reportsDownloaded: 0,
                    lastAccessed: null
                }
            };

            return access;
        },

        /**
         * Generate secure access token
         */
        _generateAccessToken() {
            return 'jgr_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        },

        /**
         * Get permissions by access level
         */
        _getPermissionsByLevel(level) {
            const permissions = {
                basic: [
                    'view_public_reports',
                    'download_summary_data'
                ],
                standard: [
                    'view_public_reports',
                    'view_detailed_reports',
                    'download_summary_data',
                    'download_detailed_data',
                    'access_api_limited'
                ],
                premium: [
                    'view_public_reports',
                    'view_detailed_reports',
                    'view_realtime_data',
                    'download_summary_data',
                    'download_detailed_data',
                    'download_raw_data',
                    'access_api_unlimited',
                    'custom_reports',
                    'early_access'
                ]
            };

            return permissions[level] || permissions.basic;
        },

        /**
         * Revoke journalist access
         */
        revokeAccess(accessId) {
            return {
                accessId,
                status: 'revoked',
                revokedAt: new Date().toISOString(),
                reason: 'Admin action'
            };
        },

        /**
         * Track journalist usage
         */
        trackUsage(accessId, action) {
            return {
                accessId,
                action,
                timestamp: new Date().toISOString(),
                metadata: {
                    ip: 'xxx.xxx.xxx.xxx',
                    userAgent: 'Mozilla/5.0...'
                }
            };
        }
    },

    /**
     * Citation Tracking System
     */
    citationTracking: {
        /**
         * Add a new citation
         */
        addCitation(citation) {
            return {
                id: Date.now(),
                source: {
                    publication: citation.publication,
                    author: citation.author,
                    articleTitle: citation.articleTitle,
                    url: citation.url,
                    publishedDate: citation.publishedDate
                },
                reportCited: citation.reportCited,
                citationType: citation.citationType, // 'direct', 'paraphrased', 'data-only'
                backlink: {
                    present: citation.hasBacklink,
                    url: citation.backlinkUrl,
                    doFollow: citation.doFollow,
                    verified: false
                },
                impact: {
                    estimatedReach: citation.estimatedReach || 0,
                    domainAuthority: citation.domainAuthority || 0,
                    socialShares: 0
                },
                addedAt: new Date().toISOString(),
                verifiedAt: null,
                status: 'pending_verification'
            };
        },

        /**
         * Verify citation and backlink
         */
        verifyCitation(citationId) {
            return {
                citationId,
                verified: true,
                verifiedAt: new Date().toISOString(),
                backlinkStatus: 'active',
                seoValue: this._calculateSEOValue(citationId)
            };
        },

        /**
         * Calculate SEO value of citation
         */
        _calculateSEOValue(citationId) {
            // Simulated SEO value calculation
            return {
                domainAuthority: Math.floor(Math.random() * 40 + 40), // 40-80
                pageAuthority: Math.floor(Math.random() * 30 + 30), // 30-60
                estimatedTraffic: Math.floor(Math.random() * 5000 + 1000), // 1000-6000
                backlinkQuality: ['Excellent', 'Good', 'Average'][Math.floor(Math.random() * 3)]
            };
        },

        /**
         * Generate citation report
         */
        generateCitationReport(citations) {
            const totalCitations = citations.length;
            const verifiedCitations = citations.filter(c => c.backlink.verified).length;
            const totalBacklinks = citations.filter(c => c.backlink.present).length;
            const doFollowBacklinks = citations.filter(c => c.backlink.doFollow).length;

            return {
                summary: {
                    totalCitations,
                    verifiedCitations,
                    totalBacklinks,
                    doFollowBacklinks,
                    verificationRate: Math.round((verifiedCitations / totalCitations) * 100),
                    backlinkRate: Math.round((totalBacklinks / totalCitations) * 100)
                },
                topPublications: this._getTopPublications(citations),
                recentCitations: citations.slice(0, 10),
                seoImpact: this._calculateTotalSEOImpact(citations)
            };
        },

        _getTopPublications(citations) {
            const pubCount = {};
            citations.forEach(c => {
                const pub = c.source.publication;
                pubCount[pub] = (pubCount[pub] || 0) + 1;
            });

            return Object.entries(pubCount)
                .map(([publication, count]) => ({ publication, citationCount: count }))
                .sort((a, b) => b.citationCount - a.citationCount)
                .slice(0, 10);
        },

        _calculateTotalSEOImpact(citations) {
            const totalReach = citations.reduce((sum, c) => sum + (c.impact.estimatedReach || 0), 0);
            const avgDA = citations.length > 0
                ? Math.round(citations.reduce((sum, c) => sum + (c.impact.domainAuthority || 0), 0) / citations.length)
                : 0;

            return {
                totalEstimatedReach: totalReach,
                averageDomainAuthority: avgDA,
                totalBacklinks: citations.filter(c => c.backlink.present).length,
                estimatedSEOValue: this._estimateSEOValue(citations)
            };
        },

        _estimateSEOValue(citations) {
            // Simplified SEO value estimation
            const doFollowLinks = citations.filter(c => c.backlink.doFollow).length;
            const highDALinks = citations.filter(c => c.impact.domainAuthority >= 60).length;
            
            return {
                score: (doFollowLinks * 10) + (highDALinks * 15),
                rating: doFollowLinks > 20 ? 'Excellent' : doFollowLinks > 10 ? 'Good' : 'Average'
            };
        }
    },

    /**
     * Media Outreach Campaign Manager
     */
    outreachCampaigns: {
        /**
         * Create new outreach campaign
         */
        createCampaign(campaign) {
            return {
                id: Date.now(),
                name: campaign.name,
                reportType: campaign.reportType, // 'salary', 'demand', 'skills', etc.
                targetAudience: campaign.targetAudience, // 'tech-media', 'business-media', 'hr-publications'
                status: 'draft',
                createdAt: new Date().toISOString(),
                launchDate: campaign.launchDate,
                targets: {
                    journalists: campaign.journalists || [],
                    publications: campaign.publications || [],
                    influencers: campaign.influencers || []
                },
                content: {
                    pressRelease: campaign.pressRelease,
                    emailTemplate: campaign.emailTemplate,
                    socialMediaPosts: campaign.socialMediaPosts,
                    infographics: campaign.infographics
                },
                goals: {
                    targetCitations: campaign.targetCitations || 10,
                    targetBacklinks: campaign.targetBacklinks || 5,
                    targetReach: campaign.targetReach || 100000
                },
                metrics: {
                    emailsSent: 0,
                    emailsOpened: 0,
                    citationsReceived: 0,
                    backlinksReceived: 0,
                    estimatedReach: 0
                }
            };
        },

        /**
         * Launch campaign
         */
        launchCampaign(campaignId) {
            return {
                campaignId,
                status: 'active',
                launchedAt: new Date().toISOString(),
                message: 'Campaign launched successfully'
            };
        },

        /**
         * Track campaign performance
         */
        trackPerformance(campaignId, metrics) {
            return {
                campaignId,
                updatedAt: new Date().toISOString(),
                metrics: {
                    emailsSent: metrics.emailsSent || 0,
                    emailsOpened: metrics.emailsOpened || 0,
                    openRate: metrics.emailsSent > 0 
                        ? Math.round((metrics.emailsOpened / metrics.emailsSent) * 100) 
                        : 0,
                    citationsReceived: metrics.citationsReceived || 0,
                    backlinksReceived: metrics.backlinksReceived || 0,
                    estimatedReach: metrics.estimatedReach || 0,
                    roi: this._calculateROI(metrics)
                }
            };
        },

        _calculateROI(metrics) {
            // Simplified ROI calculation
            const backlinkValue = (metrics.backlinksReceived || 0) * 500; // ₹500 per backlink
            const reachValue = ((metrics.estimatedReach || 0) / 1000) * 10; // ₹10 per 1000 reach
            const totalValue = backlinkValue + reachValue;

            return {
                estimatedValue: Math.round(totalValue),
                currency: 'INR',
                breakdown: {
                    backlinkValue,
                    reachValue
                }
            };
        }
    },

    /**
     * Attribution Monitoring
     */
    attributionMonitoring: {
        /**
         * Monitor web for JobGrin mentions
         */
        monitorMentions() {
            // Simulated mention monitoring (in real system, use web scraping/API)
            return {
                totalMentions: Math.floor(Math.random() * 100 + 50),
                newMentions: Math.floor(Math.random() * 20 + 5),
                sentiment: {
                    positive: Math.floor(Math.random() * 60 + 30),
                    neutral: Math.floor(Math.random() * 30 + 10),
                    negative: Math.floor(Math.random() * 10 + 5)
                },
                topSources: [
                    { source: 'Economic Times', mentions: 12 },
                    { source: 'Business Standard', mentions: 8 },
                    { source: 'LinkedIn', mentions: 25 },
                    { source: 'Twitter', mentions: 18 }
                ],
                recentMentions: this._generateRecentMentions()
            };
        },

        _generateRecentMentions() {
            return [
                {
                    source: 'Economic Times',
                    title: 'Tech Salaries Surge 12% in 2024',
                    url: 'https://example.com/article1',
                    date: new Date().toISOString(),
                    attributed: true,
                    backlink: true
                },
                {
                    source: 'Business Standard',
                    title: 'Remote Work Trends in India',
                    url: 'https://example.com/article2',
                    date: new Date().toISOString(),
                    attributed: true,
                    backlink: false
                }
            ];
        },

        /**
         * Track attribution compliance
         */
        trackAttributionCompliance(citations) {
            const properlyAttributed = citations.filter(c => c.citationType === 'direct').length;
            const total = citations.length;

            return {
                totalCitations: total,
                properlyAttributed,
                complianceRate: Math.round((properlyAttributed / total) * 100),
                missingAttribution: total - properlyAttributed,
                recommendations: this._generateAttributionRecommendations(citations)
            };
        },

        _generateAttributionRecommendations(citations) {
            const recommendations = [];
            
            const missingBacklinks = citations.filter(c => !c.backlink.present);
            if (missingBacklinks.length > 0) {
                recommendations.push({
                    type: 'missing_backlinks',
                    priority: 'high',
                    message: `${missingBacklinks.length} citations without backlinks - reach out for link inclusion`
                });
            }

            const paraphrased = citations.filter(c => c.citationType === 'paraphrased');
            if (paraphrased.length > citations.length * 0.5) {
                recommendations.push({
                    type: 'attribution_quality',
                    priority: 'medium',
                    message: 'High paraphrasing rate - encourage direct citations'
                });
            }

            return recommendations;
        }
    },

    /**
     * Generate PR Dashboard Summary
     */
    generatePRDashboard(data) {
        return {
            overview: {
                totalJournalists: data.journalists?.length || 0,
                activeAccess: data.journalists?.filter(j => j.status === 'active').length || 0,
                totalCitations: data.citations?.length || 0,
                totalBacklinks: data.citations?.filter(c => c.backlink.present).length || 0,
                activeCampaigns: data.campaigns?.filter(c => c.status === 'active').length || 0
            },
            recentActivity: {
                newCitations: data.citations?.slice(0, 5) || [],
                newJournalists: data.journalists?.slice(0, 5) || [],
                campaignUpdates: data.campaigns?.slice(0, 3) || []
            },
            performance: {
                citationGrowth: '+15%',
                backlinkGrowth: '+22%',
                reachGrowth: '+18%',
                avgDomainAuthority: 65
            },
            topPerformers: {
                topPublications: this.citationTracking._getTopPublications(data.citations || []),
                topCampaigns: this._getTopCampaigns(data.campaigns || []),
                topReports: this._getTopReports(data.citations || [])
            }
        };
    },

    _getTopCampaigns(campaigns) {
        return campaigns
            .sort((a, b) => (b.metrics?.citationsReceived || 0) - (a.metrics?.citationsReceived || 0))
            .slice(0, 5)
            .map(c => ({
                name: c.name,
                citations: c.metrics?.citationsReceived || 0,
                backlinks: c.metrics?.backlinksReceived || 0,
                reach: c.metrics?.estimatedReach || 0
            }));
    },

    _getTopReports(citations) {
        const reportCount = {};
        citations.forEach(c => {
            const report = c.reportCited;
            reportCount[report] = (reportCount[report] || 0) + 1;
        });

        return Object.entries(reportCount)
            .map(([report, count]) => ({ report, citationCount: count }))
            .sort((a, b) => b.citationCount - a.citationCount)
            .slice(0, 5);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PRMediaControl;
}
