/**
 * Fetch Utility with Timeout Support
 * Prevents hanging requests by implementing AbortController-based timeouts
 */

export interface FetchWithTimeoutOptions extends RequestInit {
  timeout?: number;
}

export class FetchTimeoutError extends Error {
  constructor(url: string, timeout: number) {
    super(`Request to ${url} timed out after ${timeout}ms`);
    this.name = 'FetchTimeoutError';
  }
}

/**
 * Default timeout in milliseconds (10 seconds)
 */
export const DEFAULT_TIMEOUT = 10000;

/**
 * Fetches a URL with a timeout
 * @param url - URL to fetch
 * @param options - Fetch options with optional timeout
 * @returns Promise<Response>
 * @throws FetchTimeoutError if the request times out
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {}
): Promise<Response> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new FetchTimeoutError(url, timeout);
    }
    throw error;
  }
}

/**
 * User-Agent string for server-side requests
 */
export const DEFAULT_USER_AGENT = 
  'Mozilla/5.0 (compatible; SEOToolsBot/1.0; +https://technicalseotools.io)';

/**
 * Common headers for server-side fetch requests
 */
export const DEFAULT_FETCH_HEADERS: HeadersInit = {
  'User-Agent': DEFAULT_USER_AGENT,
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
};

/**
 * Fetches a URL with default headers and timeout
 * @param url - URL to fetch
 * @param options - Additional fetch options
 * @returns Promise<Response>
 */
export async function safeFetch(
  url: string,
  options: FetchWithTimeoutOptions = {}
): Promise<Response> {
  return fetchWithTimeout(url, {
    headers: {
      ...DEFAULT_FETCH_HEADERS,
      ...options.headers,
    },
    timeout: options.timeout ?? DEFAULT_TIMEOUT,
    ...options,
  });
}

