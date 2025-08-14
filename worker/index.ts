import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(
  process.env.REDIS_URL || "redis://localhost:6379",
);

export const checksQueue = new Queue("checks", { connection });

new Worker(
  "checks",
  async (job) => {
    // TODO: run build/test/lighthouse
    return { ok: true, received: job.data };
  },
  { connection },
);
