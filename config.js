/**
 * JX.4RT - Central Configuration
 * 
 * PRIVATE: This file contains strategic configuration for the JX.4RT Artist OS.
 * Do not expose pricing logic, scoring algorithms, or classification rules publicly.
 */

const JX_CONFIG = {
    // Artist Information
    artist: {
        name: "JX.4RT",
        location: "Salvador",
        country: "Brazil",
        instagram: "@jx.4rt",
        email: "jx4rt@art.com",
        whatsapp: "+55 71 99999-9999"
    },

    // Pricing Configuration (INTERNAL USE ONLY - PRIVATE)
    pricing: {
        // Base pricing components
        base: {
            session: 0, // Set your actual session base price
            minimumProject: 0 // Set your minimum project value
        },
        
        // Pricing formula components
        components: {
            base: 0,      // Base session/project value
            scope: 0,     // Project scope and scale
            time: 0,      // Estimated time commitment
            complexity: 0,// Technical and artistic complexity
            sessions: 0,  // Number of sessions required
            authorship: 0,// Level of authorship (reproduction → development)
            positioning: 0,// Current market positioning
            projectValue: 0 // Strategic value (artistic, reputation, expansion)
        },
        
        // Project Intake Investment Ranges (for qualification, not public pricing)
        investmentRanges: [
            { min: 1000, max: 2000, label: "R$1.000–2.000" },
            { min: 2000, max: 4000, label: "R$2.000–4.000" },
            { min: 4000, max: 8000, label: "R$4.000–8.000" },
            { min: 8000, max: 12000, label: "R$8.000–12.000" },
            { min: 12000, max: null, label: "R$12.000+" },
            { min: null, max: null, label: "Ainda não tenho referência" }
        ]
    },

    // Project Intake Configuration
    intake: {
        // Investment ranges (same as pricing for qualification)
        investmentRanges: [
            { min: 1000, max: 2000, label: "R$1.000–2.000" },
            { min: 2000, max: 4000, label: "R$2.000–4.000" },
            { min: 4000, max: 8000, label: "R$4.000–8.000" },
            { min: 8000, max: 12000, label: "R$8.000–12.000" },
            { min: 12000, max: null, label: "R$12.000+" },
            { min: null, max: null, label: "Ainda não tenho referência" }
        ],
        
        // Authorship levels
        authorshipLevels: [
            { value: "reproduction", label: "Reprodução" },
            { value: "adaptations", label: "Adaptações" },
            { value: "interpretation", label: "Interpretação" },
            { value: "development", label: "Desenvolvimento" }
        ],
        
        // Acquisition sources
        sources: [
            { value: "instagram", label: "Instagram" },
            { value: "referral", label: "Indicação" },
            { value: "research", label: "Pesquisa" },
            { value: "returning", label: "Cliente anterior" },
            { value: "other", label: "Outro" }
        ]
    },

    // Project Intelligence (PRIVATE - multi-dimensional scoring)
    intelligence: {
        // Value Dimensions (1-10 scale)
        valueDimensions: {
            commercial: { min: 1, max: 10, label: "Commercial Value" },
            artistic: { min: 1, max: 10, label: "Artistic Value" },
            reputation: { min: 1, max: 10, label: "Reputation Value" },
            relationship: { min: 1, max: 10, label: "Relationship Value" },
            expansion: { min: 1, max: 10, label: "Expansion Value" }
        },
        
        // Strategic Classifications (multi-label, not mutually exclusive)
        strategicClassifications: {
            CASH: { label: "Cash Project", description: "High financial potential" },
            ART: { label: "Art Project", description: "High artistic potential" },
            SIGNATURE: { label: "Signature Project", description: "High artistic + reputation potential" },
            DESTINATION: { label: "Destination Project", description: "Client travels specifically" },
            COLLABORATION: { label: "Strategic Collaboration", description: "Collaboration/expansion possibility" },
            IP: { label: "IP Project", description: "Can generate reusable/licensable IP" },
            EXPERIMENTAL: { label: "Experimental Project", description: "High learning value" }
        },
        
        // Tattoo Categories
        tattooCategories: {
            COMMERCIAL: { label: "Commercial Tattoo", description: "Execution-oriented" },
            AUTHORIAL: { label: "Authorial Tattoo", description: "Developed from JX.4RT language" },
            SIGNATURE: { label: "Signature Project", description: "High complexity, high artistic alignment" },
            DESTINATION: { label: "Destination Project", description: "Client travels specifically" },
            LARGE_SCALE: { label: "Large-scale Project", description: "Multiple sessions, high investment" }
        },
        
        // Signal Scoring (replaces single Lead Score)
        signalScoring: {
            // Commercial Signal (0-100)
            commercial: {
                investment: { weight: 40 },
                traveling: { weight: 20 },
                scale: { weight: 20 },
                source: { weight: 20 }
            },
            
            // Artistic Signal (0-100)
            artistic: {
                authorship: { weight: 40 },
                whyJx4rt: { weight: 30 },
                intention: { weight: 30 }
            },
            
            // Relationship Signal (0-100)
            relationship: {
                source: { weight: 40 },
                returning: { weight: 30 },
                referral: { weight: 30 }
            },
            
            // Expansion Signal (0-100)
            expansion: {
                authorship: { weight: 30 },
                investment: { weight: 20 },
                traveling: { weight: 20 },
                whyJx4rt: { weight: 30 }
            }
        },
        
        // Legacy classification (for backward compatibility)
        legacyClassification: {
            STANDARD: "STANDARD",
            QUALIFIED: "QUALIFIED",
            HIGH_VALUE: "HIGH_VALUE",
            SIGNATURE: "SIGNATURE"
        },
        
        // Recommended actions (PRIVATE)
        recommendedActions: {
            CASH: "standard_quote",
            ART: "manual_review",
            SIGNATURE: "personal_proposal",
            DESTINATION: "direct_contact",
            COLLABORATION: "strategic_discussion",
            IP: "ip_evaluation",
            EXPERIMENTAL: "learning_opportunity"
        }
    },

    // Revenue Streams Configuration
    revenue: {
        streams: {
            TATTOO: { status: "ACTIVE", label: "Tattoo" },
            LARGE_SCALE_TATTOO: { status: "EXPLORING", label: "Large-scale Tattoo" },
            DESTINATION_TATTOO: { status: "EXPLORING", label: "Destination Tattoo" },
            ORIGINAL_ART: { status: "EXPLORING", label: "Original Artwork" },
            PRINTS_EDITIONS: { status: "EXPLORING", label: "Prints / Editions" },
            OBJECTS: { status: "EXPLORING", label: "Objects" },
            FASHION: { status: "EXPLORING", label: "Fashion" },
            ART_DIRECTION: { status: "EXPLORING", label: "Art Direction" },
            COLLABORATIONS: { status: "EXPLORING", label: "Collaborations" },
            LICENSING: { status: "EXPLORING", label: "Licensing" },
            EXHIBITIONS: { status: "EXPLORING", label: "Exhibitions" },
            DIGITAL_TECH: { status: "EXPLORING", label: "Digital / Technology Projects" }
        },
        
        // Status values
        status: {
            EXPLORING: "EXPLORING",
            VALIDATING: "VALIDATING",
            ACTIVE: "ACTIVE",
            PROVEN: "PROVEN",
            PAUSED: "PAUSED"
        }
    },

    // Opportunity Configuration
    opportunities: {
        types: {
            COLLABORATION: { label: "Collaboration" },
            GUEST_SPOT: { label: "Guest Spot" },
            EDITORIAL: { label: "Editorial" },
            FASHION: { label: "Fashion" },
            BRAND: { label: "Brand" },
            EXHIBITION: { label: "Exhibition" },
            MEDIA: { label: "Media" },
            LICENSING: { label: "Licensing" },
            ART_PROJECT: { label: "Art Project" }
        },
        
        status: {
            DISCOVERED: "DISCOVERED",
            EVALUATING: "EVALUATING",
            ACTIVE: "ACTIVE",
            WON: "WON",
            LOST: "LOST",
            ARCHIVED: "ARCHIVED"
        },
        
        // Collaboration evaluation criteria
        collaborationCriteria: {
            brandFit: { label: "Brand Fit", weight: 1 },
            artisticFit: { label: "Artistic Fit", weight: 1 },
            audienceFit: { label: "Audience Fit", weight: 1 },
            financialPotential: { label: "Financial Potential", weight: 1 },
            reputationPotential: { label: "Reputation Potential", weight: 1 },
            creativeFreedom: { label: "Creative Freedom", weight: 1 },
            ipOwnership: { label: "IP Ownership", weight: 1 },
            longTermValue: { label: "Long-term Value", weight: 1 }
        }
    },

    // Intellectual Property Configuration
    ip: {
        categories: {
            ORIGINAL_WORK: { label: "Original Work" },
            SERIES: { label: "Series" },
            SYMBOL: { label: "Symbol" },
            CHARACTER: { label: "Character" },
            GLYPH: { label: "Glyph" },
            VISUAL_SYSTEM: { label: "Visual System" },
            COLLECTION: { label: "Collection" }
        },
        
        status: {
            DEVELOPING: "DEVELOPING",
            ESTABLISHED: "ESTABLISHED",
            EXPANDING: "EXPANDING",
            PAUSED: "PAUSED",
            ARCHIVED: "ARCHIVED"
        },
        
        // Derivative potential types
        derivativeTypes: [
            "tattoo", "drawing", "painting", "print", "edition", 
            "apparel", "object", "editorial", "campaign", 
            "collaboration", "exhibition", "digital", "licensing"
        ]
    },

    // Project Asset Model Structure
    projects: {
        structure: {
            id: "string",
            title: "string",
            type: "string",
            status: "string",
            
            // Value dimensions
            artisticValue: "number (1-10)",
            commercialValue: "number (1-10)",
            reputationValue: "number (1-10)",
            relationshipValue: "number (1-10)",
            expansionValue: "number (1-10)",
            
            // Project details
            medium: "string",
            bodyLocation: "string",
            sessions: "number",
            
            // Client
            client: "object",
            references: "array",
            
            // Artistic language
            artisticLanguage: "array",
            
            // Dates
            createdAt: "ISO date",
            completedAt: "ISO date",
            
            // Assets
            documentation: "array",
            derivativePotential: "array",
            opportunities: "array"
        }
    },

    // System Configuration
    system: {
        localStorageKey: "jx4rt_leads",
        adminRoute: "/admin",
        debugMode: false,
        
        // Google Apps Script Integration
        googleScriptUrl: "", // Cole a URL do seu Google Apps Script aqui após implantar
        
        // Data privacy
        privacy: {
            exportEnabled: false,
            deleteEnabled: false,
            anonymizeEnabled: false
        }
    }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JX_CONFIG;
}
