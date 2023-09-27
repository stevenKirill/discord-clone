import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '../constants';
import prisma from '../../db';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers.authorization?.split('-')[1] as string;
    const currentUser = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });
    if (!currentUser) {
      return res.status(401).json({ reason: UNAUTHORIZED });
    }
    res.locals.user = currentUser;
    return next();
  } catch (error) {
    return res.status(500).json({ reason: INTERNAL_SERVER_ERROR });
  }
};
