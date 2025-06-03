
export type ServiceCoverImage = {
  id: string;
  url: string;
};

export type Services = {
  id: string;
  createdAt: string;
  title: string;
  summary: string;
  coverImage: ServiceCoverImage;
};
export type SingleServices = {
  id: string;
  createdAt: string;
  title: string;
  summary: string;
  description:string;
  coverImage: ServiceCoverImage;
};

export type PaginationMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ServicesResponse = {
  data: Services[];
  meta: PaginationMeta;
};
