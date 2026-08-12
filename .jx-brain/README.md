# JX.4RT Brain & MCP Server

Knowledge base and Model Context Protocol server for JX.4RT project integration with AI-powered IDEs.

## What is this?

The JX.4RT Brain is a living knowledge base that:
- Contains complete project architecture, patterns, and decisions
- Evolves with the project through documented changes
- Provides context for AI assistants working on the codebase
- Validates changes against project principles
- Generates documentation automatically

The MCP Server exposes this knowledge to IDEs (like Cascade, Cursor, Windsurf) via the Model Context Protocol.

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. Navigate to the `.jx-brain` directory:
```bash
cd .jx-brain
```

2. Install dependencies:
```bash
npm install
```

3. The MCP server is now ready to use.

## MCP Configuration

### For Cascade IDE

Add to your MCP configuration file (usually `~/.config/cascade/mcp_config.json` or similar):

```json
{
  "mcpServers": {
    "jx4rt": {
      "command": "node",
      "args": ["/path/to/jx.4rt/.jx-brain/mcp-server.js"],
      "cwd": "/path/to/jx.4rt/.jx-brain"
    }
  }
}
```

Replace `/path/to/jx.4rt` with the actual path to your project.

### For Cursor IDE

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "jx4rt": {
      "command": "node",
      "args": ["C:\\Users\\João\\Desktop\\jx.4rt\\.jx-brain\\mcp-server.js"],
      "cwd": "C:\\Users\\João\\Desktop\\jx.4rt\\.jx-brain"
    }
  }
}
```

### For Windsurf IDE

Similar to above, add to your MCP configuration file.

## Available Resources

The MCP server provides these resources:

- **jx4rt-brain**: Complete project knowledge base
- **jx4rt-config**: Centralized configuration object
- **jx4rt-architecture**: Project architecture and structure
- **jx4rt-patterns**: Design patterns and conventions
- **jx4rt-scoring**: Lead scoring logic and rules

## Available Tools

The MCP server provides these tools:

### query_brain
Query the knowledge base for specific information.
- Input: `query` (string)
- Output: Relevant sections from brain.md

### get_config_value
Get a specific configuration value from JX_CONFIG.
- Input: `path` (string, dot notation)
- Output: Configuration value

### analyze_lead
Analyze a lead submission and calculate score/classification.
- Input: `leadData` (object)
- Output: Score, classification, and breakdown

### get_pattern
Get a specific design pattern or code template.
- Input: `patternType` (string)
- Output: Pattern code/template

### update_brain
Update the knowledge base with new information.
- Input: `section` (string), `content` (string)
- Output: Confirmation

### validate_change
Validate a proposed change against project principles.
- Input: `changeType` (string), `description` (string)
- Output: Validation result with warnings/suggestions

### generate_documentation
Generate documentation for a component.
- Input: `component` (string)
- Output: Generated documentation

## Usage Examples

### Querying the Brain
```
User: "What is the visual identity palette?"
AI: Uses query_brain tool to retrieve color variables
```

### Validating a Change
```
User: "I want to add neon green to the hero section"
AI: Uses validate_change tool
Result: { valid: false, warnings: ["Contains prohibited color"] }
```

### Getting a Pattern
```
User: "Show me the section pattern"
AI: Uses get_pattern tool with patternType="section"
```

### Analyzing a Lead
```
User: "Analyze this lead: investment=8000-12000, authorship=development"
AI: Uses analyze_lead tool
Result: { score: 85, classification: "SIGNATURE" }
```

## Updating the Brain

When making changes to the project:

1. **Document decisions** in the DECISION LOG section of `brain.md`
2. **Update patterns** if new conventions are established
3. **Version the brain** when major changes occur
4. **Use update_brain tool** via MCP to record changes

## Brain Structure

The brain.md file contains:

- **IDENTITY**: Project overview and philosophy
- **CORE PRINCIPLES**: Visual identity, anti-patterns, business model
- **ARCHITECTURE**: File structure, configuration, systems
- **NARRATIVE STRUCTURE**: Page flow and sections
- **LEAD SCORING LOGIC**: Scoring algorithm and classification
- **PROJECT INTAKE FORM**: Form fields and structure
- **CSS VARIABLES**: Design tokens
- **DESIGN PATTERNS**: Code templates and conventions
- **ACCESSIBILITY STANDARDS**: A11y requirements
- **SEO STANDARDS**: SEO requirements
- **DEVELOPMENT WORKFLOW**: Git, local dev, file priority
- **DECISION LOG**: Historical decisions and reasoning
- **FUTURE ROADMAP**: Planned enhancements
- **MCP INTEGRATION**: Server documentation
- **LEARNING & EVOLUTION**: How the brain evolves

## Evolution

The brain is designed to evolve with the project. When you:

- Add new features → Update relevant sections
- Change architecture → Document in DECISION LOG
- Establish new patterns → Add to DESIGN PATTERNS
- Make business decisions → Document in CORE PRINCIPLES

The MCP server ensures AI assistants always have access to the latest project knowledge.

## Troubleshooting

### MCP Server Not Starting
- Ensure Node.js 18+ is installed
- Check that dependencies are installed (`npm install`)
- Verify the path in your MCP configuration

### Resources Not Available
- Check that brain.md exists in the .jx-brain directory
- Verify the MCP server is running
- Check IDE logs for errors

### Tools Not Working
- Ensure the MCP server is properly configured
- Check that the tool name matches exactly
- Review server logs for error messages

## Contributing

When contributing to JX.4RT:

1. Read the brain.md to understand the project
2. Use validate_change before making visual/architecture changes
3. Update the brain.md with any new decisions or patterns
4. Use the MCP server to query existing patterns and conventions

## License

MIT - Part of JX.4RT project

---

**JX.4RT Brain v1.0.0**
