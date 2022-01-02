import { compare } from "bcrypt";
import { prisma } from "../../../lib/prismaClient";
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {

    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error("Invalid Email or password!");
    }

    const passwordMatches = await compare(password, client.password)

    if (!passwordMatches) {
      throw new Error("Invalid Email or password!");
    }

    const token = sign({ username }, "123456yudfghjk34567uxcvbn3456yuicvbnjrtyuASDFGH34tyhj", {
      subject: client.id,
      expiresIn: "1d"
    })

    return token
  }
}