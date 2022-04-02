import { createHandler, Get, Param } from '@storyofams/next-api-decorators';
import { prisma } from '@api/providers';

class UserHandler {
  @Get()
  public async list() {
    return await prisma.nft.findMany();
  }

  @Get('/:id')
  public details(@Param('id') id: string) {
    return { id: id };
  }
}

export default createHandler(UserHandler);
