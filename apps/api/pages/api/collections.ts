
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<any>
) {
   const { id } = req.query as { id: string }
   res.status(200).json({id: 123})
}
