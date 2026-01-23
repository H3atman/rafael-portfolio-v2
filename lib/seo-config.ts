/**
 * SEO Configuration
 * Centralized SEO constants and metadata for the portfolio site
 */

export const siteConfig = {
  // Base URL (production domain)
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rvcodes.com',

  // Site Information
  name: 'Rafael | Operations Business Manager',
  title: 'Rafael | Operations Business Manager',
  description: 'Operations Business Manager specializing in System Integration, Business Process Automation, and Data Processing. 6+ years of experience transforming business operations through technology.',

  // Author Information
  author: {
    name: 'Rafael Villanueva',
    email: 'rafael@rvcodes.com', // Update with actual email if different
    jobTitle: 'Operations Business Manager',
  },

  // Social Media (Optional - update as needed)
  social: {
    twitter: '@rvcodes', // Update with actual handle if available
    linkedin: 'rafael-villanueva', // Update with actual profile if available
  },

  // Default SEO Settings
  defaultMetadata: {
    keywords: [
      'Operations Manager',
      'Business Process Automation',
      'System Integration',
      'Data Processing',
      'Data Analysis',
      'Workflow Automation',
      'Make.com',
      'Zapier',
      'Power BI',
      'n8n',
      'AI Integration',
      'AI Automation',
      'Airtable'
    ],
    locale: 'en_US',
    type: 'website',
  },
} as const;

/**
 * Generates absolute URL from relative path
 */
export function getAbsoluteUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${siteConfig.url}/${cleanPath}`;
}

/**
 * Person Schema for structured data
 */
export const personSchema = {
  '@type': 'Person',
  name: siteConfig.author.name,
  jobTitle: siteConfig.author.jobTitle,
  url: siteConfig.url,
} as const;
