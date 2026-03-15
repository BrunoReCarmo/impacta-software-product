import { getCookie } from "cookies-next";
import { CookiesEnum } from "@common/enums";

const BaseNewsApi = process.env.NEXT_PUBLIC_URL_API;

export const NewsApi = {
  base: BaseNewsApi,
};

export const BackendApiConfig = {
  base: BaseNewsApi,
  get headers() {
    const token: string | null = getCookie(CookiesEnum.Token) as string ?? null;
    return {
      'Authorization': token,
      'ServerAccessKey': process.env.NEXT_PUBLIC_SERVER_ACCESS_KEY as string,
      'Content-Type': 'application/json',
    };
  },
};