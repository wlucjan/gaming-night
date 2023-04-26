import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";

@Injectable()
export class AppService {
  constructor(
    @Inject("EVENTS_SERVICE") private readonly clientEventsService: ClientProxy,
    @Inject("REGISTRATIONS_SERVICE") private readonly clientRegistrationsService: ClientProxy
  ) {}

  pingEventsService() {
    const startTs = Date.now();
    const pattern = { cmd: "ping" };
    const payload = {};
    return this.clientEventsService
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }

  pingRegistrationsService() {
    const startTs = Date.now();
    const pattern = { cmd: "ping" };
    const payload = {};
    return this.clientRegistrationsService
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }
}
