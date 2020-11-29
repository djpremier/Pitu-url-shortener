import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Link from '../models/Link';

interface Request {
  code: string;
}

class HitLinkService {
  public async execute({
    code,
  }: Request): Promise<Link> {
    const linksRepository = getRepository(Link);

    const link = await linksRepository.findOne({
      where: {
        code,
      },
    });

    if (!link) {
      throw new AppError('Link not found', 404);
    }

    link.hits!++;

    await linksRepository.save(link);

    return link;
  }
}

export default HitLinkService;
