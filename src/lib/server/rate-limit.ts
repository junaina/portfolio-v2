type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;

const store = new Map<string, RateLimitRecord>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const existing = store.get(identifier);

  if (!existing || existing.resetAt < now) {
    store.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return false;
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  existing.count += 1;
  store.set(identifier, existing);

  return false;
}
