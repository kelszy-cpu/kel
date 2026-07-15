# Confessions

An anonymous confessions sharing platform built with Next.js and TypeScript.

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:3000

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run linting

## Features

- Post anonymous confessions
- View all community confessions
- Like/React to confessions
- Responsive design

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS (recommended) or CSS modules
- **UI Library:** React 18

## Project Structure

```
├── pages/
│   ├── _app.tsx         # App wrapper
│   ├── index.tsx        # Home page with confessions feed
│   └── api/
│       └── confessions/ # API routes
├── components/
│   ├── ConfessionCard.tsx
│   ├── SubmitConfession.tsx
│   └── ConfessionFeed.tsx
├── types/
│   └── index.ts         # TypeScript types
└── public/              # Static assets
```

## Development

Start building by creating components in the `components/` directory and pages in `pages/`.

## License

Private project
