import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { env } from "./config/env.js";
import { serverRequestsRouter } from "./routes/serverRequests.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1); // Render sits behind a proxy
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: "100kb" }));
  app.use(
    cors({
      origin(origin, cb) {
        if (!origin || env.corsOrigins.includes(origin)) return cb(null, true);
        return cb(new Error("Not allowed by CORS"));
      },
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "x-admin-key"],
      maxAge: 86400,
    }),
  );

  app.get("/health", (_req, res) => res.json({ ok: true, uptime: process.uptime() }));
  app.use("/api/server-requests", serverRequestsRouter);

  app.use((_req, res) => res.status(404).json({ ok: false, message: "Not found" }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error("[error]", err);
    const status = err.message === "Not allowed by CORS" ? 403 : 500;
    res.status(status).json({
      ok: false,
      message: env.nodeEnv === "production" ? "Something went wrong." : err.message,
    });
  });

  return app;
}
