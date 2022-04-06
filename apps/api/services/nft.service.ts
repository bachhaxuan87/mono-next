import { CreateNftRequest } from "@libs/models";
import { NftRepo } from '@api/repositories';
import { nftContractService } from '@backend/services';
import { CollectionService } from '@api/services';

class NftService {
  async create(request: CreateNftRequest) {
    const collection = await CollectionService.details(request.chain, request.contract);
    const [collectionMeta, nftMeta] = await Promise.all([
      collection ?? CollectionService.getMeta(request.chain, request.contract),
      nftContractService.tokenMeta(request.chain, request.contract, request.tokenId)
    ]);

    await NftRepo.upsertWithCollection({
      ...nftMeta,
      tokenId: request.tokenId
    }, collectionMeta);
  }

  async details(chain: string, contract: string, tokenId: string) {
    return await NftRepo.getById(chain, contract, tokenId);
  }
}

export default new NftService();
