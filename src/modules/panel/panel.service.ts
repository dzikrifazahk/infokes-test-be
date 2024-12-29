import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrUpdatePanelDto, IFilterPanel } from './dto/panel.dto';
import { Repository } from 'typeorm';
import { PanelEntity } from './entities/panel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(PanelEntity)
    private readonly panelRepository: Repository<PanelEntity>,
  ) {}

  async createOrUpdate(dto: CreateOrUpdatePanelDto) {
    let message: string;

    const MINIMUM_NAME_LENGTH = 4;

    if (dto.name.length < MINIMUM_NAME_LENGTH) {
      throw new BadRequestException(
        `name should be at least ${MINIMUM_NAME_LENGTH} character long`,
      );
    }

    if (!dto.id) {
      const newPanel = {
        name: dto.name,
        parentId: dto.parentId,
        position: dto.position,
        isHeder: dto.isHeader,
        description: dto.description,
      };

      const createData = this.panelRepository.create({
        name: dto.name,
        parentId: dto.parentId,
        position: dto.position,
        isHeader: dto.isHeader,
        description: dto.description,
      });

      await this.panelRepository.save(createData);
      message = 'Success Created A Panel';
      return { message: message, data: createData };
    } else {
      const findData = await this.panelRepository.findOne({
        where: {
          id: dto.id,
        },
      });

      if (dto.name) {
        findData.name = dto.name;
      }

      if (dto.parentId) {
        findData.parentId = dto.parentId;
      }

      if (dto.position) {
        findData.position = dto.position;
      }

      if (dto.isHeader) {
        findData.isHeader = dto.isHeader;
      }

      if (dto.description) {
        findData.description = dto.description;
      }

      await this.panelRepository.save(findData);
      message = 'Success Updated A Panel';
      return { message: message, data: findData };
    }
  }

  async findAll(header?: string) {
    const where: any = {};

    if (header !== undefined) {
      where.isHeader = header;
    }

    const datas = await this.panelRepository.find({ where });

    if (!datas.length) {
      throw new NotFoundException('No Panels Found');
    }

    return datas;
  }

  async findOne(id: string) {
    const data = await this.panelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new NotFoundException('No Panel Specified Found');
    }

    return data;
  }

  async remove(id: string) {
    const data = await this.panelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new NotFoundException('No Panel Specified Found');
    }

    await this.panelRepository.remove(data);

    return data;
  }

  async getPanelWithChildren(id: string) {
    const foundPanel = await this.panelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!foundPanel) {
      throw new Error(`Panel with ID ${id} not found`);
    }

    const children = await this.panelRepository.find({
      where: {
        parentId: id,
      },
    });

    return {
      ...foundPanel,
      children: children,
    };
  }
}
