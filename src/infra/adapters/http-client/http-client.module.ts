import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClient } from './http-client.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'HttpClientPort',
      useClass: HttpClient,
    },
  ],
  exports: ['HttpClientPort', HttpModule],
})
export class HttpClientModule {}
