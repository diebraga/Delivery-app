import { compare } from "bcrypt";
import { prisma } from "../../../lib/prismaClient";
import { sign } from 'jsonwebtoken'

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error("Invalid Email or password!");
    }

    const passwordMatches = await compare(password, deliveryman.password)

    if (!passwordMatches) {
      throw new Error("Invalid Email or password!");
    }

    const token = sign({ username }, "123456yudfghjk34567uxcvbn34jkiu656yuicvbnjrtyuASDFGH34tyhj", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return token
  }
}