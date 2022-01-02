import { prisma } from "../../../../lib/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string
  password: string
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    const clientExists = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (clientExists) {
      throw new Error(`User already exists!`)
    }

    const hashPassword = await hash(password, 10)

    const client = await prisma.clients.create({
      data: {
        password: hashPassword,
        username
      }
    })

    const formattedClient = {
      id: client.id,
      username: client.username
    }

    return formattedClient
  }
}