
const fs = require('fs');
const path = require('path');

const projects = [
    {
        id: 'automated-reporting-dashboard',
        title: 'Automated Reporting',
        subtitle: 'Dashboard',
        colors: ['#1E293B', '#0F172A'], // Slate 800 to Slate 900
        accent: '#4ADE80', // Green 400
        secondaryAccent: '#3B82F6', // Blue 500
        tertiaryAccent: '#8B5CF6' // Violet 500
    },
    {
        id: 'wordpress-auto-blog-post',
        title: 'Wordpress',
        subtitle: 'Auto Blog Post',
        colors: ['#1E1B4B', '#0F172A'], // Indigo 950 to Slate 900
        accent: '#38BDF8', // Sky 400
        secondaryAccent: '#818CF8', // Indigo 400
        tertiaryAccent: '#C084FC' // Purple 400
    },
    {
        id: 'crimestat-api',
        title: 'Crimestat',
        subtitle: 'API',
        colors: ['#312E81', '#111827'], // Indigo 900 to Gray 900
        accent: '#F472B6', // Pink 400
        secondaryAccent: '#60A5FA', // Blue 400
        tertiaryAccent: '#A78BFA' // Violet 400
    },
    {
        id: 'crm-integration-platform',
        title: 'CRM Integration',
        subtitle: 'Platform',
        colors: ['#7C2D12', '#1C1917'], // Orange 900 to Stone 900
        accent: '#FB923C', // Orange 400
        secondaryAccent: '#fbbf24', // Amber 400
        tertiaryAccent: '#FCA5A5' // Red 300
    },
    {
        id: 'ghl-onboarding-automation',
        title: 'GHL Onboarding',
        subtitle: 'Automation',
        colors: ['#064E3B', '#064E3B'], // Emerald 900 to Green 950
        accent: '#34D399', // Emerald 400
        secondaryAccent: '#A7F3D0', // Emerald 200
        tertiaryAccent: '#6EE7B7' // Emerald 300
    },
    {
        id: 'time-tracker',
        title: 'Time Tracker',
        subtitle: 'Time Tracking',
        colors: ['#0C4A6E', '#0F172A'], // Sky 950 to Slate 900
        accent: '#38BDF8', // Sky 400
        secondaryAccent: '#22D3EE', // Cyan 400
        tertiaryAccent: '#67E8F9' // Cyan 300
    },
    {
        id: 'apify-lead-processor',
        title: 'APIfy Lead',
        subtitle: 'Processor',
        colors: ['#1E3A5F', '#0F172A'], // Deep blue to Slate 900
        accent: '#60A5FA', // Blue 400
        secondaryAccent: '#38BDF8', // Sky 400
        tertiaryAccent: '#818CF8' // Indigo 400
    },
    {
        id: 'ai-icebreaker-generator',
        title: 'AI Icebreaker',
        subtitle: 'Generator',
        colors: ['#2E1065', '#0F172A'], // Violet 950 to Slate 900
        accent: '#A78BFA', // Violet 400
        secondaryAccent: '#C084FC', // Purple 400
        tertiaryAccent: '#F472B6' // Pink 400
    }
];

function generateSVG(project) {
    const width = 1200;
    const height = 800;

    return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${project.id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${project.colors[0]}" />
      <stop offset="100%" stop-color="${project.colors[1]}" />
    </linearGradient>
    <pattern id="grid-${project.id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
    <filter id="glow-${project.id}">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg-${project.id})" />
  <rect width="100%" height="100%" fill="url(#grid-${project.id})" />

  <!-- Abstract Shapes -->
  <circle cx="10%" cy="10%" r="300" fill="${project.secondaryAccent}" opacity="0.1" filter="url(#glow-${project.id})" />
  <circle cx="90%" cy="90%" r="400" fill="${project.tertiaryAccent}" opacity="0.1" filter="url(#glow-${project.id})" />
  
  <rect x="850" y="100" width="200" height="200" rx="20" fill="none" stroke="${project.accent}" stroke-width="2" opacity="0.2" transform="rotate(15 950 200)" />
  <rect x="150" y="550" width="150" height="150" rx="20" fill="none" stroke="${project.secondaryAccent}" stroke-width="2" opacity="0.2" transform="rotate(-15 225 625)" />

  <!-- Decorative Line -->
  <line x1="200" y1="700" x2="1000" y2="700" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
  <circle cx="200" cy="700" r="4" fill="${project.accent}" />
  <circle cx="1000" cy="700" r="4" fill="${project.accent}" />

  <!-- Text Content -->
  <text x="50%" y="45%" font-family="Arial, sans-serif" font-weight="bold" font-size="80" fill="white" text-anchor="middle" dominant-baseline="middle" style="text-shadow: 0 4px 12px rgba(0,0,0,0.3)">${project.title}</text>
  <text x="50%" y="58%" font-family="Arial, sans-serif" font-size="50" fill="${project.accent}" text-anchor="middle" dominant-baseline="middle" letter-spacing="4">${project.subtitle.toUpperCase()}</text>
  
</svg>
  `.trim();
}

projects.forEach(project => {
    const svgContent = generateSVG(project);
    const outputDir = path.join(process.cwd(), 'public', 'projects', project.id);
    const outputPath = path.join(outputDir, `${project.id}.svg`);

    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, svgContent);
    console.log(`Generated: ${outputPath}`);
});
