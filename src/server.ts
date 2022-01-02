import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import "express-async-errors";

const app = express()

app.use(express.json())
app.use(routes)

app.listen(4000, () => console.log("server is running on port 4000"))