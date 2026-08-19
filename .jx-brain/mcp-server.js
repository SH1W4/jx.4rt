#!/usr/bin/env node

/**
 * JX.4RT MCP Server - Artist OS Operational Interface
 * 
 * Model Context Protocol server for JX.4RT Artist OS integration with IDEs
 * Provides access to modular brain knowledge, multi-dimensional project intelligence,
 * and operational tools for strategic decision-making.
 * 
 * Version: 2.0.0
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema
} = require('@modelcontextprotocol/sdk/types.js');
const fs = require('fs');
const path = require('path');

// JX.4RT Brain Knowledge Base - Modular Structure
const BRAIN_DIR = path.join(__dirname);
const CONFIG_PATH = path.join(__dirname, '..', 'config.js');

// Brain module paths
const BRAIN_MODULES = {
    brain: path.join(BRAIN_DIR, 'brain.md'),
    identity: path.join(BRAIN_DIR, 'identity.md'),
    artisticLanguage: path.join(BRAIN_DIR, 'artistic-language.md'),
    strategy: path.join(BRAIN_DIR, 'strategy.md'),
    pricing: path.join(BRAIN_DIR, 'pricing.md'),
    projects: path.join(BRAIN_DIR, 'projects.md'),
    clients: path.join(BRAIN_DIR, 'clients.md'),
    opportunities: path.join(BRAIN_DIR, 'opportunities.md'),
    ip: path.join(BRAIN_DIR, 'intellectual-property.md'),
    reputation: path.join(BRAIN_DIR, 'reputation.md'),
    experiments: path.join(BRAIN_DIR, 'experiments.md'),
    learning: path.join(BRAIN_DIR, 'learning.md'),
    decisions: path.join(BRAIN_DIR, 'decisions.md'),
    state: path.join(BRAIN_DIR, 'state.md')
};

// Create MCP Server
const server = new Server(
    {
        name: 'jx4rt-artist-os-mcp',
        version: '2.0.0',
    },
    {
        capabilities: {
            resources: {},
            tools: {},
        },
    }
);

// Resource Handlers - Modular Brain Resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: 'jx4rt://brain/index',
                name: 'JX.4RT Brain Index',
                description: 'Overview and quick reference for the JX.4RT Artist OS knowledge base',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/identity',
                name: 'JX.4RT Identity',
                description: 'Core identity, thesis, visual identity, and absolute rules',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/artistic-language',
                name: 'JX.4RT Artistic Language',
                description: 'Language mapping, evolution, signature elements, and IP assets',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/strategy',
                name: 'JX.4RT Strategy',
                description: 'Strategic framework, prioritization, revenue strategy',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/pricing',
                name: 'JX.4RT Pricing',
                description: 'Private pricing strategy and components',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/projects',
                name: 'JX.4RT Projects',
                description: 'Project asset model, classifications, and value dimensions',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/clients',
                name: 'JX.4RT Clients',
                description: 'Client intelligence and relationship nature',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/opportunities',
                name: 'JX.4RT Opportunities',
                description: 'Opportunity engine and collaboration strategy',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/ip',
                name: 'JX.4RT Intellectual Property',
                description: 'IP asset management and derivative potential',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/reputation',
                name: 'JX.4RT Reputation',
                description: 'Reputation indicators and positioning',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://Brain/experiments',
                name: 'JX.4RT Experiments',
                description: 'Commercial and artistic experiments',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/learning',
                name: 'JX.4RT Learning',
                description: 'Learning loop and knowledge accumulation',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/decisions',
                name: 'JX.4RT Decisions',
                description: 'Decision log and rationale',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://brain/state',
                name: 'JX.4RT State',
                description: 'Current state and status',
                mimeType: 'text/markdown'
            },
            {
                uri: 'jx4rt://config',
                name: 'JX.4RT Configuration',
                description: 'Centralized configuration (PRIVATE - contains pricing and scoring)',
                mimeType: 'text/javascript'
            }
        ]
    };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    
    try {
        let content;
        let filePath;
        
        switch (uri) {
            case 'jx4rt://brain/index':
                filePath = BRAIN_MODULES.brain;
                break;
            case 'jx4rt://brain/identity':
                filePath = BRAIN_MODULES.identity;
                break;
            case 'jx4rt://brain/artistic-language':
                filePath = BRAIN_MODULES.artisticLanguage;
                break;
            case 'jx4rt://brain/strategy':
                filePath = BRAIN_MODULES.strategy;
                break;
            case 'jx4rt://brain/pricing':
                filePath = BRAIN_MODULES.pricing;
                break;
            case 'jx4rt://brain/projects':
                filePath = BRAIN_MODULES.projects;
                break;
            case 'jx4rt://brain/clients':
                filePath = BRAIN_MODULES.clients;
                break;
            case 'jx4rt://brain/opportunities':
                filePath = BRAIN_MODULES.opportunities;
                break;
            case 'jx4rt://brain/ip':
                filePath = BRAIN_MODULES.ip;
                break;
            case 'jx4rt://brain/reputation':
                filePath = BRAIN_MODULES.reputation;
                break;
            case 'jx4rt://brain/experiments':
                filePath = BRAIN_MODULES.experiments;
                break;
            case 'jx4rt://brain/learning':
                filePath = BRAIN_MODULES.learning;
                break;
            case 'jx4rt://brain/decisions':
                filePath = BRAIN_MODULES.decisions;
                break;
            case 'jx4rt://brain/state':
                filePath = BRAIN_MODULES.state;
                break;
            case 'jx4rt://config':
                filePath = CONFIG_PATH;
                break;
            default:
                throw new Error(`Unknown resource: ${uri}`);
        }
        
        content = fs.readFileSync(filePath, 'utf-8');
        
        return {
            contents: [
                {
                    uri,
                    mimeType: uri.includes('config') ? 'text/javascript' : 'text/markdown',
                    text: content
                }
            ]
        };
    } catch (error) {
        throw new Error(`Error reading resource ${uri}: ${error.message}`);
    }
});

// Tool Handlers - Artist OS Operational Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'query_brain',
                description: 'Query the JX.4RT Artist OS knowledge base for specific information',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'The question or topic to search for in the knowledge base'
                        },
                        module: {
                            type: 'string',
                            description: 'Specific brain module to search (identity, strategy, projects, clients, etc.)',
                            enum: ['identity', 'artistic-language', 'strategy', 'pricing', 'projects', 'clients', 'opportunities', 'ip', 'reputation', 'experiments', 'learning', 'decisions', 'state', 'all']
                        }
                    },
                    required: ['query']
                }
            },
            {
                name: 'get_config_value',
                description: 'Get a specific configuration value from JX_CONFIG (PRIVATE)',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: {
                            type: 'string',
                            description: 'Dot-notation path to config value (e.g., "artist.name", "intelligence.valueDimensions")'
                        }
                    },
                    required: ['path']
                }
            },
            {
                name: 'analyze_project',
                description: 'Analyze a project submission using multi-dimensional Project Signal Score',
                inputSchema: {
                    type: 'object',
                    properties: {
                        projectData: {
                            type: 'object',
                            description: 'Project data object matching the intake form structure',
                            properties: {
                                investment: { type: 'string' },
                                authorship: { type: 'string' },
                                traveling: { type: 'string' },
                                timeline: { type: 'string' },
                                source: { type: 'string' },
                                whyJx4rt: { type: 'string' },
                                importance: { type: 'string' },
                                meaning: { type: 'string' },
                                size: { type: 'string' }
                            }
                        }
                    },
                    required: ['projectData']
                }
            },
            {
                name: 'classify_opportunity',
                description: 'Classify an opportunity using strategic criteria',
                inputSchema: {
                    type: 'object',
                    properties: {
                        opportunityData: {
                            type: 'object',
                            description: 'Opportunity data',
                            properties: {
                                type: { type: 'string', enum: ['COLLABORATION', 'GUEST_SPOT', 'EDITORIAL', 'FASHION', 'BRAND', 'EXHIBITION', 'MEDIA', 'LICENSING', 'ART_PROJECT'] },
                                brandFit: { type: 'number', minimum: 1, maximum: 10 },
                                artisticFit: { type: 'number', minimum: 1, maximum: 10 },
                                audienceFit: { type: 'number', minimum: 1, maximum: 10 },
                                financialPotential: { type: 'number', minimum: 1, maximum: 10 },
                                reputationPotential: { type: 'number', minimum: 1, maximum: 10 },
                                creativeFreedom: { type: 'number', minimum: 1, maximum: 10 },
                                ipOwnership: { type: 'number', minimum: 1, maximum: 10 },
                                longTermValue: { type: 'number', minimum: 1, maximum: 10 }
                            }
                        }
                    },
                    required: ['opportunityData']
                }
            },
            {
                name: 'evaluate_artistic_value',
                description: 'Evaluate artistic value based on authorship, intention, and language alignment',
                inputSchema: {
                    type: 'object',
                    properties: {
                        authorship: {
                            type: 'string',
                            enum: ['reproduction', 'adaptations', 'interpretation', 'development']
                        },
                        intentionDepth: {
                            type: 'number',
                            description: 'Length of intention text (importance + meaning)',
                            minimum: 0
                        },
                        languageAlignment: {
                            type: 'number',
                            description: 'Understanding of JX.4RT language (1-10)',
                            minimum: 1,
                            maximum: 10
                        }
                    },
                    required: ['authorship']
                }
            },
            {
                name: 'evaluate_commercial_value',
                description: 'Evaluate commercial value based on investment, scale, and source',
                inputSchema: {
                    type: 'object',
                    properties: {
                        investment: {
                            type: 'string',
                            enum: ['1000-2000', '2000-4000', '4000-8000', '8000-12000', '12000+', 'reference']
                        },
                        traveling: {
                            type: 'string',
                            enum: ['yes', 'no']
                        },
                        scale: {
                            type: 'string',
                            enum: ['small', 'medium', 'large']
                        },
                        source: {
                            type: 'string',
                            enum: ['instagram', 'referral', 'research', 'returning', 'other']
                        }
                    },
                    required: ['investment']
                }
            },
            {
                name: 'evaluate_expansion_potential',
                description: 'Evaluate expansion potential for derivative works and IP',
                inputSchema: {
                    type: 'object',
                    properties: {
                        authorship: {
                            type: 'string',
                            enum: ['reproduction', 'adaptations', 'interpretation', 'development']
                        },
                        investment: {
                            type: 'string',
                            enum: ['1000-2000', '2000-4000', '4000-8000', '8000-12000', '12000+', 'reference']
                        },
                        traveling: {
                            type: 'string',
                            enum: ['yes', 'no']
                        },
                        languageUnderstanding: {
                            type: 'number',
                            description: 'Understanding of JX.4RT language (1-10)',
                            minimum: 1,
                            maximum: 10
                        }
                    },
                    required: ['authorship']
                }
            },
            {
                name: 'analyze_client',
                description: 'Analyze client relationship nature and potential',
                inputSchema: {
                    type: 'object',
                    properties: {
                        source: {
                            type: 'string',
                            enum: ['instagram', 'referral', 'research', 'returning', 'other']
                        },
                        returning: {
                            type: 'boolean'
                        },
                        referralPotential: {
                            type: 'boolean'
                        }
                    },
                    required: ['source']
                }
            },
            {
                name: 'suggest_project_strategy',
                description: 'Suggest strategic approach based on project classifications',
                inputSchema: {
                    type: 'object',
                    properties: {
                        classifications: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: ['CASH', 'ART', 'SIGNATURE', 'DESTINATION', 'COLLABORATION', 'IP', 'EXPERIMENTAL', 'STANDARD']
                            }
                        },
                        valueDimensions: {
                            type: 'object',
                            properties: {
                                commercial: { type: 'number', minimum: 1, maximum: 10 },
                                artistic: { type: 'number', minimum: 1, maximum: 10 },
                                reputation: { type: 'number', minimum: 1, maximum: 10 },
                                relationship: { type: 'number', minimum: 1, maximum: 10 },
                                expansion: { type: 'number', minimum: 1, maximum: 10 }
                            }
                        }
                    },
                    required: ['classifications']
                }
            },
            {
                name: 'record_decision',
                description: 'Record a strategic decision in the decisions.md module',
                inputSchema: {
                    type: 'object',
                    properties: {
                        decision: {
                            type: 'string',
                            description: 'The decision made'
                        },
                        reason: {
                            type: 'string',
                            description: 'Reason for the decision'
                        },
                        tradeoff: {
                            type: 'string',
                            description: 'Trade-offs of the decision'
                        },
                        impact: {
                            type: 'string',
                            description: 'Impact of the decision'
                        }
                    },
                    required: ['decision', 'reason']
                }
            },
            {
                name: 'record_experiment',
                description: 'Record an experiment in the experiments.md module',
                inputSchema: {
                    type: 'object',
                    properties: {
                        hypothesis: {
                            type: 'string',
                            description: 'The hypothesis to test'
                        },
                        action: {
                            type: 'string',
                            description: 'The action to take'
                        },
                        metric: {
                            type: 'string',
                            description: 'The metric to measure'
                        }
                    },
                    required: ['hypothesis', 'action', 'metric']
                }
            },
            {
                name: 'record_result',
                description: 'Record experiment result and conclusion',
                inputSchema: {
                    type: 'object',
                    properties: {
                        experimentId: {
                            type: 'string',
                            description: 'ID of the experiment'
                        },
                        result: {
                            type: 'string',
                            description: 'The result observed'
                        },
                        conclusion: {
                            type: 'string',
                            description: 'Conclusion from the result'
                        },
                        next: {
                            type: 'string',
                            description: 'Next action based on conclusion'
                        }
                    },
                    required: ['experimentId', 'result', 'conclusion']
                }
            },
            {
                name: 'update_learning',
                description: 'Update learning.md with new knowledge',
                inputSchema: {
                    type: 'object',
                    properties: {
                        topic: {
                            type: 'string',
                            description: 'Topic of learning (e.g., Artistic Language, Commercial, Reputation, Process)'
                        },
                        observation: {
                            type: 'string',
                            description: 'What was observed'
                        },
                        conclusion: {
                            type: 'string',
                            description: 'Conclusion from observation'
                        },
                        next: {
                            type: 'string',
                            description: 'Next action based on learning'
                        }
                    },
                    required: ['topic', 'observation', 'conclusion']
                }
            },
            {
                name: 'validate_change',
                description: 'Validate a proposed change against JX.4RT Artist OS principles',
                inputSchema: {
                    type: 'object',
                    properties: {
                        changeType: {
                            type: 'string',
                            description: 'Type of change: visual, content, architecture, logic, strategic',
                            enum: ['visual', 'content', 'architecture', 'logic', 'strategic']
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the proposed change'
                        }
                    },
                    required: ['changeType', 'description']
                }
            },
            {
                name: 'generate_documentation',
                description: 'Generate documentation for a specific component or feature',
                inputSchema: {
                    type: 'object',
                    properties: {
                        component: {
                            type: 'string',
                            description: 'Component name (e.g., project-intake, admin-panel, hero-section, mcp-server)'
                        }
                    },
                    required: ['component']
                }
            }
        ]
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
        switch (name) {
            case 'query_brain': {
                const module = args.module || 'all';
                const query = args.query.toLowerCase();
                
                let content = '';
                let filesToSearch = [];
                
                if (module === 'all') {
                    filesToSearch = Object.values(BRAIN_MODULES);
                } else {
                    const moduleMap = {
                        'identity': 'identity',
                        'artistic-language': 'artisticLanguage',
                        'strategy': 'strategy',
                        'pricing': 'pricing',
                        'projects': 'projects',
                        'clients': 'clients',
                        'opportunities': 'opportunities',
                        'ip': 'ip',
                        'reputation': 'reputation',
                        'experiments': 'experiments',
                        'learning': 'learning',
                        'decisions': 'decisions',
                        'state': 'state'
                    };
                    const moduleKey = moduleMap[module];
                    if (moduleKey && BRAIN_MODULES[moduleKey]) {
                        filesToSearch = [BRAIN_MODULES[moduleKey]];
                    }
                }
                
                // Search in selected files
                for (const filePath of filesToSearch) {
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const lines = fileContent.split('\n');
                    const relevantLines = lines.filter(line => 
                        line.toLowerCase().includes(query) || 
                        line.toLowerCase().includes(query.replace(' ', '_')) ||
                        line.toLowerCase().includes(query.replace(' ', '-'))
                    );
                    
                    if (relevantLines.length > 0) {
                        content += `\n--- ${path.basename(filePath)} ---\n`;
                        content += relevantLines.slice(0, 15).join('\n') + '\n';
                    }
                }
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: content || `No matches found for query: ${query} in module: ${module}`
                        }
                    ]
                };
            }
            
            case 'get_config_value': {
                const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
                const path = args.path;
                
                // Simple path resolution (for production, use proper JSON parsing)
                const result = `Config path: ${path}\n\nTo get this value, parse the JX_CONFIG object in config.js\n\nAvailable top-level keys:\n- artist\n- pricing\n- pricing.components\n- intake\n- intelligence\n- intelligence.valueDimensions\n- intelligence.strategicClassifications\n- intelligence.tattooCategories\n- intelligence.signalScoring\n- revenue\n- opportunities\n- ip\n- projects\n- system`;
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: result
                        }
                    ]
                };
            }
            
            case 'analyze_project': {
                const projectData = args.projectData;
                
                // Calculate multi-dimensional signals (simplified version of intake.js logic)
                let commercialSignal = 0;
                let artisticSignal = 0;
                let reputationSignal = 0;
                let relationshipSignal = 0;
                let expansionSignal = 0;
                
                // Commercial Signal
                const investment = projectData.investment;
                if (investment === '12000+') commercialSignal += 40;
                else if (investment === '8000-12000') commercialSignal += 32;
                else if (investment === '4000-8000') commercialSignal += 24;
                else if (investment === '2000-4000') commercialSignal += 16;
                else if (investment === '1000-2000') commercialSignal += 8;
                
                if (projectData.traveling === 'yes') commercialSignal += 20;
                if (projectData.size && projectData.size.toLowerCase().includes('large')) commercialSignal += 20;
                else if (projectData.size && projectData.size.toLowerCase().includes('medium')) commercialSignal += 10;
                else commercialSignal += 5;
                
                const source = projectData.source;
                if (source === 'returning') commercialSignal += 20;
                else if (source === 'referral') commercialSignal += 16;
                else if (source === 'research') commercialSignal += 12;
                else if (source === 'instagram') commercialSignal += 8;
                else commercialSignal += 4;
                
                // Artistic Signal
                const authorship = projectData.authorship;
                if (authorship === 'development') artisticSignal += 40;
                else if (authorship === 'interpretation') artisticSignal += 30;
                else if (authorship === 'adaptations') artisticSignal += 20;
                else if (authorship === 'reproduction') artisticSignal += 10;
                
                const whyJx4rt = projectData.whyJx4rt || '';
                if (whyJx4rt.length > 100) artisticSignal += 30;
                else if (whyJx4rt.length > 50) artisticSignal += 24;
                else if (whyJx4rt.length > 20) artisticSignal += 18;
                else artisticSignal += 12;
                
                const importance = projectData.importance || '';
                const meaning = projectData.meaning || '';
                const intentionLength = importance.length + meaning.length;
                if (intentionLength > 200) artisticSignal += 30;
                else if (intentionLength > 100) artisticSignal += 24;
                else if (intentionLength > 50) artisticSignal += 18;
                else artisticSignal += 12;
                
                // Reputation Signal
                if (authorship === 'development') reputationSignal += 40;
                else if (authorship === 'interpretation') reputationSignal += 32;
                else if (authorship === 'adaptations') reputationSignal += 24;
                else reputationSignal += 16;
                
                if (investment === '12000+') reputationSignal += 30;
                else if (investment === '8000-12000') reputationSignal += 24;
                else if (investment === '4000-8000') reputationSignal += 18;
                else reputationSignal += 12;
                
                if (projectData.traveling === 'yes') reputationSignal += 30;
                
                // Relationship Signal
                if (source === 'returning') relationshipSignal += 40;
                else if (source === 'referral') relationshipSignal += 32;
                else if (source === 'research') relationshipSignal += 24;
                else if (source === 'instagram') relationshipSignal += 16;
                else relationshipSignal += 8;
                
                if (source === 'returning') relationshipSignal += 30;
                if (source === 'referral') relationshipSignal += 30;
                else if (whyJx4rt && whyJx4rt.toLowerCase().includes('recommend')) relationshipSignal += 20;
                else relationshipSignal += 10;
                
                // Expansion Signal
                if (authorship === 'development') expansionSignal += 30;
                else if (authorship === 'interpretation') expansionSignal += 24;
                else expansionSignal += 18;
                
                if (investment === '12000+') expansionSignal += 20;
                else if (investment === '8000-12000') expansionSignal += 16;
                else expansionSignal += 12;
                
                if (projectData.traveling === 'yes') expansionSignal += 20;
                
                if (whyJx4rt.toLowerCase().includes('language') || 
                    whyJx4rt.toLowerCase().includes('style') ||
                    whyJx4rt.toLowerCase().includes('aesthetic')) expansionSignal += 30;
                else if (whyJx4rt.length > 50) expansionSignal += 20;
                else expansionSignal += 10;
                
                // Calculate value dimensions
                const valueDimensions = {
                    commercial: Math.ceil(commercialSignal / 10),
                    artistic: Math.ceil(artisticSignal / 10),
                    reputation: Math.ceil(reputationSignal / 10),
                    relationship: Math.ceil(relationshipSignal / 10),
                    expansion: Math.ceil(expansionSignal / 10)
                };
                
                // Classify project
                const classifications = [];
                if (valueDimensions.commercial >= 7) classifications.push('CASH');
                if (valueDimensions.artistic >= 7) classifications.push('ART');
                if (valueDimensions.artistic >= 8 && valueDimensions.reputation >= 7) classifications.push('SIGNATURE');
                if (projectData.traveling === 'yes') classifications.push('DESTINATION');
                if (whyJx4rt && whyJx4rt.toLowerCase().includes('collaboration')) classifications.push('COLLABORATION');
                if (valueDimensions.expansion >= 8 && authorship === 'development') classifications.push('IP');
                if (authorship === 'development' && valueDimensions.commercial <= 5) classifications.push('EXPERIMENTAL');
                if (classifications.length === 0) classifications.push('STANDARD');
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                signals: {
                                    commercial: Math.min(commercialSignal, 100),
                                    artistic: Math.min(artisticSignal, 100),
                                    reputation: Math.min(reputationSignal, 100),
                                    relationship: Math.min(relationshipSignal, 100),
                                    expansion: Math.min(expansionSignal, 100)
                                },
                                valueDimensions,
                                classifications
                            }, null, 2)
                        }
                    ]
                };
            }
            
            case 'classify_opportunity': {
                const oppData = args.opportunityData;
                
                // Calculate opportunity score
                const totalScore = (
                    (oppData.brandFit || 5) +
                    (oppData.artisticFit || 5) +
                    (oppData.audienceFit || 5) +
                    (oppData.financialPotential || 5) +
                    (oppData.reputationPotential || 5) +
                    (oppData.creativeFreedom || 5) +
                    (oppData.ipOwnership || 5) +
                    (oppData.longTermValue || 5)
                ) / 8;
                
                let recommendation = 'EVALUATE';
                if (totalScore >= 8) recommendation = 'PURSUE';
                else if (totalScore >= 6) recommendation = 'CONSIDER';
                else if (totalScore >= 4) recommendation = 'CAUTIOUS';
                else recommendation = 'DECLINE';
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                totalScore: Math.round(totalScore * 10) / 10,
                                recommendation,
                                breakdown: oppData
                            }, null, 2)
                        }
                    ]
                };
            }
            
            case 'evaluate_artistic_value': {
                const authorship = args.authorship;
                const intentionDepth = args.intentionDepth || 0;
                const languageAlignment = args.languageAlignment || 5;
                
                let score = 0;
                if (authorship === 'development') score += 40;
                else if (authorship === 'interpretation') score += 30;
                else if (authorship === 'adaptations') score += 20;
                else score += 10;
                
                if (intentionDepth > 200) score += 30;
                else if (intentionDepth > 100) score += 24;
                else if (intentionDepth > 50) score += 18;
                else score += 12;
                
                score += (languageAlignment / 10) * 30;
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                artisticSignal: Math.min(score, 100),
                                artisticValue: Math.ceil(Math.min(score, 100) / 10)
                            }, null, 2)
                        }
                    ]
                };
            }
            
            case 'evaluate_commercial_value': {
                const investment = args.investment;
                const traveling = args.traveling;
                const scale = args.scale;
                const source = args.source;
                
                let score = 0;
                if (investment === '12000+') score += 40;
                else if (investment === '8000-12000') score += 32;
                else if (investment === '4000-8000') score += 24;
                else if (investment === '2000-4000') score += 16;
                else if (investment === '1000-2000') score += 8;
                
                if (traveling === 'yes') score += 20;
                if (scale === 'large') score += 20;
                else if (scale === 'medium') score += 10;
                else score += 5;
                
                if (source === 'returning') score += 20;
                else if (source === 'referral') score += 16;
                else if (source === 'research') score += 12;
                else if (source === 'instagram') score += 8;
                else score += 4;
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                commercialSignal: Math.min(score, 100),
                                commercialValue: Math.ceil(Math.min(score, 100) / 10)
                            }, null, 2)
                        }
                    ]
                };
            }
            
            case 'evaluate_expansion_potential': {
                const authorship = args.authorship;
                const investment = args.investment;
                const traveling = args.traveling;
                const languageUnderstanding = args.languageUnderstanding || 5;
                
                let score = 0;
                if (authorship === 'development') score += 30;
                else if (authorship === 'interpretation') score += 24;
                else score += 18;
                
                if (investment === '12000+') score += 20;
                else if (investment === '8000-12000') score += 16;
                else score += 12;
                
                if (traveling === 'yes') score += 20;
                
                score += (languageUnderstanding / 10) * 30;
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                expansionSignal: Math.min(score, 100),
                                expansionValue: Math.ceil(Math.min(score, 100) / 10)
                            }, null, 2)
                        }
                    ]
                };
            }
            
            case 'analyze_client': {
                const source = args.source;
                const returning = args.returning || false;
                const referralPotential = args.referralPotential || false;
                
                let score = 0;
                if (source === 'returning') score += 40;
                else if (source === 'referral') score += 32;
                else if (source === 'research') score += 24;
                else if (source === 'instagram') score += 16;
                else score += 8;
                
                if (returning) score += 30;
                if (referralPotential) score += 30;
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                relationshipSignal: Math.min(score, 100),
                                relationshipValue: Math.ceil(Math.min(score, 100) / 10)
                            });
                        }
                    ]
                };
            }
            
            case 'suggest_project_strategy': {
                const classifications = args.classifications;
                const valueDimensions = args.valueDimensions || {};
                
                let strategy = [];
                let priority = 'STANDARD';
                
                if (classifications.includes('SIGNATURE')) {
                    strategy.push('Prioritize this project - high artistic + reputation value');
                    strategy.push('Prepare personal proposal with portfolio integration');
                    priority = 'HIGH';
                }
                
                if (classifications.includes('DESTINATION')) {
                    strategy.push('Direct contact - client traveling specifically');
                    strategy.push('Consider content/documentation opportunity');
                    priority = 'HIGH';
                }
                
                if (classifications.includes('COLLABORATION')) {
                    strategy.push('Strategic discussion - collaboration opportunity');
                    strategy.push('Evaluate long-term relationship potential');
                }
                
                if (classifications.includes('IP')) {
                    strategy.push('IP evaluation - potential for derivative works');
                    strategy.push('Document language elements for future licensing');
                }
                
                if (classifications.includes('EXPERIMENTAL')) {
                    strategy.push('Learning opportunity - low immediate return');
                    strategy.push('Track artistic development and language evolution');
                }
                
                if (classifications.includes('CASH') && !classifications.includes('SIGNATURE')) {
                    strategy.push('Standard quote - commercial focus');
                }
                
                if (classifications.includes('ART') && !classifications.includes('SIGNATURE')) {
                    strategy.push('Manual review - artistic focus');
                }
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                priority,
                                strategy,
                                classifications,
                                valueDimensions
                            }, null, 2)
                        }
                    ]
                };
            }
            
            case 'record_decision': {
                const decisionsPath = BRAIN_MODULES.decisions;
                const decisionsContent = fs.readFileSync(decisionsPath, 'utf-8');
                
                const date = new Date().toISOString().split('T')[0];
                const entry = `\n\n## ${date}\n**Decision**: ${args.decision}\n**Reason**: ${args.reason}\n**Trade-off**: ${args.tradeoff || 'None specified'}\n**Impact**: ${args.impact || 'To be determined'}\n`;
                
                const updatedContent = decisionsContent + entry;
                fs.writeFileSync(decisionsPath, updatedContent);
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Decision recorded in decisions.md`
                        }
                    ]
                };
            }
            
            case 'record_experiment': {
                const experimentsPath = BRAIN_MODULES.experiments;
                const experimentsContent = fs.readFileSync(experimentsPath, 'utf-8');
                
                const id = 'EXP-' + Date.now();
                const date = new Date().toISOString().split('T')[0];
                const entry = `\n\n### Experiment ${id}\n**Date**: ${date}\n**Hypothesis**: ${args.hypothesis}\n**Action**: ${args.action}\n**Metric**: ${args.metric}\n**Status**: RUNNING\n`;
                
                const updatedContent = experimentsContent + entry;
                fs.writeFileSync(experimentsPath, updatedContent);
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Experiment ${id} recorded in experiments.md`
                        }
                    ]
                };
            }
            
            case 'record_result': {
                const experimentsPath = BRAIN_MODULES.experiments;
                const experimentsContent = fs.readFileSync(experimentsPath, 'utf-8');
                
                const entry = `\n**Result**: ${args.result}\n**Conclusion**: ${args.conclusion}\n**Next**: ${args.next || 'None'}\n**Status**: COMPLETED\n`;
                
                const updatedContent = experimentsContent.replace(
                    new RegExp(`### Experiment ${args.experimentId}[\\s\\S]*?Status: RUNNING`),
                    `$&${entry}`
                );
                fs.writeFileSync(experimentsPath, updatedContent);
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Result recorded for experiment ${args.experimentId}`
                        }
                    ]
                };
            }
            
            case 'update_learning': {
                const learningPath = BRAIN_MODULES.learning;
                const learningContent = fs.readFileSync(learningPath, 'utf-8');
                
                const date = new Date().toISOString().split('T')[0];
                const entry = `\n\n### ${date}\n**Topic**: ${args.topic}\n**Observation**: ${args.observation}\n**Conclusion**: ${args.conclusion}\n**Next**: ${args.next || 'None'}\n`;
                
                const updatedContent = learningContent + entry;
                fs.writeFileSync(learningPath, updatedContent);
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Learning recorded in learning.md`
                        }
                    ]
                };
            }
            
            case 'validate_change': {
                const changeType = args.changeType;
                const description = args.description;
                
                const identityContent = fs.readFileSync(BRAIN_MODULES.identity, 'utf-8');
                
                let validation = {
                    valid: true,
                    warnings: [],
                    suggestions: []
                };
                
                const descLower = description.toLowerCase();
                
                // Check against anti-patterns
                if (descLower.includes('neon') || descLower.includes('cyan') || descLower.includes('magenta')) {
                    validation.valid = false;
                    validation.warnings.push('Contains prohibited color (neon/cyan/magenta) - violates refined brutalism');
                }
                
                if (descLower.includes('glitch') && descLower.includes('excess')) {
                    validation.valid = false;
                    validation.warnings.push('Contains gratuitous glitch effect - violates refined brutalism');
                }
                
                if (descLower.includes('price') && !descLower.includes('range')) {
                    validation.valid = false;
                    validation.warnings.push('Public pricing not allowed - use investment ranges only');
                }
                
                if (descLower.includes('marketplace') || descLower.includes('multi-artist')) {
                    validation.valid = false;
                    validation.warnings.push('JX.4RT is single artist, not marketplace or multi-artist platform');
                }
                
                if (changeType === 'visual') {
                    validation.suggestions.push('Ensure changes align with refined brutalism aesthetic');
                    validation.suggestions.push('Use CSS variables for colors');
                    validation.suggestions.push('Maintain materiality, precision, visual silence');
                }
                
                if (changeType === 'strategic') {
                    validation.suggestions.push('Update decisions.md with rationale');
                    validation.suggestions.push('Check alignment with Artist OS thesis');
                    validation.suggestions.push('Evaluate impact on artistic value × economic value × reputation × recurrence × expansion');
                }
                
                if (changeType === 'architecture') {
                    validation.suggestions.push('Update brain.md ARCHITECTURE section');
                    validation.suggestions.push('Document decision in decisions.md');
                }
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(validation, null, 2)
                        }
                    ]
                };
            }
            
            case 'generate_documentation': {
                const component = args.component;
                
                const templates = {
                    'project-intake': `# Project Intake Component

## Purpose
Multi-step form capture and multi-dimensional project intelligence.

## Fields
- Identity: Name, Instagram, Email, City, Country
- Project: Description, Body area, Size, Timeline
- Intention: Importance, Meaning
- Authorship: Level selection
- Logistics: Traveling status
- Investment: Range selection
- Acquisition: Source and motivation

## Integration
- Form submission handled by intake.js
- ProjectIntelligence.processProject() for multi-dimensional scoring
- LocalStorage persistence via jx4rt_leads key

## Intelligence
Uses Project Signal Score with 5 dimensions:
- Commercial Signal (0-100)
- Artistic Signal (0-100)
- Reputation Signal (0-100)
- Relationship Signal (0-100)
- Expansion Signal (0-100)

## Classifications
Multi-label strategic classifications: CASH, ART, SIGNATURE, DESTINATION, COLLABORATION, IP, EXPERIMENTAL`,
                    
                    'admin-panel': `# Admin Panel Component

## Purpose
Development dashboard for viewing and managing project intelligence.

## Features
- Analytics overview (total, by classification, average signals)
- Project listing with filtering
- Detailed project inspection
- Project management (view, delete)
- Real-time localStorage data access

## Access
URL: /admin.html
Data source: localStorage key 'jx4rt_leads'

## Components
- Analytics cards
- Projects table
- Project detail view
- Action buttons`,
                    
                    'hero-section': `# Hero Section

## Purpose
First impression and primary conversion point.

## Structure
- Section number (01)
- Tagline (JX.4RT)
- Title (Visual language through tattoo)
- Statement (Developing symbols, composition...)
- CTAs (Start Project, View Work)

## Design
- Minimal, editorial typography
- JetBrains Mono for headers
- Inter for body text
- No excessive animations
- Clear hierarchy
- Strategic CTAs`,
                    
                    'mcp-server': `# JX.4RT MCP Server

## Purpose
Operational interface for JX.4RT Artist OS integration with IDEs.

## Version
2.0.0 - Artist OS Operational Interface

## Resources
Modular brain knowledge base:
- jx4rt://brain/index - Overview
- jx4rt://brain/identity - Core identity
- jx4rt://brain/artistic-language - Language mapping
- jx4rt://brain/strategy - Strategic framework
- jx4rt://brain/pricing - Pricing strategy
- jx4rt://brain/projects - Project asset model
- jx4rt://brain/clients - Client intelligence
- jx4rt://brain/opportunities - Opportunity engine
- jx4rt://brain/ip - IP management
- jx4rt://brain/reputation - Reputation indicators
- jx4rt://brain/experiments - Experiments
- jx4rt://brain/learning - Learning loop
- jx4rt://brain/decisions - Decision log
- jx4rt://brain/state - Current state
- jx4rt://config - Configuration (PRIVATE)

## Tools
- query_brain - Search knowledge base
- analyze_project - Multi-dimensional project analysis
- classify_opportunity - Strategic opportunity evaluation
- evaluate_artistic_value - Artistic value assessment
- evaluate_commercial_value - Commercial value assessment
- evaluate_expansion_potential - Expansion potential assessment
- analyze_client - Client relationship analysis
- suggest_project_strategy - Strategic recommendations
- record_decision - Record strategic decisions
- record_experiment - Record experiments
- record_result - Record experiment results
- update_learning - Update learning loop
- validate_change - Validate against Artist OS principles
- generate_documentation - Generate documentation`
                };
                
                const doc = templates[component] || `# ${component}\n\nDocumentation for ${component} component.\n\nTo be expanded based on implementation details.`;
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: doc
                        }
                    ]
                };
            }
            
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        throw new Error(`Error executing tool ${name}: ${error.message}`);
    }
});

// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('JX.4RT MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
