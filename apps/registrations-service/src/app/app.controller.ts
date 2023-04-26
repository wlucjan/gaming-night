import { Controller } from '@nestjs/common';

import { MessagePattern } from "@nestjs/microservices";
import { of } from "rxjs";

@Controller()
export class AppController {
  @MessagePattern({ cmd: "ping" })
  ping() {
    return of("pong");
  }
}
