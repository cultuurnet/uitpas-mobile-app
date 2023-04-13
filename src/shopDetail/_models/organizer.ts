export type TOrganizerAddress = {
  addressCountry: string;
  addressLocality: string;
  postalCode: string;
  streetAddress: string;
};

export type TOrganizer = {
  '@id': string;
  '@context': string;
  mainLanguage: string;
  name: string;
  address: Record<string, TOrganizerAddress>;
  hiddenLabels?: string[];
  contactPoint: {
    phone: string[];
    email: string[];
    url: string[];
  };
  workflowStatus: string;
  languages: string[];
  completedLanguages: string[];
  modified: string;
  geo: {
    latitude: number;
    longitude: number;
  };
};
