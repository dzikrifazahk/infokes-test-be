import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanelEntity } from './entities/panel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PanelEntity])],
  controllers: [PanelController],
  providers: [PanelService],
})
export class PanelModule {}
