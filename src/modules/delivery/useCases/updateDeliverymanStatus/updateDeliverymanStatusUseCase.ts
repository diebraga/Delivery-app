import { response } from "express";
import { prisma } from "../../../../lib/prismaClient";

interface IUpdateDeliverymanStatusUseCase {
  idDeliveryman: string
  idDelivery: string
}

export class UpdateDeliverymanStatusUseCase {
  async execute({ idDeliveryman, idDelivery }: IUpdateDeliverymanStatusUseCase) {

    try {
      const result = await prisma.delivery.update({
        where: {
          id: idDelivery
        },
        data: {
          idDeliveryman: idDeliveryman
        }
      })

      return response.json(result)
    } catch (error: any) {
      return response.json({ error: error.message })
    }
  }
}