import { Request, Response } from "express";
import { AuthenticateClientUseCase } from "./authenticateClientUseCase";

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const authenticateClientUseCase = new AuthenticateClientUseCase()

    try {
      const result = await authenticateClientUseCase.execute({
        username,
        password
      })

      return response.json({ token: result })
    } catch (error: any) {
      return response.json({ error: error.message })
    }
  }
}