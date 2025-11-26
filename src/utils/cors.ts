/**
 * CORS Middleware Utility
 * Restricts API access to allowed origins
 */

import type { NextApiRequest, NextApiResponse } from 'next';

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://technicalseotools.io',
  'https://www.technicalseotools.io',
  // Development origins
  ...(process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000', 'http://127.0.0.1:3000'] 
    : []),
];

// Allowed HTTP methods
const ALLOWED_METHODS = ['GET', 'POST', 'OPTIONS'];

// Allowed headers
const ALLOWED_HEADERS = [
  'Content-Type',
  'Accept',
  'X-Requested-With',
];

export interface CorsOptions {
  allowedOrigins?: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
  allowCredentials?: boolean;
  maxAge?: number;
}

/**
 * Sets CORS headers on the response
 * @param req - Next.js API request
 * @param res - Next.js API response
 * @param options - Optional CORS configuration
 * @returns true if this is a preflight request that was handled
 */
export function setCorsHeaders(
  req: NextApiRequest,
  res: NextApiResponse,
  options: CorsOptions = {}
): boolean {
  const {
    allowedOrigins = ALLOWED_ORIGINS,
    allowedMethods = ALLOWED_METHODS,
    allowedHeaders = ALLOWED_HEADERS,
    allowCredentials = true,
    maxAge = 86400, // 24 hours
  } = options;

  const origin = req.headers.origin;

  // Check if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV === 'development' && !origin) {
    // Allow requests without origin in development (e.g., from same-origin or tools like Postman)
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  // Set other CORS headers
  if (allowCredentials) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  
  res.setHeader('Access-Control-Allow-Methods', allowedMethods.join(', '));
  res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));
  res.setHeader('Access-Control-Max-Age', maxAge.toString());

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }

  return false;
}

/**
 * Higher-order function to wrap API handlers with CORS
 * @param handler - The API handler function
 * @param options - Optional CORS configuration
 * @returns Wrapped handler with CORS support
 */
export function withCors<T extends NextApiResponse>(
  handler: (req: NextApiRequest, res: T) => Promise<void> | void,
  options?: CorsOptions
) {
  return async (req: NextApiRequest, res: T) => {
    const isPreflightHandled = setCorsHeaders(req, res, options);
    if (isPreflightHandled) return;
    
    return handler(req, res);
  };
}

