export interface INewsConfig {
  menuLabel: string;
  searchLabel: string;
  ttile: string;
  // TODO - Update type of logo.
  logo: any;
}

export interface INews {
  description: string;
  slug: string;
  imageUrl: string;
  name: string;
  // TODO - Update organization type.
  organization: any;
  publicationDate: string;
  subtype: string;
  // TODO - Update topics type.
  topics: any;
}
