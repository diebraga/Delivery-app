import { prisma } from "../../../../lib/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryman {
  username: string
  password: string
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (deliverymanExists) {
      throw new Error(`User already exists!`)
    }

    const hashPassword = await hash(password, 10)

    const deliveryman = await prisma.deliveryman.create({
      data: {
        password: hashPassword,
        username
      }
    })

    const formattedDeliveryman = {
      id: deliveryman.id,
      username: deliveryman.username
    }

    return formattedDeliveryman
  }
}