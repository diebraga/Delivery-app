import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
}

export function ensureClientIsAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ message: "Token invalid!" })
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub } = verify(token, "123456yudfghjk34567uxcvbn3456yuicvbnjrtyuASDFGH34tyhj") as IPayload

    console.log(sub)
    request.idClient = sub

    return next()
  } catch (error: any) {
    return response.status(401).json({ error: error.message })
  }
}