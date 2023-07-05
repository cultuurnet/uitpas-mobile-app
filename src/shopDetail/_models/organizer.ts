export type TOrganizerAddress = {
  addressCountry: string;
  addressLocality: string;
  postalCode: string;
  streetAddress: string;
};

export type TOrganizer = {
  '@context': string;
  '@id': string;
  address: Record<string, TOrganizerAddress>;
  completedLanguages: string[];
  contactPoint: {
    email: string[];
    phone: string[];
    url: string[];
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  hiddenLabels?: string[];
  languages: string[];
  mainLanguage: string;
  modified: string;
  name: string;
  workflowStatus: string;
};
