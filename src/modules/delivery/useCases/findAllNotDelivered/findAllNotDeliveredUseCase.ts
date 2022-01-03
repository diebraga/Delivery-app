import { prisma } from "../../../../lib/prismaClient";

export class FindAllNotDeliveredUseCase {
  async execute() {
    const deliveries = await prisma.delivery.findMany({
      where: {
        deliveredAt: null,
        idDeliveryman: null
      }
    })

    return deliveries
  }
}