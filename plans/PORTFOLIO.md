# Time Tracker - Portfolio Showcase

## Project Overview

A modern, full-stack time tracking application designed for freelancers and consultants to efficiently track client work hours. This project demonstrates complete end-to-end development skills, from frontend UI/UX design to backend database architecture and authentication systems.

**Live Demo:** [Deploy on Vercel](https://vercel.com/new)

---

## 🚀 Key Features

### Core Functionality
- **Real-time Time Tracking** - Start/stop timer with live elapsed time display
- **Client Management** - Autocomplete suggestions for recurring client names
- **Entry Management** - Full CRUD operations with edit and delete capabilities
- **Progress Tracking** - Weekly and monthly hour progress with visual indicators
- **Undo Support** - Restore deleted entries with a single click

### User Experience
- **Guest Authentication** - Quick start without account creation
- **Session Management** - 2-hour guest sessions with visual countdown
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark/Light Mode** - Theme support via next-themes
- **Toast Notifications** - Celebrations when reaching weekly goals (40 hours)

### Security & Limits
- **Rate Limiting** - Device fingerprinting to prevent abuse
- **Entry Limits** - 10 entries for guest users
- **Data Isolation** - User-specific data with proper authorization

---

## 💻 Technical Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library with latest features |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | Accessible component library |
| **Radix UI** | Primitive UI components |
| **Phosphor Icons** | Beautiful icon set |
| **Zod** | Runtime validation |

### Backend
| Technology | Purpose |
|------------|---------|
| **Convex** | Real-time database & serverless functions |
| **Convex Auth** | Authentication with anonymous support |
| **Next.js API Routes** | Server-side authentication handling |

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 🏗️ Architecture Highlights

### Database Schema ([`convex/schema.ts`](convex/schema.ts))

```
├── users (auth)           # User accounts
├── rateLimits             # Rate limiting for guest sign-ins
├── guestSessions          # 2-hour session tracking
└── timeEntries            # Core time tracking data
    ├── userId             # User association
    ├── clientName         # Client identification
    ├── task               # Task description
    ├── notes              # Additional notes
    ├── startTime          # Entry start timestamp
    ├── endTime            # Entry end timestamp
    ├── durationSeconds    # Calculated duration
    ├── durationHours      # Decimal hours
    └── isActive           # Tracking status
```

### Key Components

| Component | Description |
|-----------|-------------|
| [`TimeTrackerForm`](components/time-tracker-form.tsx) | Main tracking interface with validation |
| [`TimeEntriesList`](components/time-entries-list.tsx) | Entry history with edit/delete |
| [`WeeklyHoursStatus`](components/weekly-hours-status.tsx) | Weekly progress visualization |
| [`MonthlyHoursStatus`](components/monthly-hours-status.tsx) | Monthly progress visualization |
| [`Authenticated`](components/authenticated.tsx) | Auth wrapper with session management |

### Backend Functions ([`convex/timeEntries.ts`](convex/timeEntries.ts))

- **Queries:** `list`, `getActive`, `getWeeklyHours`, `getMonthlyHours`, `getDistinctClientNames`
- **Mutations:** `start`, `stop`, `update`, `remove`, `restore`

---

## 🎯 Development Approach

This application was **vibe coded from scratch** - a complete full-stack implementation covering:

### Frontend Development
- ✅ Component architecture with React
- ✅ Form validation with real-time feedback
- ✅ Responsive layouts with Tailwind CSS
- ✅ Accessible UI components (ARIA compliant)
- ✅ State management with React hooks
- ✅ Real-time updates with Convex subscriptions

### Backend Development
- ✅ Database schema design
- ✅ API endpoint creation (queries & mutations)
- ✅ Authentication system implementation
- ✅ Rate limiting logic
- ✅ Session management
- ✅ Authorization checks

### DevOps & Deployment
- ✅ Vercel-ready configuration
- ✅ Environment variable management
- ✅ TypeScript configuration
- ✅ ESLint setup

---

## 📁 Project Structure

```
time-tracker/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── auth.ts            # Server auth utilities
│   ├── login/             # Login page
│   └── api/auth/          # Auth API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── time-tracker.tsx  # Main app component
│   ├── time-tracker-form.tsx
│   ├── time-entries-list.tsx
│   ├── weekly-hours-status.tsx
│   ├── monthly-hours-status.tsx
│   └── authenticated.tsx
├── convex/               # Backend
│   ├── schema.ts        # Database schema
│   ├── timeEntries.ts   # Business logic
│   ├── auth.ts          # Auth configuration
│   └── _generated/      # Auto-generated types
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
│   ├── validators.ts    # Zod schemas
│   ├── format-time.ts   # Time formatting
│   └── fingerprint.ts   # Device fingerprinting
└── public/              # Static assets
```

---

## 🔧 Getting Started

```bash
# Install dependencies
npm install

# Set up Convex
npx convex dev

# Run development server
npm run dev

# Open http://localhost:3000
```

### Environment Variables

```env
CONVEX_DEPLOYMENT=your-deployment-name
NEXT_PUBLIC_CONVEX_URL=your-convex-url
```

---

## 📸 Screenshots

### Main Interface
The time tracker features a clean, intuitive interface with:
- Input fields for client name, task, and notes
- Large start/stop button with loading states
- Real-time elapsed time display

### Progress Tracking
Visual progress bars show:
- Weekly hours toward 40-hour goal
- Monthly hours toward 320-hour target
- Color-coded status (blue → yellow → green)

### Entry Management
Comprehensive entry list with:
- Edit functionality via dialog
- Delete with undo support
- Duration display in HH:MM:SS format

---

## 🎓 Skills Demonstrated

| Category | Skills |
|----------|--------|
| **Frontend** | React, TypeScript, Tailwind CSS, Component Design, Form Validation, Accessibility |
| **Backend** | Convex, Serverless Functions, Database Design, Authentication, Authorization |
| **Architecture** | Full-Stack Development, API Design, State Management, Real-time Updates |
| **DevOps** | Vercel Deployment, Environment Configuration, Git Version Control |
| **UX/UI** | Responsive Design, User Feedback, Loading States, Error Handling |

---

## 📞 Contact

This project showcases my ability to deliver complete, production-ready applications. If you're interested in similar work or have a project in mind, I'd love to discuss how I can help bring your ideas to life.

---

*Built with ❤️ using modern web technologies*
