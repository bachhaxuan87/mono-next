import { createHandler, Body, Post, Put, Get, ValidationPipe, Param } from '@storyofams/next-api-decorators';
import { NftService } from '@api/services';
import { CreateNftRequest } from '@libs/models';

class NftHandler {
  @Post()
  async create(@Body(ValidationPipe) request: CreateNftRequest) {
    return NftService.create(request);
  }

  @Get('/:chain/:contract/:tokenId')
  async details(@Param('chain') chainId: string, @Param('contract') contract: string, @Param('tokenId') tokenId: string) {
    return NftService.details(chainId, contract, tokenId);
  }
}

export default createHandler(NftHandler);
