import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as path from 'path';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${path.resolve(
          'environments',
          `${process.env.NODE_ENV || 'local'}.env`,
        )}`,
      ),
    },
    ConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}