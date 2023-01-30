import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('factories')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('usevalue')
  useValue(): string {
    return this.appService.useValue();
  }

  @Get('usefactory')
  useFactory(): string {
    return this.appService.useFactory();
  }

  @Get('gerKraken')
  getKrakenMarkets(): string {
    return this.appService.getKrakenMarkets();
  }
}
