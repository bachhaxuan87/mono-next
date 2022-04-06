import { prisma } from '@api/providers';
import { Prisma } from '@prisma/client';

class NftRepo {
  async upsertWithCollection(nft: Prisma.NftCreateInput, collection: Prisma.NftCollectionCreateInput) {
    await prisma.nft.upsert({
      where: {
        chain_contract_tokenId: {
          chain: nft.collection.connectOrCreate.create.chain,
          contract: nft.collection.connectOrCreate.create.contract,
          tokenId: nft.tokenId
        },
      },
      update: {},
      create: {
        ...nft,
        collection: {
          connectOrCreate: {
            where: {
              chain_contract: {
                chain: collection.chain,
                contract: collection.contract
              }
            },
            create: collection
          }
        }
      }
    });
  }

  // async update(nft: Prisma.NftUpdateInput) {
  //   await prisma.nft.update({
  //     where: {
  //       chain_contract_tokenId: {
  //         chain: nft.collection?. as string,
  //         contract: nft.contract as string,
  //         tokenId: nft.tokenId as string
  //       },
  //     },
  //     data: nft
  //   });
  // }

  // async createMany(nfts: Prisma.NftCreateInput[]) {
  //   return prisma.nft.createMany({
  //     data: nfts,
  //     skipDuplicates: true
  //   });
  // }

  async getById(chain: string, contract: string, tokenId: string) {
    return prisma.nft.findUnique({
      where: {
        chain_contract_tokenId: { chain, contract, tokenId },
      }
    });
  }

  async getAll() {
    return prisma.nft.findMany();
  }
}

export default new NftRepo();
