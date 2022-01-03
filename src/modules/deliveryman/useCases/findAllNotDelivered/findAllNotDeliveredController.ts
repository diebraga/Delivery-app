import { Request, Response } from "express";
import { FindAllNotDeliveredUseCase } from "./findAllNotDeliveredUseCase";

export class FindaAllNotDeliveredController {
  async handle(request: Request, response: Response) {
    const findAllNotDeliveredUseCase = new FindAllNotDeliveredUseCase()

    try {
      const result = await findAllNotDeliveredUseCase.execute()

      return response.json(result)
    } catch (error) {
      return response.json(error.message)
    }
  }
}