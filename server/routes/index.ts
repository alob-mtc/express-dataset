import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import ActorRoutes from './actor.routes';
import EventRoutes from './event.routes';

class Routes {
  public readonly router: Router;
  private readonly eventController: EventController;

  constructor() {
    this.router = Router();
    this.eventController = new EventController();
    this.applicationRoutes();
  }

  private applicationRoutes = (): void => {
    this.router.use('/actors', ActorRoutes.router);
    this.router.use('/events', EventRoutes.router);
    this.router.delete('/erase', this.eventController.deleteAllEventControllerAsync);
  };
}

export default new Routes();
