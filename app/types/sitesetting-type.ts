export interface SiteSettings {
  id: string;
  companyName: string;

  primaryLogo: {
    id: string;
    url: string;
  } | null;

  secondaryLogo: {
    id: string;
    url: string;
  } | null;
}
