import { prisma } from "../../../../lib/prismaClient";

interface ICreateDelivery {
  itemName: string
  idClient: string
}

export class CreateDeliveryUseCase {
  async execute({ itemName, idClient }: ICreateDelivery) {
    const delivery = await prisma.delivery.create({
      data: {
        itemName,
        idClient
      }
    })

    return delivery
  }
}