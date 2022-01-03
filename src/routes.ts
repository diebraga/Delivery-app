import { Router } from "express";
import { ensureClientIsAuthenticated } from "./middlewares/ensureClientIsAuthenticated";
import { ensureDeliverymanIsAuthenticated } from "./middlewares/ensureDeliverymanIsAuthenticated";
import { AuthenticateClientController } from "./modules/account/authenticateClient/authenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/authenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";
import { CreateDeliveryController } from "./modules/delivery/useCases/createDelivery/createDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/createDeliverymanController";
import { FindaAllNotDeliveredController } from "./modules/delivery/useCases/findAllNotDelivered/findAllNotDeliveredController";
import { UpdateDeliverymanStatusController } from "./modules/delivery/useCases/updateDeliverymanStatus/updateDeliverymanStatusController";

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findaAllNotDeliveredController = new FindaAllNotDeliveredController()
const updateDeliverymanStatusController = new UpdateDeliverymanStatusController()

routes.get("/", (request, response) => {
  return response.json({
    message: "Ok"
  })
})

routes.post("/client/authenticate", authenticateClientController.handle)
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle)

routes.post("/client/create", createClientController.handle)
routes.post("/deliveryman/create", createDeliverymanController.handle)

routes.post("/delivery/create", ensureClientIsAuthenticated, createDeliveryController.handle)
routes.get("/delivery", ensureDeliverymanIsAuthenticated, findaAllNotDeliveredController.handle)

routes.put("/delivery/acceptdelivery/:id", ensureDeliverymanIsAuthenticated, updateDeliverymanStatusController.handle)

export { routes }