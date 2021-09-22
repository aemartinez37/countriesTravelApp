export type Country = {
  name: string;
  alpha3Code: string;
  capital: string;
  region: string;
  subregion: string;
  borders: string[];
  flags: string[];
};

export type AppContextType = {
  countries: Country[];
  visitedCountries: Country[];
  updateTravel: (country: Country) => void;
  resetTravel: () => void;
  currentCountry: Country | null;
};

export type SubscriptionType = {
  name: string;
  email: string;
  country: string;
};
