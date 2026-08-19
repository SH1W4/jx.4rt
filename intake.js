/**
 * JX.4RT - Project Intake & Intelligence System
 * 
 * PRIVATE: This module handles multi-dimensional project signal scoring,
 * strategic classification, and local storage persistence for the Artist OS.
 * 
 * Replaces simple "Lead Score" with multi-dimensional value matrix:
 * - Commercial Signal (0-100)
 * - Artistic Signal (0-100)
 * - Reputation Signal (0-100)
 * - Relationship Signal (0-100)
 * - Expansion Signal (0-100)
 */

// Project Intelligence System
const ProjectIntelligence = {
    /**
     * Calculate Commercial Signal (0-100)
     * Financial potential and return
     */
    calculateCommercialSignal(formData) {
        let signal = 0;
        
        // Investment (40 points)
        const investment = formData.investment;
        if (investment === '12000+') signal += 40;
        else if (investment === '8000-12000') signal += 32;
        else if (investment === '4000-8000') signal += 24;
        else if (investment === '2000-4000') signal += 16;
        else if (investment === '1000-2000') signal += 8;
        
        // Traveling (20 points)
        if (formData.traveling === 'yes') signal += 20;
        
        // Scale (20 points)
        if (formData.size && formData.size.toLowerCase().includes('large')) signal += 20;
        else if (formData.size && formData.size.toLowerCase().includes('medium')) signal += 10;
        else signal += 5;
        
        // Source (20 points)
        const source = formData.source;
        if (source === 'returning') signal += 20;
        else if (source === 'referral') signal += 16;
        else if (source === 'research') signal += 12;
        else if (source === 'instagram' || source === 'site') signal += 8;
        else signal += 4;
        
        return Math.min(signal, 100);
    },
    
    /**
     * Calculate Artistic Signal (0-100)
     * Artistic value and language development
     */
    calculateArtisticSignal(formData) {
        let signal = 0;
        
        // Authorship (40 points)
        const authorship = formData.authorship;
        if (authorship === 'development') signal += 40;
        else if (authorship === 'interpretation') signal += 30;
        else if (authorship === 'adaptations') signal += 20;
        else if (authorship === 'reproduction') signal += 10;
        
        // Style match (10 points) - bonus for blackwork/abstract (JX.4RT specialty)
        const style = formData.style;
        if (style === 'blackwork-abstract') signal += 10;
        else if (style === 'blackwork' || style === 'abstract') signal += 5;
        
        // Why JX.4RT (20 points)
        const whyJx4rt = formData.whyJx4rt || '';
        const whyLength = whyJx4rt.length;
        if (whyLength > 100) signal += 20;
        else if (whyLength > 50) signal += 16;
        else if (whyLength > 20) signal += 12;
        else if (whyLength > 10) signal += 8;
        else signal += 4;
        
        // Intention depth (30 points)
        const importance = formData.importance || '';
        const meaning = formData.meaning || '';
        const intentionLength = importance.length + meaning.length;
        if (intentionLength > 200) signal += 30;
        else if (intentionLength > 100) signal += 24;
        else if (intentionLength > 50) signal += 18;
        else signal += 12;
        
        return Math.min(signal, 100);
    },
    
    /**
     * Calculate Reputation Signal (0-100)
     * Impact on positioning and reputation
     */
    calculateReputationSignal(formData) {
        let signal = 0;
        
        // Authorship (40 points) - high authorship = portfolio value
        const authorship = formData.authorship;
        if (authorship === 'development') signal += 40;
        else if (authorship === 'interpretation') signal += 32;
        else if (authorship === 'adaptations') signal += 24;
        else signal += 16;
        
        // Investment (30 points) - high investment = portfolio value
        const investment = formData.investment;
        if (investment === '12000+') signal += 30;
        else if (investment === '8000-12000') signal += 24;
        else if (investment === '4000-8000') signal += 18;
        else signal += 12;
        
        // Traveling (30 points) - destination = reputation
        if (formData.traveling === 'yes') signal += 30;
        
        return Math.min(signal, 100);
    },
    
    /**
     * Calculate Relationship Signal (0-100)
     * Potential for ongoing relationship
     */
    calculateRelationshipSignal(formData) {
        let signal = 0;
        
        // Source (40 points)
        const source = formData.source;
        if (source === 'returning') signal += 40;
        else if (source === 'referral') signal += 32;
        else if (source === 'research') signal += 24;
        else if (source === 'instagram') signal += 16;
        else signal += 8;
        
        // Returning (30 points)
        if (source === 'returning') signal += 30;
        
        // Referral potential (30 points)
        if (source === 'referral') signal += 30;
        else if (formData.whyJx4rt && formData.whyJx4rt.toLowerCase().includes('recommend')) signal += 20;
        else signal += 10;
        
        return Math.min(signal, 100);
    },
    
    /**
     * Calculate Expansion Signal (0-100)
     * Potential for derivative works or expansion
     */
    calculateExpansionSignal(formData) {
        let signal = 0;
        
        // Authorship (30 points) - high authorship = IP potential
        const authorship = formData.authorship;
        if (authorship === 'development') signal += 30;
        else if (authorship === 'interpretation') signal += 24;
        else signal += 18;
        
        // Investment (20 points) - high investment = content/documentation
        const investment = formData.investment;
        if (investment === '12000+') signal += 20;
        else if (investment === '8000-12000') signal += 16;
        else signal += 12;
        
        // Traveling (20 points) - destination = content
        if (formData.traveling === 'yes') signal += 20;
        
        // Why JX.4RT (30 points) - understanding of language
        const whyJx4rt = formData.whyJx4rt || '';
        if (whyJx4rt.toLowerCase().includes('language') || 
            whyJx4rt.toLowerCase().includes('style') ||
            whyJx4rt.toLowerCase().includes('aesthetic')) signal += 30;
        else if (whyJx4rt.length > 50) signal += 20;
        else signal += 10;
        
        return Math.min(signal, 100);
    },
    
    /**
     * Calculate Value Dimensions (1-10 scale)
     */
    calculateValueDimensions(formData) {
        const commercialSignal = this.calculateCommercialSignal(formData);
        const artisticSignal = this.calculateArtisticSignal(formData);
        const reputationSignal = this.calculateReputationSignal(formData);
        const relationshipSignal = this.calculateRelationshipSignal(formData);
        const expansionSignal = this.calculateExpansionSignal(formData);
        
        return {
            commercial: Math.ceil(commercialSignal / 10),
            artistic: Math.ceil(artisticSignal / 10),
            reputation: Math.ceil(reputationSignal / 10),
            relationship: Math.ceil(relationshipSignal / 10),
            expansion: Math.ceil(expansionSignal / 10)
        };
    },
    
    /**
     * Classify project strategically (multi-label)
     * Returns array of classifications, not single label
     */
    classifyProject(formData, valueDimensions) {
        const classifications = [];
        
        // CASH PROJECT
        if (valueDimensions.commercial >= 7) {
            classifications.push('CASH');
        }
        
        // ART PROJECT
        if (valueDimensions.artistic >= 7) {
            classifications.push('ART');
        }
        
        // SIGNATURE PROJECT
        if (valueDimensions.artistic >= 8 && valueDimensions.reputation >= 7) {
            classifications.push('SIGNATURE');
        }
        
        // DESTINATION PROJECT
        if (formData.traveling === 'yes') {
            classifications.push('DESTINATION');
        }
        
        // COLLABORATION
        if (formData.whyJx4rt && formData.whyJx4rt.toLowerCase().includes('collaboration')) {
            classifications.push('COLLABORATION');
        }
        
        // IP PROJECT
        if (valueDimensions.expansion >= 8 && formData.authorship === 'development') {
            classifications.push('IP');
        }
        
        // EXPERIMENTAL
        if (formData.authorship === 'development' && valueDimensions.commercial <= 5) {
            classifications.push('EXPERIMENTAL');
        }
        
        // Default classification if none matched
        if (classifications.length === 0) {
            classifications.push('STANDARD');
        }
        
        return classifications;
    },
    
    /**
     * Get recommended action based on classifications
     */
    getRecommendedAction(classifications) {
        if (classifications.includes('SIGNATURE')) return 'personal_proposal';
        if (classifications.includes('DESTINATION')) return 'direct_contact';
        if (classifications.includes('COLLABORATION')) return 'strategic_discussion';
        if (classifications.includes('IP')) return 'ip_evaluation';
        if (classifications.includes('EXPERIMENTAL')) return 'learning_opportunity';
        if (classifications.includes('CASH')) return 'standard_quote';
        if (classifications.includes('ART')) return 'manual_review';
        return 'standard_quote';
    },
    
    /**
     * Calculate project complexity (legacy, for backward compatibility)
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
     * Process project data and generate intelligence
     */
    processProject(formData) {
        const commercialSignal = this.calculateCommercialSignal(formData);
        const artisticSignal = this.calculateArtisticSignal(formData);
        const reputationSignal = this.calculateReputationSignal(formData);
        const relationshipSignal = this.calculateRelationshipSignal(formData);
        const expansionSignal = this.calculateExpansionSignal(formData);
        
        const valueDimensions = this.calculateValueDimensions(formData);
        const classifications = this.classifyProject(formData, valueDimensions);
        const recommendedAction = this.getRecommendedAction(classifications);
        const complexity = this.calculateComplexity(formData);
        
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
            
            // Multi-dimensional intelligence
            intelligence: {
                signals: {
                    commercial: commercialSignal,
                    artistic: artisticSignal,
                    reputation: reputationSignal,
                    relationship: relationshipSignal,
                    expansion: expansionSignal
                },
                valueDimensions,
                classifications,
                complexity,
                recommendedAction
            },
            
            // Legacy fields for backward compatibility
            legacy: {
                score: Math.round((commercialSignal + artisticSignal) / 2),
                classification: classifications[0] || 'STANDARD'
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
     * Save project to localStorage
     */
    saveProject(project) {
        const storageKey = JX_CONFIG?.system?.localStorageKey || 'jx4rt_leads';
        const projects = this.getProjects();
        projects.push(project);
        localStorage.setItem(storageKey, JSON.stringify(projects));
    },
    
    /**
     * Get all projects from localStorage
     */
    getProjects() {
        const storageKey = JX_CONFIG?.system?.localStorageKey || 'jx4rt_leads';
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : [];
    },
    
    /**
     * Get projects by classification
     */
    getProjectsByClassification(classification) {
        const projects = this.getProjects();
        return projects.filter(project => 
            project.intelligence.classifications.includes(classification)
        );
    },
    
    /**
     * Get analytics summary
     */
    getAnalytics() {
        const projects = this.getProjects();
        
        return {
            total: projects.length,
            byClassification: {
                CASH: projects.filter(p => p.intelligence.classifications.includes('CASH')).length,
                ART: projects.filter(p => p.intelligence.classifications.includes('ART')).length,
                SIGNATURE: projects.filter(p => p.intelligence.classifications.includes('SIGNATURE')).length,
                DESTINATION: projects.filter(p => p.intelligence.classifications.includes('DESTINATION')).length,
                COLLABORATION: projects.filter(p => p.intelligence.classifications.includes('COLLABORATION')).length,
                IP: projects.filter(p => p.intelligence.classifications.includes('IP')).length,
                EXPERIMENTAL: projects.filter(p => p.intelligence.classifications.includes('EXPERIMENTAL')).length,
                STANDARD: projects.filter(p => p.intelligence.classifications.includes('STANDARD')).length
            },
            bySource: this.groupBy(projects, 'acquisition.source'),
            byInvestment: this.groupBy(projects, 'investment.range'),
            averageCommercialSignal: projects.length > 0 
                ? projects.reduce((sum, p) => sum + p.intelligence.signals.commercial, 0) / projects.length 
                : 0,
            averageArtisticSignal: projects.length > 0    
                ? projects.reduce((sum, p) => sum + p.intelligence.signals.artistic, 0) / projects.length 
                : 0
        };
    },
    
    /**
     * Helper to group projects by field
     */
    groupBy(projects, field) {
        return projects.reduce((acc, project) => {
            const value = this.getNestedValue(project, field) || 'unknown';
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    },
    
    /**
     * Get nested object value by dot notation
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, prop) => current && current[prop], obj);
    }
};

// Backward compatibility alias
const LeadIntelligence = ProjectIntelligence;

// Form Handler & Stepper Logic
const FormHandler = {
    currentStep: 1,
    totalSteps: 4,
    titles: [
        "01 // IDENTITY & CONTACT",
        "02 // PROJECT DETAILS",
        "03 // INTENTION",
        "04 // LOGISTICS"
    ],

    init() {
        this.form = document.getElementById('intake-form');
        if (!this.form) return;

        this.steps = this.form.querySelectorAll('.form-step');
        this.progressBars = this.form.querySelectorAll('.progress-bar');
        this.stepTitle = document.getElementById('step-title');
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Navigation Buttons
        this.form.querySelectorAll('.btn-next').forEach(btn => {
            btn.addEventListener('click', () => this.nextStep());
        });
        this.form.querySelectorAll('.btn-prev').forEach(btn => {
            btn.addEventListener('click', () => this.prevStep());
        });
        
        // Allergies toggle
        const allergiesSelect = document.getElementById('allergies');
        if (allergiesSelect) {
            allergiesSelect.addEventListener('change', (e) => {
                const detail = document.getElementById('allergiesDetail');
                if (detail) {
                    detail.style.display = e.target.value === 'yes' ? 'block' : 'none';
                }
            });
        }
        
        // Age validation on birthdate change
        const birthdateInput = document.getElementById('birthdate');
        if (birthdateInput) {
            birthdateInput.addEventListener('change', (e) => {
                const age = this.calculateAge(e.target.value);
                if (age < 18) {
                    alert('You must be 18 or older to get a tattoo.');
                    e.target.value = '';
                }
            });
        }
    },
    
    calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
    
    validateStep() {
        const currentStepEl = this.form.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const inputs = currentStepEl.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red'; // Simple error feedback
            } else {
                input.style.borderColor = 'var(--border)';
            }
        });
        
        return isValid;
    },

    nextStep() {
        if (!this.validateStep()) return;
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateUI();
        }
    },

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    },

    updateUI() {
        // Update Steps Visibility
        this.steps.forEach(step => {
            step.style.display = parseInt(step.dataset.step) === this.currentStep ? 'contents' : 'none';
        });

        // Update Progress Bar
        this.progressBars.forEach((bar, index) => {
            if (index < this.currentStep) {
                bar.style.background = 'var(--text-primary)';
            } else {
                bar.style.background = 'var(--border)';
            }
        });

        // Scramble Title
        this.scrambleText(this.stepTitle, this.titles[this.currentStep - 1]);
        
        // Scroll to top of form
        const intakeSection = document.getElementById('intake');
        if (intakeSection) {
            intakeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    scrambleText(element, newText) {
        const chars = '!<>-_\\\\/[]{}—=+*^?#_';
        let iteration = 0;
        
        clearInterval(element.scrambleInterval);
        
        element.scrambleInterval = setInterval(() => {
            element.innerText = newText.split('').map((letter, index) => {
                if(index < iteration) {
                    return newText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            
            if(iteration >= newText.length) {
                clearInterval(element.scrambleInterval);
            }
            iteration += 1 / 3; // Controls speed
        }, 30);
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateStep()) return;
        
        const formData = this.getFormData(e.target);
        const project = ProjectIntelligence.processProject(formData);
        
        ProjectIntelligence.saveProject(project);
        
        // Simulate System Processing
        this.stepTitle.innerText = "PROCESSING // ASSESSING VALUE...";
        this.steps.forEach(s => s.style.display = 'none');
        this.form.querySelector('.form-progress').style.display = 'none';
        
        setTimeout(() => {
            this.showSuccess(project);
            e.target.reset();
            this.currentStep = 1;
            this.updateUI();
            this.form.querySelector('.form-progress').style.display = 'flex';
        }, 1500);
    },
    
    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            // Handle file uploads - convert to placeholder for Netlify Forms
            if (value instanceof File) {
                data[key] = `[FILE: ${value.name}]`;
            } else {
                data[key] = value;
            }
        });
        return data;
    },
    
    showSuccess(project) {
        const classifications = project.intelligence.classifications.join(', ');
        const signals = project.intelligence.signals;
        
        alert(`ACCESS GRANTED\n\nPROJECT IDENTIFIER: ${project.id}\nCLASSIFICATIONS: ${classifications}\n\nSIGNALS:\nCommercial: ${signals.commercial}/100\nArtistic: ${signals.artistic}/100\nReputation: ${signals.reputation}/100\nRelationship: ${signals.relationship}/100\nExpansion: ${signals.expansion}/100\n\nVALUE DIMENSIONS:\nCommercial: ${project.intelligence.valueDimensions.commercial}/10\nArtistic: ${project.intelligence.valueDimensions.artistic}/10\nReputation: ${project.intelligence.valueDimensions.reputation}/10\nRelationship: ${project.intelligence.valueDimensions.relationship}/10\nExpansion: ${project.intelligence.valueDimensions.expansion}/10\n\nDATA TRANSMITTED.`);
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
