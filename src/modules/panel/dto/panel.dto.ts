import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateOrUpdatePanelDto {
    @IsString()
    @ApiPropertyOptional()
    id: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiPropertyOptional()
    parentId?: string;

    @IsString()
    @ApiPropertyOptional()
    position?: string;

    @IsBoolean()
    @ApiPropertyOptional()
    isHeader?: boolean;

    @IsString()
    @ApiPropertyOptional()
    description?: string;
}


export interface IFilterPanel {
    name?: string;
    parentId?: string;
    position?: string;
    isHeader?: boolean;
}
