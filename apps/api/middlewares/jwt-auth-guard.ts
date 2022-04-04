import { createMiddlewareDecorator, NextFunction, UnauthorizedException } from "@storyofams/next-api-decorators";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import { getConfig } from "@api/utils";

export type Session = {
  uid: string;
}

export type NextApiRequestWithSession = NextApiRequest & {
  session: Session
}

export const JwtAuthGuard = createMiddlewareDecorator(
  (req: NextApiRequestWithSession, res: NextApiResponse, next: NextFunction) => {
    // try {
    //   const authorization = req.headers.authorization;
    //   if (authorization && authorization.startsWith('Bearer ')) {
    //     const token = authorization.split('Bearer ')[1];
    //     const decoded = jwt.verify(token, getConfig('TOKEN_SECRET'));
    //     req.rawHeaders["Referer"] = "cccccccccccc";
    //   }
    // } catch(err) {
    //   return next(new UnauthorizedException("Access is denied."));
    // }
    req.session = { uid: "ccc" };
    next();
  }
);
