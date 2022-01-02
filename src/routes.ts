import { Router } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";

const routes = Router()

const createClientController = new CreateClientController()

routes.get("/", (request, response) => {
  return response.json({
    message: "okk"
  })
})

routes.post("/client", createClientController.handle)

export { routes }