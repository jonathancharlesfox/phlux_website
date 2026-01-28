# Phlux Website Homepage Update Summary

## Objective
Updated the Phlux homepage with an inference-first narrative that emphasizes mission over products, focusing on "ML inference — Re-thinking how operational insight is delivered."

## Changes Made

### 1. Logo Update
- Copied `logo-bright.png` from `phlux_ui/src/assets/` to `phlux_website/assets/`
- Updated logo reference in `index.html` to use the new logo
- Adjusted logo sizing for consistency across responsive breakpoints

### 2. Content Restructure (`partials/home.html`)
Completely rewrote the homepage following the inference-first narrative:

#### Hero Section
- New tagline: "ML inference — Re-thinking how operational insight is delivered"
- Focus on deployable, scalable, and trusted inference systems
- Updated CTAs: "Request a demo" and "See pilot results"

#### The Problem Section
- Explains why traditional ML fails in physical environments
- Contrasts analytics dashboards with actual inference systems

#### What Phlux Delivers Section
- Three outcome cards: Flow inference, State inference, Condition inference
- Focus on operational quantities with quantified uncertainty

#### From Models to Learning Systems
- Four-step approach with numbered cards:
  1. Coverage-driven scenarios
  2. Validation upfront
  3. Runtime packaging
  4. Monitoring hooks

#### Phlux Studio Section
- Positions the platform as "a learning system for physical assets"
- Features presented as capabilities of the learning system:
  - Physics-guided scenario generation
  - Validation framework
  - Runtime packaging
  - Deployment integration

#### Delivery Modes Section
- Three cards: Platform, Managed delivery, Hybrid
- All presented as using the same learning system

#### Trust and Scale Section
- Four trust factors:
  - Validation across the envelope
  - Applicability bounds
  - Runtime monitoring
  - Scalability from validation

#### CTA Section
- Final call to action with three buttons:
  - Request a demo
  - See pilot results
  - About Phlux

### 3. Visual Design Updates (`styles.css`)

#### Color Scheme (matching phlux_ui)
- Background: `#F3F3F3` (matching phlux_ui bright mode)
- Primary text: `#18232f` (ink)
- Muted text: `#5b6a7b`
- Lines/borders: `#cbd5df`
- Accent (teal): `#068a6d`
- Secondary teal: `#1aa6b7`
- Background gradients matching phlux_ui's radial gradients

#### Typography
- Font family: "Space Grotesk", "IBM Plex Sans" (matching phlux_ui)
- Clean, engineering-focused typography
- Consistent letter-spacing and font weights

#### Component Styling
- **Sharp edges**: All border-radius changed to 0 for engineering aesthetic
- **Consistent shadows**: Light, subtle shadows (0 2px-4px rgba(0,0,0,0.04-0.06))
- **Navigation**: Updated to match phlux_ui button style with teal active state
- **Cards**: White backgrounds with subtle borders and shadows
- **Sections**: Alternating section backgrounds for visual hierarchy

#### New Component Styles
- `.outcomeCards` - Three-column grid for outcome types
- `.approachGrid` - Four-column grid for learning system steps
- `.platformFeatures` - Feature list with label/value pairs
- `.deliveryModes` - Three-column grid for delivery options
- `.trustGrid` - Four-column grid for trust factors
- `.ctaBlock` - Centered CTA section

#### Navigation Updates
- Active state: Teal background (#068a6d) with white text
- Hover state: Light teal background with border
- Font weight: 600 for better readability
- Sharp corners (border-radius: 0)

#### Topbar Updates
- Background: rgba(243, 243, 243, 0.95) with backdrop blur
- Subtle shadow for depth
- Matches phlux_ui aesthetic

### 4. Meta Description Update
Updated to reflect the new narrative:
"ML inference for physical systems — Re-thinking how operational insight is delivered. Deployable, scalable, and trusted inference systems for flow, state, and condition."

## Design Principles Applied

1. **Mission-first**: Lead with what Phlux is changing, not what it sells
2. **Inference focus**: Emphasize inference, deployment, trust, and scale
3. **No buzzwords**: Clean, engineering-led language
4. **Visual alignment**: Match phlux_ui's bright mode aesthetic
5. **Outcome-focused**: Products emerge as mechanisms supporting the mission
6. **Technical credibility**: Clear, structured presentation for technical buyers

## Responsive Considerations

- All grid layouts use `repeat(auto-fit, minmax(...))` for responsive behavior
- Feature rows stack on mobile (< 768px)
- Cards adapt to single column on smaller screens
- Navigation remains functional across breakpoints
- Logo scaling adjusted for different screen sizes

## Next Steps

The homepage now provides a clear, inference-first narrative that:
1. Explains the problem with traditional ML in physical systems
2. Shows what Phlux delivers (operational inference)
3. Describes the learning system approach
4. Introduces Phlux Studio naturally from the narrative
5. Explains delivery options
6. Establishes trust factors
7. Provides clear CTAs

The design matches the phlux_ui bright mode aesthetic, creating visual consistency across the website and application.
