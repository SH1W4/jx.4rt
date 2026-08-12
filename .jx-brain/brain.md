# JX.4RT BRAIN

> Project Knowledge Base & Evolution System
> Version: 1.0.0
> Last Updated: 2024-08-12

---

## IDENTITY

**Project**: JX.4RT - Visual Language Through Tattoo
**Type**: Personal Artistic Portfolio + Commercial Intelligence System
**Artist**: JX.4RT
**Location**: São Paulo, Brazil
**Philosophy**: Visual language development through tattoo medium

---

## CORE PRINCIPLES

### Visual Identity
- **Palette**: Deep black (#080808), white/off-white (#f5f5f5), gray (#a0a0a0)
- **Elements**: Technical lines, grids, symbols, codes
- **Typography**: Editorial, archival aesthetic (Helvetica Neue, Arial)
- **Style**: Brutalism refined, visual system feel
- **Philosophy**: Materiality, precision, visual silence
- **Technology**: Through structure, not clichés

### Anti-Patterns (What to Avoid)
- Generic cyberpunk (neon RGB, cyan RGB, magenta)
- Gratuitous glitch effects
- Gamer aesthetic
- Excess HUD elements
- SaaS template look
- Fictitious data (numbers, testimonials, prices)
- Public pricing (use investment ranges only)

### Business Model
- Single artist (not marketplace)
- Lead qualification system
- Intelligence-based classification
- No backend required initially (localStorage)
- Backend-ready architecture for future

---

## ARCHITECTURE

### File Structure
```
jx.4rt/
├── index.html          # Main page (HTML + CSS)
├── config.js           # Centralized configuration
├── intake.js           # Lead intelligence system
├── admin.html          # Development dashboard
├── .jx-brain/          # Project brain (this directory)
│   ├── brain.md        # Main knowledge base
│   ├── evolution.md    # Change log & decisions
│   └── patterns.md     # Design patterns & conventions
└── README.md           # Public documentation
```

### Configuration System
**File**: `config.js`
**Object**: `JX_CONFIG`

Contains:
- Artist information (name, location, contact)
- Pricing configuration (internal use only)
- Project intake investment ranges
- Lead intelligence scoring weights
- Classification rules
- Recommended actions per classification
- System settings (localStorage key, admin route, debug mode)

### Lead Intelligence System
**File**: `intake.js`
**Module**: `LeadIntelligence`

Capabilities:
- Lead scoring (0-100 points)
- Classification (STANDARD, QUALIFIED, HIGH_VALUE, SIGNATURE)
- Complexity analysis (low, medium, high)
- Artistic fit scoring (0-10)
- Commercial potential scoring (0-10)
- Local storage persistence
- Analytics & reporting

### Admin Panel
**File**: `admin.html`
**Access**: `/admin.html`

Features:
- Analytics dashboard
- Lead listing
- Detailed lead inspection
- Lead management (view, delete)
- Real-time localStorage data

---

## NARRATIVE STRUCTURE

The page follows a structured narrative flow:

1. **HERO (01)** - Visual language through tattoo
2. **STATEMENT (02)** - Not just a tattoo artist
3. **WORK (03)** - Selected projects archive
4. **VISUAL LANGUAGE (04)** - Language elements
5. **PROCESS (06)** - Development process
6. **ABOUT (07)** - Artist information
7. **PROJECT INTAKE (08)** - Multi-step qualification form
8. **FOOTER/ARCHIVE** - Contact and copyright

---

## LEAD SCORING LOGIC

### Scoring Factors

| Factor | Weight | Max Points | Criteria |
|--------|--------|------------|----------|
| Project Scale | Traveling/Large | 20 | Traveling = 20, Large = 15, Standard = 5 |
| Investment | Range | 25 | R$12k+ = 25, R$8k-12k = 20, R$4k-8k = 15, R$2k-4k = 10, R$1k-2k = 5 |
| Authorship | Development level | 20 | Development = 20, Interpretation = 15, Adaptations = 10, Reproduction = 5 |
| Timeline | Defined/Flexible | 15 | Detailed = 15, Basic = 10, None = 5 |
| Source | Returning/Referral | 10 | Returning = 10, Referral = 8, Instagram = 5, Research = 3 |
| Why JX.4RT | Detailed response | 10 | 50+ chars = 10, 20+ chars = 5, Less = 2 |

### Classification Thresholds
- **SIGNATURE**: 80+ points → Direct contact
- **HIGH_VALUE**: 60-79 points → Personal proposal
- **QUALIFIED**: 40-59 points → Manual review
- **STANDARD**: 0-39 points → Standard quote

---

## PROJECT INTAKE FORM

### Fields Collected

**Identity**
- Name (required)
- Instagram
- Email (required)
- City
- Country

**Project**
- Description (required)
- Body area
- Approximate size
- Timeline

**Intention**
- Why is this piece important to you? (required)
- What should this tattoo communicate? (required)

**Authorship**
- Level: reproduction, adaptations, interpretation, development

**Logistics**
- Traveling specifically for this project?

**Investment**
- Range: R$1.000–2.000, R$2.000–4.000, R$4.000–8.000, R$8.000–12.000, R$12.000+, No reference yet

**Acquisition**
- Why JX.4RT?
- Source: Instagram, Referral, Research, Returning, Other

---

## CSS VARIABLES

```css
:root {
    /* Colors */
    --bg-deep: #080808;
    --bg: #0a0a0a;
    --bg-light: #141414;
    --bg-surface: #1a1a1a;
    --text-primary: #f5f5f5;
    --text-secondary: #a0a0a0;
    --text-muted: #606060;
    --accent-line: #2a2a2a;
    --accent-grid: #1f1f1f;
    --accent-label: #404040;
    --border: #1a1a1a;
    --border-light: #252525;
    
    /* Spacing */
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 2rem;
    --space-lg: 4rem;
    --space-xl: 6rem;
}
```

---

## DESIGN PATTERNS

### Section Pattern
```html
<section id="section-id" aria-labelledby="section-title">
    <div class="section-header">
        <p class="section-number" aria-hidden="true">XX</p>
        <p class="section-tagline">TAGLINE</p>
        <h2 id="section-title" class="section-title">Title</h2>
        <p class="section-subtitle">Subtitle</p>
    </div>
    <!-- Content -->
</section>
```

### Form Pattern
```html
<div class="form-group">
    <label class="form-label" for="field-id">Label *</label>
    <input type="text" class="form-input" id="field-id" name="fieldName" required aria-required="true">
</div>
```

### Button Pattern
```html
<a href="#target" class="btn btn-primary">Action</a>
```

---

## ACCESSIBILITY STANDARDS

- Semantic HTML (section, article, nav, footer)
- ARIA labels and roles
- aria-labelledby for sections
- aria-hidden for decorative elements
- aria-required for required fields
- role="navigation" for nav
- role="list" for grids
- role="listitem" for items
- role="contentinfo" for footer
- Keyboard navigation support
- Focus states on interactive elements

---

## SEO STANDARDS

- Meta description
- Canonical URL
- Open Graph tags
- Twitter Card tags
- Structured data (Schema.org Person)
- Semantic heading hierarchy (h1, h2, h3)
- Alt text for images (when added)

---

## DEVELOPMENT WORKFLOW

### Local Development
```bash
python -m http.server 8000
# Access: http://localhost:8000
# Admin: http://localhost:8000/admin.html
```

### Git Workflow
```bash
git add .
git commit -m "descriptive message"
git push origin main
```

### File Modification Priority
1. `config.js` - Configuration changes first
2. `index.html` - Content/structure changes
3. `intake.js` - Logic changes
4. `admin.html` - Admin panel changes
5. `.jx-brain/brain.md` - Update knowledge base

---

## DECISION LOG

### 2024-08-12 - Initial Architecture
**Decision**: Single-page application with embedded CSS/JS
**Reason**: Simplicity, no build step, easy deployment
**Trade-off**: Harder to scale, but sufficient for single artist

### 2024-08-12 - localStorage for Data
**Decision**: Use localStorage for lead storage
**Reason**: No backend required initially, works for development
**Trade-off**: Data lost on browser clear, not production-ready
**Future**: Backend API + database for production

### 2024-08-12 - Lead Intelligence System
**Decision**: Implement scoring and classification
**Reason**: Qualify leads automatically, prioritize high-value clients
**Trade-off**: Complexity, but necessary for commercial intelligence

### 2024-08-12 - Visual Identity Refinement
**Decision**: Remove cyberpunk clichés, adopt refined brutalism
**Reason**: Align with artistic identity, avoid generic aesthetics
**Trade-off**: Less "flashy", more sophisticated

---

## FUTURE ROADMAP

### Phase 1: Foundation (Completed)
- [x] Visual identity alignment
- [x] Narrative structure
- [x] Project intake form
- [x] Lead intelligence
- [x] Admin panel
- [x] Documentation

### Phase 2: Enhancement (Planned)
- [ ] Real project images (replace placeholders)
- [ ] Backend API implementation
- [ ] Database integration
- [ ] Email notifications
- [ ] WhatsApp integration
- [ ] Payment processing

### Phase 3: Expansion (Future)
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] CRM integration
- [ ] Client portal
- [ ] Project management
- [ ] Gallery management system

---

## MCP INTEGRATION

The JX.4RT Brain can be accessed via MCP (Model Context Protocol) for IDE integration.

**MCP Server**: `.jx-brain/mcp-server.js` (to be created)
**Resources Available**:
- Project architecture
- Design patterns
- Configuration reference
- Lead scoring logic
- Decision history

**Tools Available**:
- Query project knowledge
- Update configuration
- Analyze lead data
- Generate documentation

---

## LEARNING & EVOLUTION

This brain document evolves with the project. When making changes:

1. **Update this file** with new decisions, patterns, or architecture changes
2. **Document the why** in the Decision Log section
3. **Update patterns** if new conventions are established
4. **Version the brain** when major changes occur

### Evolution Triggers
- New features added
- Architecture changes
- Design pattern updates
- Configuration changes
- Business model changes

---

## CONTACT & SUPPORT

**GitHub**: https://github.com/SH1W4/jx.4rt
**Email**: jx4rt@art.com
**Instagram**: @jx.4rt

---

**End of JX.4RT Brain v1.0.0**
