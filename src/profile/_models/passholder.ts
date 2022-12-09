export type TCity = {
  /** Name of the city */
  city: string;
  /** Postalcode of the city */
  postalCode: string;
};

export type TAddress = TCity & {
  /** Postal box number. */
  box: string;
  /** ISO 3166-1 alpha-2 country code. */
  country: string;
  /** House number. */
  number: string;
  /** Street name of the address. */
  street: string;
};

export type TCardSystemMembership = {
  /** A region, usually one or multiple municipalities in Belgium, that uses UiTPAS and provides discounts and/or rewards. For example "Paspartoe" (Brussels), UiTPAS Leuven, UiTPAS Hasselt, UiTPAS Gent, and so on. */
  cardSystem: {
    /** Indicates whether this cardsystem allows online cardless registrations. */
    allowsCardlessRegistration?: boolean;
    /** Branding information of the card system */
    branding?: {
      /** URL to the logo of the card system */
      logo: string;
      /** Color code of the primary branding color. */
      primaryColor: string;
      /** Color code of the secondary branding color. */
      secondaryColor: string;
    };
    /** List of cities that are part of this card system */
    cities: TCity[];
    /** ID of the card system */
    id: number;
    /** Links of the card system */
    links: {
      /** URL of the website of the card system */
      website: string;
    };
    /** Name of the card system. */
    name: string;
    /** Indicates whether this is a permanent card system */
    permanent?: boolean;
  };
  /** If the passholder has right to a social tariff, this object contains details like the end date. */
  socialTariff?: {
    /** Exact moment that the passholder's right to a social tariff expires. */
    endDate: string;
    /** If true, the passholder's right to a social tariff has completely expired (the end date has passed and the passholder is no longer in a grace period). */
    expired: boolean;
    /** When the end date of the right to a social tariff has passed, the passholder may still be in a grace period that they can buy tickets at a social tariff until their right to a social tariff has been renewed. */
    inGracePeriod: boolean;
  };
  status?: 'ACTIVE' | 'BLOCKED';
  /** The UiTPAS number of the card that is linked to this card system membership. It is possible to have a CardSystemMembership without a card. However, a passholder always has at least one CardSystemMembership with a card. */
  uitpasNumber: string;
};

export type TPassHolder = {
  /** Address that the passholder lives at. Always present in responses. Passholders living outside of Belgium (usually near the border) will only have a postalCode and city in their address. */
  address: TCity | TAddress;
  /** This field is always available in responses. */
  cardSystemMemberships: TCardSystemMembership[];
  /**
   * Name of the municipality that the passholder lives in. Deprecated in favor of address.city.
   * @deprecated
   */
  city?: string;
  /** This field is always available in responses. */
  creationDate: string;
  /** Date that the passholder was born. */
  dateOfBirth?: string;
  /** Contact email address of the passholder. Not present for every passholder. Multiple passholders can have the same email address. */
  email?: string;
  /** First name of the passholder. */
  firstName: string;
  /** Gender of the passholder. */
  gender?: 'MALE' | 'FEMALE' | 'X';
  /** This field is always available in responses. */
  id: string;
  /** Unique national (Belgian) INSZ number of an individual passholder to look up. */
  inszNumber?: string;
  /** Last name of the passholder. */
  name: string;
  /** Human-readable name of the passholder's nationality. */
  nationality?: string;
  /** Permissions that the passholder has given to be contacted. */
  optInPreferences?: {
    /** Rewards, actions and events selected specifically for the passholder based on their UiTPAS history. */
    infoMails: boolean;
    /** Notification when you reach an important UiTPAS milestone, for example a specific amount of points or an exclusive reward becomes available to you. */
    milestoneMails: boolean;
    /** Sporadic post mail with information about UiTPAS. Will be sent to the passholder's postal address. */
    post: boolean;
    /** Important information about the functionality of UiTPAS. */
    serviceMails: boolean;
    /** Free (sporadic) SMS messages with rewards, actions and events selected specifically for the passholder based on their UiTPAS history. */
    sms: boolean;
  };
  /** Phone number that the passholder has registered, for example for SMS alerts. */
  phoneNumber?: string;
  /** Amount of points the passholder has currently saved (and not used). This field is always available in responses. */
  points: number;
  /**
   * Postal code of the municipality that the passholder lives in. Deprecated in favor of address.postalCode
   * @deprecated
   */
  postalCode?: string;
  /** An organisation that partners with UiTPAS to provide discounts and/or rewards, and/or allows points to be collected at their events. */
  registrationOrganizer: {
    /** Unique ID of an UiTPAS organizer. (Same as its ID in UiTdatabank) */
    id: string;
    /** Human-readable name of an UiTPAS organizer. */
    name: string;
  };
  /** Whether or not the passholder has a an UiTID registered. This field is always available in responses. */
  uitidStatus: 'REGISTERED' | 'UNREGISTERED';
};
