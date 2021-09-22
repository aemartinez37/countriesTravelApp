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
import { didacticBind } from "../didacticBind";

const CountryElem = ({ name, alpha3Code, flags }: Country) => {
  return (
    <Link to={`/${alpha3Code}`}>
      <StyledCountry id={alpha3Code.toString()}>
        <StyledCountryImage src={flags[0]} alt={`${name} flag`} />
        <StyledCountryName>{name}</StyledCountryName>
      </StyledCountry>
    </Link>
  );
};

export const Countries: React.FC = () => {
  const appContext = useAppContext();
  const travel = appContext.visitedCountries;

  //Using ES5 `bind` function:
  /*const bindTravelAvailableCountries =
    travelAvailableCountries.bind(appContext);*/

  //Using `didacticBind` function created for professional development purposes
  const bindTravelAvailableCountries = didacticBind(
    travelAvailableCountries,
    appContext
  );
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
