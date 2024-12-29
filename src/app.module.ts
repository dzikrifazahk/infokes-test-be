import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PanelModule } from './modules/panel/panel.module';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig = configService.get('database', {});
        return {
          uuidExtension: 'uuid-ossp',
          ...databaseConfig,
        };
      },
      inject: [ConfigService],
    }),
    PanelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
