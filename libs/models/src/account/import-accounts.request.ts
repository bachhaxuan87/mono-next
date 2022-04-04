import { IsNotBlank } from '@backend/validations/string.validation';
import { ApiProperty } from '@nestjs/swagger';
import { CREDIT_STATUS, SELLER_STATUS } from '@share/constants';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class ImportBuyer {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNumber()
  credit_limit: number;

  @ApiProperty()
  @IsString()
  credit_status: CREDIT_STATUS;
}

export class ImportBuyersRequest {
  @ApiProperty({ type: [ImportBuyer], required: true })
  @IsArray()
  buyers: ImportBuyer[];
}

export class ImportSeller {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNumber()
  commission_fee: number;

  @ApiProperty()
  @IsString()
  seller_status: SELLER_STATUS;
}

export class ImportSellersRequest {
  @ApiProperty({ type: [ImportSeller], required: true })
  @IsArray()
  sellers: ImportSeller[];
}
