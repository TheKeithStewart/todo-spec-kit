import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Authentication middleware for Vercel Edge Functions
 * Verifies JWT token from Supabase Auth and attaches user to request
 */

export interface AuthenticatedRequest extends VercelRequest {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

/**
 * Extract Bearer token from Authorization header
 */
function extractToken(req: VercelRequest): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

  return parts[1];
}

/**
 * Verify JWT token using Supabase
 */
export async function verifyAuth(req: AuthenticatedRequest, res: VercelResponse): Promise<boolean> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    res.status(500).json({ error: 'Server configuration error' });
    return false;
  }

  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: 'Missing authorization token' });
    return false;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error('Token verification failed:', error);
      res.status(401).json({ error: 'Invalid or expired token' });
      return false;
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email!,
      role: user.role,
    };

    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
    return false;
  }
}

/**
 * Middleware wrapper for protected endpoints
 */
export function withAuth(
  handler: (req: AuthenticatedRequest, res: VercelResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: VercelResponse) => {
    const isAuthenticated = await verifyAuth(req, res);
    if (!isAuthenticated) {
      return; // Response already sent by verifyAuth
    }

    return handler(req, res);
  };
}
