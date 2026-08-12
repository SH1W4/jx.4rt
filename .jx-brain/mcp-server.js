#!/usr/bin/env node

/**
 * JX.4RT MCP Server
 * 
 * Model Context Protocol server for JX.4RT project integration with IDEs
 * Provides access to project knowledge, configuration, and tools
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

// JX.4RT Brain Knowledge Base
const BRAIN_PATH = path.join(__dirname, 'brain.md');
const CONFIG_PATH = path.join(__dirname, '..', 'config.js');
const INDEX_PATH = path.join(__dirname, '..', 'index.html');
const INTAKE_PATH = path.join(__dirname, '..', 'intake.js');

// Create MCP Server
const server = new Server(
    {
        name: 'jx4rt-mcp-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            resources: {},
            tools: {},
        },
    }
);

// Resource Handlers
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: 'file://jx4rt-brain',
                name: 'JX.4RT Brain',
                description: 'Complete project knowledge base including architecture, patterns, and decision log',
                mimeType: 'text/markdown'
            },
            {
                uri: 'file://jx4rt-config',
                name: 'JX.4RT Configuration',
                description: 'Centralized configuration object with artist info, pricing, and intelligence settings',
                mimeType: 'text/javascript'
            },
            {
                uri: 'file://jx4rt-architecture',
                name: 'JX.4RT Architecture',
                description: 'Project architecture and file structure',
                mimeType: 'text/markdown'
            },
            {
                uri: 'file://jx4rt-patterns',
                name: 'JX.4RT Design Patterns',
                description: 'Design patterns and coding conventions',
                mimeType: 'text/markdown'
            },
            {
                uri: 'file://jx4rt-scoring',
                name: 'JX.4RT Lead Scoring Logic',
                description: 'Lead intelligence scoring algorithm and classification rules',
                mimeType: 'text/markdown'
            }
        ]
    };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    
    try {
        let content;
        
        switch (uri) {
            case 'file://jx4rt-brain':
                content = fs.readFileSync(BRAIN_PATH, 'utf-8');
                break;
            case 'file://jx4rt-config':
                content = fs.readFileSync(CONFIG_PATH, 'utf-8');
                break;
            case 'file://jx4rt-architecture':
                const brainContent = fs.readFileSync(BRAIN_PATH, 'utf-8');
                const archMatch = brainContent.match(/## ARCHITECTURE[\s\S]*?(?=##|$)/);
                content = archMatch ? archMatch[0] : 'Architecture section not found';
                break;
            case 'file://jx4rt-patterns':
                const brainContent2 = fs.readFileSync(BRAIN_PATH, 'utf-8');
                const patternMatch = brainContent2.match(/## DESIGN PATTERNS[\s\S]*?(?=##|$)/);
                content = patternMatch ? patternMatch[0] : 'Patterns section not found';
                break;
            case 'file://jx4rt-scoring':
                const brainContent3 = fs.readFileSync(BRAIN_PATH, 'utf-8');
                const scoreMatch = brainContent3.match(/## LEAD SCORING LOGIC[\s\S]*?(?=##|$)/);
                content = scoreMatch ? scoreMatch[0] : 'Scoring section not found';
                break;
            default:
                throw new Error(`Unknown resource: ${uri}`);
        }
        
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

// Tool Handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'query_brain',
                description: 'Query the JX.4RT knowledge base for specific information about the project',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'The question or topic to search for in the knowledge base'
                        }
                    },
                    required: ['query']
                }
            },
            {
                name: 'get_config_value',
                description: 'Get a specific configuration value from JX_CONFIG',
                inputSchema: {
                    type: 'object',
                    properties: {
                        path: {
                            type: 'string',
                            description: 'Dot-notation path to config value (e.g., "artist.name", "intelligence.weights.investment")'
                        }
                    },
                    required: ['path']
                }
            },
            {
                name: 'analyze_lead',
                description: 'Analyze a lead submission and calculate score/classification',
                inputSchema: {
                    type: 'object',
                    properties: {
                        leadData: {
                            type: 'object',
                            description: 'Lead data object matching the intake form structure',
                            properties: {
                                investment: { type: 'string' },
                                authorship: { type: 'string' },
                                traveling: { type: 'string' },
                                timeline: { type: 'string' },
                                source: { type: 'string' },
                                whyJx4rt: { type: 'string' }
                            }
                        }
                    },
                    required: ['leadData']
                }
            },
            {
                name: 'get_pattern',
                description: 'Get a specific design pattern or code template',
                inputSchema: {
                    type: 'object',
                    properties: {
                        patternType: {
                            type: 'string',
                            description: 'Type of pattern: section, form, button, card, etc.',
                            enum: ['section', 'form', 'button', 'card', 'portfolio-item', 'process-step']
                        }
                    },
                    required: ['patternType']
                }
            },
            {
                name: 'update_brain',
                description: 'Update the JX.4RT brain with new information or decisions',
                inputSchema: {
                    type: 'object',
                    properties: {
                        section: {
                            type: 'string',
                            description: 'Section to update (e.g., DECISION LOG, DESIGN PATTERNS)',
                            enum: ['DECISION LOG', 'DESIGN PATTERNS', 'ARCHITECTURE', 'FUTURE ROADMAP']
                        },
                        content: {
                            type: 'string',
                            description: 'Content to add to the section'
                        }
                    },
                    required: ['section', 'content']
                }
            },
            {
                name: 'validate_change',
                description: 'Validate a proposed change against JX.4RT principles and patterns',
                inputSchema: {
                    type: 'object',
                    properties: {
                        changeType: {
                            type: 'string',
                            description: 'Type of change: visual, content, architecture, logic',
                            enum: ['visual', 'content', 'architecture', 'logic']
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
                            description: 'Component name (e.g., lead-intake, admin-panel, hero-section)'
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
                const brainContent = fs.readFileSync(BRAIN_PATH, 'utf-8');
                const query = args.query.toLowerCase();
                
                // Simple keyword search
                const lines = brainContent.split('\n');
                const relevantLines = lines.filter(line => 
                    line.toLowerCase().includes(query) || 
                    line.toLowerCase().includes(query.replace(' ', '_')) ||
                    line.toLowerCase().includes(query.replace(' ', '-'))
                );
                
                // Get context around matches
                const context = relevantLines.slice(0, 10).join('\n');
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: context || `No matches found for query: ${query}`
                        }
                    ]
                };
            }
            
            case 'get_config_value': {
                const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
                // Extract JX_CONFIG object
                const configMatch = configContent.match(/const JX_CONFIG = ({[\s\S]*?});/);
                
                if (!configMatch) {
                    throw new Error('Could not parse JX_CONFIG');
                }
                
                const configStr = configMatch[1];
                const path = args.path.split('.');
                
                // Simple path resolution (for production, use proper JSON parsing)
                const result = `Config path: ${args.path}\n\nTo get this value, parse the JX_CONFIG object in config.js\n\nAvailable top-level keys:\n- artist\n- pricing\n- intake\n- intelligence\n- system`;
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: result
                        }
                    ]
                };
            }
            
            case 'analyze_lead': {
                const leadData = args.leadData;
                
                // Calculate score based on logic in brain.md
                let score = 0;
                
                // Investment (25 points max)
                const investment = leadData.investment;
                if (investment === '12000+') score += 25;
                else if (investment === '8000-12000') score += 20;
                else if (investment === '4000-8000') score += 15;
                else if (investment === '2000-4000') score += 10;
                else if (investment === '1000-2000') score += 5;
                
                // Authorship (20 points max)
                const authorship = leadData.authorship;
                if (authorship === 'development') score += 20;
                else if (authorship === 'interpretation') score += 15;
                else if (authorship === 'adaptations') score += 10;
                else if (authorship === 'reproduction') score += 5;
                
                // Traveling (20 points max)
                if (leadData.traveling === 'yes') score += 20;
                
                // Timeline (15 points max)
                if (leadData.timeline && leadData.timeline.length > 10) score += 15;
                else if (leadData.timeline) score += 10;
                else score += 5;
                
                // Source (10 points max)
                const source = leadData.source;
                if (source === 'returning') score += 10;
                else if (source === 'referral') score += 8;
                else if (source === 'instagram') score += 5;
                else if (source === 'research') score += 3;
                else score += 2;
                
                // Why JX.4RT (10 points max)
                if (leadData.whyJx4rt && leadData.whyJx4rt.length > 50) score += 10;
                else if (leadData.whyJx4rt && leadData.whyJx4rt.length > 20) score += 5;
                else score += 2;
                
                // Classification
                let classification = 'STANDARD';
                if (score >= 80) classification = 'SIGNATURE';
                else if (score >= 60) classification = 'HIGH_VALUE';
                else if (score >= 40) classification = 'QUALIFIED';
                
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                score: Math.min(score, 100),
                                classification,
                                breakdown: {
                                    investment: leadData.investment,
                                    authorship: leadData.authorship,
                                    traveling: leadData.traveling,
                                    timeline: leadData.timeline,
                                    source: leadData.source,
                                    whyJx4rt: leadData.whyJx4rt
                                }
                            }, null, 2)
                        }
                    ]
                };
            }
            
            case 'get_pattern': {
                const brainContent = fs.readFileSync(BRAIN_PATH, 'utf-8');
                const patternType = args.patternType;
                
                const patternsSection = brainContent.match(/## DESIGN PATTERNS[\s\S]*?(?=##|$)/);
                
                if (!patternsSection) {
                    throw new Error('Design patterns section not found');
                }
                
                // Extract specific pattern
                const patternRegex = new RegExp(`### ${patternType.toUpperCase()}[\\s\\S]*?(?=###|$)`, 'i');
                const patternMatch = patternsSection[0].match(patternRegex);
                
                if (patternMatch) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: patternMatch[0]
                            }
                        ]
                    };
                }
                
                // Return all patterns if specific not found
                return {
                    content: [
                        {
                            type: 'text',
                            text: patternsSection[0]
                        }
                    ]
                };
            }
            
            case 'update_brain': {
                const brainContent = fs.readFileSync(BRAIN_PATH, 'utf-8');
                const section = args.section;
                const content = args.content;
                
                // Find section and append content
                const sectionRegex = new RegExp(`(## ${section}[\\s\\S]*?)(?=##|$)`);
                const match = brainContent.match(sectionRegex);
                
                if (match) {
                    const updatedContent = brainContent.replace(
                        sectionRegex,
                        `$1\n\n### ${new Date().toISOString().split('T')[0]}\n${content}`
                    );
                    fs.writeFileSync(BRAIN_PATH, updatedContent);
                    
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Successfully updated ${section} section in JX.4RT Brain`
                            }
                        ]
                    };
                }
                
                throw new Error(`Section ${section} not found in brain.md`);
            }
            
            case 'validate_change': {
                const changeType = args.changeType;
                const description = args.description;
                
                const brainContent = fs.readFileSync(BRAIN_PATH, 'utf-8');
                
                let validation = {
                    valid: true,
                    warnings: [],
                    suggestions: []
                };
                
                // Check against anti-patterns
                const antiPatterns = brainContent.match(/### Anti-Patterns[\s\S]*?(?=###|$)/);
                
                if (antiPatterns) {
                    const descLower = description.toLowerCase();
                    
                    if (descLower.includes('neon') || descLower.includes('cyan') || descLower.includes('magenta')) {
                        validation.valid = false;
                        validation.warnings.push('Contains prohibited color (neon/cyan/magenta)');
                    }
                    
                    if (descLower.includes('glitch') && descLower.includes('excess')) {
                        validation.valid = false;
                        validation.warnings.push('Contains gratuitous glitch effect');
                    }
                    
                    if (descLower.includes('price') && !descLower.includes('range')) {
                        validation.valid = false;
                        validation.warnings.push('Public pricing not allowed - use investment ranges only');
                    }
                }
                
                if (changeType === 'visual') {
                    validation.suggestions.push('Ensure changes align with refined brutalism aesthetic');
                    validation.suggestions.push('Use CSS variables for colors');
                }
                
                if (changeType === 'architecture') {
                    validation.suggestions.push('Update brain.md ARCHITECTURE section');
                    validation.suggestions.push('Document decision in DECISION LOG');
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
                    'lead-intake': `# Lead Intake Component

## Purpose
Multi-step form capture and qualification of potential clients.

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
- LeadIntelligence.processLead() for scoring
- LocalStorage persistence via jx4rt_leads key

## Scoring
See LEAD SCORING LOGIC in brain.md for detailed scoring algorithm.`,
                    
                    'admin-panel': `# Admin Panel Component

## Purpose
Development dashboard for viewing and managing leads.

## Features
- Analytics overview (total, by classification, average score)
- Lead listing with filtering
- Detailed lead inspection
- Lead management (view, delete)
- Real-time localStorage data access

## Access
URL: /admin.html
Data source: localStorage key 'jx4rt_leads'

## Components
- Analytics cards
- Leads table
- Lead detail view
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
- No excessive animations
- Clear hierarchy
- Strategic CTAs`
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
