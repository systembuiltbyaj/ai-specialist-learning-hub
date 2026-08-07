// Minimal fixed-window rate limiter for auth endpoints.
//
// Scope caveat: state is per serverless instance, so a distributed attacker
// hitting many cold instances gets more attempts than the nominal limit. It
// still defeats single-origin brute force, which is the realistic threat for a
// passcode gate. Move to Upstash/Redis if this ever guards anything valuable.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Bound memory: a flood of unique IPs must not grow the map without limit.
const MAX_TRACKED = 5_000;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    if (buckets.size >= MAX_TRACKED) {
      for (const [k, b] of buckets) if (now >= b.resetAt) buckets.delete(k);
      if (buckets.size >= MAX_TRACKED) buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

// Best-effort client identity. x-forwarded-for is set by the Vercel edge; the
// left-most entry is the real client.
export function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
