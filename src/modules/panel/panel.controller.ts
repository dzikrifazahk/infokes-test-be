import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PanelService } from './panel.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrUpdatePanelDto } from './dto/panel.dto';
import { CommonResponse } from 'src/common/common-response';

@ApiTags('Panel API')
@Controller('panel')
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Or Update new panel',
    description:
      'Create Or Update new panel, if you want to update please send the id \n, Required Property {Name}',
  })
  @ApiResponse({
    type: CreateOrUpdatePanelDto,
  })
  async create(@Body() createPanelDto: CreateOrUpdatePanelDto) {
    const response = await this.panelService.createOrUpdate(createPanelDto);
    return new CommonResponse(response.message, response.data);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get All panels',
    description: 'Get All Panels Data',
  })
  @ApiResponse({
    type: CreateOrUpdatePanelDto,
  })
  async findAll() {
    const response = await this.panelService.findAll();
    return new CommonResponse('Success Get All Data', response);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Detail Panel Data',
    description: 'Get One Detail Panel Data',
  })
  @ApiResponse({
    type: CreateOrUpdatePanelDto,
  })
  async findOne(@Param('id') id: string) {
    const response = await this.panelService.findOne(id);
    return new CommonResponse('Success Get One Data', response);
  }

  @Get(':id/children')
  @ApiOperation({
    summary: 'Get Detail Panel With Children',
    description: 'Get One Detail Panel Data With Children',
  })
  @ApiResponse({
    type: CreateOrUpdatePanelDto,
  })
  async getPanelWithChildren(@Param('id') id: string) {
    const response = await this.panelService.getPanelWithChildren(id);
    return new CommonResponse('Success Get One Data', response);
  }
  
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Panel',
    description: 'Delete One Panel Data',
  })
  @ApiResponse({
    type: CreateOrUpdatePanelDto,
  })
  async remove(@Param('id') id: string) {
    const response = await this.panelService.remove(id);
    return new CommonResponse('Success Delete Data', response);
  }
}
