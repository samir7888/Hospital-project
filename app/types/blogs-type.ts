
export type ImageInfo = {
  id: string;
  url: string;
};

export type Category = {
  id: string;
  name: string;
};
export type CategoryResponse = {
  id: string;
  name: string;
  blogsCount: string;
};

export type BaseNewsAndEvents = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage: ImageInfo;
  coverImage: ImageInfo | null;
  category: Category;
  content: string;
  featuredImageId: string;
  categoryId: string;
};

export type PaginationMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type NewsAndEventsResponse = {
  data: BaseNewsAndEvents[];
  meta: PaginationMeta;
};
