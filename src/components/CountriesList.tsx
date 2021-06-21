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
  const travel = appContext.travel;
  const currentCountry = travel.length > 0 ? travel.slice(-1)[0] : null;
  const countriesList =
    travel.length > 0
      ? (currentCountry!.borders
          ? appContext.value.filter((country) =>
              currentCountry!.borders.includes(country.alpha3Code)
            )
          : []
        ).filter((country) => {
          return !travel.map((x) => x.alpha3Code).includes(country.alpha3Code);
        })
      : appContext.value;

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
