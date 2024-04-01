import { Ratelimit } from "@upstash/ratelimit";

import { Redis } from "@upstash/redis";

export async function ratelimit(identifier: string) {
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 s"), //10 requests within 10s of window
    analytics: true,
    prefix: "@upstash/ratelimit",
  });
  return await ratelimit.limit(identifier);
}
