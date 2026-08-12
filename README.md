# JX.4RT - Visual Language Through Tattoo

Personal artistic portfolio and commercial intelligence system. JX.4RT develops visual language systems through tattoo, presenting artistic identity, portfolio, and positioning while capturing and qualifying high-value clients.

## 🎯 Overview

JX.4RT is not a marketplace or template. It is a single-artist digital system that:
- Presents artistic identity and visual language
- Generates desire through sophisticated narrative
- Explains the creative process
- Captures and qualifies high-value clients
- Collects information for budgeting
- Classifies leads with intelligence
- Prepares information for future proposals

## 🎨 Visual Identity

The design reflects a specific aesthetic:
- **Colors**: Deep black, white/off-white, gray
- **Elements**: Technical lines, grids, symbols, codes
- **Typography**: Editorial, archival aesthetic
- **Style**: Brutalism refined, visual system feel
- **Philosophy**: Materiality, precision, visual silence
- **Technology**: Through structure, not clichés

**Avoids**: Generic cyberpunk, neon RGB, cyan RGB, magenta, gratuitous glitch, gamer aesthetic, excess HUD, SaaS template look.

## 📐 Narrative Structure

The page follows a structured narrative flow:

1. **HERO** (01) - Visual language through tattoo
2. **STATEMENT** (02) - Not just a tattoo artist
3. **WORK** (03) - Selected projects archive
4. **VISUAL LANGUAGE** (04) - Language elements
5. **PROCESS** (06) - Development process
6. **ABOUT** (07) - Artist information
7. **PROJECT INTAKE** (08) - Multi-step qualification form
8. **FOOTER/ARCHIVE** - Contact and copyright

## 🛠️ Architecture

### Files

```
jx.4rt/
├── index.html      # Main page (HTML + CSS)
├── config.js       # Centralized configuration
├── intake.js       # Lead intelligence system
├── admin.html      # Development dashboard
└── README.md       # Documentation
```

### Configuration (config.js)

Centralized configuration object `JX_CONFIG` contains:
- Artist information (name, location, contact)
- Pricing configuration (internal use only)
- Project intake investment ranges
- Lead intelligence scoring weights
- Classification rules (STANDARD, QUALIFIED, HIGH_VALUE, SIGNATURE)
- Recommended actions per classification
- System settings (localStorage key, admin route, debug mode)

### Lead Intelligence (intake.js)

The intelligence system includes:
- **Lead Scoring**: 0-100 score based on project scale, investment, authorship, timeline, acquisition source
- **Classification**: STANDARD, QUALIFIED, HIGH_VALUE, SIGNATURE
- **Recommended Actions**: standard_quote, manual_review, personal_proposal, direct_contact
- **Complexity Analysis**: low, medium, high
- **Artistic Fit**: 0-10 score
- **Commercial Potential**: 0-10 score
- **Local Storage**: Persistence via localStorage
- **Analytics**: Summary by classification, source, investment, average score

### Admin Panel (admin.html)

Development dashboard for:
- Viewing all submitted leads
- Analytics overview (total, by classification, average score)
- Detailed lead inspection
- Lead management (view, delete)
- Real-time data from localStorage

## 🚀 Usage

### Local Development

1. Clone or download this repository
2. Open `index.html` in a browser, or:
   ```bash
   python -m http.server 8000
   ```
3. Access at `http://localhost:8000`
4. Access admin panel at `http://localhost:8000/admin.html`

### Production Deployment

1. **Update Configuration**: Edit `config.js` with real artist information
2. **Update Contact**: Replace placeholder email, Instagram, WhatsApp
3. **Update Portfolio**: Replace placeholders with real project images
4. **Configure Backend**: For production, implement backend to:
   - Send email notifications on form submission
   - Store leads in database
   - Provide API for admin panel
5. **Deploy**: Upload to any static hosting (Vercel, Netlify, GitHub Pages)

## 📊 Project Intake Form

The multi-step form collects:

**Identity**
- Name, Instagram, Email, City, Country

**Project**
- Description, Body area, Size, Timeline

**Intention**
- Importance, Meaning

**Authorship**
- Level (reproduction, adaptations, interpretation, development)

**Logistics**
- Traveling specifically for project

**Investment**
- Range selection (R$1.000–2.000 to R$12.000+)

**Acquisition**
- Why JX.4RT, Source (Instagram, Referral, Research, Returning, Other)

## 🧠 Lead Scoring Logic

Scores are calculated based on:

| Factor | Weight | Max Points |
|--------|--------|------------|
| Project Scale | Traveling/Large | 20 |
| Investment | Range | 25 |
| Authorship | Development level | 20 |
| Timeline | Defined/Flexible | 15 |
| Source | Returning/Referral | 10 |
| Why JX.4RT | Detailed response | 10 |

**Classification Thresholds**:
- **SIGNATURE**: 80+ points
- **HIGH_VALUE**: 60-79 points
- **QUALIFIED**: 40-59 points
- **STANDARD**: 0-39 points

## 🔧 Customization

### Visual Identity

Edit CSS variables in `index.html`:

```css
:root {
    --bg-deep: #080808;
    --bg: #0a0a0a;
    --bg-light: #141414;
    --bg-surface: #1a1a1a;
    --text-primary: #f5f5f5;
    --text-secondary: #a0a0a0;
    --text-muted: #606060;
    --border: #1a1a1a;
    --border-light: #252525;
}
```

### Configuration

Edit `config.js` to update:
- Artist name, location, contact
- Investment ranges
- Scoring weights
- Classification thresholds

### Content

Update HTML sections in `index.html`:
- Hero title and statement
- Portfolio projects
- Visual language elements
- Process steps
- About section

## 📝 Important Notes

- **No Backend Required Initially**: System works with localStorage for development
- **Backend-Ready Architecture**: Structured for future API/database integration
- **Single Artist Model**: JX.4RT is a personal brand, not a marketplace
- **No Fictitious Data**: Do not invent numbers, testimonials, or prices
- **No Generic Aesthetics**: Avoid cyberpunk clichés and SaaS templates
- **No Prices Publicly**: Use investment ranges in intake form only

## 🌐 SEO & Accessibility

- Meta tags for search engines
- Open Graph for social sharing
- Twitter Card support
- Structured data (Schema.org)
- ARIA labels and roles
- Semantic HTML structure
- Mobile-first responsive design
- Keyboard navigation support

## 🔒 Security

- No tokens, API keys, or credentials in frontend
- Form data stored locally (development)
- Backend required for secure data handling in production

## 📄 License

This project is a personal artistic and commercial system for JX.4RT. Use and modify freely for your own artistic brand.

---

**JX.4RT** - Visual Language Through Tattoo
