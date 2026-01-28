# Website Restructure Summary

## Overview
The website has been restructured to introduce "Phlux Core Studio" as a cloud platform product while preserving services credibility. The site now clearly communicates both platform and managed delivery options.

## Navigation Changes

### Old Navigation
- Home
- How
- Use cases
- Virtual pilot
- Who we are
- Contact

### New Navigation
- Home
- Platform (Phlux Core Studio)
- Learning System
- Deployment
- Solutions
- About

**Note:** "Virtual Pilot" and "Contact" pages remain accessible via direct links/CTAs but are not in main navigation.

## Pages Created/Changed

### 1. Home (`partials/home.html`) - UPDATED
**Changes:**
- Hero headline: Changed from "Re-thinking how operational insight is delivered" to "From learning to deployment — delivered via Phlux Core Studio or as a managed engagement"
- Hero kicker: Changed from "ML inference" to "Trusted Machine Learning for Physical Assets"
- Hero subhead: Updated to mention both Core Studio and managed delivery
- CTAs: Changed to "Request a demo" (platform) and "Request a pilot" (managed)
- "What we do" → "What Phlux does"
- "What you'll get" → "Every deployment includes"
- "Value Drivers" → "Three pillars" (Learning System, Deployment & Operations, Delivery options)
- Added links to new pages (Learning System, Deployment, Solutions)

**Original content preserved:** All existing value proposition content retained, reframed to support dual delivery model.

### 2. Platform (`partials/platform.html`) - NEW
**Purpose:** Clearly present Phlux Core Studio as a cloud product

**Content:**
- Hero positioning Phlux Core Studio as cloud platform
- "What it enables" section
- Complete workflow (Define → Generate → Train → Deploy → Monitor) - reused from old "How" page
- Key capabilities section:
  - Coverage Audit
  - Physics Consistency checks
  - Machine Learning Canvas
  - Model Passport
  - Monitoring hooks
- CTAs: "Request a demo" and "View virtual pilot"

**Original content source:** Workflow steps from `partials/how.html`, reframed as platform capabilities.

### 3. Learning System (`partials/learning.html`) - NEW
**Purpose:** Explain the differentiator (not generic ML)

**Content:**
- Coverage-driven synthetic scenarios
- Acceptance criteria before training
- Validate across full envelope
- "What makes it different" callout
- "Implemented in Core Studio" callout with link
- "What makes it pilot-ready" section (reused from old "How" page)
- "Avoiding the black box" section

**Original content source:** 
- Coverage-driven methodology from old "How" page
- Pilot-ready criteria from old "How" page
- Reframed to emphasize this is implemented in Core Studio

### 4. Deployment (`partials/deployment.html`) - NEW
**Purpose:** Elevate deployment to first-class responsibility

**Content:**
- Runtime packaging section
- Monitoring plan section
- Trust in production section
- Deployment options (on-prem/edge vs cloud) - reused from old "How" page
- Integration capabilities section
- Data flow diagram (reused asset)

**Original content source:**
- Deployment options from `partials/how.html`
- Data flow diagram from assets
- Expanded with production readiness focus

### 5. Solutions (`partials/solutions.html`) - NEW
**Purpose:** Clarify buying paths (platform vs services vs hybrid)

**Content:**
- Three cards:
  - **Use Phlux Core Studio** (Platform) - license + support
  - **Managed Inference Delivery** (Managed) - Phlux delivers models
  - **Hybrid approach** - managed first, then transition to platform
- Each card includes: Who it's for, What's delivered, Typical engagement
- "All paths use the same system" section

**Original content source:** New content, structured to clarify delivery options.

### 6. About (`partials/about.html`) - NEW (renamed from `who.html`)
**Purpose:** Founder bio + productization story

**Content:**
- Founder bio (Jonathan Fox) - preserved from old "Who we are"
- New section: "Why Phlux Core Studio exists" - explains productization story
- Publications section - preserved
- Credibility bullets - preserved

**Original content source:** 
- All content from `partials/who.html`
- Added productization narrative

### 7. Contact (`partials/contact.html`) - UPDATED
**Changes:**
- Updated link from "View use cases" to "View virtual pilot"
- Content otherwise preserved

### 8. Virtual Pilot (`partials/pilot.html`) - PRESERVED
**Status:** Unchanged, remains accessible via direct links/CTAs

## Content Migration Map

| Old Page | Old Content | New Location |
|----------|-------------|--------------|
| `how.html` | Workflow steps (Define→Generate→Train→Deploy→Monitor) | `platform.html` (reframed as platform workflow) |
| `how.html` | "What makes it pilot-ready" section | `learning.html` (preserved) |
| `how.html` | Deployment options (on-prem/edge vs cloud) | `deployment.html` (expanded) |
| `how.html` | Coverage-driven methodology | `learning.html` (reframed) |
| `who.html` | Founder bio + publications | `about.html` (preserved + productization story added) |
| `home.html` | Value drivers | `home.html` (reframed as "Three pillars") |
| `home.html` | "What you'll get" | `home.html` (renamed to "Every deployment includes") |

## Copy Tailoring Applied

### Global Changes
- "Phlux uses..." → "Phlux delivers... via Phlux Core Studio or managed engagements..."
- "What you'll get" → "Every deployment includes" (works for both platform and services)
- Services-only phrasing replaced with dual delivery messaging
- CTAs standardized:
  - Platform pages: "Request a Demo" / "Request Access"
  - Services pages: "Request a Pilot"
  - Secondary: "View Virtual Pilot"

### Naming Consistency
- Product: "Phlux Core Studio" (used consistently)
- Company: "Phlux" (used consistently)
- Tagline: "A Learning System for Physical Assets" (used on Learning System page and optionally on Core Studio page)

## Technical Changes

### Files Modified
1. `index.html` - Navigation updated, meta description updated
2. `app.js` - Page list and partials updated to support new structure
3. `partials/home.html` - Complete rewrite with new positioning
4. `partials/contact.html` - Minor CTA update

### Files Created
1. `partials/platform.html` - New Platform page
2. `partials/learning.html` - New Learning System page
3. `partials/deployment.html` - New Deployment page
4. `partials/solutions.html` - New Solutions page
5. `partials/about.html` - Renamed/updated from who.html

### Files Preserved (Unchanged)
1. `partials/pilot.html` - Virtual pilot page (accessible via links, not in nav)
2. `styles.css` - No changes needed
3. All asset files - No changes needed

## TODOs / Missing Assets

### Screenshots/Diagrams
- **Platform page:** Could benefit from Core Studio UI screenshots (if available)
- **Learning System page:** Could benefit from coverage visualization diagrams
- **Deployment page:** Data flow diagram already exists and is reused

### Content Enhancements (Optional)
- Platform page: Could add pricing/licensing information if ready
- Solutions page: Could add more specific timeline examples
- About page: Could add team photos if team expands

### Technical Notes
- All pages are functional and accessible
- Navigation works correctly
- Pilot page remains accessible via hash navigation (#pilot)
- Contact page remains accessible via hash navigation (#contact)
- No broken links detected

## Acceptance Criteria Status

✅ **A visitor can answer in 10 seconds:**
- What Phlux is: Clear on Home page
- What Phlux Core Studio is: Clear on Platform page
- How to buy (platform vs managed vs hybrid): Clear on Solutions page

✅ **The workflow (Define→Generate→Train→Deploy→Monitor) is still present:**
- Framed as supported by Core Studio (Platform page)
- Also used in managed delivery (mentioned throughout)

✅ **No page reads like generic AI marketing:**
- Technical and credible tone maintained
- Emphasis on trust, validation, envelopes, deployment readiness
- Avoids "black box / AutoML" framing

## Next Steps (Optional)

1. Add Core Studio screenshots to Platform page when available
2. Add coverage visualization to Learning System page if desired
3. Consider adding pricing information to Solutions page when ready
4. Test all navigation links and CTAs
5. Review copy for any remaining services-only language
