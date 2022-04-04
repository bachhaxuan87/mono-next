import * as ethUtil from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';
import { SELLER_STATUS, CREDIT_STATUS } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { SignInRequest } from "@libs/models";
import { AccountRepo } from '@api/repositories';
import { getConfig } from '@api/utils';
import { UpdateProfileRequest } from '@libs/models';


export class AccountService {
  async signIn(request: SignInRequest) {
    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(request.message, 'utf8'));
    const address = sigUtil.recoverPersonalSignature({ data: msgBufferHex, sig: request.signature });

    const account = await AccountRepo.upsert(address);
    return jwt.sign({
      data: {
        id: account.id,
        canPay4: account.creditStatus === CREDIT_STATUS.VERIFIED,
        canSell: account.sellerStatus === SELLER_STATUS.VERIFIED
      }
    }, getConfig('TOKEN_SECRET'), { expiresIn: getConfig('TOKEN_LIFE_TIME') });;
  }

  async update(id: string, request: UpdateProfileRequest) {
    await AccountRepo.update(id, request as any);
  }

  async getById(id: string) {
    return await AccountRepo.getById(id);
  }
}

const service = new AccountService();
export { service };