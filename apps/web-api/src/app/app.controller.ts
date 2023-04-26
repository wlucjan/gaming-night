import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { map, zip } from "rxjs";

@Controller({
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/events/ping")
  pingEventsService() {
    return this.appService.pingEventsService();
  }

  @Get("/registrations/ping")
  pingRegistrationsService() {
    return this.appService.pingRegistrationsService();
  }

  @Get("/ping")
  pingAll() {
    return zip(
      this.appService.pingEventsService(),
      this.appService.pingRegistrationsService()
    ).pipe(
      map(([eventsService, registrationsService]) => ({
        eventsService,
        registrationsService
      }))
    )
  }
}
