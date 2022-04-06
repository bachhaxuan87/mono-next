import { Type } from "class-transformer";
import {IsArray, IsIn, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";

export class NftAttribute {
  //@ApiProperty()
  @IsString()
  traitType: string;

  //@ApiProperty()
  @IsString()
  value: string;

  //@ApiProperty()
  @IsOptional()
  isTruppa: boolean;
}

export class NftPayout {
  //@ApiProperty()
  @IsString()
  account: string;

  //@ApiProperty()
  @IsNumber()
  value: number;
}

export class CreateNftRequest {
  //@ApiProperty()
  @IsString()
  chain: string;

  //@ApiProperty()
  @IsString()
  contract: string;

  //@ApiProperty()
  @IsString()
  tokenId: string;

  //@ApiProperty()
  @IsString()
  name: string;

  //@ApiProperty()
  @IsString()
  @IsOptional()
  tokenUri: string;

  //@ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  //@ApiProperty()
  @IsString()
  @IsOptional()
  image: string;

  //@ApiProperty({ type: [NftAttribute], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NftAttribute)
  attributes: NftAttribute[];

  //@ApiProperty()
  @IsString()
  @IsOptional()
  notes: string;

  //@ApiProperty()
  @IsNumber()
  value: number;

  //@ApiProperty({type: [NftPayout], required: false})
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => NftPayout)
  creators: NftPayout[];

  //@ApiProperty({type: [NftPayout], required: false})
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => NftPayout)
  royalties: NftPayout[];

  //@ApiProperty({required: false})
  @IsOptional()
  @IsArray()
  signatures: string[];
}
