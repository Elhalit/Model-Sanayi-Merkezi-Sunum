# Design System - Model Sanayi Merkezi

## Typography Scale

### Headers
- **Page Title (H1)**: `text-4xl md:text-5xl lg:text-6xl font-black`
- **Section Title (H2)**: `text-2xl md:text-3xl lg:text-4xl font-black`
- **Subsection Title (H3)**: `text-lg md:text-xl font-semibold`
- **Component Title (H4)**: `text-base md:text-lg font-bold`

### Body Text
- **Large Body**: `text-base md:text-lg`
- **Regular Body**: `text-sm md:text-base`
- **Small Text**: `text-xs md:text-sm`
- **Caption**: `text-xs`

### Font Weights
- **Black**: `font-black` (900) - Page titles
- **Bold**: `font-bold` (700) - Section headers, emphasis
- **Semibold**: `font-semibold` (600) - Subsection headers
- **Medium**: `font-medium` (500) - Default
- **Regular**: `font-normal` (400) - Body text

## Color System

### Primary Colors
- **Brand Orange**: `#ff5300` (Primary brand color)
- **Brand Orange Light**: `#ff6b1a` (Secondary brand color)
- **Brand Gradient**: `linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)`

### Text Colors
- **Primary Text**: `text-white` (on dark backgrounds)
- **Secondary Text**: `text-muted-foreground` (white/80)
- **Accent Text**: `text-primary` (brand orange)
- **Caption Text**: `text-white/80`

### Background Colors
- **Primary Background**: `bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`
- **Card Background**: `glass` class (glassmorphism)
- **White Background**: `bg-white` (for logo containers)

## Component Standards

### Icon Sizes
- **Large Icons**: `w-12 h-12` (48px)
- **Medium Icons**: `w-8 h-8` (32px)
- **Small Icons**: `w-6 h-6` (24px)
- **Mini Icons**: `w-4 h-4` (16px)

### Spacing Scale
- **Section Padding**: `px-8 py-16` (large screens), `px-4 py-8` (mobile)
- **Component Margin**: `mb-8` (32px), `mb-6` (24px), `mb-4` (16px)
- **Element Spacing**: `space-x-6`, `space-y-4`

### Border Radius
- **Cards**: `rounded-xl` (12px)
- **Icons**: `rounded-full`
- **Buttons**: `rounded-lg` (8px)

### Shadows
- **Cards**: `shadow-2xl`
- **Images**: `shadow-xl`

## Responsive Breakpoints

### Mobile First Approach
- **Small**: `sm:` (640px+)
- **Medium**: `md:` (768px+)
- **Large**: `lg:` (1024px+)
- **Extra Large**: `xl:` (1280px+)

### Typography Responsive Pattern
```tsx
className="text-sm md:text-base lg:text-lg"
```

### Sizing Responsive Pattern
```tsx
className="w-8 md:w-10 lg:w-12"
```

## Animation Standards

### GSAP Animations
- **Duration**: 0.8s - 1.2s for main animations
- **Easing**: `power3.out` for smooth natural feel
- **Stagger**: 0.1s - 0.2s for list animations

### CSS Transitions
- **Hover Effects**: `transition-colors`, `transition-all`
- **Duration**: 200ms - 300ms

## Usage Examples

### Page Title
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-black" style={{ 
  background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}}>
  Page Title
</h1>
```

### Section Header
```tsx
<h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary">
  Section Title
</h2>
```

### Body Text
```tsx
<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
  Body content
</p>
```

### Company Names (Icon Labels)
```tsx
<span className="text-xs md:text-sm font-bold text-white leading-tight">
  Company Name
</span>
```

This design system ensures consistency across all slides while maintaining responsive design and accessibility.