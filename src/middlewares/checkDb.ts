// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

const parseDb = async (req: Request, res: Response, next: NextFunction) => {
  const url = await prisma.url.findUnique({
    where: {
      url: req.body.url,
    },
  });
  if (url) {
    return res.send(url.bioBody);
  }
  return next();
};

export default parseDb;
