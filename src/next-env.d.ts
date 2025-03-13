
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// It's used to provide types for Next.js

// Add type definitions for Google Analytics (carried over from vite-env.d.ts)
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
