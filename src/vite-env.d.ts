
/// <reference types="vite/client" />

// Add type definitions for Google Analytics
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
