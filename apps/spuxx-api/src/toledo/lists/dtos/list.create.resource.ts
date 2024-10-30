import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { listProperties } from '../config/list.properties';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { TransformBooleanString } from '@spuxx/nest-utils';

export class ListCreateResource {
  @IsString()
  @MaxLength(100)
  @ApiProperty(listProperties.name)
  name: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  @ApiPropertyOptional(listProperties.icon)
  icon: string = listProperties.icon.default;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional(listProperties.usesCheckboxes)
  usesCheckboxes: boolean = listProperties.usesCheckboxes.default;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional(listProperties.requiresDeleteConfirmation)
  requiresDeleteConfirmation: boolean = listProperties.requiresDeleteConfirmation.default;

  @TransformBooleanString()
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional(listProperties.usesQuantities)
  usesQuantities: boolean = listProperties.usesQuantities.default;

  constructor(init: { name: string }) {
    Object.assign(this, init);
  }
}
