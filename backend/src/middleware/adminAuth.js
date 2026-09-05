import crypto from "node:crypto";
import { env } from "../config/env.js";

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function adminAuth(req, res, next) {
  const key = req.header("x-admin-key");
  if (!env.adminApiKey || !key || !safeEqual(key, env.adminApiKey)) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }
  return next();
}
