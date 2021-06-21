import React, { createContext, useContext, useState, useEffect } from "react";
import { Country, AppContextType } from "../types";
import { CountriesApi } from "../services/ApiCountries";

const appCtxt = createContext<AppContextType>({
  value: [],
  travel: [],
  updateTravel: () => {},
  resetTravel: () => {},
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
    setVisitedCountries(visitedCountries.concat([country]));
  };

  const resetTrip = () => {
    console.log("Reset travel!");
    setVisitedCountries([]);
  };

  const context: AppContextType = {
    value: countries,
    travel: visitedCountries,
    updateTravel: (country: Country) => trip(country),
    resetTravel: () => resetTrip(),
  };

  return <appCtxt.Provider value={context}>{children}</appCtxt.Provider>;
};

export const AppContextProvider = ContextProvider;

export function useAppContext() {
  return useContext(appCtxt);
}
