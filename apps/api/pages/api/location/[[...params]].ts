import { createHandler, Body, Post, ValidationPipe } from '@storyofams/next-api-decorators';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, MinLength, ValidateNested } from 'class-validator';

class Coordinate {
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;
}

class MapMarker {
  @IsNotEmpty()

  label: string;

}

class LocationHandler {
  @Post()
  saveLocation(@Body(ValidationPipe) body: MapMarker) {
    // Do something with the data.
    return `Location "${body.label}" saved.`;
  }
}

export default createHandler(LocationHandler);
