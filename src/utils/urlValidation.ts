/**
 * URL Validation Utility
 * Prevents SSRF (Server-Side Request Forgery) attacks by validating URLs
 */

// Private IP ranges that should be blocked
const PRIVATE_IP_RANGES = [
  /^127\./,                    // Loopback
  /^10\./,                     // Private Class A
  /^172\.(1[6-9]|2\d|3[01])\./, // Private Class B
  /^192\.168\./,               // Private Class C
  /^169\.254\./,               // Link-local
  /^0\./,                      // Current network
  /^::1$/,                     // IPv6 loopback
  /^fc00:/i,                   // IPv6 unique local
  /^fe80:/i,                   // IPv6 link-local
];

// Blocked hostnames
const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  'localhost.localdomain',
  '0.0.0.0',
  '127.0.0.1',
  '::1',
  'metadata.google.internal',  // GCP metadata
  '169.254.169.254',           // AWS/Azure metadata
]);

// Allowed protocols
const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

export interface UrlValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedUrl?: string;
}

/**
 * Validates a URL for safe server-side fetching
 * @param url - The URL to validate
 * @returns Validation result with sanitized URL or error message
 */
export function validateUrl(url: string): UrlValidationResult {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'URL is required' };
  }

  // Trim whitespace
  const trimmedUrl = url.trim();

  // Check for empty URL
  if (!trimmedUrl) {
    return { isValid: false, error: 'URL cannot be empty' };
  }

  // Parse URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmedUrl);
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }

  // Check protocol
  if (!ALLOWED_PROTOCOLS.has(parsedUrl.protocol)) {
    return { 
      isValid: false, 
      error: `Protocol "${parsedUrl.protocol}" is not allowed. Use http: or https:` 
    };
  }

  // Check for blocked hostnames
  const hostname = parsedUrl.hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.has(hostname)) {
    return { isValid: false, error: 'Access to this host is not allowed' };
  }

  // Check for private IP ranges
  for (const pattern of PRIVATE_IP_RANGES) {
    if (pattern.test(hostname)) {
      return { isValid: false, error: 'Access to private IP addresses is not allowed' };
    }
  }

  // Check for DNS rebinding attempts (hostnames with IP-like patterns)
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
    // It's an IP address - already checked above, but let's be extra safe
    const octets = hostname.split('.').map(Number);
    if (octets.some(o => o > 255)) {
      return { isValid: false, error: 'Invalid IP address' };
    }
  }

  // Prevent port scanning by restricting ports
  const allowedPorts = new Set(['', '80', '443', '8080', '8443']);
  if (!allowedPorts.has(parsedUrl.port)) {
    return { 
      isValid: false, 
      error: `Port ${parsedUrl.port} is not allowed` 
    };
  }

  return { 
    isValid: true, 
    sanitizedUrl: parsedUrl.href 
  };
}

/**
 * Validates and returns a sanitized URL or throws an error
 * @param url - The URL to validate
 * @returns Sanitized URL string
 * @throws Error if URL is invalid
 */
export function validateUrlOrThrow(url: string): string {
  const result = validateUrl(url);
  if (!result.isValid) {
    throw new Error(result.error);
  }
  return result.sanitizedUrl!;
}

