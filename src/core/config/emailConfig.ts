// src/core/config/emailConfig.ts

type EmailProviderType = "mock" | "resend";

interface EmailProviderConfig {
  provider: EmailProviderType;
  apiKey?: string;
  fromDefault: string;
}

// Determine provider based on environment.
// Fallback to "mock" if NODE_ENV is not 'production' or if RESEND_API_KEY is missing.
const isProductionReady = process.env.NODE_ENV === "production" && !!process.env.RESEND_API_KEY;

export const emailProviderConfig: EmailProviderConfig = {
  // To enable real emails in a production build, this will be automatically set to "resend".
  provider: isProductionReady ? "resend" : "mock",
  
  // The "from" address for all outgoing emails.
  fromDefault: "MintLeaf <noreply@mintleaf.hu>",
  
  // The API key for the selected provider.
  // This should be set via environment variables in a production environment.
  apiKey: process.env.RESEND_API_KEY, 
};
