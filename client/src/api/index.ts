const BaseNewsApi = process.env.NEXT_PUBLIC_NEWS_API;


export const NewsApi = {
  base: BaseNewsApi,
};

export const BackendApiConfig = {
  base: BaseNewsApi,
  headers: {
    'ServerAccessKey': process.env.NEXT_PUBLIC_SERVER_ACCESS_KEY as string,
    'Content-Type': 'application/json',
  },
};