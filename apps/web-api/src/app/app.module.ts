import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";


@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    LoggerModule.forRoot(),
    ClientsModule.register([
      {
        name: "EVENTS_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8888
        }
      },
      {
        name: "REGISTRATIONS_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8887
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    AppService
  ],
})
export class AppModule {}
