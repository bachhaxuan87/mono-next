import { createHandler, Body, Post, Put, Get, ValidationPipe, Param } from '@storyofams/next-api-decorators';
import { AccountService } from '@api/services';
import { AuthGuard } from '@api/middlewares';
import { SignInRequest, UpdateProfileRequest } from '@libs/models';
import { UserId } from '@api/decorators';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

class AccountHandler {
  @Post('/sign-in')
  async signIn(@Body() request: SignInRequest) {
    return AccountService.signIn(request);
  }

  @Put()
  @AuthGuard()
  async update(@UserId() uid: string, @Body(ValidationPipe) request: UpdateProfileRequest) {
    return AccountService.update(uid, request);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    await delay(+id);
  }
}

export default createHandler(AccountHandler);
