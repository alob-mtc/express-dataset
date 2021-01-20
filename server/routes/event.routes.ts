import { Router } from 'express';
import { useValidatorPipe } from '../middlewares/validation.pipe';
import { EventController } from '../controllers/event.controller';

class EventRoutes extends EventController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.post('/', useValidatorPipe('addEvent'), this.addEventControllerAsync);
    this.router.get('/', this.getAllEventControllerAsync);
    this.router.get('/actors/:actorId', this.getEventByActorControllerAsync);
  };
}
export default new EventRoutes();
