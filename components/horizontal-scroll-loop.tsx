'use client';

import Image from 'next/image';

export function HorizontalScrollLoop() {
  // List of logo images
  const logos = [
    { src: '/logos/airtable.webp', alt: 'Airtable' },
    { src: '/logos/claude.webp', alt: 'Claude' },
    { src: '/logos/ghl.webp', alt: 'GHL' },
    { src: '/logos/make.webp', alt: 'Make' },
    { src: '/logos/n8n.webp', alt: 'n8n' },
    { src: '/logos/nextjs.webp', alt: 'Next.js' },
    { src: '/logos/openai.webp', alt: 'OpenAI' },
    { src: '/logos/supabase.webp', alt: 'Supabase' },
    { src: '/logos/vercel.webp', alt: 'Vercel' },
    { src: '/logos/zapier.webp', alt: 'Zapier' },
  ];

  // Create logo elements
  const logoElements = logos.map((logo, index) => (
    <div key={`${logo.alt}-${index}`} className="logo-item shrink-0">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={200}
        height={80}
        className={`h-8 w-auto object-contain brightness-0 dark:brightness-100 ${logo.alt === 'OpenAI' ? 'scale-[1.8]' : ''
          }`}
      />
    </div>
  ));

  return (
    <section className="py-8 sm:py-12 border-y border-border/50 bg-muted/30 overflow-hidden">
      <div className="scroll-container">
        <div className="scroll-content">
          {logoElements}
          {/* Duplicate for seamless loop */}
          {logoElements}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .scroll-container {
          overflow: hidden;
          white-space: nowrap;
        }

        .scroll-content {
          display: inline-flex;
          animation: scroll 30s linear infinite;
          gap: 4rem;
          align-items: center;
        }

        /* Pause animation on hover/touch for better mobile UX */
        .scroll-container:hover .scroll-content,
        .scroll-container:active .scroll-content {
          animation-play-state: paused;
        }

        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Slower animation on mobile for better performance */
        @media (max-width: 640px) {
          .scroll-content {
            animation-duration: 40s;
            gap: 3rem;
          }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .scroll-content {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
