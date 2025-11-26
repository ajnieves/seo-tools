import type { NextApiRequest, NextApiResponse } from 'next';
import { setCorsHeaders } from '@/utils/cors';

interface RobotsRule {
  pattern: string;
  allow: boolean;
}

function parseRobotsTxt(robotsTxt: string, userAgent: string): RobotsRule[] {
  const rules: RobotsRule[] = [];
  let currentUserAgent: string | null = null;
  let isRelevantSection = false;

  const lines = robotsTxt.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim().toLowerCase();
    
    if (trimmedLine === '' || trimmedLine.startsWith('#')) {
      continue;
    }

    const [directive, ...valueParts] = trimmedLine.split(':');
    const value = valueParts.join(':').trim();

    if (directive === 'user-agent') {
      currentUserAgent = value;
      isRelevantSection = currentUserAgent === '*' || 
                         currentUserAgent === userAgent.toLowerCase() ||
                         userAgent.toLowerCase().includes(currentUserAgent);
    } else if (isRelevantSection && (directive === 'allow' || directive === 'disallow') && value) {
      rules.push({
        pattern: value,
        allow: directive === 'allow'
      });
    }
  }

  return rules;
}

function isUrlAllowed(url: string, rules: RobotsRule[]): { allowed: boolean; reason: string } {
  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname + parsedUrl.search;

    // Sort rules by specificity (longer patterns first)
    const sortedRules = [...rules].sort((a, b) => b.pattern.length - a.pattern.length);

    for (const rule of sortedRules) {
      let pattern = rule.pattern;
      
      // Convert robots.txt pattern to regex
      pattern = pattern
        .replace(/\*/g, '.*')
        .replace(/\?/g, '\\?')
        .replace(/\$/g, '\\$')
        .replace(/\./g, '\\.');

      const regex = new RegExp(`^${pattern}`);

      if (regex.test(path)) {
        return {
          allowed: rule.allow,
          reason: `Matched rule: ${rule.allow ? 'Allow' : 'Disallow'}: ${rule.pattern}`
        };
      }
    }

    // If no rules match, access is allowed by default
    return {
      allowed: true,
      reason: 'No matching rules found - access is allowed by default'
    };
  } catch {
    throw new Error('Invalid URL format');
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS
  const isPreflightHandled = setCorsHeaders(req, res);
  if (isPreflightHandled) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { robotsTxt, userAgent, url } = req.body;

    if (!robotsTxt || !userAgent || !url) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const rules = parseRobotsTxt(robotsTxt, userAgent);
    const result = isUrlAllowed(url, rules);

    return res.status(200).json(result);
  } catch (error) {
    console.error('[Robots.txt Tester] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to test robots.txt'
    });
  }
}
