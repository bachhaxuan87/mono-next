import { createHandler, Body, Post, Put, Get, ValidationPipe, Param, createMiddlewareDecorator, NextFunction, Header } from '@storyofams/next-api-decorators';
import { AccountService } from '@api/services';
import { JwtAuthGuard } from '@api/middlewares';
import { SignInRequest, UpdateProfileRequest } from '@libs/models';
import { UserId } from '@api/decorators';


class AccountHandler {
  // @Get()
  // public async list() {
  //   return await prisma.nft.findMany();
  // }

  // @Get('/:id')
  // public details(@Param('id') id: string) {
  //   return { id: id };
  // }

  @Post('/sign-in')
  async signIn(@Body() request: SignInRequest) {
    return AccountService.signIn(request);
  }

  @Put('/profile')
  @JwtAuthGuard()
  async update(@UserId() uid: string, @Body(ValidationPipe) request: UpdateProfileRequest) {
    return AccountService.update(uid, request);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return {id: id};
  }
}

export default createHandler(AccountHandler);
