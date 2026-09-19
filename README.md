# Rafael's Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)

A professional portfolio website for Rafael, an Operations Business Manager specializing in System Integration, Business Process Automation, and Data Processing & Analysis. This site showcases expertise through interactive project demonstrations and seamless booking integration.

## 🚀 Features

- **Responsive Design**: Optimized for all devices with a modern dark mode theme
- **Project Showcase**: MDX-powered blog-style project presentations
- **Booking Integration**: Direct Cal.com integration for consultation scheduling
- **Performance Optimized**: Built with Next.js 16 for fast loading and SEO
- **Accessible UI**: Using Shadcn UI components for consistent, accessible design

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4, Shadcn UI
- **Content**: MDX for rich project documentation
- **Deployment**: Vercel
- **Booking**: Cal.com integration

## 📋 Prerequisites

- [Bun](https://bun.sh) 1.4 or higher (package manager and script runner)
- Node.js 18 or higher (the `postbuild` SEO script runs under Node)

## 🏁 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rafael-portfolio-v2.git
   cd rafael-portfolio-v2
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file and add your Cal.com API key if needed.

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

```
rafael-portfolio-v2/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   └── projects/          # Project pages
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   ├── hero.tsx          # Hero section
│   ├── services.tsx      # Services showcase
│   └── ...
├── content/               # MDX content
│   └── projects/         # Project write-ups
├── lib/                   # Utility functions
│   ├── mdx.ts            # MDX processing
│   └── utils.ts          # Helper functions
└── public/                # Static assets
```

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** with one click

For manual deployment:
```bash
bun run build
bun run start
```

## 📞 Contact

- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
- **Booking**: Schedule a call via the integrated Cal.com widget

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and modern web technologies.
