# Overview

This is a commercial real estate presentation website for Kapaklı Model Sanayi Merkezi (Kapaklı Model Industrial Center). The application is a full-screen horizontal scrolling presentation showcasing an industrial facility with interactive features for browsing available units, viewing floor plans, and exploring location advantages.

The site is built as a single-page application with a presentation-style interface that allows users to navigate through different sections horizontally, similar to a slideshow. Key features include an interactive master plan where users can click on individual units to view details, a Google Maps integration showing location advantages, and detailed information about the company and project.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server. The application follows a component-based architecture with functional components and hooks.

**Routing**: Uses Wouter for lightweight client-side routing, though the application is primarily a single-page presentation with horizontal scrolling sections rather than traditional page navigation.

**UI Components**: Built with Radix UI primitives and styled using Tailwind CSS with the shadcn/ui design system. The design follows a "new-york" style variant with dark theme as the primary color scheme (dark blue/gray background with golden yellow accents).

**State Management**: Uses React hooks for local state and TanStack Query (React Query) for server state management and data fetching. The application maintains minimal global state, relying primarily on component-level state.

**Animation**: GSAP (GreenSock Animation Platform) is integrated for complex animations including parallax effects, scroll-triggered animations, counter animations, and smooth transitions between sections. The horizontal scrolling mechanism is implemented using CSS transforms with smooth transitions.

**Styling Approach**: Utility-first CSS with Tailwind, using CSS custom properties for theme values. The design system includes a comprehensive color palette with primary (golden yellow), secondary (blue), accent (cyan), and semantic colors (success, destructive, muted).

## Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript. The server serves both the API endpoints and the static frontend assets in production.

**Development Mode**: Uses Vite's middleware mode for hot module replacement (HMR) during development, providing a seamless development experience. The server integrates Replit-specific plugins for enhanced development features when running on Replit.

**API Design**: RESTful API endpoints for unit data operations:
- `GET /api/units` - Retrieve all units
- `GET /api/units/:id` - Retrieve a specific unit
- `GET /api/units/search/:term` - Search units by term
- `GET /api/units/filter/:status` - Filter units by availability status

**Data Storage Strategy**: Currently uses in-memory storage (`MemStorage` class) loaded from a JSON file (`unitData.json`). The architecture is designed with an `IStorage` interface to allow easy migration to a database implementation. The schema is defined using Drizzle ORM, preparing for future PostgreSQL integration.

**Rationale**: The in-memory approach was chosen for simplicity and fast prototyping, with the understanding that the data volume is manageable and the system can be migrated to PostgreSQL using the existing Drizzle schema when persistence is required.

## Data Schema

**Database ORM**: Drizzle ORM with PostgreSQL dialect configured, though currently not actively used. The schema defines two main tables:

**Units Table**: Stores industrial unit information including:
- `id` (UUID primary key)
- `unitNumber` (text, unique identifier like "M-1")
- `blockName` (text, building block identifier)
- `size` (integer, square meters)
- `status` (text, 'available' or 'sold')
- `price` (integer, Turkish Lira)
- `companyName` (text, nullable, populated for sold units)
- SVG coordinates for visual representation: `x`, `y`, `width`, `height`

**Users Table**: Basic user authentication schema with username and password (prepared for future admin functionality).

**Validation**: Uses Zod schemas (via drizzle-zod) for runtime validation of data insertion and updates.

## Key Features Implementation

**Horizontal Scrolling Presentation**: Implemented using CSS transforms on a container element. Each section occupies 100vw × 100vh. Navigation is controlled by updating the transform translateX value based on the current section index.

**Interactive Master Plan**: SVG-based rendering of the facility layout with clickable unit elements. Unit coordinates from the database are used to position interactive rectangles. Color coding indicates availability (green for available, red for sold). Click handlers trigger a custom event to open a modal with unit details.

**Google Maps Integration**: Loads Google Maps JavaScript API dynamically with custom markers and polylines to show location advantages (OSB zones, highways, ports, airports). Map styling uses a dark theme matching the overall design. Toggle between roadmap and satellite views.

**Navigation System**: 
- Fixed vertical navigation dots on the right side with section names on hover
- Arrow buttons for previous/next navigation
- Keyboard shortcuts (arrow keys, Escape for fullscreen exit)
- Progress indicator showing current position
- Fullscreen toggle button

**Modal System**: Custom modal implementation using React portals and custom events. Displays detailed unit information including size, price, status, and company name for sold units.

## External Dependencies

**UI Library**: shadcn/ui with Radix UI primitives provide accessible, unstyled components that are customized with Tailwind CSS. This approach offers flexibility while maintaining accessibility standards.

**Animation Library**: GSAP for professional-grade animations including timeline control, scroll-triggered animations, and complex sequences.

**Database Driver**: @neondatabase/serverless is included for serverless PostgreSQL connections (Neon Database), preparing for deployment on Replit or serverless platforms.

**Form Management**: React Hook Form with Zod resolvers for future form implementations (currently not actively used in the presentation).

**Utilities**: 
- `clsx` and `tailwind-merge` for conditional CSS class management
- `date-fns` for date formatting operations
- `nanoid` for generating unique IDs
- `wouter` for lightweight routing

**Development Tools**:
- Replit-specific Vite plugins for enhanced development experience
- PostCSS with Tailwind CSS and Autoprefixer for CSS processing
- ESBuild for production server bundling

**Pros of Current Approach**:
- Rapid development with pre-built accessible components
- Type-safe data handling with TypeScript and Zod
- Smooth animations and professional presentation quality
- Easy migration path to database-backed storage
- Responsive design with mobile considerations

**Cons and Considerations**:
- In-memory storage means data resets on server restart
- Google Maps API key needed for location features to work
- Heavy dependency on external UI libraries increases bundle size
- Animation library (GSAP) adds significant JavaScript overhead