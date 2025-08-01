import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import "./utils/envs";

export const api = new Elysia({
  prefix: "/api",
})
.use(cors({
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
}))
  
export type Api = typeof api;