import { Request, Response } from "express";
import { AuthenticateDeliverymanUseCase } from "./authenticateDeliverymanUseCase";

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase()

    try {
      const result = await authenticateDeliverymanUseCase.execute({
        username,
        password
      })

      return response.json({ token: result })
    } catch (error: any) {
      return response.json({ error: error.message })
    }
  }
}