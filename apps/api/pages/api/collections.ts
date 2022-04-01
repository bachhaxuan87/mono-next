
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<any>
) {
   const { id } = req.query as { id: string }
   res.status(200).json({id: 123})
}
