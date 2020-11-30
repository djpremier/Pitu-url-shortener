import vars from "../configs/vars";
import baseAPI from "./api";

const api = baseAPI(vars.API_BASE);

export interface ILink {
  id: string;
  url: string;
  code: string;
  hits: number;
  createdAt: string;
  updatedAt: string;
}

type linkParam = {
  url: string;
}

export interface IShortenerService {
  getLink(code: string): Promise<ILink>;
  getStats(params: string): Promise<ILink>;
  generate(code: linkParam): Promise<ILink>;
}

const ShortenerService: IShortenerService = {
  async getLink(code: string) {
    const result = await api.get(`links/${code}`);

    return result.data;
  },

  async getStats(code: string) {
    const result = await api.get(`links/${code}/stats`);

    return result.data;
  },

  async generate(model: linkParam) {
    const result = await api.post("links", model);

    return result.data;
  },
};

export default ShortenerService;
