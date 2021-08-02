import React from "react";
import { Link } from "react-router-dom";
import { Country } from "../types";
import {
  StyledCountries,
  StyledCountry,
  StyledCountryImage,
  StyledCountryName,
} from "./styled/StyledComponents";
import { useAppContext } from "../app-context/AppContext";
import { travelAvailableCountries } from "../utils";

const CountryElem = ({ name, alpha3Code, flag }: Country) => {
  return (
    <Link to={`/${alpha3Code}`}>
      <StyledCountry id={alpha3Code.toString()}>
        <StyledCountryImage src={flag} alt={`${name} flag`} />
        <StyledCountryName>{name}</StyledCountryName>
      </StyledCountry>
    </Link>
  );
};

export const Countries: React.FC = () => {
  const appContext = useAppContext();
  const travel = appContext.visitedCountries;
  const bindTravelAvailableCountries =
    travelAvailableCountries.bind(appContext);
  const countriesList = bindTravelAvailableCountries(appContext.countries);

  if (travel.length > 0) {
    if (countriesList.length == 0) {
      throw new Error(
        `You visited ${travel.length} countries:${travel.reduce((acum, x) => {
          return acum + " ->" + x.name;
        }, "")}`
      );
    }
  }

  return (
    <StyledCountries>
      {countriesList.map((country: Country) => (
        <CountryElem key={country.alpha3Code} {...country} />
      ))}
    </StyledCountries>
  );
};
