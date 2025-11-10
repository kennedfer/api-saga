import "reflect-metadata";
import express, { Router, type Request } from "express";
import { GlobalErrorHandler } from "./middlewares/global-error-handler";
import { attachAuth } from "./middlewares/auth";
import { tracingMiddleware } from "./middlewares/tracing";
import { authRoutes } from "./auth/auth.routes";
import { userRoutes } from "./user/user.routes";
import { initializeTracing } from "./tracing";
import { whatsappRoutes } from "./whatsapp/whatsapp.routes";
import { whatsappController } from "./whatsapp/whatsapp.controller";

// Inicializar tracing antes de qualquer outra coisa
initializeTracing();

const app = express();
app.use(express.json());

// Middleware de tracing deve ser o primeiro para capturar todas as requisições
app.use(tracingMiddleware);

const router = Router();
router.use(attachAuth);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/whatsapp", whatsappRoutes);

router.get("/ping", (req, res) => {
  res.send("Pong");
});

app.use(router);

app.use(GlobalErrorHandler);
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
