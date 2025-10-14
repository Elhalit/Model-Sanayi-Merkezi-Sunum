# HorizonEstate - Commercial Real Estate Presentation

A commercial real estate presentation website for Kapaklı Model Sanayi Merkezi (Kapaklı Model Industrial Center). This is a full-screen horizontal scrolling presentation showcasing an industrial facility with interactive features.

## Features

- Interactive master plan with clickable units
- Google Maps integration showing location advantages
- Horizontal scrolling presentation interface
- Multi-language support (Turkish/English)
- Detailed floor plans and unit information
- Company and project information sections
- Responsive design with modern UI components

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **Tailwind CSS** with shadcn/ui components
- **GSAP** for animations and smooth scrolling
- **React Query** for state management
- **Wouter** for routing
- **i18next** for internationalization

### Backend
- **Node.js** with Express.js
- **TypeScript** throughout
- **Drizzle ORM** for database operations
- **WebSocket** support for real-time features

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd HorizonEstate
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with your configuration:
```env
DATABASE_URL=your_database_url
PORT=5000
NODE_ENV=development
```

4. Push database schema (if using database)
```bash
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   ├── locales/       # Translation files
│   │   └── data/          # Static data files
│   └── index.html
├── server/                # Backend Express server
│   ├── index.ts          # Main server file
│   ├── routes.ts         # API routes
│   └── vite.ts           # Vite dev server setup
├── shared/               # Shared types and schemas
└── attached_assets/      # Static assets and images
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## Development Notes

- The application uses horizontal scrolling for navigation between sections
- GSAP handles complex animations and scroll effects
- The UI follows a dark theme with golden yellow accents
- All components are built with accessibility in mind
- The application is fully responsive and mobile-friendly

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.