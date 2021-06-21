export type Country = {
  name: string;
  alpha3Code: string;
  capital: string;
  region: string;
  subregion: string;
  borders: string[];
  flag: string;
};

export type AppContextType = {
  countries: Country[];
  visitedCountries: Country[];
  updateTravel: (country: Country) => void;
  resetTravel: () => void;
};

export type SubscriptionType = {
  name: string;
  email: string;
  country: string;
};
