import { Request, Response } from "express";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Link from "../models/Link";
import CreateLinkService from "../services/CreateLinkService";
import HitLinkService from "../services/HitLinkService";

interface LinkParams {
  url: string;
}

const postLink = async (request: Request, response: Response) => {
  const { url } = request.body as LinkParams;

  if (!url) {
    throw new AppError("Invalid request");
  }

  const createLinkService = new CreateLinkService();

  const link = await createLinkService.execute({
    url,
  });

  return response.status(201).json(link);
};

const getLink = async (request: Request, response: Response) => {
  const code = request.params.code as string;

  const linksRepository = getRepository(Link);

  const link = await linksRepository.findOne({
    where: {
      code,
    },
  });

  if (!link) {
    throw new AppError('Link not found', 404);
  }

  return response.json(link);
};

const hitLink = async (request: Request, response: Response) => {
  const code = request.params.code as string;

  const hitLinkService = new HitLinkService();

  const link = await hitLinkService.execute({
    code,
  });

  return response.json(link);
};

export default {
  postLink,
  getLink,
  hitLink,
};
