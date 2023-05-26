import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "node:path";

const app = fastify();

app.register(multipart);

// outra maneira de importar pacotes
app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

app.register(cors, {
  origin: true, // todas URLs de frontend poderão acessar nosso backend
});

app.register(jwt, {
  secret: "spacetime", // Chave que diferencia token desta aplicação das demais
});

app.register(uploadRoutes);
app.register(authRoutes);
app.register(memoriesRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333");
  });
