// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from "axios";
import prisma from "../prisma";
import { Request, Response } from "express";

const bionify = async (req: Request, res: Response) => {
  const { htmlBody, fixation, saccade, url } = req.body;
  const encodedParams = new URLSearchParams();
  encodedParams.append("content", htmlBody);
  encodedParams.append("response_type", "html");
  encodedParams.append("request_type", "html");
  encodedParams.append("fixation", fixation);
  encodedParams.append("saccade", saccade);

  const options = {
    method: "POST",
    url: "https://bionic-reading1.p.rapidapi.com/convert",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST!,
    },
    data: encodedParams,
  };
  try {
    const resp = await axios.request(options);
    const new_url = await prisma.url.create({
      data: {
        url: url,
        bioBody: resp.data,
      },
    });
    return res.send(resp.data);
  } catch (error) {
    return res.send(error);
  }
};

export default bionify;
