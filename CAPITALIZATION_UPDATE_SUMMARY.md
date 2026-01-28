# phluux Website Capitalization & Solutions Page Update

## Changes Completed

### 1. Solutions Page Updates

#### Removed Buttons
- ✅ Removed "Explore Studio →" button from Platform card
- ✅ Removed "Request a pilot →" button from Managed card
- ✅ Removed "Discuss hybrid approach →" button from Hybrid card

#### Equal Height Boxes
- ✅ Added CSS grid layout: `display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); align-items:stretch;`
- ✅ Made each card use flexbox: `display:flex; flex-direction:column;`
- ✅ Made "Typical engagement" section grow to fill space: `flex-grow:1;`
- ✅ All three boxes now maintain equal height regardless of content

### 2. Brand Name Capitalization

Changed "Phluux" to "phluux" throughout the website, **except** at the beginning of sentences.

#### Capitalization Rules Applied:
- **Beginning of sentences**: "Phluux" (capitalized)
- **Mid-sentence references**: "phluux" (lowercase)
- **Product name**: "phluux Studio" (lowercase "phluux", capital "Studio")
- **Company name**: "phluux LLC" (lowercase)
- **Logo alt text**: "Phluux" (kept as proper noun)

#### Files Updated for Capitalization:

**index.html**
- Footer: "Phluux LLC" → "phluux LLC"

**partials/home.html**
- Mid-sentence: "Phluux leverages" → "phluux leverages"
- Heading: "What Phluux delivers" → "What phluux delivers"
- Logo alt: Kept as "Phluux" (proper noun reference)

**partials/platform.html**
- Hero kicker: "Phluux Studio" → "phluux Studio"
- All mid-sentence references: "Phluux Studio" → "phluux Studio"

**partials/solutions.html**
- Heading: "How to work with Phluux" → "How to work with phluux"
- Beginning of sentence: "Phluux delivers" → Kept capitalized (sentence start)
- All other references: "Phluux" → "phluux"
- Product name: "Phluux Studio" → "phluux Studio"

**partials/about.html**
- Beginning: "Phluux was founded" → "phluux was founded"
- Heading: "Why Phluux Studio exists" → "Why phluux Studio exists"
- All references: "Phluux Studio" → "phluux Studio"

**partials/deployment.html**
- Mid-sentence: "Phluux can be deployed" → "phluux can be deployed"
- Alt text: "Phluux inference" → "phluux inference"
- Reference: "Phluux Studio" → "phluux Studio"

**partials/learning.html**
- All references: "Phluux Studio" → "phluux Studio"

**partials/who.html**
- Beginning: "Phluux was founded" → "phluux was founded"

**partials/use.html**
- Mid-sentence: "Phluux infers" → "phluux infers"

**partials/how.html**
- Mid-sentence: "Phluux can be deployed" → "phluux can be deployed"
- Alt text: "Phluux inference" → "phluux inference"

## Summary

### Brand Identity Updates
✅ **Company Name**: phluux LLC (lowercase)
✅ **Platform Name**: phluux Studio (lowercase phluux, capital Studio)
✅ **Domain**: thephluux.com
✅ **In Sentences**: "Phluux" at start, "phluux" elsewhere

### Solutions Page Improvements
✅ **Cleaner Layout**: Removed all buttons from the three option cards
✅ **Equal Heights**: All three cards now maintain consistent height
✅ **Better Visual Balance**: Flex-grow ensures content fills available space

## Examples of Correct Usage

**Correct:**
- "Phluux delivers trusted machine learning..." (beginning of sentence)
- "...whether you use phluux Studio or engage us..." (mid-sentence)
- "phluux was founded by Jonathan Fox..." (beginning, but company name)
- "© 2026 phluux LLC" (company name in footer)

**Logo/Proper Noun:**
- `<img alt="Phluux">` (logo reference - kept capitalized)

## Files Modified

- 11 HTML files updated for capitalization
- 1 HTML file (solutions.html) updated for layout and buttons
- Total brand references updated: ~30+ instances

All changes maintain consistency with the new brand identity while respecting standard capitalization rules for sentences.
