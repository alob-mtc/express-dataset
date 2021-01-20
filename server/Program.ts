import express from 'express';
import { Startup } from './Startup';

export class Program extends Startup {
  constructor() {
    super(express());

    this.buildConfigurations();
  }

  buildConfigurations() {
    this.useApplicationMiddlewares();
    // versioning can be added here
    this.setGlobalRoutesPrefix('/');

    this.setTestApplicationRoutes();

    this.catchUnknownRoutes();
  }

  public Run(): void {
    this.initialize();
  }
  public GetApp(): express.Application {
    return this.getApp();
  }
}

new Program().Run();
