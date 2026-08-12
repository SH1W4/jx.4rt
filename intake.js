/**
 * JX.4RT - Project Intake & Lead Intelligence System
 * 
 * This module handles:
 * - Form submission
 * - Lead scoring
 * - Classification
 * - Local storage persistence
 */

// Lead Intelligence System
const LeadIntelligence = {
    /**
     * Calculate lead score based on form data
     * @param {Object} formData - The submitted form data
     * @returns {number} - Score from 0-100
     */
    calculateScore(formData) {
        let score = 0;
        
        // Project Scale (0-20 points)
        if (formData.traveling === 'yes') score += 20;
        else if (formData.size && formData.size.toLowerCase().includes('large')) score += 15;
        else score += 5;
        
        // Investment (0-25 points)
        const investment = formData.investment;
        if (investment === '12000+') score += 25;
        else if (investment === '8000-12000') score += 20;
        else if (investment === '4000-8000') score += 15;
        else if (investment === '2000-4000') score += 10;
        else if (investment === '1000-2000') score += 5;
        else score += 0;
        
        // Authorship (0-20 points)
        const authorship = formData.authorship;
        if (authorship === 'development') score += 20;
        else if (authorship === 'interpretation') score += 15;
        else if (authorship === 'adaptations') score += 10;
        else if (authorship === 'reproduction') score += 5;
        else score += 0;
        
        // Timeline (0-15 points)
        if (formData.timeline && formData.timeline.length > 10) score += 15;
        else if (formData.timeline) score += 10;
        else score += 5;
        
        // Source (0-10 points)
        const source = formData.source;
        if (source === 'returning') score += 10;
        else if (source === 'referral') score += 8;
        else if (source === 'instagram') score += 5;
        else if (source === 'research') score += 3;
        else score += 2;
        
        // Why JX.4RT (0-10 points)
        if (formData.whyJx4rt && formData.whyJx4rt.length > 50) score += 10;
        else if (formData.whyJx4rt && formData.whyJx4rt.length > 20) score += 5;
        else score += 2;
        
        return Math.min(score, 100);
    },
    
    /**
     * Classify lead based on score
     * @param {number} score - The calculated score
     * @returns {string} - Classification
     */
    classifyLead(score) {
        if (score >= 80) return 'SIGNATURE';
        if (score >= 60) return 'HIGH_VALUE';
        if (score >= 40) return 'QUALIFIED';
        return 'STANDARD';
    },
    
    /**
     * Get recommended action based on classification
     * @param {string} classification - The lead classification
     * @returns {string} - Recommended action
     */
    getRecommendedAction(classification) {
        const actions = {
            'STANDARD': 'standard_quote',
            'QUALIFIED': 'manual_review',
            'HIGH_VALUE': 'personal_proposal',
            'SIGNATURE': 'direct_contact'
        };
        return actions[classification] || 'standard_quote';
    },
    
    /**
     * Calculate project complexity
     * @param {Object} formData - The submitted form data
     * @returns {string} - Complexity level
     */
    calculateComplexity(formData) {
        let complexity = 'low';
        
        if (formData.traveling === 'yes') complexity = 'high';
        else if (formData.authorship === 'development') complexity = 'high';
        else if (formData.investment === '12000+' || formData.investment === '8000-12000') complexity = 'high';
        else if (formData.authorship === 'interpretation') complexity = 'medium';
        else if (formData.investment === '4000-8000') complexity = 'medium';
        
        return complexity;
    },
    
    /**
     * Calculate artistic fit
     * @param {Object} formData - The submitted form data
     * @returns {number} - Artistic fit score (0-10)
     */
    calculateArtisticFit(formData) {
        let fit = 5;
        
        if (formData.authorship === 'development') fit += 3;
        if (formData.authorship === 'interpretation') fit += 2;
        if (formData.whyJx4zt && formData.whyJx4rt.toLowerCase().includes('style')) fit += 2;
        if (formData.whyJx4rt && formData.whyJx4rt.toLowerCase().includes('language')) fit += 2;
        
        return Math.min(fit, 10);
    },
    
    /**
     * Calculate commercial potential
     * @param {Object} formData - The submitted form data
     * @returns {number} - Commercial potential score (0-10)
     */
    calculateCommercialPotential(formData) {
        let potential = 5;
        
        if (formData.investment === '12000+') potential += 3;
        else if (formData.investment === '8000-12000') potential += 2;
        else if (formData.investment === '4000-8000') potential += 1;
        
        if (formData.traveling === 'yes') potential += 2;
        if (formData.source === 'returning') potential += 2;
        else if (formData.source === 'referral') potential += 1;
        
        return Math.min(potential, 10);
    },
    
    /**
     * Process lead data and generate intelligence
     * @param {Object} formData - The submitted form data
     * @returns {Object} - Complete lead object with intelligence
     */
    processLead(formData) {
        const score = this.calculateScore(formData);
        const classification = this.classifyLead(score);
        const recommendedAction = this.getRecommendedAction(classification);
        const complexity = this.calculateComplexity(formData);
        const artisticFit = this.calculateArtisticFit(formData);
        const commercialPotential = this.calculateCommercialPotential(formData);
        
        return {
            id: this.generateId(),
            createdAt: new Date().toISOString(),
            
            identity: {
                name: formData.name,
                instagram: formData.instagram,
                email: formData.email,
                city: formData.city,
                country: formData.country
            },
            
            project: {
                description: formData.projectDescription,
                bodyArea: formData.bodyArea,
                size: formData.size,
                timeline: formData.timeline
            },
            
            intention: {
                importance: formData.importance,
                meaning: formData.meaning
            },
            
            authorship: {
                level: formData.authorship
            },
            
            logistics: {
                traveling: formData.traveling === 'yes'
            },
            
            investment: {
                range: formData.investment
            },
            
            acquisition: {
                source: formData.source,
                whyJx4rt: formData.whyJx4rt
            },
            
            intelligence: {
                score,
                classification,
                complexity,
                artisticFit,
                commercialPotential,
                recommendedAction
            },
            
            status: 'new'
        };
    },
    
    /**
     * Generate unique ID for lead
     * @returns {string} - Unique ID
     */
    generateId() {
        return 'LD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    },
    
    /**
     * Save lead to localStorage
     * @param {Object} lead - The lead object to save
     */
    saveLead(lead) {
        const storageKey = JX_CONFIG?.system?.localStorageKey || 'jx4rt_leads';
        const leads = this.getLeads();
        leads.push(lead);
        localStorage.setItem(storageKey, JSON.stringify(leads));
    },
    
    /**
     * Get all leads from localStorage
     * @returns {Array} - Array of leads
     */
    getLeads() {
        const storageKey = JX_CONFIG?.system?.localStorageKey || 'jx4rt_leads';
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : [];
    },
    
    /**
     * Get leads by classification
     * @param {string} classification - The classification to filter by
     * @returns {Array} - Filtered leads
     */
    getLeadsByClassification(classification) {
        const leads = this.getLeads();
        return leads.filter(lead => lead.intelligence.classification === classification);
    },
    
    /**
     * Get analytics summary
     * @returns {Object} - Analytics data
     */
    getAnalytics() {
        const leads = this.getLeads();
        
        return {
            total: leads.length,
            byClassification: {
                STANDARD: leads.filter(l => l.intelligence.classification === 'STANDARD').length,
                QUALIFIED: leads.filter(l => l.intelligence.classification === 'QUALIFIED').length,
                HIGH_VALUE: leads.filter(l => l.intelligence.classification === 'HIGH_VALUE').length,
                SIGNATURE: leads.filter(l => l.intelligence.classification === 'SIGNATURE').length
            },
            bySource: this.groupBy(leads, 'acquisition.source'),
            byInvestment: this.groupBy(leads, 'investment.range'),
            averageScore: leads.length > 0 
                ? leads.reduce((sum, l) => sum + l.intelligence.score, 0) / leads.length 
                : 0
        };
    },
    
    /**
     * Helper to group leads by field
     * @param {Array} leads - Array of leads
     * @param {string} field - Field to group by (dot notation)
     * @returns {Object} - Grouped data
     */
    groupBy(leads, field) {
        return leads.reduce((acc, lead) => {
            const value = this.getNestedValue(lead, field) || 'unknown';
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    },
    
    /**
     * Get nested object value by dot notation
     * @param {Object} obj - The object
     * @param {string} path - The path (e.g., 'identity.name')
     * @returns {*} - The value
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, prop) => current && current[prop], obj);
    }
};

// Form Handler
const FormHandler = {
    init() {
        const form = document.getElementById('project-intake-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = this.getFormData(e.target);
        const lead = LeadIntelligence.processLead(formData);
        
        LeadIntelligence.saveLead(lead);
        
        // Show success message
        this.showSuccess(lead);
        
        // Reset form
        e.target.reset();
        
        // Log for development
        console.log('Lead submitted:', lead);
    },
    
    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        return data;
    },
    
    showSuccess(lead) {
        const message = `
            Project submitted successfully.
            
            Lead ID: ${lead.id}
            Classification: ${lead.intelligence.classification}
            Score: ${lead.intelligence.score}/100
            
            We will contact you within 24 hours.
        `;
        
        alert(message);
    }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FormHandler.init());
} else {
    FormHandler.init();
}

// Export for admin panel
if (typeof window !== 'undefined') {
    window.LeadIntelligence = LeadIntelligence;
    window.JX_LEADS = LeadIntelligence.getLeads();
}
