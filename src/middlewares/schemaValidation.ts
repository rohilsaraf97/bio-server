// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.issues[0].message });
      }
      return res.status(400).json(error);
    }
  };

export default validate;
