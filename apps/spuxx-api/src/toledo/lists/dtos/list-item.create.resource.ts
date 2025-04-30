import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Map, TransformBooleanString } from '@spuxx/nest-utils';
import { listItemProperties } from '../config/list-item.properties';
import {
  IsBoolean,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ListItemCreateResource {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @ApiProperty(listItemProperties.text)
  @Map()
  text: string;

  @IsNumber()
  @Min(1)
  @Max(99)
  @ApiPropertyOptional(listItemProperties.quantity)
  @Map()
  quantity: number = listItemProperties.quantity.default;

  @TransformBooleanString()
  @IsBoolean()
  @ApiPropertyOptional(listItemProperties.checked)
  @Map()
  checked: boolean = listItemProperties.checked.default;
}
