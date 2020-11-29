import { getCustomRepository, getRepository } from 'typeorm';
import Link from '../models/Link';

interface Request {
  url: string;
}

const generateCode = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

class CreateLinkService {
  public async execute({
    url,
  }: Request): Promise<Link> {
    const linksRepository = getRepository(Link);

    const link = linksRepository.create({
      url,
      code: generateCode(),
      hits: 0,
    });

    await linksRepository.save(link);

    return link;
  }
}

export default CreateLinkService;
