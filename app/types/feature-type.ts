import { ImageResponse } from "./global-types";

export interface Feature {
  id: string;
  title: string;
  description: string;
  image: ImageResponse;
}

export type FeatureResponse = Feature[];