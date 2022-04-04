import { createHandler, Body, Post, Put, Get, ValidationPipe, Param, createMiddlewareDecorator, NextFunction, Header } from '@storyofams/next-api-decorators';
import { AccountService } from '@api/services';
import { JwtAuthGuard } from '@api/middlewares';
import { SignInRequest, UpdateProfileRequest } from '@libs/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithSession } from '@api/middlewares/jwt-auth-guard';


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
    // return request;
    return AccountService.signIn(request);
  }

  @Put('/:id')
  @JwtAuthGuard()
  async update(req: NextApiRequestWithSession, @Header('hehe') referer: string, @Param('id') id: string, @Body() request: UpdateProfileRequest) {
    // return request;
    return {session: req.session}
    return AccountService.update(id, request);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    console.log(id);
    // return request;
    return AccountService.getById(id);
  }
}

export default createHandler(AccountHandler);
