/**
 * JX.4RT - Central Configuration
 * 
 * This file contains all configurable data for the JX.4RT system.
 * Update these values with your real information.
 */

const JX_CONFIG = {
    // Artist Information
    artist: {
        name: "JX.4RT",
        location: "São Paulo",
        country: "Brazil",
        instagram: "@jx.4rt",
        email: "jx4rt@art.com",
        whatsapp: "+55 11 99999-9999"
    },

    // Pricing Configuration (INTERNAL USE ONLY - not displayed publicly)
    pricing: {
        sessionBase: 0, // Set your actual session base price
        minimumProject: 0 // Set your minimum project value
    },

    // Project Intake Investment Ranges
    intake: {
        investmentRanges: [
            { min: 1000, max: 2000, label: "R$1.000–2.000" },
            { min: 2000, max: 4000, label: "R$2.000–4.000" },
            { min: 4000, max: 8000, label: "R$4.000–8.000" },
            { min: 8000, max: 12000, label: "R$8.000–12.000" },
            { min: 12000, max: null, label: "R$12.000+" },
            { min: null, max: null, label: "Ainda não tenho referência" }
        ]
    },

    // Lead Intelligence Scoring Weights
    intelligence: {
        weights: {
            projectScale: {
                singleSession: 1,
                multipleSessions: 2,
                largeProject: 3
            },
            investment: {
                low: 1,
                medium: 2,
                high: 3,
                veryHigh: 4
            },
            authorship: {
                reproduction: 1,
                adaptations: 2,
                interpretation: 3,
                development: 4
            },
            timeline: {
                flexible: 1,
                defined: 2,
                traveling: 3
            },
            acquisition: {
                cold: 1,
                research: 2,
                referral: 3,
                returning: 4
            }
        },
        classification: {
            STANDARD: "STANDARD",
            QUALIFIED: "QUALIFIED",
            HIGH_VALUE: "HIGH_VALUE",
            SIGNATURE: "SIGNATURE"
        },
        recommendedActions: {
            STANDARD: "standard_quote",
            QUALIFIED: "manual_review",
            HIGH_VALUE: "personal_proposal",
            SIGNATURE: "direct_contact"
        }
    },

    // System Configuration
    system: {
        localStorageKey: "jx4rt_leads",
        adminRoute: "/admin",
        debugMode: false
    }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JX_CONFIG;
}
