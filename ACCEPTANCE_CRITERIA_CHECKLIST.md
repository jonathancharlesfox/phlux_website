# Phlux Homepage Update - Acceptance Criteria Checklist

## ✅ Key Requirements

### Narrative Structure
- [x] **Hero**: Explains "re-thinking operational insight" in physical systems
  - Tagline: "ML inference — Re-thinking how operational insight is delivered"
  - Focus on deployable, scalable, and trusted inference systems

- [x] **Problem**: Why traditional ML and analytics fail in physical environments
  - Explains model degradation and trust issues
  - Contrasts analytics dashboards with inference systems

- [x] **Outcomes**: What kind of operational insight Phlux delivers
  - Flow inference
  - State inference
  - Condition inference

- [x] **Approach**: Shift from individual models to learning systems
  - Four-step approach clearly outlined
  - Coverage-driven scenarios, validation, packaging, monitoring

- [x] **Learning system**: Introduces "a learning system for physical assets"
  - Phlux Studio positioned as implementation of the learning system
  - Features presented as capabilities, not product specs

- [x] **Delivery modes**: Platform, managed delivery, hybrid
  - Three clear options
  - All using the same learning system

- [x] **Trust & scale**: Validation, applicability, monitoring
  - Four trust factors articulated
  - Scalability from validation explained

- [x] **Clear CTAs**: Demo / pilot
  - Multiple CTAs throughout
  - "Request a demo" and "See pilot results" prominent

### Design & Visual Language

- [x] **Background color matches phlux_ui bright mode**
  - Background: #F3F3F3
  - Radial gradients matching phlux_ui

- [x] **Visual language matches Phlux cloud app**
  - Font: "Space Grotesk", "IBM Plex Sans"
  - Sharp edges (border-radius: 0)
  - Subtle shadows
  - Clean, engineering-led aesthetic

- [x] **Logo updated**
  - Using logo-bright.png from phlux_ui
  - Proper sizing across responsive breakpoints

- [x] **Typography**
  - Restrained, structured
  - Consistent letter-spacing and weights
  - Clear hierarchy

- [x] **Color scheme**
  - Text: #18232f (ink)
  - Muted: #5b6a7b
  - Lines: #cbd5df
  - Accent: #068a6d (teal)
  - Matches phlux_ui bright mode

### Content Principles

- [x] **Mission-first narrative**
  - Leads with what Phlux is changing
  - Products emerge naturally from mission

- [x] **Inference-first focus**
  - Emphasizes inference, deployment, trust, scale
  - For physical assets specifically

- [x] **No marketing buzzwords**
  - Clean, technical language
  - Engineering-led tone

- [x] **Technical buyer comprehension**
  - Technical buyer understands mission within seconds
  - Clear value proposition

- [x] **Phlux Studio emerges naturally**
  - Not product-first
  - Positioned as mechanism for delivering the mission

- [x] **Deployable, scalable, trusted**
  - All three attributes clearly communicated
  - Specific examples and mechanisms provided

### Technical Implementation

- [x] **All changes in phlux_website repo only**
  - No modifications to other repos
  - Logo copied from phlux_ui but not modified there

- [x] **Responsive design**
  - Mobile-friendly layouts
  - Grid systems use auto-fit
  - Navigation works across breakpoints

- [x] **Consistent component styling**
  - Cards, sections, buttons all share visual language
  - Sharp corners throughout
  - Consistent shadows and spacing

- [x] **Meta description updated**
  - Reflects new narrative
  - SEO-optimized

## Testing Checklist

### Visual Testing
- [ ] Open website in browser and verify:
  - Background color matches phlux_ui (#F3F3F3)
  - Logo displays correctly
  - All sections render properly
  - No layout breaks

### Responsive Testing
- [ ] Test on different screen sizes:
  - Desktop (> 1024px)
  - Tablet (768px - 1024px)
  - Mobile (< 768px)
  - Verify navigation, cards, and grids adapt correctly

### Content Verification
- [ ] Read through homepage and verify:
  - Narrative flows logically
  - Technical language is clear
  - CTAs are prominent and functional
  - No typos or grammatical errors

### Navigation Testing
- [ ] Click through all navigation links:
  - Home → Platform
  - Home → Learning System
  - Home → Deployment
  - Home → Solutions
  - Home → Virtual Pilot
  - Home → About
  - Home → Contact

### CTA Testing
- [ ] Verify all CTAs work:
  - "Request a demo" links to contact page
  - "See pilot results" links to pilot page
  - Platform links work correctly
  - Solutions links work correctly

## Success Metrics

The homepage successfully achieves its goals if:

1. **A technical buyer understands Phlux's mission within seconds**
   - First 3 sections (hero, problem, outcomes) are immediately clear
   
2. **The role of Phlux Studio emerges naturally from the narrative**
   - Platform is presented after approach/learning system
   - Positioned as implementation, not product
   
3. **The page clearly communicates deployable, scalable, and trusted**
   - Each attribute has dedicated section or clear mention
   - Examples and mechanisms provided
   - Trust factors explicitly listed

4. **Visual consistency with phlux_ui**
   - Same background color
   - Same typography
   - Same design language

5. **Clean, engineering-led tone**
   - No buzzwords
   - Technical language
   - Structured presentation

## Notes

- All visual assets retained from original (hero image, pilot results, diagrams)
- Only homepage content updated; other pages remain unchanged
- Logo updated globally (appears in navigation on all pages)
- Meta description updated for SEO
- Summary document created for reference
