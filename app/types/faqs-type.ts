import { EFaqType } from "./enums";

export type FaqItem = {
  id: string;
  title: string;
  description: string;
  category: EFaqType;
};

export type PaginationMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type FaqResponse = {
  data: FaqItem[];
  meta: PaginationMeta;
};
