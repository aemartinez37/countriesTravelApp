import React, { createContext, useContext, useState, useEffect } from "react";
import { Country, AppContextType } from "../types";
import { CountriesApi } from "../services/ApiCountries";
import { encrypt, decrypt } from "../services/EncryptionService";

const appCtxt = createContext<AppContextType>({
  countries: [],
  visitedCountries: [],
  updateTravel: () => {},
  resetTravel: () => {},
  get currentCountry() {
    return null;
  },
});

const ContextProvider: React.FC = ({ children }) => {
  const [countries, setcountries] = useState<Country[]>([]);
  const [visitedCountries, setVisitedCountries] = useState<Country[]>([]);

  useEffect(() => {
    CountriesApi.getCountries()
      .then((data: Country[]) => {
        setcountries(data);
      })
      .catch((err) => {
        console.log(err);
        setcountries([]);
      });
  }, []);

  const trip = (country: Country) => {
    console.log("Added country to trip!");
    const encryptedCountry = encrypt(JSON.stringify(country));
    setVisitedCountries(visitedCountries.concat([JSON.parse(decrypt(encryptedCountry))]));
  };

  const resetTrip = () => {
    console.log("Reset travel!");
    setVisitedCountries([]);
  };

  const context: AppContextType = {
    countries,
    visitedCountries,
    updateTravel(country: Country) {
      console.log("Added country to trip!");
      const encryptedCountry = encrypt(JSON.stringify(country));
      setVisitedCountries(visitedCountries.concat([JSON.parse(decrypt(encryptedCountry))]));
    },
    resetTravel() {
      console.log("Reset travel!");
      setVisitedCountries([]);
    },
    get currentCountry() {
      return visitedCountries.length > 0 ? visitedCountries.slice(-1)[0] : null;
    },
  };

  return <appCtxt.Provider value={context}>{children}</appCtxt.Provider>;
};

export const AppContextProvider = ContextProvider;

export function useAppContext() {
  return useContext(appCtxt);
}
