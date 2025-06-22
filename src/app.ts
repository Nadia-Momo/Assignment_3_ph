// === src/app.ts ===

import express, { Application, Request, Response } from "express";
import bookRouter from "./routes/book.routes";
import borrowRouter from "./routes/borrow.routes";

const app: Application = express();

app.use(express.json());

// Attach routers
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

// Welcome route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management System");
});

export default app;

