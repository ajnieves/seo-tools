import type { NextApiRequest, NextApiResponse } from 'next';
import { setCorsHeaders } from '@/utils/cors';
import { validateUrl } from '@/utils/urlValidation';
import { safeFetch, DEFAULT_TIMEOUT } from '@/utils/fetchWithTimeout';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS
  const isPreflightHandled = setCorsHeaders(req, res);
  if (isPreflightHandled) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL
    const validation = validateUrl(url);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    // Parse the URL to get the domain
    const parsedUrl = new URL(validation.sanitizedUrl!);
    const robotsUrl = `${parsedUrl.protocol}//${parsedUrl.host}/robots.txt`;

    // Fetch the robots.txt content with timeout
    const response = await safeFetch(robotsUrl, {
      timeout: DEFAULT_TIMEOUT,
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(200).json({ 
          content: 'User-agent: *\nAllow: /',
          message: 'No robots.txt found. Default permissive rules applied.' 
        });
      }
      throw new Error(`Failed to fetch robots.txt: ${response.statusText}`);
    }

    const content = await response.text();

    return res.status(200).json({ 
      content,
      message: 'Successfully fetched robots.txt' 
    });
  } catch (error) {
    console.error('[Fetch Robots.txt] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch robots.txt'
    });
  }
}
