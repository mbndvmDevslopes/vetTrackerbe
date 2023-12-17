import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export const checkConditionUsage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dogsConditions = await prisma.dogsConditions.findFirst({
      where: { conditionId: id },
    });
    if (dogsConditions) {
      return res.json({ conditionInUse: true });
    } else {
      return res.json({ conditionInUse: false });
    }
  } catch (error) {
    console.error('Error checking dogsConditions usage:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};
