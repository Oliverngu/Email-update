// src/core/config/emailConfig.ts

// FIX: The `/// <reference types="vite/client" />` directive can be unreliable.
// Replaced it with a global declaration for `ImportMeta` to provide the necessary
// types for `import.meta.env` directly in this file, preventing a potential
// "Cannot read properties of undefined" crash on startup.
declare global {
  interface ImportMeta {
    readonly env: {
      readonly VITE_RESEND_API_KEY?: string;
      readonly PROD: boolean;
    };
  }
}

type EmailProviderType = "mock" | "resend";

interface EmailProviderConfig {
  provider: EmailProviderType;
  apiKey?: string;
  fromDefault: string;
}

// In Vite, environment variables exposed to the client must be prefixed with VITE_.
// import.meta.env.PROD is a boolean that is true when in production.
const isProductionReady = import.meta.env.PROD && !!import.meta.env.VITE_RESEND_API_KEY;

export const emailProviderConfig: EmailProviderConfig = {
  // To enable real emails in a production build, this will be automatically set to "resend".
  provider: isProductionReady ? "resend" : "mock",
  
  // The "from" address for all outgoing emails.
  fromDefault: "MintLeaf <noreply@mintleaf.hu>",
  
  // The API key for the selected provider.
  // This should be set via environment variables in a production environment.
  apiKey: import.meta.env.VITE_RESEND_API_KEY, 
};