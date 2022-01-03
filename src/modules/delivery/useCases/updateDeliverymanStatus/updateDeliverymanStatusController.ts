import { Request, Response } from "express";
import { UpdateDeliverymanStatusUseCase } from "./updateDeliverymanStatusUseCase";

export class UpdateDeliverymanStatusController {
  async handle(request: Request, response: Response) {
    const { idDeliveryman } = request

    const { id } = request.params

    const updateDeliverymanStatusUseCase = new UpdateDeliverymanStatusUseCase()
    try {
      const result = await updateDeliverymanStatusUseCase.execute({
        idDelivery: id,
        idDeliveryman
      })

      return response.json(result)
    } catch (error: any) {
      return response.json({ error: error.message })

    }
  }
}