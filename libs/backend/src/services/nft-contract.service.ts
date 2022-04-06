import { ipfs } from './ipft.service';
import { SmartContractService } from './smart-contract.service';
import erc721Artifacts from './smart-contracts/abi/ERC721BePayMinimal.json';
import erc1155Artifacts from './smart-contracts/abi/ERC1155BePay.json';

export type ContractMeta = {
  name?: string,
  owner: string,
  symbol?: string,
  description?: string,
  type?: string,
  image?: string,
  banner?: string
}

export type TokenMeta = {
  name?: string,
  owner?: string,
  symbol?: string,
  description?: string,
  type?: string,
  image?: string,
  banner?: string
}

export class NftContractService extends SmartContractService {

  get abi() {
    return erc721Artifacts.abi;
  }

  public async name(chain: string, address: string) {
    try {
      return await this.read(chain, address, 'name', this.abi);
    } catch {
      return 'Unname';
    }
  }

  public async symbol(chain: string, address: string) {
    try {
      return await this.read(chain, address, 'symbol', this.abi);
    } catch {
      return 'Unsymbol';
    }
  }

  public async owner(chain: string, address: string) {
    try {
      return await this.read(chain, address, 'owner', this.abi);
    } catch {
      return;
    }
  }

  public async contractURI(chain: string, address: string) {
    return await this.read(chain, address, 'contractURI', this.abi);
  }

  public async contractType(chain: string, address: string) {
    const _INTERFACE_ID_ERC721 = "0x80ac58cd";
    const _INTERFACE_ID_ERC1155 = "0xd9b67a26";

    try {
      const [isErc721, isErc1155] = await Promise.all([
        this.read(chain, address, 'supportsInterface', this.abi, _INTERFACE_ID_ERC721),
        this.read(chain, address, 'supportsInterface', this.abi, _INTERFACE_ID_ERC1155)
      ]);

      return isErc721 ? "ERC721" : (isErc1155 ? "ERC1155" : null);
    } catch {
      return;
    }
  }

  public async contractMeta(chain: string, address: string) {
    const [contractUri, owner, name, symbol, type] = await Promise.all([
      this.contractURI(chain, address),
      this.owner(chain, address),
      this.name(chain, address),
      this.symbol(chain, address),
      this.contractType(chain, address)
    ]);

    return ipfs.get<ContractMeta>(contractUri).then(res => ({
      ...res, owner, name, symbol, type
    }));
  }

  public async tokenURI(chain: string, address: string, tokenId: string) {
    const [tokenURI, uri] = await Promise.all([
      this.read(chain, address, 'tokenURI', tokenId).catch(() => (null)),
      this.read(chain, address, 'uri', tokenId).catch(() => (null))
    ]);
    return tokenURI || uri;
  }

  public async tokenMeta(chain: string, address: string, tokenId: string) {
    const tokenUri = await this.tokenURI(chain, address, tokenId);
    return ipfs.get<TokenMeta>(tokenUri);
  }

  public async balanceOfToken(chain: string, address: string, owner: string, tokenId: string) {
    const [erc721Copy, erc1155Copy] = await Promise.all([
      this.read(chain, address, 'ownerOf', this.abi, tokenId).then((ownerOf: string) => ownerOf === owner ? 1 : 0),
      this.read(chain, address, 'balanceOf', this.abi, owner, tokenId)
    ])
    return erc721Copy || erc1155Copy;
  }
}


export class Erc721Service extends NftContractService {

  public async balanceOf(chain: string, address: string, owner: string) {
    return await this.read(chain, address, 'balanceOf', this.abi, owner);
  }

  public async ownerOf(chain: string, address: string, tokenId: string) {
    return await this.read(chain, address, 'ownerOf', this.abi, tokenId);
  }
}


export class Erc1155Service extends NftContractService {

  get abi() {
    return erc1155Artifacts.abi;
  }

  public async balanceOf(chain: string, address: string, owner: string, tokenId: string) {
    return await this.read(chain, address, 'balanceOf', this.abi, owner, tokenId);
  }
}

const nftContractService = new NftContractService();
export { nftContractService };
