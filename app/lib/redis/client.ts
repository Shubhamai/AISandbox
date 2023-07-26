import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  throw new Error(
    "UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is not set"
  );
}

const redis = new Redis({
  url,
  token,
});

export default redis;
