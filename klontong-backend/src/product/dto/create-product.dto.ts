import { IsInt, IsNotEmpty, IsPositive, IsString, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  weight: number;

  @IsInt()
  @IsPositive()
  width: number;

  @IsInt()
  @IsPositive()
  length: number;

  @IsInt()
  @IsPositive()
  height: number;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  @Min(1)
  categoryId: number;
}
