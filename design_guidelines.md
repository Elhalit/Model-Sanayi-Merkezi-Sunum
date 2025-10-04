# Design Guidelines: Kapaklı Model Sanayi Merkezi

## Design Approach: Reference-Based Premium Industrial

Drawing inspiration from high-end real estate platforms (Sotheby's, Knight Frank) combined with modern industrial aesthetics. Full-screen horizontal scroll creates immersive presentation format ideal for premium commercial property showcase.

## Core Design Elements

### A. Color Palette
**Dark Mode (Primary)**
- Background: 10 15% 9% (existing #0a1929 dark blue-gray)
- Surface elevated: 210 20% 12%
- Glass overlay: 210 15% 15% / 40%
- Accent gold: 45 95% 56% (existing #f9a825)
- Text primary: 0 0% 98%
- Text secondary: 210 10% 70%

### B. Typography
- Headings: Inter or Poppins (600-700 weight), large scale for impact
- Body: Inter (400-500 weight)
- Scale: Hero 4xl-6xl, Section headers 3xl-4xl, Body lg-xl

### C. Layout System
Full-screen horizontal scroll sections, each 100vw × 100vh
Spacing: 4, 6, 8, 12, 16, 24 units
Grid: 12-column for content alignment within sections

### D. Glassmorphism Treatment
- Backdrop blur: 20px-40px
- Border: 1px solid white/10%
- Background: dark with 30-50% opacity
- Subtle shadow for depth

## Navigation & Language Switcher

**Fixed Top Navigation (Glassmorphic Bar)**
- Logo left, horizontal section indicators center, language switcher + CTA right
- Glass navbar: backdrop-blur-xl, border-b border-white/10, bg-[10 15% 9%]/80
- Language Switcher: Glassmorphic button group, EN/TR toggle with golden underline indicator on active state, smooth slide animation
- Smooth fade on scroll, always accessible

**Section Navigation Dots**
- Fixed right edge, vertical dot indicators
- Active section: golden filled circle, others: white/30% outline
- Click to jump to section

## Section Layouts (8 Full-Screen Horizontal Sections)

### Section 1: Hero
**Layout:** Full-bleed aerial/architectural photography with centered content overlay
- Large hero image: Dramatic aerial view of industrial complex at dusk/night
- Center-aligned content with glassmorphic container (max-w-4xl)
- H1: "KAPAKLΙ MODEL SANAYİ MERKEZİ" (6xl, golden gradient text)
- Subtitle: Investment opportunity tagline (xl, text-secondary)
- Dual CTA: Primary golden button + outline button (blurred bg for outline)
- Scroll indicator: Animated golden arrow pointing right

### Section 2: Overview Statistics
**Layout:** Split 60/40 with data visualization
- Left: 3×2 grid of key metrics in glassmorphic cards (total area, units, occupancy, ROI)
- Right: Infographic or 3D building visualization
- Golden accent numbers (5xl) with subtle count-up animation
- Each card: icon, metric, label with glass treatment

### Section 3: Location & Infrastructure  
**Layout:** Interactive map integration
- Full-screen map background (darker overlay 60% opacity)
- Left sidebar: Glassmorphic panel listing proximity to highways, airports, ports
- Map markers: Golden pins with distance labels
- Bottom: Transportation timeline graphic

### Section 4: Unit Types & Floor Plans
**Layout:** Tabbed carousel showcase
- Top: Glassmorphic tab switcher (Unit A, B, C, D)
- Center: Large floor plan visualization with golden accent highlights
- Right sidebar: Unit specifications in glass cards (area, height, features)
- 3D unit preview option toggle

### Section 5: Facilities & Amenities
**Layout:** 4-column icon grid with hover reveals
- Grid of glassmorphic cards (security, parking, loading docks, fiber internet, cafeteria)
- Each card: Icon (golden), title, expandable description on hover
- Background: Subtle facility photos at 20% opacity
- Bottom: Virtual tour CTA

### Section 6: Investment Opportunity
**Layout:** Financial dashboard aesthetic
- Left: ROI calculator in glassmorphic container with golden accents
- Center: Growth projection chart/graph
- Right: Key investment highlights (bullet points in glass cards)
- All interactive elements with golden hover states

### Section 7: Gallery Showcase
**Layout:** Masonry grid with lightbox
- 6-8 high-quality property photos in staggered glass-bordered grid
- Images: Construction progress, completed units, amenities, aerial shots
- Click to expand: Full-screen lightbox with golden close button
- Caption overlays: Glass treatment with golden accent line

### Section 8: Contact & CTA
**Layout:** Split form and information
- Left: Inquiry form in large glassmorphic container (name, email, phone, message)
- Right: Contact info cards (address, phone, email) + embedded mini map
- Primary CTA: "Schedule Site Visit" (golden button, 2xl)
- Social proof: "Trusted by 50+ businesses" badge

## Animations & Interactions

**Horizontal Scroll Behavior:**
- GSAP-driven smooth snapping between sections
- Parallax: Background images move slower than content
- Section transitions: Fade + slide with 0.8s ease
- Scroll progress indicator: Golden line at top

**Micro-interactions:**
- Buttons: Scale 1.05 on hover, golden glow
- Glass cards: Lift with stronger blur on hover
- Form inputs: Golden border on focus
- Navigation dots: Pulse on section change

## Images Requirements

1. **Hero:** Aerial twilight shot of industrial complex (wide angle, dramatic lighting)
2. **Overview:** 3D architectural rendering or daytime facility shot
3. **Location:** Custom map with branded markers
4. **Floor Plans:** Technical blueprints with golden highlights
5. **Amenities:** 4-6 facility detail shots (security system, modern loading bay, office interior)
6. **Gallery:** 8 diverse shots - exterior, interior units, construction progress, aerial views
7. **Contact:** Location map pin graphic

## Component Specifications

**Glassmorphic Cards:**
```
bg-[210 20% 12%]/40
backdrop-blur-2xl
border border-white/10
shadow-2xl shadow-black/20
```

**Golden Accent Elements:**
- Buttons, active states, highlights, CTA elements
- Gradient: from golden to amber for depth
- Use sparingly for maximum impact

**Typography Hierarchy:**
- Hero: 72px (6xl), 700 weight
- Section headers: 48px (4xl), 600 weight  
- Body: 20px (xl), 400 weight
- All with 1.3-1.5 line height

This premium industrial design prioritizes immersive full-screen presentation with sophisticated glassmorphism, strategic golden accents, and seamless horizontal navigation—perfect for showcasing commercial real estate investment opportunities.