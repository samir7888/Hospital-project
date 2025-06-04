import { EButtonVariant } from "./enums";

export type StatisticsItem = {
  title: string;
  count: number;
};

export type JourneyItem = {
  title: string;
  description: string;
};

export type CoreValueItem = {
  title: string;
  description: string;
};

export type AboutPageData = {
  id: string;
  statistics: StatisticsItem[] | null;
  mission: string;
  vision: string;
  journey: JourneyItem[] | null;
  coreValues: CoreValueItem[] | null;
  heroSection: {
    id: string;
    title: string;
    subtitle: string;
    cta: {
      link: string;
      text: string;
      variant: EButtonVariant;
    }[];
    image: {
      id: string;
      url: string;
    } | null;
  };
};
