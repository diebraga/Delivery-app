import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./createDeliveryUseCase";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { idClient, itemName } = request.body

    const createDeliveryUseCase = new CreateDeliveryUseCase()

    try {
      const delivery = await createDeliveryUseCase.execute({
        idClient,
        itemName
      })

      return response.json(delivery)
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}