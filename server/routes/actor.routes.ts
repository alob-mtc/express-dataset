import { Router } from 'express';
import { ActorController } from '../controllers/actor.controller';

class ActorRoutes extends ActorController {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.get('/', this.getActorControllerAsync);
    this.router.get('/streaks', this.getActorByStreakControllerAsync);
  };
}
export default new ActorRoutes();
