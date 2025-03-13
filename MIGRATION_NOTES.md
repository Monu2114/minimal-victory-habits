
# Next.js Migration Notes

This project is in the process of being migrated from React + Vite to Next.js.

## Current Migration Status

- [x] Next.js app directory structure created
- [x] Authentication system migrated to Next.js
- [x] Landing, Login, and Register pages migrated
- [x] Onboarding flow migrated
- [ ] Dashboard page needs completion
- [ ] Analytics page needs completion
- [ ] Premium Upgrade page needs completion
- [ ] HabitTracker component needs migration

## How to Run

### Development

```bash
# Run the Next.js development server
npm run dev:next
```

### Production

```bash
# Build the Next.js application
npm run build:next

# Start the Next.js production server
npm run start:next
```

## SEO Benefits

The migration to Next.js provides several SEO benefits:

1. **Server-Side Rendering (SSR)**: Pages are pre-rendered on the server, making content immediately available to search engines.
2. **Static Site Generation (SSG)**: Public pages like the landing page can be generated at build time for optimal performance.
3. **Metadata API**: Each page now has proper metadata for search engines, including title, description, and OpenGraph tags.
4. **Improved Core Web Vitals**: Next.js optimizes for performance metrics that affect SEO ranking.

## Next Steps

1. Complete the migration of the remaining page components
2. Set up proper image optimization using Next.js Image component
3. Implement server actions for data mutations
4. Enhance SEO with additional structured data
