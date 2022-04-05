import { createHandler, Body, Post, Get, Param, ValidationPipe } from '@storyofams/next-api-decorators';
import { plainToInstance } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { NextApiRequest } from 'next';

export class CreateUserDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  fullName: string;
}


const validateRequest = (req: NextApiRequest) => {
  const request = plainToInstance(CreateUserDTO, req);
  console.log(request);
};


class UserHandler {
   @Get('/:id/collections')
   collections(@Param("id") id: string) {
      return { id };
   }

   @Get('/:id')
   public details(@Param('id') id: string) {
      return { id: 2 };
   }



   // @Get('/id')
   // collections() {
   //    return {id: 2};
   // }

   @Post()
   createUser( @Body(ValidationPipe) body: CreateUserDTO) {
      return body;
   }
}

export default createHandler(UserHandler);
